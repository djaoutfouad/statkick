import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { selectBestXI, BestXIPlayer } from '../../utils/calculations';
import { SelectField } from '../../components/ui/SelectField';
import { InputField } from '../../components/ui/InputField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Trophy, Crown, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { formatCurrencyM } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

const DEFAULT_POOL: BestXIPlayer[] = [
  { id: '1', name: 'David Raya', position: 'GK', projectedPoints: 6.2, cost: 5.5 },
  { id: '2', name: 'Alisson Becker', position: 'GK', projectedPoints: 5.8, cost: 5.5 },
  { id: '3', name: 'William Saliba', position: 'DEF', projectedPoints: 6.5, cost: 6.0 },
  { id: '4', name: 'Gabriel Magalhães', position: 'DEF', projectedPoints: 6.8, cost: 6.2 },
  { id: '5', name: 'Trent Alexander-Arnold', position: 'DEF', projectedPoints: 7.2, cost: 7.0 },
  { id: '6', name: 'Joško Gvardiol', position: 'DEF', projectedPoints: 5.9, cost: 6.0 },
  { id: '7', name: 'Pedro Porro', position: 'DEF', projectedPoints: 5.4, cost: 5.5 },
  { id: '8', name: 'Antonee Robinson', position: 'DEF', projectedPoints: 4.8, cost: 4.8 },
  { id: '9', name: 'Mohamed Salah', position: 'MID', projectedPoints: 9.8, cost: 13.0 },
  { id: '10', name: 'Bukayo Saka', position: 'MID', projectedPoints: 8.9, cost: 10.5 },
  { id: '11', name: 'Cole Palmer', position: 'MID', projectedPoints: 9.1, cost: 11.0 },
  { id: '12', name: 'Bryan Mbeumo', position: 'MID', projectedPoints: 7.2, cost: 7.8 },
  { id: '13', name: 'Antoine Semenyo', position: 'MID', projectedPoints: 5.5, cost: 5.7 },
  { id: '14', name: 'Morgan Rogers', position: 'MID', projectedPoints: 5.2, cost: 5.3 },
  { id: '15', name: 'Erling Haaland', position: 'FWD', projectedPoints: 10.5, cost: 15.2 },
  { id: '16', name: 'Alexander Isak', position: 'FWD', projectedPoints: 8.2, cost: 8.5 },
  { id: '17', name: 'Nicolas Jackson', position: 'FWD', projectedPoints: 6.8, cost: 7.9 },
  { id: '18', name: 'Matheus Cunha', position: 'FWD', projectedPoints: 6.4, cost: 6.8 },
  { id: '19', name: 'Yoane Wissa', position: 'FWD', projectedPoints: 5.8, cost: 6.1 },
  { id: '20', name: 'Chris Wood', position: 'FWD', projectedPoints: 6.2, cost: 6.5 },
];

export const BestXiSelectorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'best-xi-selector')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [formation, setFormation] = useState<string>('4-3-3');
  const [budget, setBudget] = useState<number>(100.0);
  const [pool, setPool] = useState<BestXIPlayer[]>(DEFAULT_POOL);

  const [newName, setNewName] = useState('');
  const [newPosition, setNewPosition] = useState<'GK' | 'DEF' | 'MID' | 'FWD'>('MID');
  const [newPoints, setNewPoints] = useState<number>(6.5);
  const [newCost, setNewCost] = useState<number>(7.5);

  const result = selectBestXI(pool, formation, Number(budget) || 100.0);

  const handleAddPlayer = () => {
    if (!newName.trim()) return;
    const p: BestXIPlayer = {
      id: Date.now().toString(),
      name: newName.trim(),
      position: newPosition,
      projectedPoints: isNaN(Number(newPoints)) ? 0 : Math.max(0, Number(newPoints)),
      cost: isNaN(Number(newCost)) ? 4.0 : Math.max(0, Number(newCost)),
    };
    setPool([...pool, p]);
    setNewName('');
  };

  const handleReset = () => {
    setFormation('4-3-3');
    setBudget(100.0);
    setPool(DEFAULT_POOL);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['captain-pick-analyzer', 'fantasy-football-points', 'transfer-suggestion']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SelectField
              id="best-xi-formation"
              label={labels.formation || 'Tactical Formation'}
              value={formation}
              onChange={setFormation}
              options={[
                { value: '4-3-3', label: '4-3-3 (1 GK, 4 DEF, 3 MID, 3 FWD)' },
                { value: '3-4-3', label: '3-4-3 (1 GK, 3 DEF, 4 MID, 3 FWD)' },
                { value: '3-5-2', label: '3-5-2 (1 GK, 3 DEF, 5 MID, 2 FWD)' },
                { value: '4-4-2', label: '4-4-2 (1 GK, 4 DEF, 4 MID, 2 FWD)' },
                { value: '5-3-2', label: '5-3-2 (1 GK, 5 DEF, 3 MID, 2 FWD)' },
                { value: '4-2-3-1', label: '4-2-3-1 (1 GK, 4 DEF, 5 MID, 1 FWD)' },
              ]}
            />
            <InputField
              id="best-xi-budget"
              label={labels.budget || 'Squad Budget Limit (£M / €M)'}
              value={budget}
              onChange={setBudget}
              min={50}
              max={150}
              step={0.5}
              prefix="£"
              suffix="M"
              required
            />
            <div className="flex items-end">
              <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />} className="w-full">
                {labels.resetPool || t.common.reset}
              </Button>
            </div>
          </div>

          {/* Quick Add Player to Pool */}
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-green-600" />
              {labels.addCustomPlayer || 'Add Custom Player to Pool'} ({pool.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <InputField
                id="pool-name"
                label={labels.playerName || 'Player Name'}
                value={newName}
                onChange={setNewName}
                placeholder="e.g. Son Heung-min"
              />
              <SelectField
                id="pool-pos"
                label={labels.position || 'Position'}
                value={newPosition}
                onChange={(val) => setNewPosition(val as any)}
                options={[
                  { value: 'GK', label: 'GK' },
                  { value: 'DEF', label: 'DEF' },
                  { value: 'MID', label: 'MID' },
                  { value: 'FWD', label: 'FWD' },
                ]}
              />
              <InputField
                id="pool-pts"
                label={labels.projectedPoints || 'Proj. Points'}
                value={newPoints}
                onChange={setNewPoints}
                min={0}
                max={25}
                step={0.1}
              />
              <InputField
                id="pool-cost"
                label={labels.cost || 'Cost (£M)'}
                value={newCost}
                onChange={setNewCost}
                min={3.5}
                max={20}
                step={0.1}
                prefix="£"
              />
              <div className="flex items-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddPlayer}
                  disabled={!newName.trim()}
                  className="w-full"
                >
                  {labels.addPlayer || 'Add to Pool'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          {!result.isFeasible && (
            <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-medium space-y-1">
              <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Infeasible Squad Configuration
              </div>
              <p>{result.infeasibleReason}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard
              title={labels.projectedPoints || 'Projected Starting XI Points'}
              value={`${result.totalProjectedPoints.toFixed(1)} pts`}
              subtitle={`Formation: ${formation}`}
              badge={{ text: 'Optimized Lineup' }}
              variant="primary"
            />

            <ResultCard
              title={labels.totalCost || 'Total Lineup Cost'}
              value={`£${result.totalCost.toFixed(1)}M`}
              subtitle={`Budget: £${budget}M`}
              variant="secondary"
            />

            <ResultCard
              title={labels.remainingBank || 'Remaining Bank Buffer'}
              value={`£${result.remainingBudget.toFixed(1)}M`}
              subtitle="Bank"
              variant="neutral"
            />

            <ResultCard
              title={labels.captainRecommendation || 'Captain Pick Recommendation'}
              value={result.captainRecommendation ? result.captainRecommendation.name : 'N/A'}
              subtitle={
                result.captainRecommendation
                  ? `${result.captainRecommendation.projectedPoints} pts (${(result.captainRecommendation.projectedPoints * 2).toFixed(1)} 2x)`
                  : 'N/A'
              }
              badge={{ text: '2x Armband', color: 'bg-amber-500 text-white' }}
              variant="neutral"
            />
          </div>

          {/* Starting XI Lineup Roster */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>{labels.optimalLineup || 'Optimized Starting 11 Selection'} ({formation})</span>
              <span className="text-green-600 font-mono">
                {result.selectedXI.length} {labels.playersSelected || 'Players'}
              </span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {result.selectedXI.map((p) => {
                const isCaptain = result.captainRecommendation?.id === p.id;
                return (
                  <div key={p.id} className="p-3 flex items-center justify-between hover:bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        p.position === 'FWD' ? 'bg-red-100 text-red-700' :
                        p.position === 'MID' ? 'bg-green-100 text-green-700' :
                        p.position === 'DEF' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {p.position}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{p.name}</span>
                        {isCaptain && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                            <Crown className="w-3 h-3 text-amber-600" /> Captain (2x)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-gray-500">£{p.cost.toFixed(1)}M</span>
                      <span className="font-bold text-green-600">
                        {p.projectedPoints.toFixed(1)} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    />
  );
};

