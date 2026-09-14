import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { analyzeCaptains, CaptainCandidate } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Crown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const CaptainPickAnalyzerPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'captain-pick-analyzer')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [candidates, setCandidates] = useState<CaptainCandidate[]>([
    {
      id: '1',
      name: 'Mohamed Salah',
      form: 8.8,
      fixtureDifficulty: 2,
      isHome: true,
      historicAgainstOpponent: 6,
      teamAttackingStrength: 2.6,
    },
    {
      id: '2',
      name: 'Erling Haaland',
      form: 8.2,
      fixtureDifficulty: 4,
      isHome: false,
      historicAgainstOpponent: 4,
      teamAttackingStrength: 2.4,
    },
    {
      id: '3',
      name: 'Cole Palmer',
      form: 8.5,
      fixtureDifficulty: 2,
      isHome: true,
      historicAgainstOpponent: 3,
      teamAttackingStrength: 2.2,
    },
  ]);

  const results = analyzeCaptains(candidates);
  const bestCandidate = results[0];

  const updateCandidate = (index: number, field: keyof CaptainCandidate, value: any) => {
    const updated = [...candidates];
    updated[index] = { ...updated[index], [field]: value };
    setCandidates(updated);
  };

  const handleReset = () => {
    setCandidates([
      {
        id: '1',
        name: 'Player A',
        form: 8.5,
        fixtureDifficulty: 2,
        isHome: true,
        historicAgainstOpponent: 5,
        teamAttackingStrength: 2.5,
      },
      {
        id: '2',
        name: 'Player B',
        form: 8.0,
        fixtureDifficulty: 3,
        isHome: false,
        historicAgainstOpponent: 3,
        teamAttackingStrength: 2.2,
      },
      {
        id: '3',
        name: 'Player C',
        form: 7.5,
        fixtureDifficulty: 2,
        isHome: true,
        historicAgainstOpponent: 2,
        teamAttackingStrength: 2.0,
      },
    ]);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['fantasy-football-points', 'best-xi-selector', 'player-form-index']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {candidates.map((cand, idx) => (
              <div
                key={cand.id}
                className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {labels.candidate || 'Option'} {idx + 1}
                  </span>
                  {bestCandidate?.id === cand.id && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                      <Crown className="w-3 h-3 text-amber-600" /> Top Rank
                    </span>
                  )}
                </div>

                <InputField
                  id={`cand-name-${idx}`}
                  label={labels.playerName || 'Player Name'}
                  type="text"
                  value={cand.name}
                  onChange={(val) => updateCandidate(idx, 'name', val)}
                />

                <InputField
                  id={`cand-form-${idx}`}
                  label={labels.formRating || 'Form Index (1–10)'}
                  value={cand.form}
                  onChange={(val) => updateCandidate(idx, 'form', Number(val) || 1)}
                  min={1}
                  max={10}
                  step={0.1}
                />

                <SelectField
                  id={`cand-fdr-${idx}`}
                  label={labels.fixtureDifficulty || 'Fixture Difficulty (FDR)'}
                  value={cand.fixtureDifficulty.toString()}
                  onChange={(val) => updateCandidate(idx, 'fixtureDifficulty', Number(val))}
                  options={[
                    { value: '1', label: '1 - Very Easy' },
                    { value: '2', label: '2 - Easy Matchup' },
                    { value: '3', label: '3 - Moderate / Balanced' },
                    { value: '4', label: '4 - Tough Away / Derby' },
                    { value: '5', label: '5 - Extreme' },
                  ]}
                />

                <div className="grid grid-cols-2 gap-2">
                  <SelectField
                    id={`cand-venue-${idx}`}
                    label={labels.homeOrAway || 'Venue'}
                    value={cand.isHome ? 'home' : 'away'}
                    onChange={(val) => updateCandidate(idx, 'isHome', val === 'home')}
                    options={[
                      { value: 'home', label: 'Home (+10%)' },
                      { value: 'away', label: 'Away' },
                    ]}
                  />

                  <InputField
                    id={`cand-hist-${idx}`}
                    label={labels.historicGoalsAgainst || 'Goals vs Opponent'}
                    value={cand.historicAgainstOpponent}
                    onChange={(val) => updateCandidate(idx, 'historicAgainstOpponent', Number(val) || 0)}
                    min={0}
                    max={20}
                    step={1}
                  />
                </div>

                <InputField
                  id={`cand-attack-${idx}`}
                  label={labels.teamAttackStrength || 'Team Goals / Game'}
                  value={cand.teamAttackingStrength}
                  onChange={(val) => updateCandidate(idx, 'teamAttackingStrength', Number(val) || 1)}
                  min={0.5}
                  max={4.0}
                  step={0.1}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetCandidates || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              title={labels.recommendedCaptain || 'Recommended Captain'}
              value={bestCandidate ? bestCandidate.name : 'N/A'}
              subtitle={`${labels.score || 'Score'}: ${bestCandidate ? bestCandidate.score : 0}/100`}
              badge={{
                text: bestCandidate ? bestCandidate.riskLevel : 'N/A',
                color:
                  bestCandidate?.riskLevel === 'Low Risk (Safe Pick)'
                    ? 'bg-green-600 text-white'
                    : 'bg-amber-500 text-white',
              }}
              variant="primary"
            />

            <ResultCard
              title={labels.primaryEdge || 'Primary Deciding Factor'}
              value={
                bestCandidate?.isHome
                  ? 'Favorable Home Fixture'
                  : 'Exceptional Form Index'
              }
              subtitle="Weighted edge"
              variant="secondary"
            />

            <ResultCard
              title={labels.rankSpread || 'Rank Spread'}
              value={`${(bestCandidate?.score - (results[1]?.score || 0)).toFixed(1)} pts`}
              subtitle="#1 vs #2"
              variant="neutral"
            />
          </div>

          {/* Captain Rank Breakdown Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700">
              {labels.scoreShootout || 'Captaincy Score Shootout'}
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {results.map((res, idx) => (
                <div key={res.id} className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-400 text-sm">#{idx + 1}</span>
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {res.name}
                        {idx === 0 && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {res.isHome ? 'Home' : 'Away'} • FDR {res.fixtureDifficulty} • Form {res.form}/10
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700">
                      {res.riskLevel}
                    </span>
                    <span className="font-mono font-bold text-base text-green-600">
                      {res.score}/100
                    </span>
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

