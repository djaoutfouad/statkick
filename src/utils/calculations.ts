import { safeDivide, clamp, sanitizeNumericInput } from './formatters';

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
  const position = input.position || 'FWD';
  const goals = sanitizeNumericInput(input.goals, 0, 0, 100);
  const assists = sanitizeNumericInput(input.assists, 0, 0, 100);
  const passAccuracy = sanitizeNumericInput(input.passAccuracy, 0, 0, 100);
  const shotsOnTargetPercent = sanitizeNumericInput(input.shotsOnTargetPercent, 0, 0, 100);
  const dribbles = sanitizeNumericInput(input.dribbles, 0, 0, 100);
  const tackles = sanitizeNumericInput(input.tackles, 0, 0, 100);
  const saves = sanitizeNumericInput(input.saves, 0, 0, 100);
  const cleanSheet = Boolean(input.cleanSheet);
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
  const sanitizeTeam = (t: TeamStats): TeamStats => ({
    name: t?.name || 'Team',
    goalsPerGame: sanitizeNumericInput(t?.goalsPerGame, 0, 0, 20),
    possession: sanitizeNumericInput(t?.possession, 50, 0, 100),
    shotsPerGame: sanitizeNumericInput(t?.shotsPerGame, 0, 0, 100),
    shotsOnTargetPerGame: sanitizeNumericInput(t?.shotsOnTargetPerGame, 0, 0, 50),
    passAccuracy: sanitizeNumericInput(t?.passAccuracy, 0, 0, 100),
    tacklesPerGame: sanitizeNumericInput(t?.tacklesPerGame, 0, 0, 100),
    cornersPerGame: sanitizeNumericInput(t?.cornersPerGame, 0, 0, 50),
  });

  const cleanTeamA = sanitizeTeam(teamA);
  const cleanTeamB = sanitizeTeam(teamB);

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
    const valA = cleanTeamA[m.key as keyof TeamStats] as number;
    const valB = cleanTeamB[m.key as keyof TeamStats] as number;
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
  if (teamAWins > teamBWins) overallWinner = `${cleanTeamA.name || 'Team A'} Dominates`;
  else if (teamBWins > teamAWins) overallWinner = `${cleanTeamB.name || 'Team B'} Dominates`;

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
  const totalPasses = sanitizeNumericInput(input?.totalPasses, 0, 0, 1000);
  const completedPasses = clamp(sanitizeNumericInput(input?.completedPasses, 0, 0, 1000), 0, totalPasses);
  const longBallsAttempted = sanitizeNumericInput(input?.longBallsAttempted, 0, 0, 200);
  const longBallsCompleted = clamp(sanitizeNumericInput(input?.longBallsCompleted, 0, 0, 200), 0, longBallsAttempted);
  const keyPasses = sanitizeNumericInput(input?.keyPasses, 0, 0, 100);

  const passAccuracy = clamp(safeDivide(completedPasses, totalPasses) * 100, 0, 100);
  const longBallAccuracy = clamp(safeDivide(longBallsCompleted, longBallsAttempted) * 100, 0, 100);
  const rawQuality = (passAccuracy * 0.6) + (keyPasses * 2) + (longBallAccuracy * 0.4);
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
  const totalShots = sanitizeNumericInput(input?.totalShots, 0, 0, 500);
  const goals = clamp(sanitizeNumericInput(input?.goals, 0, 0, 500), 0, totalShots);
  const shotsOnTarget = clamp(sanitizeNumericInput(input?.shotsOnTarget, 0, 0, 500), 0, totalShots);
  const bigChances = sanitizeNumericInput(input?.bigChances, 0, 0, 200);
  const bigChancesMissed = clamp(sanitizeNumericInput(input?.bigChancesMissed, 0, 0, 200), 0, bigChances);

  const conversionRate = clamp(safeDivide(goals, totalShots) * 100, 0, 100);
  const onTargetConversion = clamp(safeDivide(goals, shotsOnTarget) * 100, 0, 100);
  const bigChancesScored = Math.max(0, bigChances - bigChancesMissed);
  const bigChanceConversion = clamp(safeDivide(bigChancesScored, bigChances) * 100, 0, 100);

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
  const possessionPercent = sanitizeNumericInput(input?.possessionPercent, 50, 0, 100);
  const matches = sanitizeNumericInput(input?.matches, 0, 0, 100);
  const wins = sanitizeNumericInput(input?.wins, 0, 0, matches || 100);
  const draws = sanitizeNumericInput(input?.draws, 0, 0, matches || 100);
  const losses = sanitizeNumericInput(input?.losses, 0, 0, matches || 100);
  const goalsScored = sanitizeNumericInput(input?.goalsScored, 0, 0, 500);
  const goalsConceded = sanitizeNumericInput(input?.goalsConceded, 0, 0, 500);

  const winRate = clamp(safeDivide(wins, matches) * 100, 0, 100);
  const goalsPerGame = safeDivide(goalsScored, matches);
  const concededPerGame = safeDivide(goalsConceded, matches);
  const efficiencyIndex = safeDivide(winRate, possessionPercent);

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
  const goalsLast5 = sanitizeNumericInput(input?.goalsLast5, 0, 0, 30);
  const assistsLast5 = sanitizeNumericInput(input?.assistsLast5, 0, 0, 30);
  const avgRatingLast5 = sanitizeNumericInput(input?.avgRatingLast5, 6.0, 1.0, 10.0);
  const minutesLast5 = sanitizeNumericInput(input?.minutesLast5, 0, 0, 600);
  const yellowCards = sanitizeNumericInput(input?.yellowCards, 0, 0, 10);
  const redCards = sanitizeNumericInput(input?.redCards, 0, 0, 5);

  const base = (goalsLast5 * 1.5) + (assistsLast5 * 1.2) + (avgRatingLast5 * 0.8);
  const deductions = (yellowCards * 0.3) + (redCards * 1.0);
  const minutesBonus = minutesLast5 > 400 ? 0.5 : 0;
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
  leagueLevel: 'Tier1' | 'Tier2' | 'Tier3';
  contractYears: number;
  internationalCaps: number;
}

export function calculateTransferValue(input: TransferValueInput) {
  const age = sanitizeNumericInput(input?.age, 25, 14, 50);
  const position = input?.position || 'MID';
  const goalsSeason = sanitizeNumericInput(input?.goalsSeason, 0, 0, 150);
  const assistsSeason = sanitizeNumericInput(input?.assistsSeason, 0, 0, 150);
  const leagueLevel = input?.leagueLevel || 'Tier1';
  const contractYears = sanitizeNumericInput(input?.contractYears, 3, 0, 10);
  const internationalCaps = sanitizeNumericInput(input?.internationalCaps, 0, 0, 300);

  const baseValues = { GK: 8, DEF: 10, MID: 12, WIN: 15, FWD: 18 };
  const base = baseValues[position] || 12;

  // Age multiplier (peak 23-27 = 1.35x, <21 = 1.25x wonderkid, >31 = 0.65x)
  let ageMult = 1.0;
  if (age < 21) ageMult = 1.25;
  else if (age <= 24) ageMult = 1.35;
  else if (age <= 28) ageMult = 1.25;
  else if (age <= 30) ageMult = 0.95;
  else if (age <= 33) ageMult = 0.65;
  else ageMult = 0.35;

  // Performance multiplier
  const gAndA = goalsSeason + assistsSeason;
  let perfMult = 1.0 + (gAndA * 0.05);
  perfMult = clamp(perfMult, 0.8, 2.5);

  // League multiplier
  const leagueMultipliers = { Tier1: 1.5, Tier2: 1.1, Tier3: 0.8 };
  const leagueMult = leagueMultipliers[leagueLevel] || 1.0;

  // Contract multiplier
  let contractMult = 1.0;
  if (contractYears <= 1) contractMult = 0.65;
  else if (contractYears === 2) contractMult = 0.9;
  else if (contractYears === 3) contractMult = 1.1;
  else contractMult = 1.3;

  // International bonus
  let capsBonus = 0;
  if (internationalCaps > 30) capsBonus = 6;
  else if (internationalCaps > 10) capsBonus = 3;
  else if (internationalCaps > 0) capsBonus = 1;

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
  const currency = input?.currency || '€';
  const baseWeeklyWage = Math.round(sanitizeNumericInput(input?.baseWeeklyWage, 0, 0, 10_000_000));
  const goalBonus = Math.round(sanitizeNumericInput(input?.goalBonus, 0, 0, 5_000_000));
  const cleanSheetBonus = Math.round(sanitizeNumericInput(input?.cleanSheetBonus, 0, 0, 5_000_000));
  const appearanceFee = Math.round(sanitizeNumericInput(input?.appearanceFee, 0, 0, 5_000_000));
  const matchesPlayed = Math.round(sanitizeNumericInput(input?.matchesPlayed, 0, 0, 100));
  const goalsScored = Math.round(sanitizeNumericInput(input?.goalsScored, 0, 0, 150));
  const cleanSheetsKept = Math.round(sanitizeNumericInput(input?.cleanSheetsKept, 0, 0, 100));

  const baseAnnual = Math.round(baseWeeklyWage * 52);
  const monthlyBase = Math.round(baseWeeklyWage * 4.333);
  
  const totalGoalBonuses = Math.round(goalBonus * goalsScored);
  const totalCleanSheetBonuses = Math.round(cleanSheetBonus * cleanSheetsKept);
  const totalAppearanceFees = Math.round(appearanceFee * matchesPlayed);
  const totalBonuses = totalGoalBonuses + totalCleanSheetBonuses + totalAppearanceFees;
  
  const totalAnnualEarnings = baseAnnual + totalBonuses;
  const effectiveWeeklyWage = Math.round(totalAnnualEarnings / 52);

  return {
    currency,
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
  const transferValueM = sanitizeNumericInput(input?.transferValueM, 0, 0, 1000);
  const leagueLevel = input?.leagueLevel || 'Tier1';
  const squadStatus = input?.squadStatus || 'FirstTeam';

  const leagueFactors = { Tier1: 1000, Tier2: 600, Tier3: 350 };
  const leagueFactor = leagueFactors[leagueLevel] || 800;

  const statusMultipliers = { Key: 1.4, FirstTeam: 1.0, Rotation: 0.65, Youth: 0.35 };
  const statusMult = statusMultipliers[squadStatus] || 1.0;

  const rawWeekly = (transferValueM * leagueFactor) * statusMult;
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
  if (!Array.isArray(players) || !players.length) {
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

  const cleanPlayers = players.map((p) => ({
    ...p,
    valueMillions: sanitizeNumericInput(p.valueMillions, 0, 0, 1000),
    age: sanitizeNumericInput(p.age, 0, 0, 100),
  }));

  const sortedPlayers = [...cleanPlayers].sort((a, b) => b.valueMillions - a.valueMillions);
  const totalValue = cleanPlayers.reduce((sum, p) => sum + p.valueMillions, 0);
  const averageValue = totalValue / cleanPlayers.length;
  const averageAge = cleanPlayers.reduce((sum, p) => sum + p.age, 0) / cleanPlayers.length;

  const startingXI = sortedPlayers.slice(0, 11);
  const startingXiValue = startingXI.reduce((sum, p) => sum + p.valueMillions, 0);
  const benchValue = Math.max(0, totalValue - startingXiValue);
  const mostValuable = sortedPlayers[0] || null;

  const byPosition = {
    GK: cleanPlayers.filter((p) => p.position === 'GK').reduce((sum, p) => sum + p.valueMillions, 0),
    DEF: cleanPlayers.filter((p) => p.position === 'DEF').reduce((sum, p) => sum + p.valueMillions, 0),
    MID: cleanPlayers.filter((p) => p.position === 'MID').reduce((sum, p) => sum + p.valueMillions, 0),
    FWD: cleanPlayers.filter((p) => p.position === 'FWD').reduce((sum, p) => sum + p.valueMillions, 0),
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
  const transferFee = sanitizeNumericInput(input?.transferFee, 0, 0, 1000);
  const annualSalary = sanitizeNumericInput(input?.annualSalary, 0, 0, 200);
  const contractYears = Math.max(0.1, sanitizeNumericInput(input?.contractYears, 1, 0.1, 10));
  const agentFee = sanitizeNumericInput(input?.agentFee, 0, 0, 100);
  const signingBonus = sanitizeNumericInput(input?.signingBonus, 0, 0, 100);
  const expectedMatchesPerSeason = Math.max(1, sanitizeNumericInput(input?.expectedMatchesPerSeason, 38, 1, 100));

  const totalSalary = annualSalary * contractYears;
  const totalCommitment = transferFee + totalSalary + agentFee + signingBonus;
  const annualCost = safeDivide(totalCommitment, contractYears);
  const amortizationPerYear = safeDivide(transferFee, contractYears);
  const costPerMatch = safeDivide(annualCost * 1_000_000, expectedMatchesPerSeason);

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
  const position = input?.position || 'MID';
  const minutesPlayed = sanitizeNumericInput(input?.minutesPlayed, 0, 0, 150);
  const goalsScored = sanitizeNumericInput(input?.goalsScored, 0, 0, 20);
  const assists = sanitizeNumericInput(input?.assists, 0, 0, 20);
  const goalsConceded = sanitizeNumericInput(input?.goalsConceded, 0, 0, 30);
  const yellowCards = sanitizeNumericInput(input?.yellowCards, 0, 0, 5);
  const redCards = sanitizeNumericInput(input?.redCards, 0, 0, 2);
  const ownGoals = sanitizeNumericInput(input?.ownGoals, 0, 0, 5);
  const penaltySaves = sanitizeNumericInput(input?.penaltySaves, 0, 0, 5);
  const penaltyMisses = sanitizeNumericInput(input?.penaltyMisses, 0, 0, 5);
  const saves = sanitizeNumericInput(input?.saves, 0, 0, 50);
  const bonusPoints = sanitizeNumericInput(input?.bonusPoints, 0, 0, 3);
  const cbit = sanitizeNumericInput(input?.cbit, 0, 0, 100);
  const cbirt = sanitizeNumericInput(input?.cbirt, 0, 0, 100);

  let minutesPoints = 0;
  if (minutesPlayed >= 60) minutesPoints = 2;
  else if (minutesPlayed > 0) minutesPoints = 1;

  let goalValue = 4;
  if (position === 'GK') goalValue = 10;
  else if (position === 'DEF') goalValue = 6;
  else if (position === 'MID') goalValue = 5;
  else if (position === 'FWD') goalValue = 4;
  const goalPoints = goalsScored * goalValue;

  const assistPoints = assists * 3;

  let cleanSheetPoints = 0;
  if (input?.cleanSheet && minutesPlayed >= 60) {
    if (position === 'GK' || position === 'DEF') cleanSheetPoints = 4;
    else if (position === 'MID') cleanSheetPoints = 1;
  }

  let concededPoints = 0;
  if ((position === 'GK' || position === 'DEF') && goalsConceded >= 2) {
    concededPoints = -Math.floor(goalsConceded / 2);
  }

  let defContributionPoints = 0;
  if (position === 'DEF' && cbit >= 10) {
    defContributionPoints = 2;
  } else if ((position === 'MID' || position === 'FWD') && cbirt >= 12) {
    defContributionPoints = 2;
  }

  const yellowPoints = yellowCards * -1;
  const redPoints = redCards * -3;
  const ownGoalPoints = ownGoals * -2;
  const penaltySavePoints = penaltySaves * 5;
  const penaltyMissPoints = penaltyMisses * -2;
  const savesPoints = Math.floor(saves / 3);

  const breakdown = [
    { item: `Appearance (${minutesPlayed} mins)`, points: minutesPoints },
    { item: `Goals Scored (${goalsScored} × ${goalValue} pts)`, points: goalPoints },
    { item: `Assists (${assists} × 3 pts)`, points: assistPoints },
    { item: `Clean Sheet`, points: cleanSheetPoints },
    { item: `Goals Conceded (${goalsConceded})`, points: concededPoints },
    { item: `Defensive Contribution Bonus`, points: defContributionPoints },
    { item: `Yellow Cards (${yellowCards})`, points: yellowPoints },
    { item: `Red Cards (${redCards})`, points: redPoints },
    { item: `Own Goals (${ownGoals})`, points: ownGoalPoints },
    { item: `Penalty Saves (${penaltySaves})`, points: penaltySavePoints },
    { item: `Penalty Misses (${penaltyMisses})`, points: penaltyMissPoints },
    { item: `Goalkeeper Saves (${saves})`, points: savesPoints },
    { item: `Bonus Points`, points: bonusPoints },
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
    bonusPoints;

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

  const safeBudget = sanitizeNumericInput(budget, 100, 10, 500);
  const safePlayers = (Array.isArray(players) ? players : []).map((p) => ({
    ...p,
    cost: sanitizeNumericInput(p.cost, 4.0, 3.5, 20.0),
    projectedPoints: sanitizeNumericInput(p.projectedPoints, 0, 0, 50),
  }));

  const quota = formationQuotas[formation] || formationQuotas['4-3-3'];

  // Categorize available players by position
  const byPosition: Record<'GK' | 'DEF' | 'MID' | 'FWD', BestXIPlayer[]> = {
    GK: safePlayers.filter((p) => p.position === 'GK').sort((a, b) => b.projectedPoints - a.projectedPoints),
    DEF: safePlayers.filter((p) => p.position === 'DEF').sort((a, b) => b.projectedPoints - a.projectedPoints),
    MID: safePlayers.filter((p) => p.position === 'MID').sort((a, b) => b.projectedPoints - a.projectedPoints),
    FWD: safePlayers.filter((p) => p.position === 'FWD').sort((a, b) => b.projectedPoints - a.projectedPoints),
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
  while (totalCost > safeBudget && maxIterations > 0) {
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
      break;
    }
  }

  // Upgrades pass: if within budget, try to upgrade players with remaining surplus
  let upgradeIterations = 20;
  while (upgradeIterations > 0) {
    upgradeIterations--;
    const currentRemaining = safeBudget - totalCost;
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
  const remainingBudget = Number(Math.max(0, safeBudget - finalTotalCost).toFixed(1));

  // Determine feasibility
  const hasEnoughPlayers =
    byPosition.GK.length >= quota.GK &&
    byPosition.DEF.length >= quota.DEF &&
    byPosition.MID.length >= quota.MID &&
    byPosition.FWD.length >= quota.FWD;
  const isBudgetFeasible = finalTotalCost <= safeBudget;
  const isFeasible = hasEnoughPlayers && selectedXI.length === 11 && isBudgetFeasible;

  let infeasibleReason = '';
  if (!hasEnoughPlayers || selectedXI.length < 11) {
    infeasibleReason = `Insufficient players in pool for formation ${formation}. Required: ${quota.GK} GK, ${quota.DEF} DEF, ${quota.MID} MID, ${quota.FWD} FWD.`;
  } else if (!isBudgetFeasible) {
    infeasibleReason = `Unable to select an 11-player squad within the £${safeBudget}M budget (minimum feasible cost: £${finalTotalCost}M).`;
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
  return (Array.isArray(candidates) ? candidates : [])
    .map((c) => {
      const form = sanitizeNumericInput(c.form, 5.0, 1.0, 10.0);
      const fixtureDifficulty = sanitizeNumericInput(c.fixtureDifficulty, 3, 1, 5);
      const historicAgainstOpponent = sanitizeNumericInput(c.historicAgainstOpponent, 0, 0, 10);
      const teamAttackingStrength = sanitizeNumericInput(c.teamAttackingStrength, 3, 1, 5);
      const isHome = Boolean(c.isHome);

      const homeBonus = isHome ? 1.1 : 1.0;
      const fixtureScore = (6 - fixtureDifficulty) * 20; // 20-100
      const formScore = form * 10; // 10-100
      const historyScore = Math.min(100, historicAgainstOpponent * 15);
      const teamAttackScore = Math.min(100, teamAttackingStrength * 35);

      const rawScore =
        (formScore * 0.3) +
        (fixtureScore * 0.25) +
        (homeBonus * 10 * 0.15) +
        (historyScore * 0.15) +
        (teamAttackScore * 0.15);

      const score = Math.round(clamp(rawScore, 10, 99));

      let riskLevel = 'Low Risk (Safe Pick)';
      if (fixtureDifficulty >= 4 && !isHome) riskLevel = 'High Risk (Tough Matchup)';
      else if (form < 6) riskLevel = 'Moderate Risk (Volatile Form)';

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
  const safeBank = sanitizeNumericInput(bankBudget, 0, 0, 100);
  const outCost = sanitizeNumericInput(playerOut?.cost, 5.0, 3.5, 20.0);
  const inCost = sanitizeNumericInput(playerIn?.cost, 5.0, 3.5, 20.0);
  const outForm = sanitizeNumericInput(playerOut?.form, 5.0, 1.0, 10.0);
  const inForm = sanitizeNumericInput(playerIn?.form, 5.0, 1.0, 10.0);
  const outFdr = sanitizeNumericInput(playerOut?.next3Fdr, 3, 1, 5);
  const inFdr = sanitizeNumericInput(playerIn?.next3Fdr, 3, 1, 5);
  const outMins = sanitizeNumericInput(playerOut?.expectedMinutes, 90, 0, 90);
  const inMins = sanitizeNumericInput(playerIn?.expectedMinutes, 90, 0, 90);

  const costDiff = inCost - outCost;
  const affordable = safeBank >= costDiff;

  const formDiff = inForm - outForm;
  const fdrAdvantage = outFdr - inFdr; // higher is better
  const minutesAdvantage = (inMins - outMins) / 10;

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
    budgetImpact: Number(costDiff.toFixed(1)),
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
  return (Array.isArray(teams) ? teams : [])
    .map((t) => {
      const won = Math.max(0, sanitizeNumericInput(t.won, 0, 0, 100));
      const drawn = Math.max(0, sanitizeNumericInput(t.drawn, 0, 0, 100));
      const lost = Math.max(0, sanitizeNumericInput(t.lost, 0, 0, 100));
      const gf = Math.max(0, sanitizeNumericInput(t.gf, 0, 0, 300));
      const ga = Math.max(0, sanitizeNumericInput(t.ga, 0, 0, 300));
      const pts = (won * 3) + drawn;
      const gd = gf - ga;
      return {
        ...t,
        won,
        drawn,
        lost,
        gf,
        ga,
        pts,
        gd,
      };
    })
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return (a.name || '').localeCompare(b.name || '');
    });
}

// 16. Points Needed Calculator
export interface PointsNeededParams {
  currentPoints: number;
  targetPoints: number;
  gamesRemaining: number;
}

export function calculatePointsNeeded(input: PointsNeededParams) {
  const currentPoints = sanitizeNumericInput(input?.currentPoints, 0, 0, 150);
  const targetPoints = sanitizeNumericInput(input?.targetPoints, 0, 0, 150);
  const gamesRemaining = Math.max(0, Math.round(sanitizeNumericInput(input?.gamesRemaining, 0, 0, 50)));

  const pointsDeficit = Math.max(0, targetPoints - currentPoints);
  const maxPossiblePoints = currentPoints + (gamesRemaining * 3);
  const pointsPerGameNeeded = gamesRemaining > 0 ? safeDivide(pointsDeficit, gamesRemaining) : 0;

  let feasibilityStatus = 'Achievable';
  if (pointsDeficit === 0) feasibilityStatus = 'Achieved';
  else if (maxPossiblePoints < targetPoints) feasibilityStatus = 'Mathematically Impossible';
  else if (pointsPerGameNeeded > 2.5) feasibilityStatus = 'Miracle Required (>2.5 PPG)';
  else if (pointsPerGameNeeded > 2.0) feasibilityStatus = 'Difficult (2.0–2.5 PPG)';
  else if (pointsPerGameNeeded <= 1.2) feasibilityStatus = 'Very Likely (<1.2 PPG)';
  else feasibilityStatus = 'Achievable (1.2–2.0 PPG)';

  // Calculate viable W-D-L combinations
  const viableCombinations: { wins: number; draws: number; losses: number; totalPoints: number }[] = [];
  if (maxPossiblePoints >= targetPoints && pointsDeficit > 0) {
    for (let w = 0; w <= gamesRemaining; w++) {
      for (let d = 0; d <= gamesRemaining - w; d++) {
        const l = gamesRemaining - w - d;
        const pts = (w * 3) + d;
        if (pts >= pointsDeficit) {
          viableCombinations.push({ wins: w, draws: d, losses: l, totalPoints: currentPoints + pts });
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
  const totalMatches = Math.max(0, Math.round(sanitizeNumericInput(input?.totalMatches, 0, 0, 1000)));
  const teamAWins = Math.max(0, Math.round(sanitizeNumericInput(input?.teamAWins, 0, 0, totalMatches || 1000)));
  const draws = Math.max(0, Math.round(sanitizeNumericInput(input?.draws, 0, 0, totalMatches || 1000)));
  const teamBWins = Math.max(0, Math.round(sanitizeNumericInput(input?.teamBWins, 0, 0, totalMatches || 1000)));
  const teamAGoals = Math.max(0, Math.round(sanitizeNumericInput(input?.teamAGoals, 0, 0, 10000)));
  const teamBGoals = Math.max(0, Math.round(sanitizeNumericInput(input?.teamBGoals, 0, 0, 10000)));

  const teamAWinRate = safeDivide(teamAWins, totalMatches) * 100;
  const drawRate = safeDivide(draws, totalMatches) * 100;
  const teamBWinRate = safeDivide(teamBWins, totalMatches) * 100;

  const totalGoals = teamAGoals + teamBGoals;
  const avgGoalsPerMatch = safeDivide(totalGoals, totalMatches);

  let verdict = 'Evenly Matched Historical Rivalry';
  if (teamAWins > teamBWins + 3) {
    verdict = `${input?.teamAName || 'Team A'} Holds Historic Dominance`;
  } else if (teamBWins > teamAWins + 3) {
    verdict = `${input?.teamBName || 'Team B'} Holds Historic Dominance`;
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
  const goals = sanitizeNumericInput(input?.goals, 0, 0, 150);
  const gamesPlayed = Math.max(0, Math.round(sanitizeNumericInput(input?.gamesPlayed, 0, 0, 100)));
  const totalSeasonGames = Math.max(1, Math.round(sanitizeNumericInput(input?.totalSeasonGames, 38, 1, 100)));
  const minutesPlayed = sanitizeNumericInput(input?.minutesPlayed, 0, 0, 10000);
  const penaltiesScored = clamp(sanitizeNumericInput(input?.penaltiesScored, 0, 0, 50), 0, goals);

  const goalsPerGame = safeDivide(goals, gamesPlayed);
  const minutesPerGoal = safeDivide(minutesPlayed, goals);
  const projectedTotal = Math.round(goalsPerGame * totalSeasonGames);

  const nonPenaltyGoals = Math.max(0, goals - penaltiesScored);
  const nonPenaltyGPG = safeDivide(nonPenaltyGoals, gamesPlayed);

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
    `Natural passing triangles suited for ${(style || 'possession').toLowerCase()} build-up`,
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
  const opponentPassesInDefensiveZone = sanitizeNumericInput(input?.opponentPassesInDefensiveZone, 0, 0, 2000);
  const tacklesInZone = sanitizeNumericInput(input?.tacklesInZone, 0, 0, 500);
  const interceptionsInZone = sanitizeNumericInput(input?.interceptionsInZone, 0, 0, 500);
  const challengesInZone = sanitizeNumericInput(input?.challengesInZone, 0, 0, 500);
  const highTurnoversWon = sanitizeNumericInput(input?.highTurnoversWon, 0, 0, 200);
  const turnoverShotsGenerated = clamp(sanitizeNumericInput(input?.turnoverShotsGenerated, 0, 0, 200), 0, highTurnoversWon);

  const defensiveActions = tacklesInZone + interceptionsInZone + challengesInZone;
  const ppda = safeDivide(opponentPassesInDefensiveZone, defensiveActions);
  const turnoverShotConversion = safeDivide(turnoverShotsGenerated, highTurnoversWon) * 100;

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
  const cornersTaken = sanitizeNumericInput(input?.cornersTaken, 0, 0, 500);
  const cornerShotsGenerated = clamp(sanitizeNumericInput(input?.cornerShotsGenerated, 0, 0, 500), 0, cornersTaken);
  const cornerGoals = clamp(sanitizeNumericInput(input?.cornerGoals, 0, 0, 100), 0, cornerShotsGenerated);
  const directFkTaken = sanitizeNumericInput(input?.directFkTaken, 0, 0, 200);
  const directFkShotsOnTarget = clamp(sanitizeNumericInput(input?.directFkShotsOnTarget, 0, 0, 200), 0, directFkTaken);
  const directFkGoals = clamp(sanitizeNumericInput(input?.directFkGoals, 0, 0, 100), 0, directFkShotsOnTarget);
  const indirectFkTaken = sanitizeNumericInput(input?.indirectFkTaken, 0, 0, 200);
  const indirectFkGoals = clamp(sanitizeNumericInput(input?.indirectFkGoals, 0, 0, 100), 0, indirectFkTaken);
  const penaltiesTaken = sanitizeNumericInput(input?.penaltiesTaken, 0, 0, 50);
  const penaltiesScored = clamp(sanitizeNumericInput(input?.penaltiesScored, 0, 0, 50), 0, penaltiesTaken);

  const cornerGoalRate = safeDivide(cornerGoals, cornersTaken) * 100;
  const cornerShotGeneration = safeDivide(cornerShotsGenerated, cornersTaken) * 100;
  const cornerShotConversion = safeDivide(cornerGoals, cornerShotsGenerated) * 100;
  const directFkAccuracy = safeDivide(directFkShotsOnTarget, directFkTaken) * 100;
  const directFkConversion = safeDivide(directFkGoals, directFkTaken) * 100;
  const indirectFkConversion = safeDivide(indirectFkGoals, indirectFkTaken) * 100;
  const penaltyConversion = safeDivide(penaltiesScored, penaltiesTaken) * 100;

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
