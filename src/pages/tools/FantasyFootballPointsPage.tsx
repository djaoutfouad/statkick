import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateFantasyPoints, FantasyPosition } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const FantasyFootballPointsPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'fantasy-football-points')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [position, setPosition] = useState<FantasyPosition>('MID');
  const [minutesPlayed, setMinutesPlayed] = useState<number>(90);
  const [goalsScored, setGoalsScored] = useState<number>(1);
  const [assists, setAssists] = useState<number>(1);
  const [cleanSheet, setCleanSheet] = useState<boolean>(true);
  const [goalsConceded, setGoalsConceded] = useState<number>(0);
  const [yellowCards, setYellowCards] = useState<number>(0);
  const [redCards, setRedCards] = useState<number>(0);
  const [ownGoals, setOwnGoals] = useState<number>(0);
  const [penaltySaves, setPenaltySaves] = useState<number>(0);
  const [penaltyMisses, setPenaltyMisses] = useState<number>(0);
  const [saves, setSaves] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(3);
  const [cbit, setCbit] = useState<number>(0);
  const [cbirt, setCbirt] = useState<number>(0);

  const result = calculateFantasyPoints({
    position,
    minutesPlayed: Number(minutesPlayed) || 0,
    goalsScored: Number(goalsScored) || 0,
    assists: Number(assists) || 0,
    cleanSheet,
    goalsConceded: Number(goalsConceded) || 0,
    yellowCards: Number(yellowCards) || 0,
    redCards: Number(redCards) || 0,
    ownGoals: Number(ownGoals) || 0,
    penaltySaves: Number(penaltySaves) || 0,
    penaltyMisses: Number(penaltyMisses) || 0,
    saves: Number(saves) || 0,
    bonusPoints: Number(bonusPoints) || 0,
    cbit: Number(cbit) || 0,
    cbirt: Number(cbirt) || 0,
  });

  const handleReset = () => {
    setPosition('MID');
    setMinutesPlayed(90);
    setGoalsScored(0);
    setAssists(1);
    setCleanSheet(false);
    setGoalsConceded(1);
    setYellowCards(0);
    setRedCards(0);
    setOwnGoals(0);
    setPenaltySaves(0);
    setPenaltyMisses(0);
    setSaves(0);
    setBonusPoints(1);
    setCbit(0);
    setCbirt(0);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['captain-pick-analyzer', 'best-xi-selector', 'transfer-suggestion']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SelectField
              id="fpl-pos"
              label={labels.position || 'Player Position'}
              value={position}
              onChange={(val) => setPosition(val as FantasyPosition)}
              options={[
                { value: 'GK', label: 'GK' },
                { value: 'DEF', label: 'DEF' },
                { value: 'MID', label: 'MID' },
                { value: 'FWD', label: 'FWD' },
              ]}
            />
            <InputField
              id="fpl-minutes"
              label={labels.minutesPlayed || 'Minutes Played'}
              value={minutesPlayed}
              onChange={setMinutesPlayed}
              min={0}
              max={90}
              step={1}
              helperText="1-59 mins = 1pt | 60+ mins = 2pts"
              required
            />
            <InputField
              id="fpl-goals"
              label={labels.goalsScored || 'Goals Scored'}
              value={goalsScored}
              onChange={setGoalsScored}
              min={0}
              max={10}
              step={1}
            />
            <InputField
              id="fpl-assists"
              label={labels.assists || 'Assists'}
              value={assists}
              onChange={setAssists}
              min={0}
              max={10}
              step={1}
              helperText="3 pts per assist"
            />
            <InputField
              id="fpl-bonus"
              label={labels.bonusPoints || 'Bonus Points (BPS)'}
              value={bonusPoints}
              onChange={setBonusPoints}
              min={0}
              max={3}
              step={1}
              helperText="0 to 3 bonus pts"
            />
            <InputField
              id="fpl-conceded"
              label={labels.goalsConceded || 'Goals Conceded'}
              value={goalsConceded}
              onChange={setGoalsConceded}
              min={0}
              max={15}
              step={1}
              helperText="-1 pt per 2 goals (GK/DEF)"
              disabled={position === 'MID' || position === 'FWD'}
            />
            <InputField
              id="fpl-yellow"
              label={labels.yellowCards || 'Yellow Cards'}
              value={yellowCards}
              onChange={setYellowCards}
              min={0}
              max={2}
              step={1}
              helperText="-1 pt"
            />
            <InputField
              id="fpl-red"
              label={labels.redCards || 'Red Cards'}
              value={redCards}
              onChange={setRedCards}
              min={0}
              max={1}
              step={1}
              helperText="-3 pts"
            />

            {position !== 'FWD' && (
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-2.5">
                  <input
                    type="checkbox"
                    checked={cleanSheet && minutesPlayed >= 60}
                    onChange={(e) => setCleanSheet(e.target.checked)}
                    disabled={minutesPlayed < 60}
                    className="w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    {labels.cleanSheet || 'Clean Sheet Kept'} ({position === 'MID' ? '1 pt' : '4 pts'})
                  </span>
                </label>
              </div>
            )}

            {position === 'GK' && (
              <>
                <InputField
                  id="fpl-saves"
                  label={labels.savesMade || 'Saves Made'}
                  value={saves}
                  onChange={setSaves}
                  min={0}
                  max={25}
                  step={1}
                  helperText="+1 pt per 3 saves"
                />
                <InputField
                  id="fpl-pen-saves"
                  label={labels.penaltySaves || 'Penalty Saves'}
                  value={penaltySaves}
                  onChange={setPenaltySaves}
                  min={0}
                  max={5}
                  step={1}
                  helperText="+5 pts each"
                />
              </>
            )}

            {position === 'DEF' && (
              <InputField
                id="fpl-cbit"
                label={labels.cbit || 'CBIT Actions (DEF)'}
                value={cbit}
                onChange={setCbit}
                min={0}
                max={30}
                step={1}
                helperText="+2 pts for 10+ Clearances/Blocks/Interceptions/Tackles"
              />
            )}

            {(position === 'MID' || position === 'FWD') && (
              <InputField
                id="fpl-cbirt"
                label={labels.cbirt || 'CBIRT Actions (MID/FWD)'}
                value={cbirt}
                onChange={setCbirt}
                min={0}
                max={30}
                step={1}
                helperText="+2 pts for 12+ CBIT + Recoveries"
              />
            )}

            <InputField
              id="fpl-pen-miss"
              label={labels.penaltyMisses || 'Penalty Misses'}
              value={penaltyMisses}
              onChange={setPenaltyMisses}
              min={0}
              max={5}
              step={1}
              helperText="-2 pts each"
            />
            <InputField
              id="fpl-og"
              label={labels.ownGoals || 'Own Goals'}
              value={ownGoals}
              onChange={setOwnGoals}
              min={0}
              max={3}
              step={1}
              helperText="-2 pts each"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title={labels.totalPoints || 'Total Fantasy Points'}
              value={`${result.totalPoints} pts`}
              subtitle={`Gameweek Performance`}
              badge={{
                text:
                  result.totalPoints >= 10
                    ? 'Double Digit Haul!'
                    : result.totalPoints >= 6
                    ? 'Solid Return'
                    : 'Blank',
                color:
                  result.totalPoints >= 10
                    ? 'bg-green-600 text-white'
                    : result.totalPoints >= 6
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-500 text-white',
              }}
              variant="primary"
            />

            <ResultCard
              title={labels.captainScore || 'Captaincy Score (2x)'}
              value={`${result.totalPoints * 2} pts`}
              subtitle="2x armband"
              variant="secondary"
            />

            <ResultCard
              title={labels.tripleCaptain || 'Triple Captain Score (3x)'}
              value={`${result.totalPoints * 3} pts`}
              subtitle="3x chip"
              variant="neutral"
            />
          </div>

          {/* Breakdown Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700">
              {labels.breakdown || 'Point-by-Point Itemization'}
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {result.breakdown.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <span className="text-gray-800">{item.item}</span>
                  <span
                    className={`font-mono font-bold ${
                      item.points > 0
                        ? 'text-green-600'
                        : item.points < 0
                        ? 'text-red-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.points > 0 ? `+${item.points}` : item.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

