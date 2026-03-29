'use client';

type RecoveryFeedbackProps = {
  before: number;
  after: number;
  concept: string;
};

export function RecoveryFeedback({ before, after, concept }: RecoveryFeedbackProps) {
  const improved = after > before;

  return (
    <div className={`rounded-2xl border p-4 ${improved ? 'border-emerald-200 bg-emerald-50' : 'border-blue-200 bg-blue-50'}`}>
      <h3 className={`mb-2 text-lg font-semibold ${improved ? 'text-emerald-800' : 'text-blue-800'}`}>
        {improved ? 'Progress Update' : 'Recovery Completed'}
      </h3>
      <p className={`text-sm ${improved ? 'text-emerald-900/80' : 'text-blue-900/80'}`}>
        {improved
          ? (
            <>
              You improved from <span className="font-medium">{before.toFixed(2)}</span> to{' '}
              <span className="font-medium">{after.toFixed(2)}</span> in{' '}
              <span className="font-medium">{concept}</span>
            </>
            )
          : (
            <>
              You completed this recovery path in <span className="font-medium">{concept}</span>. Current mastery is{' '}
              <span className="font-medium">{after.toFixed(2)}</span>. Keep practicing to push this higher.
            </>
            )}
      </p>
    </div>
  );
}
