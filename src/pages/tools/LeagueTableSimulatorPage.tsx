import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { simulateLeagueTable, SimLeagueTeam } from '../../utils/calculations';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const DEFAULT_TEAMS: SimLeagueTeam[] = [
  { id: '1', name: 'Liverpool', played: 28, won: 20, drawn: 5, lost: 3, gf: 66, ga: 24 },
  { id: '2', name: 'Arsenal', played: 28, won: 19, drawn: 6, lost: 3, gf: 62, ga: 22 },
  { id: '3', name: 'Manchester City', played: 28, won: 18, drawn: 6, lost: 4, gf: 65, ga: 31 },
  { id: '4', name: 'Chelsea', played: 28, won: 14, drawn: 7, lost: 7, gf: 54, ga: 38 },
  { id: '5', name: 'Aston Villa', played: 28, won: 13, drawn: 7, lost: 8, gf: 46, ga: 40 },
  { id: '6', name: 'Tottenham', played: 28, won: 12, drawn: 5, lost: 11, gf: 51, ga: 44 },
  { id: '7', name: 'Ipswich Town', played: 28, won: 4, drawn: 8, lost: 16, gf: 28, ga: 58 },
  { id: '8', name: 'Southampton', played: 28, won: 3, drawn: 4, lost: 21, gf: 20, ga: 64 },
];

export const LeagueTableSimulatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'league-table-simulator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [teams, setTeams] = useState<SimLeagueTeam[]>(DEFAULT_TEAMS);

  const standings = simulateLeagueTable(teams);
  const champion = standings[0];
  const uclQualifiers = standings.slice(0, 4);
  const relegationZone = standings.slice(-2);

  const handleSimulateWin = (id: string) => {
    setTeams(
      teams.map((t) =>
        t.id === id
          ? { ...t, played: t.played + 1, won: t.won + 1, gf: t.gf + 2, ga: t.ga }
          : t
      )
    );
  };

  const handleSimulateDraw = (id: string) => {
    setTeams(
      teams.map((t) =>
        t.id === id
          ? { ...t, played: t.played + 1, drawn: t.drawn + 1, gf: t.gf + 1, ga: t.ga + 1 }
          : t
      )
    );
  };

  const handleSimulateLoss = (id: string) => {
    setTeams(
      teams.map((t) =>
        t.id === id
          ? { ...t, played: t.played + 1, lost: t.lost + 1, gf: t.gf, ga: t.ga + 2 }
          : t
      )
    );
  };

  const handleReset = () => {
    setTeams(DEFAULT_TEAMS);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['points-needed-calculator', 'team-comparison', 'season-goals-tracker']}
      calculatorNode={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">
              {labels.controller || 'Interactive Standings Controller'}
            </span>
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetStandings || t.common.reset}
            </Button>
          </div>

          <div className="rounded-2xl border border-gray-200 overflow-x-auto bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-3">{labels.pos || 'Pos'}</th>
                  <th className="py-3 px-3">{labels.club || 'Club'}</th>
                  <th className="py-3 px-2 text-center">P</th>
                  <th className="py-3 px-2 text-center">W</th>
                  <th className="py-3 px-2 text-center">D</th>
                  <th className="py-3 px-2 text-center">L</th>
                  <th className="py-3 px-2 text-center">GF</th>
                  <th className="py-3 px-2 text-center">GA</th>
                  <th className="py-3 px-2 text-center">GD</th>
                  <th className="py-3 px-3 text-center font-bold">PTS</th>
                  <th className="py-3 px-3 text-right">{labels.simulateMatch || 'Simulate Next Match'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {standings.map((team, idx) => {
                  const isTop4 = idx < 4;
                  const isRelegation = idx >= standings.length - 2;
                  return (
                    <tr
                      key={team.id}
                      className={`hover:bg-gray-50/50 transition-colors ${
                        idx === 0
                          ? 'bg-green-50/30'
                          : isRelegation
                          ? 'bg-red-50/20'
                          : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${
                            idx === 0
                              ? 'bg-amber-400 text-gray-950 font-extrabold'
                              : isTop4
                              ? 'bg-green-100 text-green-700'
                              : isRelegation
                              ? 'bg-red-100 text-red-700'
                              : 'text-gray-500'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">
                        {team.name}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono">{team.played}</td>
                      <td className="py-2.5 px-2 text-center font-mono">{team.won}</td>
                      <td className="py-2.5 px-2 text-center font-mono">{team.drawn}</td>
                      <td className="py-2.5 px-2 text-center font-mono">{team.lost}</td>
                      <td className="py-2.5 px-2 text-center font-mono">{team.gf}</td>
                      <td className="py-2.5 px-2 text-center font-mono">{team.ga}</td>
                      <td
                        className={`py-2.5 px-2 text-center font-mono font-semibold ${
                          team.gd > 0
                            ? 'text-green-600'
                            : team.gd < 0
                            ? 'text-red-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-extrabold text-sm text-gray-900 bg-gray-50/50">
                        {team.pts}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSimulateWin(team.id)}
                            className="px-2 py-0.5 rounded bg-green-100 hover:bg-green-200 text-green-700 font-bold text-[10px]"
                            title="Add a 2-0 Win"
                          >
                            +Win
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSimulateDraw(team.id)}
                            className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold text-[10px]"
                            title="Add a 1-1 Draw"
                          >
                            +Draw
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSimulateLoss(team.id)}
                            className="px-2 py-0.5 rounded bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[10px]"
                            title="Add a 0-2 Loss"
                          >
                            +Loss
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title={labels.projectedChampion || 'Projected League Champion'}
              value={champion ? champion.name : 'N/A'}
              subtitle={`${champion?.pts || 0} pts (GD: ${champion?.gd > 0 ? `+${champion?.gd}` : champion?.gd})`}
              badge={{ text: '1st Place', color: 'bg-amber-400 text-gray-950 font-bold' }}
              variant="primary"
            />

            <ResultCard
              title={labels.top4 || 'UEFA Champions League (Top 4)'}
              value={uclQualifiers.map((t) => t.name).join(', ')}
              subtitle="Continental slots"
              variant="secondary"
            />

            <ResultCard
              title={labels.relegationZone || 'Relegation Drop Zone'}
              value={relegationZone.map((t) => t.name).join(', ')}
              subtitle="Drop zone"
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

