import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculatePlayerPerformance, PlayerPosition } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const PlayerPerformanceRaterPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'player-performance-rater')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [position, setPosition] = useState<PlayerPosition>('FWD');
  const [goals, setGoals] = useState<number>(1);
  const [assists, setAssists] = useState<number>(1);
  const [passAccuracy, setPassAccuracy] = useState<number>(84);
  const [shotsOnTargetPercent, setShotsOnTargetPercent] = useState<number>(65);
  const [dribbles, setDribbles] = useState<number>(3);
  const [tackles, setTackles] = useState<number>(1);
  const [saves, setSaves] = useState<number>(0);
  const [cleanSheet, setCleanSheet] = useState<boolean>(false);

  const result = calculatePlayerPerformance({
    position,
    goals: Number(goals) || 0,
    assists: Number(assists) || 0,
    passAccuracy: Number(passAccuracy) || 0,
    shotsOnTargetPercent: Number(shotsOnTargetPercent) || 0,
    dribbles: Number(dribbles) || 0,
    tackles: Number(tackles) || 0,
    saves: Number(saves) || 0,
    cleanSheet,
  });

  const loadPreset = (presetPos: PlayerPosition) => {
    setPosition(presetPos);
    if (presetPos === 'FWD') {
      setGoals(2);
      setAssists(1);
      setPassAccuracy(80);
      setShotsOnTargetPercent(70);
      setDribbles(4);
      setTackles(1);
      setSaves(0);
      setCleanSheet(false);
    } else if (presetPos === 'MID') {
      setGoals(1);
      setAssists(2);
      setPassAccuracy(91);
      setShotsOnTargetPercent(50);
      setDribbles(3);
      setTackles(4);
      setSaves(0);
      setCleanSheet(false);
    } else if (presetPos === 'DEF') {
      setGoals(0);
      setAssists(1);
      setPassAccuracy(88);
      setShotsOnTargetPercent(0);
      setDribbles(1);
      setTackles(6);
      setSaves(0);
      setCleanSheet(true);
    } else if (presetPos === 'GK') {
      setGoals(0);
      setAssists(0);
      setPassAccuracy(78);
      setShotsOnTargetPercent(0);
      setDribbles(0);
      setTackles(1);
      setSaves(6);
      setCleanSheet(true);
    }
  };

  const handleReset = () => {
    setPosition('FWD');
    setGoals(0);
    setAssists(0);
    setPassAccuracy(75);
    setShotsOnTargetPercent(50);
    setDribbles(0);
    setTackles(0);
    setSaves(0);
    setCleanSheet(false);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['player-form-index', 'pass-accuracy-calculator', 'shot-conversion-rate']}
      calculatorNode={
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-semibold text-gray-700">
              {labels.presets || 'Position Presets:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {(['FWD', 'MID', 'DEF', 'GK'] as PlayerPosition[]).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => loadPreset(pos)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    position === pos
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SelectField
              id="player-position"
              label={labels.position || 'Position Role'}
              value={position}
              onChange={(val) => setPosition(val as PlayerPosition)}
              options={[
                { value: 'FWD', label: 'Forward (FWD / ST / Winger)' },
                { value: 'MID', label: 'Midfielder (CM / CAM / CDM)' },
                { value: 'DEF', label: 'Defender (CB / LB / RB / RWB)' },
                { value: 'GK', label: 'Goalkeeper (GK)' },
              ]}
            />

            <InputField
              id="player-goals"
              label={labels.goalsScored || 'Goals Scored'}
              value={goals}
              onChange={setGoals}
              min={0}
              max={10}
              step={1}
            />

            <InputField
              id="player-assists"
              label={labels.assists || 'Assists'}
              value={assists}
              onChange={setAssists}
              min={0}
              max={10}
              step={1}
            />

            <InputField
              id="player-pass-acc"
              label={labels.passAccuracy || 'Pass Accuracy %'}
              value={passAccuracy}
              onChange={setPassAccuracy}
              min={0}
              max={100}
              step={1}
              suffix="%"
            />

            <InputField
              id="player-sot-pct"
              label={labels.shotsOnTargetPct || 'Shots on Target %'}
              value={shotsOnTargetPercent}
              onChange={setShotsOnTargetPercent}
              min={0}
              max={100}
              step={1}
              suffix="%"
              disabled={position === 'GK'}
            />

            <InputField
              id="player-dribbles"
              label={labels.dribbles || 'Successful Dribbles'}
              value={dribbles}
              onChange={setDribbles}
              min={0}
              max={20}
              step={1}
            />

            <InputField
              id="player-tackles"
              label={labels.tackles || 'Tackles Won'}
              value={tackles}
              onChange={setTackles}
              min={0}
              max={20}
              step={1}
            />

            {position === 'GK' && (
              <InputField
                id="player-saves"
                label={labels.saves || 'Saves Made'}
                value={saves}
                onChange={setSaves}
                min={0}
                max={25}
                step={1}
              />
            )}

            {(position === 'DEF' || position === 'GK') && (
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-2.5">
                  <input
                    type="checkbox"
                    checked={cleanSheet}
                    onChange={(e) => setCleanSheet(e.target.checked)}
                    className="w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    {labels.cleanSheet || 'Clean Sheet Kept (+Bonus)'}
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetValues || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              title={labels.calculatedMatchRating || 'Calculated Match Rating'}
              value={`${result.score}/100`}
              subtitle={`Tier: ${result.label}`}
              badge={{ text: result.label, color: result.badgeColor }}
              variant="primary"
            >
              <ProgressBar value={result.score} max={100} color="bg-green-600" />
            </ResultCard>

            <ResultCard
              title={labels.attackingImpact || 'Attacking Impact'}
              value={result.breakdown.attackingContribution}
              subtitle="Goal, assist & shot threat"
              variant="neutral"
            />

            <ResultCard
              title={labels.defensiveWork || 'Defensive Work'}
              value={result.breakdown.defensiveWork}
              subtitle="Tackles, duels, saves"
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

