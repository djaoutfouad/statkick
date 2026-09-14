import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateTransferValue } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatCurrencyM } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const TransferValueEstimatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'transfer-value-estimator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [position, setPosition] = useState<'GK' | 'DEF' | 'MID' | 'WIN' | 'FWD'>('FWD');
  const [age, setAge] = useState<number>(24);
  const [goalsSeason, setGoalsSeason] = useState<number>(18);
  const [assistsSeason, setAssistsSeason] = useState<number>(8);
  const [leagueLevel, setLeagueLevel] = useState<'Tier1' | 'Tier2' | 'Tier3'>('Tier1');
  const [contractYears, setContractYears] = useState<number>(3);
  const [internationalCaps, setInternationalCaps] = useState<number>(24);

  const result = calculateTransferValue({
    position,
    age: Number(age) || 24,
    goalsSeason: Number(goalsSeason) || 0,
    assistsSeason: Number(assistsSeason) || 0,
    leagueLevel,
    contractYears: Number(contractYears) || 3,
    internationalCaps: Number(internationalCaps) || 0,
  });

  const handleReset = () => {
    setPosition('MID');
    setAge(26);
    setGoalsSeason(6);
    setAssistsSeason(9);
    setLeagueLevel('Tier1');
    setContractYears(2);
    setInternationalCaps(15);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['wage-calculator', 'squad-value-calculator', 'contract-worth-analyzer']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SelectField
              id="transfer-pos"
              label={labels.position || 'Position'}
              value={position}
              onChange={(val) => setPosition(val as any)}
              options={[
                { value: 'FWD', label: 'Striker / Forward (€18M Base)' },
                { value: 'WIN', label: 'Winger (€15M Base)' },
                { value: 'MID', label: 'Central Midfielder (€12M Base)' },
                { value: 'DEF', label: 'Defender / Fullback (€10M Base)' },
                { value: 'GK', label: 'Goalkeeper (€8M Base)' },
              ]}
            />

            <InputField
              id="transfer-age"
              label={labels.playerAge || 'Player Age'}
              value={age}
              onChange={setAge}
              min={16}
              max={42}
              step={1}
              required
            />

            <SelectField
              id="transfer-league"
              label={labels.leagueLevel || 'Domestic League Level'}
              value={leagueLevel}
              onChange={(val) => setLeagueLevel(val as any)}
              options={[
                { value: 'Tier1', label: 'Tier 1 (EPL / La Liga / Serie A / Bundesliga) 1.5x' },
                { value: 'Tier2', label: 'Tier 2 (Eredivisie / Primeira Liga / Championship) 1.1x' },
                { value: 'Tier3', label: 'Tier 3 (Other Global Competitions) 0.8x' },
              ]}
            />

            <InputField
              id="transfer-goals"
              label={labels.goalsScored || 'Goals Scored This Season'}
              value={goalsSeason}
              onChange={setGoalsSeason}
              min={0}
              max={60}
              step={1}
            />

            <InputField
              id="transfer-assists"
              label={labels.assists || 'Assists This Season'}
              value={assistsSeason}
              onChange={setAssistsSeason}
              min={0}
              max={40}
              step={1}
            />

            <InputField
              id="transfer-contract"
              label={labels.contractYearsRemaining || 'Contract Years Remaining'}
              value={contractYears}
              onChange={setContractYears}
              min={1}
              max={6}
              step={1}
            />

            <InputField
              id="transfer-caps"
              label={labels.seniorCaps || 'Senior International Caps'}
              value={internationalCaps}
              onChange={setInternationalCaps}
              min={0}
              max={180}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              title={labels.estimatedMarketValue || 'Estimated Market Value'}
              value={formatCurrencyM(result.estimatedValue)}
              subtitle={`Range: ${formatCurrencyM(result.rangeLow)} – ${formatCurrencyM(result.rangeHigh)}`}
              badge={{ text: `±20% Range` }}
              variant="primary"
            />

            <ResultCard
              title={labels.positionalBaseline || 'Positional Baseline'}
              value={formatCurrencyM(result.breakdown.basePositional)}
              subtitle={`Base value for ${position}`}
              variant="neutral"
            />

            <ResultCard
              title={labels.compoundMultipliers || 'Compound Multipliers'}
              value={`${(result.breakdown.ageMultiplier * result.breakdown.leagueMultiplier * result.breakdown.contractMultiplier).toFixed(2)}x`}
              subtitle={`Age (${result.breakdown.ageMultiplier}x), League (${result.breakdown.leagueMultiplier}x), Contract (${result.breakdown.contractMultiplier}x)`}
              variant="neutral"
            />
          </div>

          {/* Factor Breakdown Panel */}
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 text-xs space-y-2">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              {labels.valuationMultiplierBreakdown || 'Valuation Multiplier Breakdown'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-gray-600">
              <div>Age Curve: <strong className="text-gray-900">{result.breakdown.ageMultiplier}x</strong></div>
              <div>Performance Factor: <strong className="text-gray-900">{result.breakdown.performanceMultiplier}x</strong></div>
              <div>League Premium: <strong className="text-gray-900">{result.breakdown.leagueMultiplier}x</strong></div>
              <div>Contract Leverage: <strong className="text-gray-900">{result.breakdown.contractMultiplier}x</strong></div>
            </div>
          </div>
        </div>
      }
    />
  );
};

