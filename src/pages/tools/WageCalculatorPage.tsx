import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateWageStructure } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatCurrencyK } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const WageCalculatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'wage-calculator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [currency, setCurrency] = useState<'£' | '€' | '$'>('£');
  const [baseWeeklyWage, setBaseWeeklyWage] = useState<number>(120000);
  const [goalBonus, setGoalBonus] = useState<number>(15000);
  const [cleanSheetBonus, setCleanSheetBonus] = useState<number>(0);
  const [appearanceFee, setAppearanceFee] = useState<number>(10000);
  const [matchesPlayed, setMatchesPlayed] = useState<number>(34);
  const [goalsScored, setGoalsScored] = useState<number>(18);
  const [cleanSheetsKept, setCleanSheetsKept] = useState<number>(0);

  const result = calculateWageStructure({
    currency,
    baseWeeklyWage: Number(baseWeeklyWage) || 0,
    goalBonus: Number(goalBonus) || 0,
    cleanSheetBonus: Number(cleanSheetBonus) || 0,
    appearanceFee: Number(appearanceFee) || 0,
    matchesPlayed: Number(matchesPlayed) || 0,
    goalsScored: Number(goalsScored) || 0,
    cleanSheetsKept: Number(cleanSheetsKept) || 0,
  });

  const handleReset = () => {
    setCurrency('£');
    setBaseWeeklyWage(75000);
    setGoalBonus(8000);
    setCleanSheetBonus(5000);
    setAppearanceFee(5000);
    setMatchesPlayed(30);
    setGoalsScored(8);
    setCleanSheetsKept(10);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['contract-worth-analyzer', 'transfer-value-estimator', 'squad-value-calculator']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SelectField
              id="wage-currency"
              label={labels.currency || 'Currency'}
              value={currency}
              onChange={(val) => setCurrency(val as any)}
              options={[
                { value: '£', label: '£ GBP (Pounds)' },
                { value: '€', label: '€ EUR (Euros)' },
                { value: '$', label: '$ USD (Dollars)' },
              ]}
            />
            <InputField
              id="base-weekly"
              label={labels.baseWeeklyWage || 'Base Weekly Wage'}
              value={baseWeeklyWage}
              onChange={setBaseWeeklyWage}
              min={0}
              max={1000000}
              step={5000}
              prefix={currency}
              required
            />
            <InputField
              id="appearance-fee"
              label={labels.appearanceFee || 'Appearance Fee / Match'}
              value={appearanceFee}
              onChange={setAppearanceFee}
              min={0}
              max={100000}
              step={1000}
              prefix={currency}
            />
            <InputField
              id="matches-played"
              label={labels.matchesPlayed || 'Matches Played in Season'}
              value={matchesPlayed}
              onChange={setMatchesPlayed}
              min={0}
              max={65}
              step={1}
            />
            <InputField
              id="goal-bonus"
              label={labels.goalBonus || 'Goal Bonus (Per Goal)'}
              value={goalBonus}
              onChange={setGoalBonus}
              min={0}
              max={100000}
              step={1000}
              prefix={currency}
            />
            <InputField
              id="goals-scored-wage"
              label={labels.goalsScored || 'Goals Scored'}
              value={goalsScored}
              onChange={setGoalsScored}
              min={0}
              max={60}
              step={1}
            />
            <InputField
              id="clean-sheet-bonus"
              label={labels.cleanSheetBonus || 'Clean Sheet Bonus'}
              value={cleanSheetBonus}
              onChange={setCleanSheetBonus}
              min={0}
              max={100000}
              step={1000}
              prefix={currency}
            />
            <InputField
              id="clean-sheets-kept-wage"
              label={labels.cleanSheetsKept || 'Clean Sheets Kept'}
              value={cleanSheetsKept}
              onChange={setCleanSheetsKept}
              min={0}
              max={40}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ResultCard
              title={labels.totalAnnualEarnings || 'Total Annual Earnings'}
              value={formatCurrencyK(result.totalAnnualEarnings, currency)}
              subtitle="Base salary + all match bonuses"
              variant="primary"
            />

            <ResultCard
              title={labels.effectiveWeeklyWage || 'Effective Weekly Wage'}
              value={formatCurrencyK(result.effectiveWeeklyWage, currency)}
              subtitle={`vs ${formatCurrencyK(baseWeeklyWage, currency)} base wage`}
              variant="secondary"
            />

            <ResultCard
              title={labels.baseAnnualSalary || 'Base Annual Salary'}
              value={formatCurrencyK(result.baseAnnual, currency)}
              subtitle="Guaranteed (52 weeks)"
              variant="neutral"
            />

            <ResultCard
              title={labels.totalPerformanceBonuses || 'Total Performance Bonuses'}
              value={formatCurrencyK(result.totalBonuses, currency)}
              subtitle="Goals, appearances & clean sheets"
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

