import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculatePlayerForm } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const PlayerFormIndexPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'player-form-index')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [goalsLast5, setGoalsLast5] = useState<number>(4);
  const [assistsLast5, setAssistsLast5] = useState<number>(2);
  const [avgRatingLast5, setAvgRatingLast5] = useState<number>(7.8);
  const [minutesLast5, setMinutesLast5] = useState<number>(435);
  const [yellowCards, setYellowCards] = useState<number>(1);
  const [redCards, setRedCards] = useState<number>(0);

  const result = calculatePlayerForm({
    goalsLast5: Number(goalsLast5) || 0,
    assistsLast5: Number(assistsLast5) || 0,
    avgRatingLast5: isNaN(Number(avgRatingLast5)) ? 6.0 : Number(avgRatingLast5),
    minutesLast5: Number(minutesLast5) || 0,
    yellowCards: Number(yellowCards) || 0,
    redCards: Number(redCards) || 0,
  });

  const handleReset = () => {
    setGoalsLast5(1);
    setAssistsLast5(1);
    setAvgRatingLast5(6.8);
    setMinutesLast5(380);
    setYellowCards(0);
    setRedCards(0);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['player-performance-rater', 'captain-pick-analyzer', 'season-goals-tracker']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField
              id="form-goals"
              label={labels.goalsLast5 || 'Goals in Last 5 Matches'}
              value={goalsLast5}
              onChange={setGoalsLast5}
              min={0}
              max={20}
              step={1}
              required
            />
            <InputField
              id="form-assists"
              label={labels.assistsLast5 || 'Assists in Last 5 Matches'}
              value={assistsLast5}
              onChange={setAssistsLast5}
              min={0}
              max={20}
              step={1}
              required
            />
            <InputField
              id="form-rating"
              label={labels.avgRatingLast5 || 'Avg Match Rating (Last 5)'}
              value={avgRatingLast5}
              onChange={setAvgRatingLast5}
              min={1.0}
              max={10.0}
              step={0.1}
              helperText="1.0 to 10.0 scale"
              required
            />
            <InputField
              id="form-minutes"
              label={labels.minutesLast5 || 'Total Minutes Played (Last 5)'}
              value={minutesLast5}
              onChange={setMinutesLast5}
              min={0}
              max={450}
              step={1}
            />
            <InputField
              id="form-yc"
              label={labels.yellowCards || 'Yellow Cards (Last 5)'}
              value={yellowCards}
              onChange={setYellowCards}
              min={0}
              max={5}
              step={1}
            />
            <InputField
              id="form-rc"
              label={labels.redCards || 'Red Cards (Last 5)'}
              value={redCards}
              onChange={setRedCards}
              min={0}
              max={2}
              step={1}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetSampleData || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              title={labels.playerFormScore || 'Player Form Score'}
              value={`${result.formScore}/10.0`}
              subtitle={`Momentum: ${result.label}`}
              badge={{
                text: result.label,
                color:
                  result.formScore >= 8.5
                    ? 'bg-red-500 text-white'
                    : result.formScore >= 7.0
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-500 text-white',
              }}
              variant="primary"
            >
              <ProgressBar value={result.formScore * 10} max={100} color="bg-green-600" />
            </ResultCard>

            <ResultCard
              title={labels.baseProductionPoints || 'Base Production Points'}
              value={`+${result.basePoints}`}
              subtitle="Attacking output"
              variant="neutral"
            />

            <ResultCard
              title={labels.disciplinaryDeductions || 'Disciplinary Deductions'}
              value={`-${result.deductions}`}
              subtitle={`${yellowCards} YC, ${redCards} RC`}
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

