import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateSetPieceSuccess } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const SetPieceSuccessRatePage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'set-piece-success-rate')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [cornersTaken, setCornersTaken] = useState<number>(140);
  const [cornerShots, setCornerShots] = useState<number>(42);
  const [cornerGoals, setCornerGoals] = useState<number>(8);
  const [directFkTaken, setDirectFkTaken] = useState<number>(18);
  const [directFkOnTarget, setDirectFkOnTarget] = useState<number>(7);
  const [directFkGoals, setDirectFkGoals] = useState<number>(2);
  const [indirectFkTaken, setIndirectFkTaken] = useState<number>(35);
  const [indirectFkGoals, setIndirectFkGoals] = useState<number>(3);
  const [penaltiesTaken, setPenaltiesTaken] = useState<number>(6);
  const [penaltiesScored, setPenaltiesScored] = useState<number>(5);

  const result = calculateSetPieceSuccess({
    cornersTaken: Number(cornersTaken) || 0,
    cornerShotsGenerated: Number(cornerShots) || 0,
    cornerGoals: Number(cornerGoals) || 0,
    directFkTaken: Number(directFkTaken) || 0,
    directFkShotsOnTarget: Number(directFkOnTarget) || 0,
    directFkGoals: Number(directFkGoals) || 0,
    indirectFkTaken: Number(indirectFkTaken) || 0,
    indirectFkGoals: Number(indirectFkGoals) || 0,
    penaltiesTaken: Number(penaltiesTaken) || 0,
    penaltiesScored: Number(penaltiesScored) || 0,
  });

  const handleReset = () => {
    setCornersTaken(100);
    setCornerShots(25);
    setCornerGoals(3);
    setDirectFkTaken(12);
    setDirectFkOnTarget(4);
    setDirectFkGoals(1);
    setIndirectFkTaken(20);
    setIndirectFkGoals(1);
    setPenaltiesTaken(4);
    setPenaltiesScored(3);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['formation-analyzer', 'shot-conversion-rate', 'team-comparison']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Corner Kicks Console */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-green-700">
                1. {labels.cornersTaken ? 'Corner Kicks' : 'Corner Kicks'}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <InputField
                  id="set-corners-taken"
                  label={labels.cornersTaken || 'Corners Taken'}
                  value={cornersTaken}
                  onChange={setCornersTaken}
                  min={0}
                  max={400}
                  step={1}
                />
                <InputField
                  id="set-corner-shots"
                  label={labels.cornerShots || 'Shots from Corners'}
                  value={cornerShots}
                  onChange={setCornerShots}
                  min={0}
                  max={cornersTaken}
                  step={1}
                />
                <InputField
                  id="set-corner-goals"
                  label={labels.cornerGoals || 'Goals from Corners'}
                  value={cornerGoals}
                  onChange={setCornerGoals}
                  min={0}
                  max={cornerShots}
                  step={1}
                />
              </div>
            </div>

            {/* Direct Free Kicks Console */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                2. Direct Free Kicks
              </div>
              <div className="grid grid-cols-3 gap-2">
                <InputField
                  id="set-dfk-taken"
                  label={labels.directFkTaken || 'Direct FKs Taken'}
                  value={directFkTaken}
                  onChange={setDirectFkTaken}
                  min={0}
                  max={60}
                  step={1}
                />
                <InputField
                  id="set-dfk-sot"
                  label={labels.directFkOnTarget || 'Shots on Target'}
                  value={directFkOnTarget}
                  onChange={setDirectFkOnTarget}
                  min={0}
                  max={directFkTaken}
                  step={1}
                />
                <InputField
                  id="set-dfk-goals"
                  label={labels.directFkGoals || 'Direct FK Goals'}
                  value={directFkGoals}
                  onChange={setDirectFkGoals}
                  min={0}
                  max={directFkOnTarget}
                  step={1}
                />
              </div>
            </div>

            {/* Indirect Free Kicks Console */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                3. Indirect Free Kicks
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  id="set-ifk-taken"
                  label={labels.indirectFkTaken || 'Indirect FKs Taken'}
                  value={indirectFkTaken}
                  onChange={setIndirectFkTaken}
                  min={0}
                  max={150}
                  step={1}
                />
                <InputField
                  id="set-ifk-goals"
                  label={labels.indirectFkGoals || 'Goals from Indirect FKs'}
                  value={indirectFkGoals}
                  onChange={setIndirectFkGoals}
                  min={0}
                  max={indirectFkTaken}
                  step={1}
                />
              </div>
            </div>

            {/* Penalties Console */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                4. Penalty Kicks
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  id="set-pen-taken"
                  label={labels.penaltiesAwarded || 'Penalties Awarded'}
                  value={penaltiesTaken}
                  onChange={setPenaltiesTaken}
                  min={0}
                  max={30}
                  step={1}
                />
                <InputField
                  id="set-pen-scored"
                  label={labels.penaltiesConverted || 'Penalties Converted'}
                  value={penaltiesScored}
                  onChange={setPenaltiesScored}
                  min={0}
                  max={penaltiesTaken}
                  step={1}
                />
              </div>
            </div>
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
              title={labels.setPieceThreatIndex || 'Set-Piece Threat Index'}
              value={`${result.overallEfficiencyScore}/100`}
              subtitle={`Threat Level: ${result.threatRating}`}
              badge={{
                text: result.threatRating,
                color:
                  result.overallEfficiencyScore >= 75
                    ? 'bg-green-600 text-white'
                    : result.overallEfficiencyScore >= 50
                    ? 'bg-blue-600 text-white'
                    : 'bg-yellow-500 text-white',
              }}
              variant="primary"
            >
              <ProgressBar value={result.overallEfficiencyScore} max={100} color="bg-green-600" />
            </ResultCard>

            <ResultCard
              title={labels.cornerGoalRate || 'Corner Goal Rate'}
              value={formatPercent(result.cornerGoalRate)}
              subtitle={`${cornerGoals} / ${cornersTaken} corners`}
              variant="secondary"
            >
              <ProgressBar value={result.cornerGoalRate * 10} max={100} color="bg-blue-600" />
            </ResultCard>

            <ResultCard
              title={labels.cornerShotGen || 'Corner Shot Generation'}
              value={formatPercent(result.cornerShotGeneration)}
              subtitle={`${cornerShots} shots (${formatPercent(result.cornerShotConversion)} scored)`}
              variant="neutral"
            />

            <ResultCard
              title={labels.penaltyConversionRate || 'Penalty Conversion Rate'}
              value={formatPercent(result.penaltyConversion)}
              subtitle={`${penaltiesScored} / ${penaltiesTaken} converted`}
              variant="neutral"
            >
              <ProgressBar value={result.penaltyConversion} color="bg-amber-600" />
            </ResultCard>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Direct FK On-Target Rate"
              value={formatPercent(result.directFkAccuracy)}
              subtitle={`${directFkOnTarget} / ${directFkTaken} direct FKs on target`}
              variant="neutral"
            />
            <ResultCard
              title="Direct FK Goal Conversion"
              value={formatPercent(result.directFkConversion)}
              subtitle={`${directFkGoals} / ${directFkTaken} direct FK goals`}
              variant="neutral"
            />
            <ResultCard
              title="Indirect FK Goal Conversion"
              value={formatPercent(result.indirectFkConversion)}
              subtitle={`${indirectFkGoals} / ${indirectFkTaken} indirect FK goals`}
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

