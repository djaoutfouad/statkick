import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculatePossessionImpact } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const PossessionImpactAnalyzerPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'possession-impact-analyzer')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [possessionPercent, setPossessionPercent] = useState<number>(62);
  const [matches, setMatches] = useState<number>(20);
  const [wins, setWins] = useState<number>(14);
  const [draws, setDraws] = useState<number>(4);
  const [losses, setLosses] = useState<number>(2);
  const [goalsScored, setGoalsScored] = useState<number>(44);
  const [goalsConceded, setGoalsConceded] = useState<number>(18);

  const result = calculatePossessionImpact({
    possessionPercent: Number(possessionPercent) || 50,
    matches: Number(matches) || 1,
    wins: Number(wins) || 0,
    draws: Number(draws) || 0,
    losses: Number(losses) || 0,
    goalsScored: Number(goalsScored) || 0,
    goalsConceded: Number(goalsConceded) || 0,
  });

  const handleReset = () => {
    setPossessionPercent(54);
    setMatches(15);
    setWins(8);
    setDraws(4);
    setLosses(3);
    setGoalsScored(26);
    setGoalsConceded(16);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['team-comparison', 'pass-accuracy-calculator', 'pressing-intensity-calculator']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField
              id="poss-pct"
              label={labels.avgPossessionPct || 'Average Possession %'}
              value={possessionPercent}
              onChange={setPossessionPercent}
              min={10}
              max={90}
              step={1}
              suffix="%"
              required
            />
            <InputField
              id="poss-matches"
              label={labels.matchesAnalyzed || 'Matches Analyzed'}
              value={matches}
              onChange={setMatches}
              min={1}
              max={60}
              step={1}
              required
            />
            <InputField
              id="poss-wins"
              label={labels.wins || 'Wins'}
              value={wins}
              onChange={setWins}
              min={0}
              max={matches}
              step={1}
              required
            />
            <InputField
              id="poss-draws"
              label={labels.draws || 'Draws'}
              value={draws}
              onChange={setDraws}
              min={0}
              max={matches}
              step={1}
            />
            <InputField
              id="poss-losses"
              label={labels.losses || 'Losses'}
              value={losses}
              onChange={setLosses}
              min={0}
              max={matches}
              step={1}
            />
            <InputField
              id="poss-gf"
              label={labels.goalsScored || 'Goals Scored'}
              value={goalsScored}
              onChange={setGoalsScored}
              min={0}
              max={200}
              step={1}
            />
            <InputField
              id="poss-ga"
              label={labels.goalsConceded || 'Goals Conceded'}
              value={goalsConceded}
              onChange={setGoalsConceded}
              min={0}
              max={200}
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
              title={labels.efficiencyIndex || 'Possession Efficiency Index'}
              value={`${result.efficiencyIndex}x`}
              subtitle={result.verdict}
              badge={{ text: result.efficiencyIndex >= 1.0 ? 'High Return' : 'Low Return' }}
              variant="primary"
            >
              <ProgressBar value={result.efficiencyIndex * 50} max={100} color="bg-green-600" />
            </ResultCard>

            <ResultCard
              title={labels.winRate || 'Win Rate'}
              value={formatPercent(result.winRate)}
              subtitle={`${wins} / ${matches}`}
              variant="neutral"
            >
              <ProgressBar value={result.winRate} color="bg-blue-600" />
            </ResultCard>

            <ResultCard
              title={labels.scoringRate || 'Scoring Rate (GPG)'}
              value={`${result.goalsPerGame.toFixed(2)}`}
              subtitle={`${goalsScored} goals (${result.concededPerGame.toFixed(2)} conceded/gm)`}
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

