import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { calculateSquadValue, SquadPlayer } from '../../utils/calculations';
import { InputField } from '../../components/ui/InputField';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, RotateCcw, UserPlus } from 'lucide-react';
import { formatCurrencyM } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';

const DEFAULT_SQUAD: SquadPlayer[] = [
  { id: '1', name: 'David Raya', position: 'GK', valueMillions: 38, age: 29 },
  { id: '2', name: 'William Saliba', position: 'DEF', valueMillions: 80, age: 23 },
  { id: '3', name: 'Gabriel Magalhães', position: 'DEF', valueMillions: 75, age: 27 },
  { id: '4', name: 'Ben White', position: 'DEF', valueMillions: 55, age: 27 },
  { id: '5', name: 'Jurriën Timber', position: 'DEF', valueMillions: 45, age: 23 },
  { id: '6', name: 'Declan Rice', position: 'MID', valueMillions: 110, age: 26 },
  { id: '7', name: 'Martin Ødegaard', position: 'MID', valueMillions: 100, age: 26 },
  { id: '8', name: 'Mikel Merino', position: 'MID', valueMillions: 35, age: 28 },
  { id: '9', name: 'Bukayo Saka', position: 'MID', valueMillions: 140, age: 23 },
  { id: '10', name: 'Kai Havertz', position: 'FWD', valueMillions: 75, age: 25 },
  { id: '11', name: 'Gabriel Martinelli', position: 'FWD', valueMillions: 60, age: 23 },
];

export const SquadValueCalculatorPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'squad-value-calculator')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [players, setPlayers] = useState<SquadPlayer[]>(DEFAULT_SQUAD);
  const [newName, setNewName] = useState('');
  const [newPosition, setNewPosition] = useState<'GK' | 'DEF' | 'MID' | 'FWD'>('MID');
  const [newValue, setNewValue] = useState<number>(30);
  const [newAge, setNewAge] = useState<number>(24);

  const result = calculateSquadValue(players);

  const handleAddPlayer = () => {
    if (!newName.trim() || players.length >= 25) return;
    const newPlayer: SquadPlayer = {
      id: Date.now().toString(),
      name: newName.trim(),
      position: newPosition,
      valueMillions: isNaN(Number(newValue)) ? 0 : Math.max(0, Number(newValue)),
      age: isNaN(Number(newAge)) ? 24 : Math.max(15, Number(newAge)),
    };
    setPlayers([...players, newPlayer]);
    setNewName('');
    setNewValue(25);
    setNewAge(24);
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 1) return;
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handleReset = () => {
    setPlayers(DEFAULT_SQUAD);
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['transfer-value-estimator', 'contract-worth-analyzer', 'wage-calculator']}
      calculatorNode={
        <div className="space-y-6">
          {/* Add New Player Form */}
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-green-600" />
              {labels.addSquadPlayer || 'Add Squad Player'} ({players.length}/25)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <InputField
                id="new-player-name"
                label={labels.playerName || 'Player Name'}
                type="text"
                value={newName}
                onChange={setNewName}
                placeholder="e.g. Cole Palmer"
              />
              <SelectField
                id="new-player-pos"
                label={labels.position || 'Position'}
                value={newPosition}
                onChange={(val) => setNewPosition(val as any)}
                options={[
                  { value: 'GK', label: 'Goalkeeper (GK)' },
                  { value: 'DEF', label: 'Defender (DEF)' },
                  { value: 'MID', label: 'Midfielder (MID)' },
                  { value: 'FWD', label: 'Forward (FWD)' },
                ]}
              />
              <InputField
                id="new-player-val"
                label={labels.marketValue || 'Market Value (€M)'}
                value={newValue}
                onChange={setNewValue}
                min={0.1}
                max={300}
                step={1}
                prefix="€"
                suffix="M"
              />
              <InputField
                id="new-player-age"
                label={labels.age || 'Age'}
                value={newAge}
                onChange={setNewAge}
                min={16}
                max={42}
                step={1}
              />
              <div className="flex items-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddPlayer}
                  disabled={!newName.trim() || players.length >= 25}
                  icon={<Plus className="w-4 h-4" />}
                  className="w-full"
                >
                  {labels.addPlayer || 'Add Player'}
                </Button>
              </div>
            </div>
          </div>

          {/* Roster Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>{labels.squadRoster || 'Squad Roster'} ({players.length} {labels.players || 'Players'})</span>
              <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3 h-3" />}>
                {labels.resetRoster || t.common.reset}
              </Button>
            </div>
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
              {players.map((p) => (
                <div key={p.id} className="p-3 flex items-center justify-between text-xs hover:bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      p.position === 'FWD' ? 'bg-red-100 text-red-700' :
                      p.position === 'MID' ? 'bg-green-100 text-green-700' :
                      p.position === 'DEF' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {p.position}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-gray-500 text-[11px]">{labels.age || 'Age'}: {p.age}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-gray-900">
                      {formatCurrencyM(p.valueMillions)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(p.id)}
                      disabled={players.length <= 1}
                      className="text-gray-400 hover:text-red-600 disabled:opacity-30 p-1"
                      aria-label="Remove player"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard
              title={labels.totalSquadValuation || 'Total Squad Valuation'}
              value={formatCurrencyM(result.totalValue)}
              subtitle={`${players.length} players`}
              variant="primary"
            />

            <ResultCard
              title={labels.averagePlayerValue || 'Average Player Value'}
              value={formatCurrencyM(result.averageValue)}
              subtitle="Squad mean"
              variant="secondary"
            />

            <ResultCard
              title={labels.averageSquadAge || 'Average Squad Age'}
              value={`${result.averageAge.toFixed(1)} yrs`}
              subtitle={result.averageAge < 25 ? 'Young core' : 'Experienced squad'}
              variant="neutral"
            />

            <ResultCard
              title={labels.mvp || 'Most Valuable Player (MVP)'}
              value={result.mostValuable ? result.mostValuable.name : 'N/A'}
              subtitle={result.mostValuable ? formatCurrencyM(result.mostValuable.valueMillions) : 'N/A'}
              variant="neutral"
            />
          </div>

          {/* Positional Breakdown Bar */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              {labels.positionalFinancialDist || 'Positional Financial Distribution'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <div className="text-amber-700 font-medium">Goalkeepers</div>
                <div className="font-bold font-mono text-sm text-gray-900">{formatCurrencyM(result.byPosition.GK)}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-blue-700 font-medium">Defenders</div>
                <div className="font-bold font-mono text-sm text-gray-900">{formatCurrencyM(result.byPosition.DEF)}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-green-50 border border-green-200">
                <div className="text-green-700 font-medium">Midfielders</div>
                <div className="font-bold font-mono text-sm text-gray-900">{formatCurrencyM(result.byPosition.MID)}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                <div className="text-red-700 font-medium">Forwards</div>
                <div className="font-bold font-mono text-sm text-gray-900">{formatCurrencyM(result.byPosition.FWD)}</div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

