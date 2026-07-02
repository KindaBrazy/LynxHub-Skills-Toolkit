import {Chip, Label, Spinner, Typography} from '@heroui/react';
import {ShieldCheck} from '@solar-icons/react-perf/BoldDuotone';

import {AuditReport} from '../../types';

interface SecurityAuditsProps {
  isLoadingAudit: boolean;
  auditReport?: AuditReport | null;
  auditReports?: AuditReport[];
}

export function SecurityAudits({isLoadingAudit, auditReport, auditReports = []}: SecurityAuditsProps) {
  return (
    <div className="flex flex-col gap-1.5 mt-2 bg-surface-secondary border border-border p-3 rounded-2xl">
      <Label className="text-xs font-semibold text-semi-muted flex items-center gap-1">
        <ShieldCheck className="size-4 text-LynxPurple" />
        Security & Safety Audits
      </Label>

      {isLoadingAudit ? (
        <div className="flex items-center gap-2 py-1">
          <Spinner size="sm" />
          <span className="text-xs text-semi-muted">Querying security reports...</span>
        </div>
      ) : auditReports.length > 0 || (auditReport && auditReport.audits && auditReport.audits.length > 0) ? (
        <div className="flex flex-col gap-3 mt-1">
          {/* Grouped reports view */}
          {(() => {
            const reports = auditReports.length > 0 ? auditReports : auditReport ? [auditReport] : [];

            return reports.map(report => {
              const skillName =
                (report.slug || '').split('/').pop() || report.source || report.id?.split('/').pop() || '';
              const hasAudits = report.audits && report.audits.length > 0;

              return (
                <div key={report.id || report.slug} className="flex flex-col gap-1.5">
                  {reports.length > 1 && (
                    <Typography className="text-xs font-bold text-LynxBlue font-JetBrainsMono mt-1">
                      {skillName}
                    </Typography>
                  )}
                  {hasAudits ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {report.audits.map(audit => {
                        const isFail = audit.status === 'fail';
                        const isWarn = audit.status === 'warn';

                        let badgeColor = 'bg-success-soft text-success';
                        if (isWarn) badgeColor = 'bg-warning-soft text-warning';
                        if (isFail) badgeColor = 'bg-danger-soft text-danger';

                        return (
                          <div
                            className={
                              'flex items-center justify-between px-3 py-1.5 rounded-xl bg-surface border border-border'
                            }
                            key={audit.provider}
                            title={`${audit.provider}: ${audit.summary}`}>
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-[10px] font-bold text-semi-muted truncate">{audit.provider}</span>
                              <Chip size="sm" className={`${badgeColor} text-[8px] h-4 shrink-0`}>
                                {audit.status.toUpperCase()}
                              </Chip>
                            </div>
                            {audit.riskLevel && (
                              <span className="text-[8px] text-semi-muted font-JetBrainsMono truncate">
                                {audit.riskLevel}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Typography className="text-[10px] text-semi-muted italic mt-0.5">
                      No security audit records found for this skill.
                    </Typography>
                  )}
                </div>
              );
            });
          })()}

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
