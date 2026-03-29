import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { toAccuracyUnit } from '@/lib/mastery-utils';

type QuestionRow = {
  id: string;
  question_text: string;
  options: unknown;
  correct_answer: string;
  explanation: string | null;
  difficulty: number | null;
  concept_id: string | null;
};

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const focusMode = request.nextUrl.searchParams.get('focusMode') === 'true';
  const conceptFilter = request.nextUrl.searchParams.get('concept');

  const baseSelect = 'id, question_text, options, correct_answer, explanation, difficulty, concept_id';
  const questionLimit = focusMode ? 10 : 500;

  const runDefaultFlow = async () => {
    const query = conceptFilter
      ? supabase.from('questions').select(baseSelect).eq('concept_id', conceptFilter)
      : supabase.from('questions').select(baseSelect);

    const { data, error } = await query.limit(questionLimit);
    return { data: (data ?? []) as QuestionRow[], error };
  };

  if (!focusMode) {
    const { data, error } = await runDefaultFlow();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ questions: data, focus_mode: false, fallback_used: false });
  }

  const { data: masteryRows, error: masteryError } = await supabase
    .from('user_concept_mastery')
    .select('concept_id, mastery_level')
    .eq('user_id', user.id);

  if (masteryError) {
    return NextResponse.json({ error: masteryError.message }, { status: 500 });
  }

  const weakConceptIds = (masteryRows ?? [])
    .filter((row) => toAccuracyUnit(row.mastery_level) < 0.7)
    .map((row) => row.concept_id)
    .filter((value): value is string => Boolean(value));

  if (weakConceptIds.length === 0) {
    const fallback = await runDefaultFlow();
    if (fallback.error) {
      return NextResponse.json({ error: fallback.error.message }, { status: 500 });
    }

    return NextResponse.json({
      questions: fallback.data,
      focus_mode: true,
      fallback_used: true,
      weak_concepts_count: 0,
    });
  }

  let weakQuery = supabase
    .from('questions')
    .select(baseSelect)
    .in('concept_id', weakConceptIds)
    .limit(questionLimit);

  if (conceptFilter) {
    if (!weakConceptIds.includes(conceptFilter)) {
      const fallback = await runDefaultFlow();
      if (fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 500 });
      }

      return NextResponse.json({
        questions: fallback.data,
        focus_mode: true,
        fallback_used: true,
        weak_concepts_count: weakConceptIds.length,
      });
    }

    weakQuery = weakQuery.eq('concept_id', conceptFilter);
  }

  const { data: weakQuestions, error: weakQuestionsError } = await weakQuery;

  if (weakQuestionsError) {
    return NextResponse.json({ error: weakQuestionsError.message }, { status: 500 });
  }

  if (!weakQuestions || weakQuestions.length === 0) {
    const fallback = await runDefaultFlow();
    if (fallback.error) {
      return NextResponse.json({ error: fallback.error.message }, { status: 500 });
    }

    return NextResponse.json({
      questions: fallback.data,
      focus_mode: true,
      fallback_used: true,
      weak_concepts_count: weakConceptIds.length,
    });
  }

  return NextResponse.json({
    questions: weakQuestions,
    focus_mode: true,
    fallback_used: false,
    weak_concepts_count: weakConceptIds.length,
  });
}
