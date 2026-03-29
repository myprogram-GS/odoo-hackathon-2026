'use client'

interface ApprovalStep {
  name: string
  status: 'completed' | 'current' | 'pending'
}

interface ApprovalTimelineProps {
  steps: ApprovalStep[]
}

export function ApprovalTimeline({ steps }: ApprovalTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                step.status === 'completed'
                  ? 'bg-green-500/20 text-green-300'
                  : step.status === 'current'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.status === 'completed' ? '✓' : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-8 my-2 ${
                  step.status === 'completed' ? 'bg-green-500/30' : 'bg-muted'
                }`}
              />
            )}
          </div>
          <div className="pt-2">
            <p className="font-medium text-sm">{step.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {step.status === 'completed' && 'Approved'}
              {step.status === 'current' && 'Awaiting approval'}
              {step.status === 'pending' && 'Pending'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
