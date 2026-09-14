import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculatePressingIntensity } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const PressingIntensityCalculatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'pressing-intensity-calculator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [opponentPasses, setOpponentPasses] = useState<number>(240);
  const [tacklesInZone, setTacklesInZone] = useState<number>(18);
  const [interceptionsInZone, setInterceptionsInZone] = useState<number>(12);
  const [challengesInZone, setChallengesInZone] = useState<number>(6);
  const [highTurnovers, setHighTurnovers] = useState<number>(10);
  const [turnoverShots, setTurnoverShots] = useState<number>(4);

  const result = calculatePressingIntensity({
    opponentPassesInDefensiveZone: Number(opponentPasses) || 0,
    tacklesInZone: Number(tacklesInZone) || 0,
    interceptionsInZone: Number(interceptionsInZone) || 0,
    challengesInZone: Number(challengesInZone) || 0,
    highTurnoversWon: Number(highTurnovers) || 0,
    turnoverShotsGenerated: Number(turnoverShots) || 0,
  });

  const handleReset = () => {
    setOpponentPasses(280);
    setTacklesInZone(14);
    setInterceptionsInZone(8);
    setChallengesInZone(4);
    setHighTurnovers(6);
    setTurnoverShots(2);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['formation-analyzer', 'possession-impact-analyzer', 'team-comparison']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField
              id="ppda-opp-passes"
              label={labels.opponentPasses || 'Opponent Passes in Defensive Zone'}
              value={opponentPasses}
              onChange={setOpponentPasses}
              min={1}
              max={600}
              step={5}
              required
            />
            <InputField
              id="ppda-tackles"
              label={labels.tacklesInZone || 'Tackles in Pressing Zone'}
              value={tacklesInZone}
              onChange={setTacklesInZone}
              min={0}
              max={50}
              step={1}
              required
            />
            <InputField
              id="ppda-interceptions"
              label={labels.interceptionsInZone || 'Interceptions in Zone'}
              value={interceptionsInZone}
              onChange={setInterceptionsInZone}
              min={0}
              max={50}
              step={1}
              required
            />
            <InputField
              id="ppda-challenges"
              label={labels.challengesInZone || 'Challenges / Fouls in Zone'}
              value={challengesInZone}
              onChange={setChallengesInZone}
              min={0}
              max={50}
              step={1}
            />
            <InputField
              id="ppda-turnovers"
              label={labels.highTurnovers || 'High Turnovers Won (<40m)'}
              value={highTurnovers}
              onChange={setHighTurnovers}
              min={0}
              max={30}
              step={1}
            />
            <InputField
              id="ppda-turnover-shots"
              label={labels.shotsFromTurnovers || 'Shots from High Turnovers'}
              value={turnoverShots}
              onChange={setTurnoverShots}
              min={0}
              max={highTurnovers}
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
              title={labels.calculatedPpdaScore || 'Calculated PPDA Score'}
              value={`${result.ppda.toFixed(2)}`}
              subtitle={`Tactical Tier: ${result.pressingTier}`}
              badge={{
                text: result.pressingTier,
                color:
                  result.ppda < 8.0
                    ? 'bg-red-500 text-white'
                    : result.ppda < 11.0
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white',
              }}
              variant="primary"
            >
              <ProgressBar
                value={Math.max(0, 100 - (result.ppda / 20) * 100)}
                max={100}
                color="bg-green-600"
              />
            </ResultCard>

            <ResultCard
              title={labels.defensiveActions || 'Defensive Actions in Zone'}
              value={`${result.defensiveActions}`}
              subtitle={`${tacklesInZone}T + ${interceptionsInZone}I + ${challengesInZone}C`}
              variant="secondary"
            />

            <ResultCard
              title={labels.turnoverShotConversion || 'Turnover Shot Conversion'}
              value={formatPercent(result.turnoverShotConversion)}
              subtitle={`${turnoverShots} shots / ${highTurnovers} turnovers`}
              variant="neutral"
            >
              <ProgressBar value={result.turnoverShotConversion} color="bg-purple-600" />
            </ResultCard>

            <ResultCard
              title={labels.pressingTier || 'Pressing Description'}
              value={result.pressingTier}
              subtitle={
                result.ppda < 8
                  ? 'Hyper-aggressive turnover traps'
                  : result.ppda < 12
                  ? 'Coordinated mid-high press'
                  : 'Containment low block'
              }
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

