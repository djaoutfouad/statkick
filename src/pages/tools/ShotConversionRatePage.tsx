import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateShotConversion } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const ShotConversionRatePage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'shot-conversion-rate')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [totalShots, setTotalShots] = useState<number>(38);
  const [goals, setGoals] = useState<number>(8);
  const [shotsOnTarget, setShotsOnTarget] = useState<number>(19);
  const [bigChances, setBigChances] = useState<number>(10);
  const [bigChancesMissed, setBigChancesMissed] = useState<number>(3);

  // Validation: ensure goals <= shots and shots on target <= shots
  const validGoals = Math.min(Number(goals) || 0, Number(totalShots) || 1);
  const validSoT = Math.min(Number(shotsOnTarget) || 0, Number(totalShots) || 1);
  const validBCMissed = Math.min(Number(bigChancesMissed) || 0, Number(bigChances) || 1);

  const result = calculateShotConversion({
    totalShots: Number(totalShots) || 0,
    goals: validGoals,
    shotsOnTarget: validSoT,
    bigChances: Number(bigChances) || 0,
    bigChancesMissed: validBCMissed,
  });

  const handleReset = () => {
    setTotalShots(30);
    setGoals(4);
    setShotsOnTarget(12);
    setBigChances(6);
    setBigChancesMissed(3);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['season-goals-tracker', 'player-performance-rater', 'possession-impact-analyzer']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField
              id="total-shots"
              label={labels.totalShots || 'Total Shots Attempted'}
              value={totalShots}
              onChange={setTotalShots}
              min={1}
              max={300}
              step={1}
              required
            />
            <InputField
              id="goals-scored"
              label={labels.goalsScored || 'Goals Scored'}
              value={goals}
              onChange={setGoals}
              min={0}
              max={totalShots}
              step={1}
              required
            />
            <InputField
              id="shots-on-target"
              label={labels.shotsOnTarget || 'Shots on Target (SoT)'}
              value={shotsOnTarget}
              onChange={setShotsOnTarget}
              min={0}
              max={totalShots}
              step={1}
            />
            <InputField
              id="big-chances"
              label={labels.bigChances || 'Big Chances Received'}
              value={bigChances}
              onChange={setBigChances}
              min={0}
              max={100}
              step={1}
            />
            <InputField
              id="big-chances-missed"
              label={labels.bigChancesMissed || 'Big Chances Missed'}
              value={bigChancesMissed}
              onChange={setBigChancesMissed}
              min={0}
              max={bigChances}
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
              title={labels.conversionRate || 'Overall Shot Conversion Rate'}
              value={formatPercent(result.conversionRate)}
              subtitle={result.efficiencyRating}
              badge={{ text: result.efficiencyRating.split('/')[0] }}
              variant="primary"
            >
              <ProgressBar value={result.conversionRate} max={30} color="bg-green-600" />
            </ResultCard>

            <ResultCard
              title={labels.onTargetConversion || 'On-Target Conversion Rate'}
              value={formatPercent(result.onTargetConversion)}
              subtitle={`${validGoals} / ${validSoT}`}
              variant="neutral"
            >
              <ProgressBar value={result.onTargetConversion} color="bg-blue-600" />
            </ResultCard>

            <ResultCard
              title={labels.bigChanceConversion || 'Big Chance Conversion'}
              value={formatPercent(result.bigChanceConversion)}
              subtitle={`${Math.max(0, bigChances - validBCMissed)} / ${bigChances}`}
              variant="neutral"
            >
              <ProgressBar value={result.bigChanceConversion} color="bg-purple-600" />
            </ResultCard>
          </div>
        </div>
      }
    />
  );
};

