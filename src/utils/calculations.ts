import { safeDivide, clamp } from './formatters';

// 1. Player Performance Rater
export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface PlayerRaterInput {
  position: PlayerPosition;
  goals: number;
  assists: number;
  passAccuracy: number; // 0-100%
  shotsOnTargetPercent: number; // 0-100%
  dribbles: number;
  tackles: number;
  saves?: number;
  cleanSheet?: boolean;
}

export interface PlayerRaterResult {
  score: number; // 0-100
  label: 'Poor' | 'Average' | 'Good' | 'Excellent' | 'World Class';
  badgeColor: string;
  breakdown: {
    attackingContribution: number;
    distributionRating: number;
    defensiveWork: number;
    rawScore: number;
  };
}

export function calculatePlayerPerformance(input: PlayerRaterInput): PlayerRaterResult {
  const { position, goals, assists, passAccuracy, shotsOnTargetPercent, dribbles, tackles, saves = 0, cleanSheet = false } = input;
  let raw = 0;

  switch (position) {
    case 'FWD':
      raw = (goals * 3) + (assists * 2) + (shotsOnTargetPercent * 0.3) + (passAccuracy * 0.2) + (dribbles * 1.5);
      break;
    case 'MID':
      raw = (goals * 2) + (assists * 2.5) + (passAccuracy * 0.4) + (dribbles * 1.5) + (tackles * 1.5);
      break;
    case 'DEF':
      raw = (tackles * 3) + (passAccuracy * 0.4) + (goals * 1.5) + (assists * 1) + (cleanSheet ? 5 : 0);
      break;
    case 'GK':
      raw = (passAccuracy * 0.5) + (tackles * 2) + (saves * 3) + (cleanSheet ? 8 : 0);
      break;
  }

  // Normalize/clamp nicely so realistic good performances hit 70-90
  // Benchmark maximum expected raw score is ~50-60 points -> map linearly to 0-100
  const normalized = clamp(Math.round((raw / 55) * 100), 10, 99);

  let label: PlayerRaterResult['label'] = 'Average';
  let badgeColor = 'bg-yellow-500 text-white';

  if (normalized < 50) {
    label = 'Poor';
    badgeColor = 'bg-red-500 text-white';
  } else if (normalized < 65) {
    label = 'Average';
    badgeColor = 'bg-amber-500 text-white';
  } else if (normalized < 80) {
    label = 'Good';
    badgeColor = 'bg-blue-600 text-white';
  } else if (normalized < 90) {
    label = 'Excellent';
    badgeColor = 'bg-emerald-600 text-white';
  } else {
    label = 'World Class';
    badgeColor = 'bg-purple-600 text-white';
  }

  return {
    score: normalized,
    label,
    badgeColor,
    breakdown: {
      attackingContribution: Math.round((goals * 3) + (assists * 2) + (shotsOnTargetPercent * 0.2)),
      distributionRating: Math.round(passAccuracy * 0.8),
      defensiveWork: Math.round((tackles * 4) + (saves * 3)),
      rawScore: Number(raw.toFixed(1)),
    },
  };
}

// 2. Team Comparison
export interface TeamStats {
  name: string;
  goalsPerGame: number;
  possession: number; // %
  shotsPerGame: number;
  shotsOnTargetPerGame: number;
  passAccuracy: number; // %
  tacklesPerGame: number;
  cornersPerGame: number;
}

export interface TeamComparisonResult {
  categories: {
    name: string;
    teamAValue: number;
    teamBValue: number;
    winner: 'Team A' | 'Team B' | 'Tie';
    unit: string;
  }[];
  teamAWins: number;
  teamBWins: number;
  ties: number;
  teamADominance: number; // %
  teamBDominance: number; // %
  overallWinner: string;
}

export function compareTeams(teamA: TeamStats, teamB: TeamStats): TeamComparisonResult {
  const metricList = [
    { key: 'goalsPerGame', name: 'Goals / Game', unit: '' },
    { key: 'possession', name: 'Possession %', unit: '%' },
    { key: 'shotsPerGame', name: 'Shots / Game', unit: '' },
    { key: 'shotsOnTargetPerGame', name: 'Shots on Target / Game', unit: '' },
    { key: 'passAccuracy', name: 'Pass Accuracy %', unit: '%' },
    { key: 'tacklesPerGame', name: 'Tackles / Game', unit: '' },
    { key: 'cornersPerGame', name: 'Corners / Game', unit: '' },
  ] as const;

  let teamAWins = 0;
  let teamBWins = 0;
  let ties = 0;

  const categories = metricList.map((m) => {
    const valA = teamA[m.key as keyof TeamStats] as number;
    const valB = teamB[m.key as keyof TeamStats] as number;
    let winner: 'Team A' | 'Team B' | 'Tie' = 'Tie';
    if (valA > valB) {
      winner = 'Team A';
      teamAWins++;
    } else if (valB > valA) {
      winner = 'Team B';
      teamBWins++;
    } else {
      ties++;
    }
    return {
      name: m.name,
      teamAValue: valA,
      teamBValue: valB,
      winner,
      unit: m.unit,
    };
  });

  const teamADominance = Math.round((teamAWins / 7) * 100);
  const teamBDominance = Math.round((teamBWins / 7) * 100);

  let overallWinner = 'Even Contest (Draw)';
  if (teamAWins > teamBWins) overallWinner = `${teamA.name || 'Team A'} Dominates`;
  else if (teamBWins > teamAWins) overallWinner = `${teamB.name || 'Team B'} Dominates`;

  return {
    categories,
    teamAWins,
    teamBWins,
    ties,
    teamADominance,
    teamBDominance,
    overallWinner,
  };
}

// 3. Pass Accuracy Calculator
export interface PassAccuracyInput {
  totalPasses: number;
  completedPasses: number;
  keyPasses: number;
  longBallsAttempted: number;
  longBallsCompleted: number;
}

export function calculatePassAccuracy(input: PassAccuracyInput) {
  const passAccuracy = clamp(safeDivide(input.completedPasses, input.totalPasses) * 100, 0, 100);
  const longBallAccuracy = clamp(safeDivide(input.longBallsCompleted, input.longBallsAttempted) * 100, 0, 100);
  const rawQuality = (passAccuracy * 0.6) + (input.keyPasses * 2) + (longBallAccuracy * 0.4);
  const qualityScore = clamp(Math.round(rawQuality), 0, 100);

  let ratingLabel = 'Standard Distributor';
  if (qualityScore >= 85) ratingLabel = 'Elite Playmaker / Master Distributor';
  else if (qualityScore >= 75) ratingLabel = 'High Precision Progressive Passer';
  else if (qualityScore >= 60) ratingLabel = 'Competent Possession Recycler';
  else ratingLabel = 'Low Retention / Risk-Heavy Passer';

  return {
    passAccuracy,
    longBallAccuracy,
    qualityScore,
    ratingLabel,
  };
}

// 4. Shot Conversion Rate
export interface ShotConversionInput {
  totalShots: number;
  goals: number;
  shotsOnTarget: number;
  bigChances: number;
  bigChancesMissed: number;
}

export function calculateShotConversion(input: ShotConversionInput) {
  const conversionRate = clamp(safeDivide(input.goals, input.totalShots) * 100, 0, 100);
  const onTargetConversion = clamp(safeDivide(input.goals, input.shotsOnTarget) * 100, 0, 100);
  const bigChancesScored = Math.max(0, input.bigChances - input.bigChancesMissed);
  const bigChanceConversion = clamp(safeDivide(bigChancesScored, input.bigChances) * 100, 0, 100);

  let efficiencyRating = 'Average Finishing';
  if (conversionRate >= 22) efficiencyRating = 'Clinical / World-Class Lethality';
  else if (conversionRate >= 16) efficiencyRating = 'High Efficiency Finisher';
  else if (conversionRate >= 10) efficiencyRating = 'Standard League Average';
  else efficiencyRating = 'Wasteful / Low Conversion';

  return {
    conversionRate,
    onTargetConversion,
    bigChanceConversion,
    efficiencyRating,
  };
}

// 5. Possession Impact Analyzer
export interface PossessionImpactInput {
  possessionPercent: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
}

export function calculatePossessionImpact(input: PossessionImpactInput) {
  const winRate = clamp(safeDivide(input.wins, input.matches) * 100, 0, 100);
  const goalsPerGame = safeDivide(input.goalsScored, input.matches);
  const concededPerGame = safeDivide(input.goalsConceded, input.matches);
  const efficiencyIndex = safeDivide(winRate, input.possessionPercent);

  let verdict = 'Balanced Possession';
  if (efficiencyIndex >= 1.3) verdict = 'Lethal High-Return Possession (Elite Conversion)';
  else if (efficiencyIndex >= 0.9) verdict = 'Productive Possession with Solid Returns';
  else if (efficiencyIndex >= 0.6) verdict = 'Sterile Domination (High Ball Control, Low Punch)';
  else verdict = 'Vulnerable Possession (High Risk of Counter-Attacks)';

  return {
    winRate,
    goalsPerGame,
    concededPerGame,
    efficiencyIndex: Number(efficiencyIndex.toFixed(2)),
    verdict,
  };
}

// 6. Player Form Index
export interface PlayerFormInput {
  goalsLast5: number;
  assistsLast5: number;
  avgRatingLast5: number; // 1-10
  minutesLast5: number;
  yellowCards: number;
  redCards: number;
}

export function calculatePlayerForm(input: PlayerFormInput) {
  const base = (input.goalsLast5 * 1.5) + (input.assistsLast5 * 1.2) + (input.avgRatingLast5 * 0.8);
  const deductions = (input.yellowCards * 0.3) + (input.redCards * 1.0);
  const minutesBonus = input.minutesLast5 > 400 ? 0.5 : 0;
  const rawScore = base - deductions + minutesBonus;
  const formScore = clamp(Number(rawScore.toFixed(1)), 1.0, 10.0);

  let label = 'Average';
  if (formScore >= 8.5) label = 'Red hot';
  else if (formScore >= 7.0) label = 'Good';
  else if (formScore >= 5.0) label = 'Average';
  else label = 'Out of form';

  return {
    formScore,
    label,
    basePoints: Number(base.toFixed(1)),
    deductions: Number(deductions.toFixed(1)),
    minutesBonus,
  };
}

// 7. Transfer Value Estimator
export interface TransferValueInput {
  age: number;
  position: 'GK' | 'DEF' | 'MID' | 'WIN' | 'FWD';
  goalsSeason: number;
  assistsSeason: number;
  leagueLevel: 'Tier1' | 'Tier2' | 'Tier3'; // Tier 1: Premier League/La Liga (1.5x), Tier 2: Eredivisie/Championship (1.1x), Tier 3: Other (0.8x)
  contractYears: number; // 1-5+
  internationalCaps: number;
}

export function calculateTransferValue(input: TransferValueInput) {
  const baseValues = { GK: 8, DEF: 10, MID: 12, WIN: 15, FWD: 18 };
  const base = baseValues[input.position] || 12;

  // Age multiplier (peak 23-27 = 1.35x, <21 = 1.2x wonderkid, >31 = 0.6x)
  let ageMult = 1.0;
  if (input.age < 21) ageMult = 1.25;
  else if (input.age <= 24) ageMult = 1.35;
  else if (input.age <= 28) ageMult = 1.25;
  else if (input.age <= 30) ageMult = 0.95;
  else if (input.age <= 33) ageMult = 0.65;
  else ageMult = 0.35;

  // Performance multiplier
  const gAndA = input.goalsSeason + input.assistsSeason;
  let perfMult = 1.0 + (gAndA * 0.05);
  perfMult = clamp(perfMult, 0.8, 2.5);

  // League multiplier
  const leagueMultipliers = { Tier1: 1.5, Tier2: 1.1, Tier3: 0.8 };
  const leagueMult = leagueMultipliers[input.leagueLevel] || 1.0;

  // Contract multiplier
  let contractMult = 1.0;
  if (input.contractYears <= 1) contractMult = 0.65;
  else if (input.contractYears === 2) contractMult = 0.9;
  else if (input.contractYears === 3) contractMult = 1.1;
  else contractMult = 1.3;

  // International bonus
  let capsBonus = 0;
  if (input.internationalCaps > 30) capsBonus = 6;
  else if (input.internationalCaps > 10) capsBonus = 3;
  else if (input.internationalCaps > 0) capsBonus = 1;

  const estimatedValue = Number(((base * ageMult * perfMult * leagueMult * contractMult) + capsBonus).toFixed(1));
  const rangeLow = Number((estimatedValue * 0.8).toFixed(1));
  const rangeHigh = Number((estimatedValue * 1.2).toFixed(1));

  return {
    estimatedValue,
    rangeLow,
    rangeHigh,
    breakdown: {
      basePositional: base,
      ageMultiplier: ageMult,
      performanceMultiplier: Number(perfMult.toFixed(2)),
      leagueMultiplier: leagueMult,
      contractMultiplier: contractMult,
      capsBonus,
    },
  };
}

// 8. Wage Calculator
export interface WageInput {
  transferValueM: number;
  leagueLevel: 'Tier1' | 'Tier2' | 'Tier3';
  squadStatus: 'Key' | 'FirstTeam' | 'Rotation' | 'Youth';
  age: number;
}

export interface WageStructureInput {
  currency: '£' | '€' | '$';
  baseWeeklyWage: number;
  goalBonus: number;
  cleanSheetBonus: number;
  appearanceFee: number;
  matchesPlayed: number;
  goalsScored: number;
  cleanSheetsKept: number;
}

export function calculateWageStructure(input: WageStructureInput) {
  const baseWeeklyWage = Math.round(input.baseWeeklyWage);
  const baseAnnual = Math.round(baseWeeklyWage * 52);
  const monthlyBase = Math.round(baseWeeklyWage * 4.333);
  
  const totalGoalBonuses = Math.round(input.goalBonus * input.goalsScored);
  const totalCleanSheetBonuses = Math.round(input.cleanSheetBonus * input.cleanSheetsKept);
  const totalAppearanceFees = Math.round(input.appearanceFee * input.matchesPlayed);
  const totalBonuses = totalGoalBonuses + totalCleanSheetBonuses + totalAppearanceFees;
  
  const totalAnnualEarnings = baseAnnual + totalBonuses;
  const effectiveWeeklyWage = Math.round(totalAnnualEarnings / 52);

  return {
    currency: input.currency,
    weeklyBase: baseWeeklyWage,
    monthlyBase,
    baseAnnual,
    totalGoalBonuses,
    totalCleanSheetBonuses,
    totalAppearanceFees,
    totalBonuses,
    totalAnnualEarnings,
    effectiveWeeklyWage,
  };
}

export function calculateWage(input: WageInput) {
  const leagueFactors = { Tier1: 1000, Tier2: 600, Tier3: 350 };
  const leagueFactor = leagueFactors[input.leagueLevel] || 800;

  const statusMultipliers = { Key: 1.4, FirstTeam: 1.0, Rotation: 0.65, Youth: 0.35 };
  const statusMult = statusMultipliers[input.squadStatus] || 1.0;

  const rawWeekly = (input.transferValueM * leagueFactor) * statusMult;
  const weeklyWage = Math.max(1000, Math.round(rawWeekly));
  const monthlyWage = Math.round(weeklyWage * 4.333);
  const annualWage = Math.round(weeklyWage * 52);

  return {
    weeklyWage,
    monthlyWage,
    annualWage,
  };
}

// 9. Squad Value Calculator
export interface SquadPlayer {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  valueMillions: number;
  age: number;
}

export function calculateSquadValue(players: SquadPlayer[]) {
  if (!players.length) {
    return {
      totalValue: 0,
      averageValue: 0,
      averageAge: 0,
      startingXiValue: 0,
      benchValue: 0,
      mostValuable: null,
      byPosition: { GK: 0, DEF: 0, MID: 0, FWD: 0 },
      sortedPlayers: [],
    };
  }

  const sortedPlayers = [...players].sort((a, b) => b.valueMillions - a.valueMillions);
  const totalValue = players.reduce((sum, p) => sum + (typeof p.valueMillions === 'number' && !isNaN(p.valueMillions) ? p.valueMillions : 0), 0);
  const averageValue = totalValue / players.length;
  const averageAge = players.reduce((sum, p) => sum + (typeof p.age === 'number' && !isNaN(p.age) ? p.age : 0), 0) / players.length;

  const startingXI = sortedPlayers.slice(0, 11);
  const startingXiValue = startingXI.reduce((sum, p) => sum + (typeof p.valueMillions === 'number' && !isNaN(p.valueMillions) ? p.valueMillions : 0), 0);
  const benchValue = Math.max(0, totalValue - startingXiValue);
  const mostValuable = sortedPlayers[0] || null;

  const byPosition = {
    GK: players.filter((p) => p.position === 'GK').reduce((sum, p) => sum + (typeof p.valueMillions === 'number' && !isNaN(p.valueMillions) ? p.valueMillions : 0), 0),
    DEF: players.filter((p) => p.position === 'DEF').reduce((sum, p) => sum + (typeof p.valueMillions === 'number' && !isNaN(p.valueMillions) ? p.valueMillions : 0), 0),
    MID: players.filter((p) => p.position === 'MID').reduce((sum, p) => sum + (typeof p.valueMillions === 'number' && !isNaN(p.valueMillions) ? p.valueMillions : 0), 0),
    FWD: players.filter((p) => p.position === 'FWD').reduce((sum, p) => sum + (typeof p.valueMillions === 'number' && !isNaN(p.valueMillions) ? p.valueMillions : 0), 0),
  };

  return {
    totalValue: Number(totalValue.toFixed(1)),
    averageValue: Number(averageValue.toFixed(1)),
    averageAge: Number(averageAge.toFixed(1)),
    startingXiValue: Number(startingXiValue.toFixed(1)),
    benchValue: Number(benchValue.toFixed(1)),
    mostValuable,
    byPosition,
    sortedPlayers,
  };
}

// 10. Contract Worth Analyzer
export interface ContractWorthInput {
  transferFee: number;
  annualSalary: number;
  contractYears: number;
  agentFee: number;
  signingBonus: number;
  expectedMatchesPerSeason: number;
}

export function calculateContractWorth(input: ContractWorthInput) {
  const totalSalary = input.annualSalary * input.contractYears;
  const totalCommitment = input.transferFee + totalSalary + input.agentFee + input.signingBonus;
  const annualCost = safeDivide(totalCommitment, input.contractYears);
  const amortizationPerYear = safeDivide(input.transferFee, input.contractYears);
  const costPerMatch = safeDivide(annualCost * 1_000_000, input.expectedMatchesPerSeason);

  return {
    totalCommitment: Number(totalCommitment.toFixed(2)),
    annualCost: Number(annualCost.toFixed(2)),
    amortizationPerYear: Number(amortizationPerYear.toFixed(2)),
    costPerMatch: Math.round(costPerMatch),
  };
}

// 11. Fantasy Football Points
export type FantasyPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface FantasyPointsInput {
  position: FantasyPosition;
  minutesPlayed: number;
  goalsScored: number;
  assists: number;
  cleanSheet: boolean;
  goalsConceded: number;
  yellowCards: number;
  redCards: number;
  ownGoals: number;
  penaltySaves: number;
  penaltyMisses: number;
  saves: number;
  bonusPoints: number;
  cbit?: number;
  cbirt?: number;
}

export function calculateFantasyPoints(input: FantasyPointsInput) {
  let minutesPoints = 0;
  if (input.minutesPlayed >= 60) minutesPoints = 2;
  else if (input.minutesPlayed > 0) minutesPoints = 1;

  let goalValue = 4;
  if (input.position === 'GK') goalValue = 10;
  else if (input.position === 'DEF') goalValue = 6;
  else if (input.position === 'MID') goalValue = 5;
  else if (input.position === 'FWD') goalValue = 4;
  const goalPoints = input.goalsScored * goalValue;

  const assistPoints = input.assists * 3;

  let cleanSheetPoints = 0;
  if (input.cleanSheet && input.minutesPlayed >= 60) {
    if (input.position === 'GK' || input.position === 'DEF') cleanSheetPoints = 4;
    else if (input.position === 'MID') cleanSheetPoints = 1;
  }

  let concededPoints = 0;
  if ((input.position === 'GK' || input.position === 'DEF') && input.goalsConceded >= 2) {
    concededPoints = -Math.floor(input.goalsConceded / 2);
  }

  // Defensive Contribution scoring:
  // DEF: +2 for 10+ CBIT (Clearances, Blocks, Interceptions, Tackles)
  // MID/FWD: +2 for 12+ CBIRT (CBIT + Recoveries)
  let defContributionPoints = 0;
  if (input.position === 'DEF' && (input.cbit ?? 0) >= 10) {
    defContributionPoints = 2;
  } else if ((input.position === 'MID' || input.position === 'FWD') && (input.cbirt ?? 0) >= 12) {
    defContributionPoints = 2;
  }

  const yellowPoints = input.yellowCards * -1;
  const redPoints = input.redCards * -3;
  const ownGoalPoints = input.ownGoals * -2;
  const penaltySavePoints = input.penaltySaves * 5;
  const penaltyMissPoints = input.penaltyMisses * -2;
  const savesPoints = Math.floor(input.saves / 3);

  const breakdown = [
    { item: `Appearance (${input.minutesPlayed} mins)`, points: minutesPoints },
    { item: `Goals Scored (${input.goalsScored} × ${goalValue} pts)`, points: goalPoints },
    { item: `Assists (${input.assists} × 3 pts)`, points: assistPoints },
    { item: `Clean Sheet`, points: cleanSheetPoints },
    { item: `Goals Conceded (${input.goalsConceded})`, points: concededPoints },
    { item: `Defensive Contribution Bonus`, points: defContributionPoints },
    { item: `Yellow Cards (${input.yellowCards})`, points: yellowPoints },
    { item: `Red Cards (${input.redCards})`, points: redPoints },
    { item: `Own Goals (${input.ownGoals})`, points: ownGoalPoints },
    { item: `Penalty Saves (${input.penaltySaves})`, points: penaltySavePoints },
    { item: `Penalty Misses (${input.penaltyMisses})`, points: penaltyMissPoints },
    { item: `Goalkeeper Saves (${input.saves})`, points: savesPoints },
    { item: `Bonus Points`, points: input.bonusPoints },
  ].filter((b) => b.points !== 0 || b.item.includes('Appearance'));

  const totalPoints =
    minutesPoints +
    goalPoints +
    assistPoints +
    cleanSheetPoints +
    concededPoints +
    defContributionPoints +
    yellowPoints +
    redPoints +
    ownGoalPoints +
    penaltySavePoints +
    penaltyMissPoints +
    savesPoints +
    input.bonusPoints;

  return {
    totalPoints,
    breakdown,
  };
}

// 12. Best XI Selector
export interface BestXIPlayer {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  projectedPoints: number;
  cost: number;
}

export function selectBestXI(players: BestXIPlayer[], formation: string, budget: number) {
  const formationQuotas: Record<string, { GK: number; DEF: number; MID: number; FWD: number }> = {
    '4-4-2': { GK: 1, DEF: 4, MID: 4, FWD: 2 },
    '4-3-3': { GK: 1, DEF: 4, MID: 3, FWD: 3 },
    '4-2-3-1': { GK: 1, DEF: 4, MID: 5, FWD: 1 },
    '3-5-2': { GK: 1, DEF: 3, MID: 5, FWD: 2 },
    '5-3-2': { GK: 1, DEF: 5, MID: 3, FWD: 2 },
    '3-4-3': { GK: 1, DEF: 3, MID: 4, FWD: 3 },
  };

  const quota = formationQuotas[formation] || formationQuotas['4-3-3'];

  // Categorize available players by position
  const byPosition: Record<'GK' | 'DEF' | 'MID' | 'FWD', BestXIPlayer[]> = {
    GK: players.filter((p) => p.position === 'GK').sort((a, b) => b.projectedPoints - a.projectedPoints),
    DEF: players.filter((p) => p.position === 'DEF').sort((a, b) => b.projectedPoints - a.projectedPoints),
    MID: players.filter((p) => p.position === 'MID').sort((a, b) => b.projectedPoints - a.projectedPoints),
    FWD: players.filter((p) => p.position === 'FWD').sort((a, b) => b.projectedPoints - a.projectedPoints),
  };

  // Initial selection: take the highest-scoring players for each position
  let selectedXI: BestXIPlayer[] = [
    ...byPosition.GK.slice(0, quota.GK),
    ...byPosition.DEF.slice(0, quota.DEF),
    ...byPosition.MID.slice(0, quota.MID),
    ...byPosition.FWD.slice(0, quota.FWD),
  ];

  let totalCost = selectedXI.reduce((sum, p) => sum + (Number(p.cost) || 0), 0);

  // If over budget, iteratively perform optimal downgrades to fit within budget
  let maxIterations = 50;
  while (totalCost > budget && maxIterations > 0) {
    maxIterations--;
    let bestSwap: { selectedIdx: number; replacement: BestXIPlayer; ratio: number } | null = null;

    for (let i = 0; i < selectedXI.length; i++) {
      const current = selectedXI[i];
      const availableCandidates = byPosition[current.position].filter(
        (cand) => !selectedXI.some((s) => s.id === cand.id) && cand.cost < current.cost
      );

      for (const cand of availableCandidates) {
        const deltaCost = current.cost - cand.cost;
        const deltaPoints = current.projectedPoints - cand.projectedPoints;
        const ratio = deltaPoints / deltaCost; // Lower is better (least point loss per unit savings)

        if (!bestSwap || ratio < bestSwap.ratio) {
          bestSwap = { selectedIdx: i, replacement: cand, ratio };
        }
      }
    }

    if (bestSwap) {
      selectedXI[bestSwap.selectedIdx] = bestSwap.replacement;
      totalCost = selectedXI.reduce((sum, p) => sum + (Number(p.cost) || 0), 0);
    } else {
      // No more cheaper replacements available
      break;
    }
  }

  // Upgrades pass: if within budget, try to upgrade players with remaining surplus
  let upgradeIterations = 20;
  while (upgradeIterations > 0) {
    upgradeIterations--;
    const currentRemaining = budget - totalCost;
    if (currentRemaining <= 0.1) break;

    let bestUpgrade: { selectedIdx: number; replacement: BestXIPlayer; pointGain: number } | null = null;

    for (let i = 0; i < selectedXI.length; i++) {
      const current = selectedXI[i];
      const availableCandidates = byPosition[current.position].filter(
        (cand) =>
          !selectedXI.some((s) => s.id === cand.id) &&
          cand.projectedPoints > current.projectedPoints &&
          cand.cost - current.cost <= currentRemaining + 0.001
      );

      for (const cand of availableCandidates) {
        const pointGain = cand.projectedPoints - current.projectedPoints;
        if (!bestUpgrade || pointGain > bestUpgrade.pointGain) {
          bestUpgrade = { selectedIdx: i, replacement: cand, pointGain };
        }
      }
    }

    if (bestUpgrade) {
      selectedXI[bestUpgrade.selectedIdx] = bestUpgrade.replacement;
      totalCost = selectedXI.reduce((sum, p) => sum + (Number(p.cost) || 0), 0);
    } else {
      break;
    }
  }

  const finalTotalCost = Number(selectedXI.reduce((sum, p) => sum + p.cost, 0).toFixed(1));
  const totalProjectedPoints = Number(selectedXI.reduce((sum, p) => sum + p.projectedPoints, 0).toFixed(1));
  const remainingBudget = Number(Math.max(0, budget - finalTotalCost).toFixed(1));

  // Determine feasibility
  const hasEnoughPlayers =
    byPosition.GK.length >= quota.GK &&
    byPosition.DEF.length >= quota.DEF &&
    byPosition.MID.length >= quota.MID &&
    byPosition.FWD.length >= quota.FWD;
  const isBudgetFeasible = finalTotalCost <= budget;
  const isFeasible = hasEnoughPlayers && selectedXI.length === 11 && isBudgetFeasible;

  let infeasibleReason = '';
  if (!hasEnoughPlayers || selectedXI.length < 11) {
    infeasibleReason = `Insufficient players in pool for formation ${formation}. Required: ${quota.GK} GK, ${quota.DEF} DEF, ${quota.MID} MID, ${quota.FWD} FWD.`;
  } else if (!isBudgetFeasible) {
    infeasibleReason = `Unable to select an 11-player squad within the £${budget}M budget (minimum feasible cost: £${finalTotalCost}M).`;
  }

  // Captain recommendation: highest projected points in starting XI
  const captainRecommendation = selectedXI.length
    ? [...selectedXI].sort((a, b) => b.projectedPoints - a.projectedPoints)[0]
    : null;

  return {
    selectedXI,
    totalProjectedPoints,
    totalCost: finalTotalCost,
    remainingBudget,
    captainRecommendation,
    isFeasible,
    infeasibleReason,
  };
}

// 13. Captain Pick Analyzer
export interface CaptainCandidate {
  id: string;
  name: string;
  form: number; // 1-10
  fixtureDifficulty: number; // 1-5 (1=easiest, 5=hardest)
  isHome: boolean;
  historicAgainstOpponent: number;
  teamAttackingStrength: number;
}

export function analyzeCaptains(candidates: CaptainCandidate[]) {
  return candidates
    .map((c) => {
      const homeBonus = c.isHome ? 1.1 : 1.0;
      const fixtureScore = (6 - c.fixtureDifficulty) * 20; // 20-100
      const formScore = c.form * 10; // 10-100
      const historyScore = Math.min(100, c.historicAgainstOpponent * 15);
      const teamAttackScore = Math.min(100, c.teamAttackingStrength * 35);

      const rawScore =
        (formScore * 0.3) +
        (fixtureScore * 0.25) +
        (homeBonus * 10 * 0.15) +
        (historyScore * 0.15) +
        (teamAttackScore * 0.15);

      const score = Math.round(clamp(rawScore, 10, 99));

      let riskLevel = 'Low Risk (Safe Pick)';
      if (c.fixtureDifficulty >= 4 && !c.isHome) riskLevel = 'High Risk (Tough Matchup)';
      else if (c.form < 6) riskLevel = 'Moderate Risk (Volatile Form)';

      return {
        ...c,
        score,
        riskLevel,
      };
    })
    .sort((a, b) => b.score - a.score);
}

// 14. Transfer Suggestion
export interface TransferPlayer {
  name: string;
  cost: number;
  form: number;
  next3Fdr: number;
  expectedMinutes: number;
}

export function evaluateTransfer(playerOut: TransferPlayer, playerIn: TransferPlayer, bankBudget: number) {
  const costDiff = playerIn.cost - playerOut.cost;
  const affordable = bankBudget >= costDiff;

  const formDiff = playerIn.form - playerOut.form;
  const fdrAdvantage = playerOut.next3Fdr - playerIn.next3Fdr; // higher is better
  const minutesAdvantage = (playerIn.expectedMinutes - playerOut.expectedMinutes) / 10;

  const rawScore = (formDiff * 6) + (fdrAdvantage * 12) + (minutesAdvantage * 2) + 50;
  const viabilityScore = clamp(Math.round(rawScore), 10, 99);

  let verdict = 'Consider';
  if (!affordable) verdict = 'Unaffordable';
  else if (viabilityScore >= 75) verdict = 'Strong Buy';
  else if (viabilityScore >= 55) verdict = 'Consider';
  else if (viabilityScore >= 40) verdict = 'Sidegrade';
  else verdict = 'Avoid';

  const projectedGain = Number(Math.max(-2, (formDiff * 0.8 + fdrAdvantage * 1.2)).toFixed(1));

  return {
    verdict,
    viabilityScore,
    affordable,
    budgetImpact: costDiff,
    projectedGain,
  };
}

// 15. League Table Simulator
export interface SimLeagueTeam {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
}

export function simulateLeagueTable(teams: SimLeagueTeam[]) {
  return teams
    .map((t) => {
      const pts = (t.won * 3) + t.drawn;
      const gd = t.gf - t.ga;
      return {
        ...t,
        pts,
        gd,
      };
    })
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.name.localeCompare(b.name);
    });
}

// 16. Points Needed Calculator
export interface PointsNeededParams {
  currentPoints: number;
  targetPoints: number;
  gamesRemaining: number;
}

export function calculatePointsNeeded(input: PointsNeededParams) {
  const pointsDeficit = Math.max(0, input.targetPoints - input.currentPoints);
  const maxPossiblePoints = input.currentPoints + (input.gamesRemaining * 3);
  const pointsPerGameNeeded = input.gamesRemaining > 0 ? safeDivide(pointsDeficit, input.gamesRemaining) : 0;

  let feasibilityStatus = 'Achievable';
  if (pointsDeficit === 0) feasibilityStatus = 'Achieved';
  else if (maxPossiblePoints < input.targetPoints) feasibilityStatus = 'Mathematically Impossible';
  else if (pointsPerGameNeeded > 2.5) feasibilityStatus = 'Miracle Required (>2.5 PPG)';
  else if (pointsPerGameNeeded > 2.0) feasibilityStatus = 'Difficult (2.0–2.5 PPG)';
  else if (pointsPerGameNeeded <= 1.2) feasibilityStatus = 'Very Likely (<1.2 PPG)';
  else feasibilityStatus = 'Achievable (1.2–2.0 PPG)';

  // Calculate viable W-D-L combinations
  const viableCombinations: { wins: number; draws: number; losses: number; totalPoints: number }[] = [];
  if (maxPossiblePoints >= input.targetPoints && pointsDeficit > 0) {
    for (let w = 0; w <= input.gamesRemaining; w++) {
      for (let d = 0; d <= input.gamesRemaining - w; d++) {
        const l = input.gamesRemaining - w - d;
        const pts = (w * 3) + d;
        if (pts >= pointsDeficit) {
          viableCombinations.push({ wins: w, draws: d, losses: l, totalPoints: input.currentPoints + pts });
        }
      }
    }
  }

  return {
    pointsDeficit,
    maxPossiblePoints,
    pointsPerGameNeeded,
    feasibilityStatus,
    viableCombinations: viableCombinations.slice(0, 6),
  };
}

// 17. Head to Head Stats
export interface HeadToHeadData {
  teamAName: string;
  teamBName: string;
  totalMatches: number;
  teamAWins: number;
  draws: number;
  teamBWins: number;
  teamAGoals: number;
  teamBGoals: number;
}

export function calculateHeadToHead(input: HeadToHeadData) {
  const teamAWinRate = safeDivide(input.teamAWins, input.totalMatches) * 100;
  const drawRate = safeDivide(input.draws, input.totalMatches) * 100;
  const teamBWinRate = safeDivide(input.teamBWins, input.totalMatches) * 100;

  const totalGoals = input.teamAGoals + input.teamBGoals;
  const avgGoalsPerMatch = safeDivide(totalGoals, input.totalMatches);

  let verdict = 'Evenly Matched Historical Rivalry';
  if (input.teamAWins > input.teamBWins + 3) {
    verdict = `${input.teamAName || 'Team A'} Holds Historic Dominance`;
  } else if (input.teamBWins > input.teamAWins + 3) {
    verdict = `${input.teamBName || 'Team B'} Holds Historic Dominance`;
  }

  return {
    teamAWinRate,
    drawRate,
    teamBWinRate,
    totalGoals,
    avgGoalsPerMatch,
    verdict,
  };
}

// 18. Season Goals Tracker
export interface SeasonGoalsParams {
  goals: number;
  gamesPlayed: number;
  totalSeasonGames: number;
  minutesPlayed: number;
  penaltiesScored: number;
}

export function calculateSeasonGoals(input: SeasonGoalsParams) {
  const goalsPerGame = safeDivide(input.goals, input.gamesPlayed);
  const minutesPerGoal = safeDivide(input.minutesPlayed, input.goals);
  const projectedTotal = Math.round(goalsPerGame * input.totalSeasonGames);

  const nonPenaltyGoals = Math.max(0, input.goals - input.penaltiesScored);
  const nonPenaltyGPG = safeDivide(nonPenaltyGoals, input.gamesPlayed);

  let paceTier = 'Standard Striker Pace';
  if (projectedTotal >= 30) paceTier = 'Historic / Ballon d’Or Contender';
  else if (projectedTotal >= 24) paceTier = 'Golden Boot Frontrunner';
  else if (projectedTotal >= 18) paceTier = 'Elite European Striker';
  else if (projectedTotal >= 12) paceTier = 'Reliable First-Team Scorer';
  else paceTier = 'Developing / Low Volume';

  return {
    goalsPerGame,
    minutesPerGoal,
    projectedTotal,
    nonPenaltyGoals,
    nonPenaltyGPG,
    paceTier,
  };
}

// 19. Tactical Formation Analyzer
export type TacticalStyle = 'Possession' | 'Counter-Attack' | 'High Press' | 'Low Block';

export function analyzeFormation(formation: string, style: TacticalStyle) {
  const baseRatings: Record<string, { attack: number; defense: number; midfield: number; width: number; counter: number }> = {
    '4-3-3': { attack: 85, defense: 70, midfield: 78, width: 90, counter: 72 },
    '4-2-3-1': { attack: 82, defense: 78, midfield: 85, width: 80, counter: 60 },
    '3-5-2': { attack: 80, defense: 82, midfield: 92, width: 68, counter: 55 },
    '3-4-3': { attack: 88, defense: 68, midfield: 75, width: 85, counter: 78 },
    '4-4-2': { attack: 74, defense: 84, midfield: 70, width: 75, counter: 50 },
    '5-3-2': { attack: 65, defense: 92, midfield: 72, width: 60, counter: 40 },
    '4-1-4-1': { attack: 72, defense: 80, midfield: 84, width: 78, counter: 58 },
    '5-2-3': { attack: 76, defense: 88, midfield: 64, width: 82, counter: 52 },
  };

  const base = baseRatings[formation] || baseRatings['4-3-3'];

  // Style offsets
  let attackMod = 0;
  let defMod = 0;
  let midMod = 0;
  let counterMod = 0;

  if (style === 'Possession') {
    midMod += 8;
    counterMod += 8;
  } else if (style === 'Counter-Attack') {
    attackMod += 6;
    counterMod -= 10;
  } else if (style === 'High Press') {
    attackMod += 8;
    counterMod += 10;
  } else if (style === 'Low Block') {
    defMod += 12;
    attackMod -= 8;
    counterMod -= 12;
  }

  const attackRating = clamp(base.attack + attackMod, 10, 99);
  const defenseRating = clamp(base.defense + defMod, 10, 99);
  const midfieldControl = clamp(base.midfield + midMod, 10, 99);
  const widthRating = clamp(base.width, 10, 99);
  const counterVulnerability = clamp(base.counter + counterMod, 10, 99);

  const strengths = [
    `Natural passing triangles suited for ${style.toLowerCase()} build-up`,
    `Numerical superiority in high-value central spaces`,
    `Strong width generation along the attacking flanks`,
  ];

  const weaknesses = [
    `Susceptibility to direct transitions when wingbacks overlap`,
    `Requires high-stamina central midfielders to maintain coverage`,
  ];

  const bestCounterFormations = ['3-5-2 Counter', '4-2-3-1 Mid-Block', '5-3-2 Low Block'];

  const formationLayouts: Record<string, { defenders: number; midfielders: number; forwards: number }> = {
    '4-3-3': { defenders: 4, midfielders: 3, forwards: 3 },
    '4-2-3-1': { defenders: 4, midfielders: 5, forwards: 1 },
    '3-5-2': { defenders: 3, midfielders: 5, forwards: 2 },
    '3-4-3': { defenders: 3, midfielders: 4, forwards: 3 },
    '4-4-2': { defenders: 4, midfielders: 4, forwards: 2 },
    '5-3-2': { defenders: 5, midfielders: 3, forwards: 2 },
    '4-1-4-1': { defenders: 4, midfielders: 5, forwards: 1 },
    '5-2-3': { defenders: 5, midfielders: 2, forwards: 3 },
  };

  return {
    attackRating,
    defenseRating,
    midfieldControl,
    widthRating,
    counterVulnerability,
    strengths,
    weaknesses,
    bestCounterFormations,
    positionsLayout: formationLayouts[formation] || { defenders: 4, midfielders: 3, forwards: 3 },
  };
}

// 20. Pressing Intensity Calculator
export interface PressingIntensityParams {
  opponentPassesInDefensiveZone: number;
  tacklesInZone: number;
  interceptionsInZone: number;
  challengesInZone: number;
  highTurnoversWon: number;
  turnoverShotsGenerated: number;
}

export function calculatePressingIntensity(input: PressingIntensityParams) {
  const defensiveActions = input.tacklesInZone + input.interceptionsInZone + input.challengesInZone;
  const ppda = safeDivide(input.opponentPassesInDefensiveZone, defensiveActions);
  const turnoverShotConversion = safeDivide(input.turnoverShotsGenerated, input.highTurnoversWon) * 100;

  let pressingTier = 'Moderate Mid-Block';
  if (ppda < 8.0 && ppda > 0) pressingTier = 'Relentless Gegenpress (<8.0 PPDA)';
  else if (ppda < 11.0 && ppda > 0) pressingTier = 'High Press (8.0–10.9 PPDA)';
  else if (ppda < 15.0 && ppda > 0) pressingTier = 'Moderate / Mid-Block (11.0–14.9 PPDA)';
  else pressingTier = 'Passive Low Block (≥15.0 PPDA)';

  return {
    ppda,
    defensiveActions,
    turnoverShotConversion,
    pressingTier,
  };
}

// 21. Set Piece Success Rate
export interface SetPieceParams {
  cornersTaken: number;
  cornerShotsGenerated: number;
  cornerGoals: number;
  directFkTaken: number;
  directFkShotsOnTarget: number;
  directFkGoals: number;
  indirectFkTaken: number;
  indirectFkGoals: number;
  penaltiesTaken: number;
  penaltiesScored: number;
}

export function calculateSetPieceSuccess(input: SetPieceParams) {
  const cornerGoalRate = safeDivide(input.cornerGoals, input.cornersTaken) * 100;
  const cornerShotGeneration = safeDivide(input.cornerShotsGenerated, input.cornersTaken) * 100;
  const cornerShotConversion = safeDivide(input.cornerGoals, input.cornerShotsGenerated) * 100;
  const directFkAccuracy = safeDivide(input.directFkShotsOnTarget, input.directFkTaken) * 100;
  const directFkConversion = safeDivide(input.directFkGoals, input.directFkTaken) * 100;
  const indirectFkConversion = safeDivide(input.indirectFkGoals, input.indirectFkTaken) * 100;
  const penaltyConversion = safeDivide(input.penaltiesScored, input.penaltiesTaken) * 100;

  const rawScore =
    (cornerGoalRate * 5) +
    (cornerShotGeneration * 0.4) +
    (directFkAccuracy * 0.2) +
    (directFkConversion * 1.5) +
    (indirectFkConversion * 2) +
    (penaltyConversion * 0.2);

  const overallEfficiencyScore = clamp(Math.round(rawScore), 10, 99);

  let threatRating = 'Standard Dead-Ball Threat';
  if (overallEfficiencyScore >= 75) threatRating = 'Elite Set-Piece Specialists';
  else if (overallEfficiencyScore >= 50) threatRating = 'Above Average Danger';
  else if (overallEfficiencyScore >= 30) threatRating = 'Standard Dead-Ball Threat';
  else threatRating = 'Low Efficiency / Wasteful';

  return {
    cornerGoalRate,
    cornerShotGeneration,
    cornerShotConversion,
    directFkAccuracy,
    directFkConversion,
    indirectFkConversion,
    penaltyConversion,
    overallEfficiencyScore,
    threatRating,
  };
}
