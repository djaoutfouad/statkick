import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateContractWorth } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatCurrencyM, formatCurrencyK } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const ContractWorthAnalyzerPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'contract-worth-analyzer')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [transferFee, setTransferFee] = useState<number>(65);
  const [annualSalary, setAnnualSalary] = useState<number>(10);
  const [contractYears, setContractYears] = useState<number>(5);
  const [agentFee, setAgentFee] = useState<number>(5);
  const [signingBonus, setSigningBonus] = useState<number>(4);
  const [expectedMatchesPerSeason, setExpectedMatchesPerSeason] = useState<number>(42);

  const result = calculateContractWorth({
    transferFee: Number(transferFee) || 0,
    annualSalary: Number(annualSalary) || 0,
    contractYears: Number(contractYears) || 1,
    agentFee: Number(agentFee) || 0,
    signingBonus: Number(signingBonus) || 0,
    expectedMatchesPerSeason: Number(expectedMatchesPerSeason) || 1,
  });

  const handleReset = () => {
    setTransferFee(40);
    setAnnualSalary(6.5);
    setContractYears(4);
    setAgentFee(3);
    setSigningBonus(2);
    setExpectedMatchesPerSeason(38);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['transfer-value-estimator', 'wage-calculator', 'squad-value-calculator']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField
              id="contract-fee"
              label={labels.transferFee || 'Transfer Fee (€M)'}
              value={transferFee}
              onChange={setTransferFee}
              min={0}
              max={300}
              step={1}
              prefix="€"
              suffix="M"
              required
            />
            <InputField
              id="contract-salary"
              label={labels.annualSalary || 'Gross Annual Salary (€M)'}
              value={annualSalary}
              onChange={setAnnualSalary}
              min={0.1}
              max={100}
              step={0.5}
              prefix="€"
              suffix="M"
              required
            />
            <InputField
              id="contract-years"
              label={labels.contractYears || 'Contract Length (Years)'}
              value={contractYears}
              onChange={setContractYears}
              min={1}
              max={8}
              step={1}
              helperText="UEFA amort. max 5 yrs"
              required
            />
            <InputField
              id="contract-agent"
              label={labels.agentFee || 'Agent / Intermediary Fee (€M)'}
              value={agentFee}
              onChange={setAgentFee}
              min={0}
              max={50}
              step={0.5}
              prefix="€"
              suffix="M"
            />
            <InputField
              id="contract-signing-bonus"
              label={labels.signingBonus || 'Signing Bonus (€M)'}
              value={signingBonus}
              onChange={setSigningBonus}
              min={0}
              max={50}
              step={0.5}
              prefix="€"
              suffix="M"
            />
            <InputField
              id="contract-matches"
              label={labels.matchesPerSeason || 'Expected Matches / Season'}
              value={expectedMatchesPerSeason}
              onChange={setExpectedMatchesPerSeason}
              min={1}
              max={65}
              step={1}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetSample || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard
              title={labels.totalCommitment || 'Total Financial Commitment'}
              value={formatCurrencyM(result.totalCommitment)}
              subtitle={`${contractYears} ${labels.years || 'Years'}`}
              variant="primary"
            />

            <ResultCard
              title={labels.annualCost || 'Annual Cost to Club'}
              value={formatCurrencyM(result.annualCost)}
              subtitle="Wages + Amortization"
              variant="secondary"
            />

            <ResultCard
              title={labels.annualAmortization || 'Annual Amortization Charge'}
              value={formatCurrencyM(result.amortizationPerYear)}
              subtitle="FFP / PSR charge"
              variant="neutral"
            />

            <ResultCard
              title={labels.costPerMatch || 'Cost Per Match Played'}
              value={formatCurrencyK(result.costPerMatch, '€')}
              subtitle={`${expectedMatchesPerSeason} ${labels.matches || 'matches/yr'}`}
              variant="neutral"
            />
          </div>

          {/* Amortization Schedule Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700">
              {labels.schedule || 'Contract Amortization Schedule'} ({contractYears} Years)
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {Array.from({ length: contractYears }).map((_, idx) => {
                const year = idx + 1;
                const remainingBookValue = Math.max(0, transferFee - result.amortizationPerYear * year);
                return (
                  <div key={year} className="p-3 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Year {year}</span>
                    <span className="text-gray-500">Expense: {formatCurrencyM(result.annualCost)}</span>
                    <span className="font-mono text-gray-700">
                      Book Value: {formatCurrencyM(remainingBookValue)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    />
  );
};

