import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { compareTeams, TeamStats } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw, CheckCircle, Minus } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const TeamComparisonPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'team-comparison')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [teamA, setTeamA] = useState<TeamStats>({
    name: 'Arsenal FC',
    goalsPerGame: 2.3,
    possession: 61,
    shotsPerGame: 16.2,
    shotsOnTargetPerGame: 6.4,
    passAccuracy: 88,
    tacklesPerGame: 17.5,
    cornersPerGame: 7.2,
  });

  const [teamB, setTeamB] = useState<TeamStats>({
    name: 'Manchester City',
    goalsPerGame: 2.5,
    possession: 64,
    shotsPerGame: 17.8,
    shotsOnTargetPerGame: 7.1,
    passAccuracy: 90,
    tacklesPerGame: 14.2,
    cornersPerGame: 6.8,
  });

  const comparison = compareTeams(teamA, teamB);

  const handleReset = () => {
    setTeamA({
      name: 'Team A',
      goalsPerGame: 1.8,
      possession: 50,
      shotsPerGame: 13.0,
      shotsOnTargetPerGame: 4.5,
      passAccuracy: 82,
      tacklesPerGame: 15.0,
      cornersPerGame: 5.0,
    });
    setTeamB({
      name: 'Team B',
      goalsPerGame: 1.8,
      possession: 50,
      shotsPerGame: 13.0,
      shotsOnTargetPerGame: 4.5,
      passAccuracy: 82,
      tacklesPerGame: 15.0,
      cornersPerGame: 5.0,
    });
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['possession-impact-analyzer', 'shot-conversion-rate', 'head-to-head-stats']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team A Console */}
            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/20 space-y-4">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  {labels.teamAProfile || 'Team A Profile'}
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {comparison.teamAWins} {labels.wins || 'Wins'}
                </span>
              </div>

              <InputField
                id="team-a-name"
                label={labels.teamAName || 'Team A Name'}
                type="text"
                value={teamA.name}
                onChange={(val) => setTeamA({ ...teamA, name: val })}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  id="team-a-gpg"
                  label={labels.goalsPerGame || 'Goals / Game'}
                  value={teamA.goalsPerGame}
                  onChange={(val) => setTeamA({ ...teamA, goalsPerGame: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="team-a-poss"
                  label={labels.possessionPct || 'Possession %'}
                  value={teamA.possession}
                  onChange={(val) => setTeamA({ ...teamA, possession: Number(val) || 0 })}
                  suffix="%"
                  step={1}
                />
                <InputField
                  id="team-a-shots"
                  label={labels.shotsPerGame || 'Shots / Game'}
                  value={teamA.shotsPerGame}
                  onChange={(val) => setTeamA({ ...teamA, shotsPerGame: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="team-a-sot"
                  label={labels.shotsOnTarget || 'Shots on Target'}
                  value={teamA.shotsOnTargetPerGame}
                  onChange={(val) => setTeamA({ ...teamA, shotsOnTargetPerGame: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="team-a-pass"
                  label={labels.passAccuracy || 'Pass %'}
                  value={teamA.passAccuracy}
                  onChange={(val) => setTeamA({ ...teamA, passAccuracy: Number(val) || 0 })}
                  suffix="%"
                  step={1}
                />
                <InputField
                  id="team-a-tackles"
                  label={labels.tacklesPerGame || 'Tackles / Game'}
                  value={teamA.tacklesPerGame}
                  onChange={(val) => setTeamA({ ...teamA, tacklesPerGame: Number(val) || 0 })}
                  step={0.1}
                />
              </div>
              <InputField
                id="team-a-corners"
                label={labels.cornersPerGame || 'Corners / Game'}
                value={teamA.cornersPerGame}
                onChange={(val) => setTeamA({ ...teamA, cornersPerGame: Number(val) || 0 })}
                step={0.1}
              />
            </div>

            {/* Team B Console */}
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {labels.teamBProfile || 'Team B Profile'}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {comparison.teamBWins} {labels.wins || 'Wins'}
                </span>
              </div>

              <InputField
                id="team-b-name"
                label={labels.teamBName || 'Team B Name'}
                type="text"
                value={teamB.name}
                onChange={(val) => setTeamB({ ...teamB, name: val })}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  id="team-b-gpg"
                  label={labels.goalsPerGame || 'Goals / Game'}
                  value={teamB.goalsPerGame}
                  onChange={(val) => setTeamB({ ...teamB, goalsPerGame: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="team-b-poss"
                  label={labels.possessionPct || 'Possession %'}
                  value={teamB.possession}
                  onChange={(val) => setTeamB({ ...teamB, possession: Number(val) || 0 })}
                  suffix="%"
                  step={1}
                />
                <InputField
                  id="team-b-shots"
                  label={labels.shotsPerGame || 'Shots / Game'}
                  value={teamB.shotsPerGame}
                  onChange={(val) => setTeamB({ ...teamB, shotsPerGame: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="team-b-sot"
                  label={labels.shotsOnTarget || 'Shots on Target'}
                  value={teamB.shotsOnTargetPerGame}
                  onChange={(val) => setTeamB({ ...teamB, shotsOnTargetPerGame: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="team-b-pass"
                  label={labels.passAccuracy || 'Pass %'}
                  value={teamB.passAccuracy}
                  onChange={(val) => setTeamB({ ...teamB, passAccuracy: Number(val) || 0 })}
                  suffix="%"
                  step={1}
                />
                <InputField
                  id="team-b-tackles"
                  label={labels.tacklesPerGame || 'Tackles / Game'}
                  value={teamB.tacklesPerGame}
                  onChange={(val) => setTeamB({ ...teamB, tacklesPerGame: Number(val) || 0 })}
                  step={0.1}
                />
              </div>
              <InputField
                id="team-b-corners"
                label={labels.cornersPerGame || 'Corners / Game'}
                value={teamB.cornersPerGame}
                onChange={(val) => setTeamB({ ...teamB, cornersPerGame: Number(val) || 0 })}
                step={0.1}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetMatchup || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              title={labels.overallMatchupWinner || 'Overall Matchup Winner'}
              value={comparison.overallWinner}
              subtitle={`${comparison.teamAWins} vs ${comparison.teamBWins} (${comparison.ties} Draws)`}
              badge={{ text: `${Math.max(comparison.teamADominance, comparison.teamBDominance)}% Dominance` }}
              variant="primary"
            />

            <ResultCard
              title={`${teamA.name || 'Team A'} Dominance`}
              value={`${comparison.teamADominance}%`}
              subtitle={`Won ${comparison.teamAWins} of 7 metric battles`}
              variant="secondary"
            >
              <ProgressBar value={comparison.teamADominance} color="bg-blue-600" />
            </ResultCard>

            <ResultCard
              title={`${teamB.name || 'Team B'} Dominance`}
              value={`${comparison.teamBDominance}%`}
              subtitle={`Won ${comparison.teamBWins} of 7 metric battles`}
              variant="neutral"
            >
              <ProgressBar value={comparison.teamBDominance} color="bg-emerald-600" />
            </ResultCard>
          </div>

          {/* 7-Category Breakdown Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-900 uppercase tracking-wider flex items-center justify-between">
              <span>{labels.statisticalCategory || 'Statistical Category'}</span>
              <span>{teamA.name || 'Team A'} vs {teamB.name || 'Team B'}</span>
              <span>{labels.winner || 'Winner'}</span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {comparison.categories.map((cat, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                  <div className="font-semibold text-gray-900 w-1/3">
                    {cat.name}
                  </div>
                  <div className="w-1/3 text-center font-mono">
                    <span className={cat.winner === 'Team A' ? 'font-bold text-blue-600' : 'text-gray-600'}>
                      {cat.teamAValue}{cat.unit}
                    </span>
                    <span className="mx-2 text-gray-400">vs</span>
                    <span className={cat.winner === 'Team B' ? 'font-bold text-emerald-600' : 'text-gray-600'}>
                      {cat.teamBValue}{cat.unit}
                    </span>
                  </div>
                  <div className="w-1/3 text-right">
                    {cat.winner === 'Team A' && (
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
                        <CheckCircle className="w-3.5 h-3.5" /> {teamA.name || 'Team A'}
                      </span>
                    )}
                    {cat.winner === 'Team B' && (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <CheckCircle className="w-3.5 h-3.5" /> {teamB.name || 'Team B'}
                      </span>
                    )}
                    {cat.winner === 'Tie' && (
                      <span className="inline-flex items-center gap-1 text-gray-400 font-semibold">
                        <Minus className="w-3.5 h-3.5" /> Tie
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

