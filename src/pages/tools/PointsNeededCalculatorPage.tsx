import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculatePointsNeeded } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const PointsNeededCalculatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'points-needed-calculator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [currentPoints, setCurrentPoints] = useState<number>(58);
  const [targetPoints, setTargetPoints] = useState<number>(72);
  const [gamesRemaining, setGamesRemaining] = useState<number>(9);

  const result = calculatePointsNeeded({
    currentPoints: Number(currentPoints) || 0,
    targetPoints: Number(targetPoints) || 0,
    gamesRemaining: Number.isNaN(Number(gamesRemaining)) ? 0 : Math.max(0, Number(gamesRemaining)),
  });

  const loadTargetPreset = (target: number) => {
    setTargetPoints(target);
  };

  const handleReset = () => {
    setCurrentPoints(52);
    setTargetPoints(70);
    setGamesRemaining(10);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['league-table-simulator', 'team-comparison', 'season-goals-tracker']}
      calculatorNode={
        <div className="space-y-6">
          {/* Target Presets Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-semibold text-gray-700">
              {labels.targets || 'Standard Benchmark Targets:'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadTargetPreset(88)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-100"
              >
                Title Race (88 pts)
              </button>
              <button
                type="button"
                onClick={() => loadTargetPreset(71)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-100"
              >
                Top 4 UCL (71 pts)
              </button>
              <button
                type="button"
                onClick={() => loadTargetPreset(61)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-100"
              >
                Europa (61 pts)
              </button>
              <button
                type="button"
                onClick={() => loadTargetPreset(38)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-100"
              >
                Safety (38 pts)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField
              id="pts-current"
              label={labels.currentPoints || 'Current Points'}
              value={currentPoints}
              onChange={setCurrentPoints}
              min={0}
              max={114}
              step={1}
              required
            />
            <InputField
              id="pts-target"
              label={labels.targetPoints || 'Target Points Goal'}
              value={targetPoints}
              onChange={setTargetPoints}
              min={1}
              max={114}
              step={1}
              required
            />
            <InputField
              id="pts-games-rem"
              label={labels.gamesRemaining || 'Games Remaining'}
              value={gamesRemaining}
              onChange={setGamesRemaining}
              min={1}
              max={38}
              step={1}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetParams || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard
              title={labels.feasibilityStatus || 'Feasibility Status'}
              value={result.feasibilityStatus}
              subtitle={
                result.pointsDeficit <= 0
                  ? 'Target reached'
                  : `${result.pointsDeficit} pts needed`
              }
              badge={{
                text: result.feasibilityStatus,
                color:
                  result.feasibilityStatus === 'Achieved' || result.feasibilityStatus === 'Very Likely'
                    ? 'bg-green-600 text-white'
                    : result.feasibilityStatus === 'Achievable'
                    ? 'bg-blue-600 text-white'
                    : result.feasibilityStatus === 'Difficult'
                    ? 'bg-amber-500 text-white'
                    : 'bg-red-600 text-white',
              }}
              variant="primary"
            />

            <ResultCard
              title={labels.requiredPace || 'Required Run-In Pace'}
              value={`${result.pointsPerGameNeeded.toFixed(2)} PPG`}
              subtitle={`Over ${gamesRemaining} fixtures`}
              variant="secondary"
            />

            <ResultCard
              title={labels.maxPossiblePoints || 'Maximum Possible Points'}
              value={`${result.maxPossiblePoints} pts`}
              subtitle={`Max from ${gamesRemaining} games`}
              variant="neutral"
            />

            <ResultCard
              title={labels.targetBuffer || 'Target Buffer / Deficit'}
              value={
                result.maxPossiblePoints >= targetPoints
                  ? `+${result.maxPossiblePoints - targetPoints} pts`
                  : `-${targetPoints - result.maxPossiblePoints} pts`
              }
              subtitle={
                result.maxPossiblePoints >= targetPoints
                  ? 'Margin of error'
                  : 'Out of reach'
              }
              variant="neutral"
            />
          </div>

          {/* Valid W-D-L Scenarios Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>{labels.combinations || `Viable Win-Draw-Loss Combinations to Reach >=${targetPoints} Points`}</span>
              <span className="text-gray-500 font-mono text-[11px]">
                {result.viableCombinations.length} {labels.permutationsFound || 'Permutations Found'}
              </span>
            </div>
            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto text-xs">
              {result.viableCombinations.length > 0 ? (
                result.viableCombinations.map((combo, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-green-600">
                        {combo.wins} W
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold text-amber-600">
                        {combo.draws} D
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold text-red-600">
                        {combo.losses} L
                      </span>
                    </div>
                    <div className="font-mono font-bold text-gray-900">
                      {combo.totalPoints} PTS
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {result.pointsDeficit <= 0
                    ? 'Target points already achieved.'
                    : 'Target is mathematically impossible with remaining games.'}
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

