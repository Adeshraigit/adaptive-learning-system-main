import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { toAccuracyUnit } from '@/lib/mastery-utils';

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const pathId = (payload as { pathId?: string })?.pathId;
  if (!pathId) {
    return NextResponse.json({ error: 'pathId is required.' }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { data: path, error: pathError } = await supabase
    .from('learning_paths')
    .select('id, user_id, root_concept_id, before_mastery, status')
    .eq('id', pathId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (pathError) {
    return NextResponse.json({ error: pathError.message }, { status: 500 });
  }

  if (!path) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const { data: masteryRow, error: masteryError } = await supabase
    .from('user_concept_mastery')
    .select('mastery_level')
    .eq('user_id', path.user_id)
    .eq('concept_id', path.root_concept_id)
    .maybeSingle();

  if (masteryError) {
    return NextResponse.json({ error: masteryError.message }, { status: 500 });
  }

  return NextResponse.json({
    concept_id: path.root_concept_id,
    before: toAccuracyUnit(path.before_mastery),
    after: toAccuracyUnit(masteryRow?.mastery_level),
    status: path.status,
  });
}
