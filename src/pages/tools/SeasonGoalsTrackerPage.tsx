import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateSeasonGoals } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const SeasonGoalsTrackerPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'season-goals-tracker')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [goals, setGoals] = useState<number>(18);
  const [gamesPlayed, setGamesPlayed] = useState<number>(22);
  const [totalSeasonGames, setTotalSeasonGames] = useState<number>(38);
  const [minutesPlayed, setMinutesPlayed] = useState<number>(1890);
  const [penaltiesScored, setPenaltiesScored] = useState<number>(3);

  const result = calculateSeasonGoals({
    goals: isNaN(Number(goals)) ? 0 : Number(goals),
    gamesPlayed: isNaN(Number(gamesPlayed)) || Number(gamesPlayed) <= 0 ? 1 : Number(gamesPlayed),
    totalSeasonGames: isNaN(Number(totalSeasonGames)) || Number(totalSeasonGames) <= 0 ? 38 : Number(totalSeasonGames),
    minutesPlayed: isNaN(Number(minutesPlayed)) || Number(minutesPlayed) <= 0 ? 90 : Number(minutesPlayed),
    penaltiesScored: isNaN(Number(penaltiesScored)) ? 0 : Number(penaltiesScored),
  });

  const handleReset = () => {
    setGoals(12);
    setGamesPlayed(18);
    setTotalSeasonGames(38);
    setMinutesPlayed(1550);
    setPenaltiesScored(2);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['shot-conversion-rate', 'player-performance-rater', 'player-form-index']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <InputField
              id="goals-total"
              label={labels.goalsScored || 'Goals Scored'}
              value={goals}
              onChange={setGoals}
              min={0}
              max={80}
              step={1}
              required
            />
            <InputField
              id="goals-games-played"
              label={labels.matchesPlayed || 'Matches Played'}
              value={gamesPlayed}
              onChange={setGamesPlayed}
              min={1}
              max={60}
              step={1}
              required
            />
            <InputField
              id="goals-total-games"
              label={labels.totalMatches || 'Total Season Matches'}
              value={totalSeasonGames}
              onChange={setTotalSeasonGames}
              min={10}
              max={60}
              step={1}
              required
            />
            <InputField
              id="goals-minutes"
              label={labels.minutesPlayed || 'Total Minutes Played'}
              value={minutesPlayed}
              onChange={setMinutesPlayed}
              min={1}
              max={5000}
              step={10}
              required
            />
            <InputField
              id="goals-penalties"
              label={labels.penaltiesScored || 'Penalties Scored'}
              value={penaltiesScored}
              onChange={setPenaltiesScored}
              min={0}
              max={goals}
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
              title={labels.projectedSeasonTotal || 'Projected Season Total'}
              value={`${result.projectedTotal} Goals`}
              subtitle={`Pace Tier: ${result.paceTier}`}
              badge={{
                text: result.paceTier,
                color:
                  result.projectedTotal >= 28
                    ? 'bg-amber-400 text-gray-950 font-bold'
                    : result.projectedTotal >= 20
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white',
              }}
              variant="primary"
            />

            <ResultCard
              title={labels.scoringRate || 'Scoring Rate (GPG)'}
              value={`${result.goalsPerGame.toFixed(2)} / match`}
              subtitle={`${goals} goals in ${gamesPlayed} matches`}
              variant="secondary"
            />

            <ResultCard
              title={labels.minutesPerGoal || 'Minutes Per Goal (MPG)'}
              value={`${result.minutesPerGoal.toFixed(1)} mins`}
              subtitle="Average time per goal"
              variant="neutral"
            />

            <ResultCard
              title={labels.nonPenaltyScoringRate || 'Non-Penalty Scoring Rate'}
              value={`${result.nonPenaltyGPG.toFixed(2)} npGPG`}
              subtitle={`${result.nonPenaltyGoals} open-play goals`}
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

