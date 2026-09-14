import React, { useState } from 'react';
import { ToolLayout } from '../../components/tools/ToolLayout';
import { TOOLS_LIST } from '../../data/toolsList';
import { analyzeFormation, TacticalStyle } from '../../utils/calculations';
import { SelectField } from '../../components/ui/SelectField';
import { ResultCard } from '../../components/ui/ResultCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { RotateCcw, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const FormationAnalyzerPage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const tool = TOOLS_LIST.find((t) => t.slug === 'formation-analyzer')!;
  const tr = getToolTranslation(tool.slug);
  const labels = tr.labels || {};

  const [formation, setFormation] = useState<string>('4-3-3');
  const [style, setStyle] = useState<TacticalStyle>('Possession');

  const result = analyzeFormation(formation, style);

  const handleReset = () => {
    setFormation('4-3-3');
    setStyle('Possession');
  };

  return (
    <ToolLayout
      tool={tool}
      relatedSlugs={['pressing-intensity-calculator', 'team-comparison', 'possession-impact-analyzer']}
      calculatorNode={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              id="formation-select"
              label={labels.formation || 'Select Tactical Formation'}
              value={formation}
              onChange={setFormation}
              options={[
                { value: '4-3-3', label: '4-3-3' },
                { value: '4-2-3-1', label: '4-2-3-1' },
                { value: '3-5-2', label: '3-5-2' },
                { value: '3-4-3', label: '3-4-3' },
                { value: '4-4-2', label: '4-4-2' },
                { value: '5-3-2', label: '5-3-2' },
                { value: '4-1-4-1', label: '4-1-4-1' },
                { value: '5-2-3', label: '5-2-3' },
              ]}
            />
            <SelectField
              id="style-select"
              label={labels.style || 'Tactical Team Philosophy'}
              value={style}
              onChange={(val) => setStyle(val as TacticalStyle)}
              options={[
                { value: 'Possession', label: 'Possession / Positional Play' },
                { value: 'Counter-Attack', label: 'Direct Counter-Attack' },
                { value: 'High Press', label: 'Aggressive High Press' },
                { value: 'Low Block', label: 'Deep Low Block' },
              ]}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              {labels.resetDefaults || t.common.reset}
            </Button>
          </div>
        </div>
      }
      resultsNode={
        <div className="space-y-6">
          {/* Tactical Radar Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <ResultCard
              title={labels.attackingThreat || 'Attacking Threat'}
              value={`${result.attackRating}/100`}
              subtitle="Chance creation"
              variant="primary"
            >
              <ProgressBar value={result.attackRating} color="bg-green-600" />
            </ResultCard>

            <ResultCard
              title={labels.defensiveSolidity || 'Defensive Solidity'}
              value={`${result.defenseRating}/100`}
              subtitle="Compactness"
              variant="neutral"
            >
              <ProgressBar value={result.defenseRating} color="bg-blue-600" />
            </ResultCard>

            <ResultCard
              title={labels.midfieldControl || 'Midfield Control'}
              value={`${result.midfieldControl}/100`}
              subtitle="Central dominance"
              variant="neutral"
            >
              <ProgressBar value={result.midfieldControl} color="bg-purple-600" />
            </ResultCard>

            <ResultCard
              title={labels.flankWidth || 'Flank Width'}
              value={`${result.widthRating}/100`}
              subtitle="Wing capability"
              variant="neutral"
            >
              <ProgressBar value={result.widthRating} color="bg-amber-600" />
            </ResultCard>

            <ResultCard
              title={labels.counterVulnerability || 'Counter Vulnerability'}
              value={`${result.counterVulnerability}/100`}
              subtitle="Space left behind"
              variant="secondary"
            >
              <ProgressBar value={result.counterVulnerability} color="bg-red-600" />
            </ResultCard>
          </div>

          {/* Visual Pitch Representation */}
          <div className="rounded-2xl border border-gray-200 bg-emerald-900/90 text-white p-6 relative overflow-hidden shadow-inner min-h-[320px] flex flex-col justify-between">
            {/* Pitch Markings */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-t-2 border-emerald-500/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-emerald-500/40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-emerald-500/40 rounded-b-lg" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-emerald-500/40 rounded-t-lg" />

            <div className="relative z-10 text-center text-xs font-bold uppercase tracking-widest text-emerald-300">
              {formation} ({style})
            </div>

            {/* Tactical Lines */}
            <div className="relative z-10 space-y-8 my-auto py-4">
              {/* Forwards Line */}
              <div className="flex justify-around items-center px-12">
                {Array.from({ length: result.positionsLayout.forwards }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                      FW
                    </div>
                  </div>
                ))}
              </div>

              {/* Midfield Line */}
              <div className="flex justify-around items-center px-8">
                {Array.from({ length: result.positionsLayout.midfielders }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                      MF
                    </div>
                  </div>
                ))}
              </div>

              {/* Defense Line */}
              <div className="flex justify-around items-center px-6">
                {Array.from({ length: result.positionsLayout.defenders }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                      DF
                    </div>
                  </div>
                ))}
              </div>

              {/* GK */}
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                  GK
                </div>
              </div>
            </div>
          </div>

          {/* Strengths, Weaknesses & Counter-Tactic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-green-200 bg-green-50/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                {labels.strengths || 'Structural Strengths'}
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                {result.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-red-200 bg-red-50/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                {labels.weaknesses || 'Vulnerabilities'}
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                {result.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                {labels.counterFormations || 'Best Counter-Formations'}
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                {result.bestCounterFormations.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      }
    />
  );
};

