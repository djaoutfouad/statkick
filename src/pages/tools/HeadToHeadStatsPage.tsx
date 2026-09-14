import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateHeadToHead } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const HeadToHeadStatsPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'head-to-head-stats')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [teamAName, setTeamAName] = useState<string>('Real Madrid');
  const [teamBName, setTeamBName] = useState<string>('FC Barcelona');
  const [totalMatches, setTotalMatches] = useState<number>(254);
  const [teamAWins, setTeamAWins] = useState<number>(105);
  const [draws, setDraws] = useState<number>(52);
  const [teamBWins, setTeamBWins] = useState<number>(97);
  const [teamAGoals, setTeamAGoals] = useState<number>(433);
  const [teamBGoals, setTeamBGoals] = useState<number>(419);

  const result = calculateHeadToHead({
    teamAName,
    teamBName,
    totalMatches: Number(totalMatches) || 1,
    teamAWins: Number(teamAWins) || 0,
    draws: Number(draws) || 0,
    teamBWins: Number(teamBWins) || 0,
    teamAGoals: Number(teamAGoals) || 0,
    teamBGoals: Number(teamBGoals) || 0,
  });

  const handleReset = () => {
    setTeamAName('Arsenal');
    setTeamBName('Tottenham');
    setTotalMatches(195);
    setTeamAWins(82);
    setDraws(52);
    setTeamBWins(61);
    setTeamAGoals(308);
    setTeamBGoals(263);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['team-comparison', 'league-table-simulator', 'possession-impact-analyzer']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="h2h-team-a"
              label={labels.teamAName || 'Team A Name'}
              type="text"
              value={teamAName}
              onChange={setTeamAName}
            />
            <InputField
              id="h2h-team-b"
              label={labels.teamBName || 'Team B Name'}
              type="text"
              value={teamBName}
              onChange={setTeamBName}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <InputField
              id="h2h-total"
              label={labels.totalMatches || 'Total Matches'}
              value={totalMatches}
              onChange={setTotalMatches}
              min={1}
              max={1000}
              step={1}
              required
            />
            <InputField
              id="h2h-wins-a"
              label={`${teamAName || 'Team A'} ${labels.wins || 'Wins'}`}
              value={teamAWins}
              onChange={setTeamAWins}
              min={0}
              max={totalMatches}
              step={1}
              required
            />
            <InputField
              id="h2h-draws"
              label={labels.draws || 'Draws'}
              value={draws}
              onChange={setDraws}
              min={0}
              max={totalMatches}
              step={1}
              required
            />
            <InputField
              id="h2h-wins-b"
              label={`${teamBName || 'Team B'} ${labels.wins || 'Wins'}`}
              value={teamBWins}
              onChange={setTeamBWins}
              min={0}
              max={totalMatches}
              step={1}
              required
            />
            <InputField
              id="h2h-goals-a"
              label={`${teamAName || 'Team A'} ${labels.goals || 'Goals'}`}
              value={teamAGoals}
              onChange={setTeamAGoals}
              min={0}
              max={2000}
              step={1}
            />
            <InputField
              id="h2h-goals-b"
              label={`${teamBName || 'Team B'} ${labels.goals || 'Goals'}`}
              value={teamBGoals}
              onChange={setTeamBGoals}
              min={0}
              max={2000}
              step={1}
            />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard
              title={labels.historicalAdvantage || 'Historical Advantage'}
              value={result.verdict}
              subtitle={`${teamAName}: ${teamAWins}W | ${draws}D | ${teamBName}: ${teamBWins}W`}
              variant="primary"
            />

            <ResultCard
              title={`${teamAName} ${labels.winRate || 'Win Rate'}`}
              value={formatPercent(result.teamAWinRate)}
              subtitle={`${teamAWins} / ${totalMatches}`}
              variant="neutral"
            >
              <ProgressBar value={result.teamAWinRate} color="bg-blue-600" />
            </ResultCard>

            <ResultCard
              title={`${teamBName} ${labels.winRate || 'Win Rate'}`}
              value={formatPercent(result.teamBWinRate)}
              subtitle={`${teamBWins} / ${totalMatches}`}
              variant="neutral"
            >
              <ProgressBar value={result.teamBWinRate} color="bg-emerald-600" />
            </ResultCard>

            <ResultCard
              title={labels.avgGoalsPerMatch || 'Average Goals / Match'}
              value={`${result.avgGoalsPerMatch.toFixed(2)} GPG`}
              subtitle={`${result.totalGoals} goals`}
              variant="secondary"
            />
          </div>
        </div>
      }
    />
  );
};

