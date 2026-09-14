import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { evaluateTransfer, TransferPlayer } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const TransferSuggestionPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'transfer-suggestion')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [playerOut, setPlayerOut] = useState<TransferPlayer>({
    name: 'Marcus Rashford',
    cost: 7.0,
    form: 4.2,
    next3Fdr: 3.8,
    expectedMinutes: 65,
  });

  const [playerIn, setPlayerIn] = useState<TransferPlayer>({
    name: 'Bryan Mbeumo',
    cost: 7.6,
    form: 7.8,
    next3Fdr: 2.0,
    expectedMinutes: 90,
  });

  const [bankBudget, setBankBudget] = useState<number>(1.2);

  const result = evaluateTransfer(playerOut, playerIn, Number(bankBudget) || 0);

  const handleReset = () => {
    setPlayerOut({
      name: 'Player Out',
      cost: 6.5,
      form: 5.0,
      next3Fdr: 3.5,
      expectedMinutes: 70,
    });
    setPlayerIn({
      name: 'Player In',
      cost: 7.0,
      form: 7.5,
      next3Fdr: 2.3,
      expectedMinutes: 90,
    });
    setBankBudget(1.0);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['fantasy-football-points', 'best-xi-selector', 'captain-pick-analyzer']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Out Console */}
            <div className="p-4 rounded-2xl border border-red-200 bg-red-50/20 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                {labels.playerOutSell || 'Player Transfer Out (Sell)'}
              </div>
              <InputField
                id="out-name"
                label={labels.playerNameOut || 'Player Name (Out)'}
                type="text"
                value={playerOut.name}
                onChange={(val) => setPlayerOut({ ...playerOut, name: val })}
              />
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  id="out-cost"
                  label={labels.sellingPrice || 'Selling Price (£M)'}
                  value={playerOut.cost}
                  onChange={(val) => setPlayerOut({ ...playerOut, cost: Number(val) || 0 })}
                  prefix="£"
                  step={0.1}
                />
                <InputField
                  id="out-form"
                  label={labels.currentForm || 'Current Form (1–10)'}
                  value={playerOut.form}
                  onChange={(val) => setPlayerOut({ ...playerOut, form: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="out-fdr"
                  label={labels.next3Fdr || 'Next 3 FDR (Avg)'}
                  value={playerOut.next3Fdr}
                  onChange={(val) => setPlayerOut({ ...playerOut, next3Fdr: Number(val) || 0 })}
                  step={0.1}
                  helperText="1=Easy, 5=Hard"
                />
                <InputField
                  id="out-mins"
                  label={labels.expectedMinutes || 'Expected Mins / Match'}
                  value={playerOut.expectedMinutes}
                  onChange={(val) => setPlayerOut({ ...playerOut, expectedMinutes: Number(val) || 0 })}
                  step={1}
                />
              </div>
            </div>

            {/* Player In Console */}
            <div className="p-4 rounded-2xl border border-green-200 bg-green-50/20 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-green-600">
                {labels.playerInBuy || 'Player Transfer In (Buy)'}
              </div>
              <InputField
                id="in-name"
                label={labels.playerNameIn || 'Player Name (In)'}
                type="text"
                value={playerIn.name}
                onChange={(val) => setPlayerIn({ ...playerIn, name: val })}
              />
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  id="in-cost"
                  label={labels.purchasePrice || 'Purchase Price (£M)'}
                  value={playerIn.cost}
                  onChange={(val) => setPlayerIn({ ...playerIn, cost: Number(val) || 0 })}
                  prefix="£"
                  step={0.1}
                />
                <InputField
                  id="in-form"
                  label={labels.currentForm || 'Current Form (1–10)'}
                  value={playerIn.form}
                  onChange={(val) => setPlayerIn({ ...playerIn, form: Number(val) || 0 })}
                  step={0.1}
                />
                <InputField
                  id="in-fdr"
                  label={labels.next3Fdr || 'Next 3 FDR (Avg)'}
                  value={playerIn.next3Fdr}
                  onChange={(val) => setPlayerIn({ ...playerIn, next3Fdr: Number(val) || 0 })}
                  step={0.1}
                  helperText="1=Easy, 5=Hard"
                />
                <InputField
                  id="in-mins"
                  label={labels.expectedMinutes || 'Expected Mins / Match'}
                  value={playerIn.expectedMinutes}
                  onChange={(val) => setPlayerIn({ ...playerIn, expectedMinutes: Number(val) || 0 })}
                  step={1}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-64">
              <InputField
                id="bank-budget"
                label={labels.moneyInBank || 'Current Money in the Bank (£M)'}
                value={bankBudget}
                onChange={setBankBudget}
                min={0}
                max={20}
                step={0.1}
                prefix="£"
              />
            </div>
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
              title={labels.transferVerdict || 'Transfer Verdict'}
              value={result.verdict}
              subtitle={`Viability Score: ${result.viabilityScore}/100`}
              badge={{
                text: result.verdict,
                color:
                  result.verdict === 'Strong Buy'
                    ? 'bg-green-600 text-white'
                    : result.verdict === 'Consider'
                    ? 'bg-blue-600 text-white'
                    : 'bg-red-600 text-white',
              }}
              variant="primary"
            />

            <ResultCard
              title={labels.projectedGain3Weeks || '3-Week Projected Gain'}
              value={`+${result.projectedGain} pts`}
              subtitle="Expected point swing"
              variant="secondary"
            />

            <ResultCard
              title={labels.netBudgetImpact || 'Net Budget Impact'}
              value={`£${result.budgetImpact > 0 ? `+${result.budgetImpact.toFixed(1)}` : result.budgetImpact.toFixed(1)}M`}
              subtitle={result.affordable ? 'Affordable within budget' : 'Unaffordable (Exceeds Bank)'}
              variant="neutral"
            />

            <ResultCard
              title={labels.fdrSwing || 'Fixture Difficulty Swing'}
              value={`-${(playerOut.next3Fdr - playerIn.next3Fdr).toFixed(1)} FDR`}
              subtitle={`${playerIn.next3Fdr} vs ${playerOut.next3Fdr} avg FDR`}
              variant="neutral"
            />
          </div>
        </div>
      }
    />
  );
};

