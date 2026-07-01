import {Chip, Label, Spinner, Typography} from '@heroui/react';
import {ShieldCheck} from '@solar-icons/react-perf/BoldDuotone';

import {AuditReport} from '../../types';

interface SecurityAuditsProps {
  isLoadingAudit: boolean;
  auditReport: AuditReport | null;
}

export function SecurityAudits({isLoadingAudit, auditReport}: SecurityAuditsProps) {
  return (
    <div className="flex flex-col gap-1.5 mt-2 bg-black/10 border border-border-secondary/40 p-3 rounded-xl">
      <Label className="text-xs font-semibold text-semi-muted flex items-center gap-1">
        <ShieldCheck className="size-4 text-LynxPurple" />
        Security & Safety Audits
      </Label>

      {isLoadingAudit ? (
        <div className="flex items-center gap-2 py-1">
          <Spinner size="sm" />
          <span className="text-xs text-semi-muted">Querying security reports...</span>
        </div>
      ) : auditReport && auditReport.audits && auditReport.audits.length > 0 ? (
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {auditReport.audits.map(audit => {
              const isFail = audit.status === 'fail';
              const isWarn = audit.status === 'warn';

              let badgeColor = 'bg-success-soft text-success';
              if (isWarn) badgeColor = 'bg-warning-soft text-warning';
              if (isFail) badgeColor = 'bg-danger-soft text-danger';

              return (
                <div
                  className={
                    'flex flex-col justify-between p-2 rounded-lg bg-black/20' + ' border border-border-secondary/30'
                  }
                  key={audit.provider}
                  title={`${audit.provider}: ${audit.summary}`}>
                  <span className="text-[10px] font-bold text-semi-muted truncate">{audit.provider}</span>
                  <div className="flex items-center justify-between gap-1.5 mt-1">
                    <Chip className={`${badgeColor} text-[9px] h-4.5 px-1 shrink-0`}>{audit.status.toUpperCase()}</Chip>
                    {audit.riskLevel && (
                      <span className="text-[8px] text-semi-muted font-JetBrainsMono truncate">{audit.riskLevel}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Typography className="text-[10px] text-semi-muted mt-1 leading-normal">
            Verdicts provided by Gen Agent Trust Hub, Socket, Snyk, Runlayer, ZeroLeaks.
          </Typography>
        </div>
      ) : (
        <Typography className="text-[11px] text-semi-muted italic mt-1">
          No security audit report found for this skill yet. Review before running.
        </Typography>
      )}
    </div>
  );
}
