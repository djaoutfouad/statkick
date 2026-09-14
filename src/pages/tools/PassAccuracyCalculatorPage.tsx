import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculatePassAccuracy } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

export const PassAccuracyCalculatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'pass-accuracy-calculator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [totalPasses, setTotalPasses] = useState<number>(68);
  const [completedPasses, setCompletedPasses] = useState<number>(60);
  const [keyPasses, setKeyPasses] = useState<number>(4);
  const [longBallsAttempted, setLongBallsAttempted] = useState<number>(9);
  const [longBallsCompleted, setLongBallsCompleted] = useState<number>(7);

  const result = calculatePassAccuracy({
    totalPasses: Number(totalPasses) || 0,
    completedPasses: Number(completedPasses) || 0,
    keyPasses: Number(keyPasses) || 0,
    longBallsAttempted: Number(longBallsAttempted) || 0,
    longBallsCompleted: Number(longBallsCompleted) || 0,
  });

  const handleReset = () => {
    setTotalPasses(50);
    setCompletedPasses(42);
    setKeyPasses(1);
    setLongBallsAttempted(5);
    setLongBallsCompleted(3);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['player-performance-rater', 'possession-impact-analyzer', 'formation-analyzer']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField
              id="total-passes"
              label={labels.totalPasses || 'Total Passes Attempted'}
              value={totalPasses}
              onChange={setTotalPasses}
              min={1}
              max={250}
              step={1}
              required
            />
            <InputField
              id="completed-passes"
              label={labels.completedPasses || 'Completed Passes'}
              value={completedPasses}
              onChange={setCompletedPasses}
              min={0}
              max={totalPasses}
              step={1}
              required
            />
            <InputField
              id="key-passes"
              label={labels.keyPasses || 'Key Passes / Chances Created'}
              value={keyPasses}
              onChange={setKeyPasses}
              min={0}
              max={20}
              step={1}
            />
            <InputField
              id="long-balls-att"
              label={labels.longBallsAttempted || 'Long Balls Attempted'}
              value={longBallsAttempted}
              onChange={setLongBallsAttempted}
              min={0}
              max={50}
              step={1}
            />
            <InputField
              id="long-balls-comp"
              label={labels.longBallsCompleted || 'Long Balls Completed'}
              value={longBallsCompleted}
              onChange={setLongBallsCompleted}
              min={0}
              max={longBallsAttempted}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title={labels.qualityScore || 'Passing Quality Index'}
            value={`${result.qualityScore}/100`}
            subtitle={result.ratingLabel}
            badge={{ text: result.ratingLabel.split('/')[0] }}
            variant="primary"
          >
            <ProgressBar value={result.qualityScore} max={100} color="bg-green-600" />
          </ResultCard>

          <ResultCard
            title={labels.overallAccuracy || 'Overall Pass Accuracy'}
            value={formatPercent(result.passAccuracy)}
            subtitle={`${completedPasses} / ${totalPasses}`}
            variant="neutral"
          >
            <ProgressBar value={result.passAccuracy} color="bg-blue-600" />
          </ResultCard>

          <ResultCard
            title={labels.longBallAccuracy || 'Long Ball Precision'}
            value={formatPercent(result.longBallAccuracy)}
            subtitle={`${longBallsCompleted} / ${longBallsAttempted}`}
            variant="neutral"
          >
            <ProgressBar value={result.longBallAccuracy} color="bg-amber-600" />
          </ResultCard>
        </div>
      }
    />
  );
};

