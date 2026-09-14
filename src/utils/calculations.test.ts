import { describe, it, expect } from 'vitest';
import {
  normalizeNumerals,
  normalizeDecimalInput,
  sanitizeNumericInput,
  formatInteger,
  formatDecimal,
  formatPercent,
  formatCurrencyM,
  formatCurrencyK,
  formatCurrencyExact,
  clamp,
  safeDivide,
} from './formatters';
import {
  calculatePlayerPerformance,
  compareTeams,
  calculatePassAccuracy,
  calculateShotConversion,
  calculatePossessionImpact,
  calculatePlayerForm,
  calculateTransferValue,
  calculateWageStructure,
  calculateWage,
  calculateSquadValue,
  calculateContractWorth,
  calculateFantasyPoints,
  selectBestXI,
  analyzeCaptains,
  evaluateTransfer,
  simulateLeagueTable,
  calculatePointsNeeded,
  calculateHeadToHead,
  calculateSeasonGoals,
  analyzeFormation,
  calculatePressingIntensity,
  calculateSetPieceSuccess,
  type BestXIPlayer,
  type SquadPlayer,
  type SimLeagueTeam,
} from './calculations';

describe('StatKick Calculations QA Test Suite (All 21 Tools)', () => {
  it('Tool 1: Player Performance Rater', () => {
    const res = calculatePlayerPerformance({
      position: 'FWD',
      goals: 2,
      assists: 1,
      passAccuracy: 85,
      shotsOnTargetPercent: 80,
      dribbles: 3,
      tackles: 1,
    });
    expect(res.score).toBeGreaterThanOrEqual(70);
    expect(res.score).toBeLessThanOrEqual(100);
    expect(res.breakdown.attackingContribution).toBeGreaterThan(0);
    expect(res.label).toBe('World Class');
  });

  it('Tool 2: Team Comparison Matrix', () => {
    const res = compareTeams(
      { name: 'Arsenal', goalsPerGame: 2.2, possession: 60, shotsPerGame: 16, shotsOnTargetPerGame: 7, passAccuracy: 88, tacklesPerGame: 18, cornersPerGame: 6 },
      { name: 'Chelsea', goalsPerGame: 1.1, possession: 40, shotsPerGame: 10, shotsOnTargetPerGame: 3, passAccuracy: 79, tacklesPerGame: 14, cornersPerGame: 4 }
    );
    expect(res.teamAWins).toBeGreaterThan(res.teamBWins);
    expect(res.overallWinner).toContain('Arsenal');
  });

  it('Tool 3: Pass Accuracy Calculator', () => {
    const res = calculatePassAccuracy({
      totalPasses: 100,
      completedPasses: 90,
      keyPasses: 3,
      longBallsAttempted: 10,
      longBallsCompleted: 8,
    });
    expect(res.passAccuracy).toBe(90);
    expect(res.longBallAccuracy).toBe(80);
    expect(res.ratingLabel).toBe('Elite Playmaker / Master Distributor');
  });

  it('Tool 4: Shot Conversion Rate', () => {
    const res = calculateShotConversion({
      totalShots: 20,
      goals: 5,
      shotsOnTarget: 10,
      bigChances: 6,
      bigChancesMissed: 2,
    });
    expect(res.conversionRate).toBe(25);
    expect(res.onTargetConversion).toBe(50);
    expect(res.efficiencyRating).toBe('Clinical / World-Class Lethality');
  });

  it('Tool 5: Possession Impact Analyzer', () => {
    const res = calculatePossessionImpact({
      possessionPercent: 60,
      matches: 10,
      wins: 7,
      draws: 2,
      losses: 1,
      goalsScored: 22,
      goalsConceded: 8,
    });
    expect(res.winRate).toBe(70);
    expect(res.efficiencyIndex).toBeGreaterThan(1.0);
    expect(res.verdict).toContain('Productive Possession with Solid Returns');
  });

  it('Tool 6: Player Form Index', () => {
    const res = calculatePlayerForm({
      goalsLast5: 4,
      assistsLast5: 2,
      avgRatingLast5: 8.5,
      minutesLast5: 450,
      yellowCards: 1,
      redCards: 0,
    });
    expect(res.formScore).toBeGreaterThanOrEqual(8.5);
    expect(res.label).toBe('Red hot');
  });

  it('Tool 7: Transfer Value Estimator', () => {
    const res = calculateTransferValue({
      age: 23,
      position: 'FWD',
      goalsSeason: 20,
      assistsSeason: 8,
      leagueLevel: 'Tier1',
      contractYears: 4,
      internationalCaps: 25,
    });
    expect(res.estimatedValue).toBeGreaterThan(50);
    expect(res.rangeLow).toBeLessThan(res.estimatedValue);
    expect(res.rangeHigh).toBeGreaterThan(res.estimatedValue);
  });

  it('Tool 8: Wage Calculator & Structure', () => {
    const resStructure = calculateWageStructure({
      currency: '£',
      baseWeeklyWage: 150000,
      goalBonus: 10000,
      cleanSheetBonus: 0,
      appearanceFee: 5000,
      matchesPlayed: 30,
      goalsScored: 15,
      cleanSheetsKept: 0,
    });
    expect(resStructure.weeklyBase).toBe(150000);
    expect(resStructure.baseAnnual).toBe(150000 * 52);
    expect(resStructure.totalBonuses).toBe((10000 * 15) + (5000 * 30));

    const resWage = calculateWage({
      transferValueM: 80,
      leagueLevel: 'Tier1',
      squadStatus: 'Key',
      age: 25,
    });
    expect(resWage.weeklyWage).toBeGreaterThan(50000);
  });

  it('Tool 9: Squad Value Calculator', () => {
    const squad: SquadPlayer[] = [
      { id: '1', name: 'Haaland', position: 'FWD', valueMillions: 180, age: 24 },
      { id: '2', name: 'Rodri', position: 'MID', valueMillions: 130, age: 28 },
      { id: '3', name: 'Dias', position: 'DEF', valueMillions: 80, age: 27 },
      { id: '4', name: 'Ederson', position: 'GK', valueMillions: 35, age: 31 },
    ];
    const res = calculateSquadValue(squad);
    expect(res.totalValue).toBe(425);
    expect(res.averageValue).toBeCloseTo(425 / 4, 1);
    expect(res.mostValuable?.name).toBe('Haaland');

    // Test zero values handling without fallback corruption
    const zeroSquad: SquadPlayer[] = [
      { id: '1', name: 'Free Agent', position: 'FWD', valueMillions: 0, age: 0 },
    ];
    const zeroRes = calculateSquadValue(zeroSquad);
    expect(zeroRes.totalValue).toBe(0);
    expect(zeroRes.averageValue).toBe(0);
    expect(zeroRes.averageAge).toBe(0);
  });

  it('Tool 10: Contract Worth Analyzer', () => {
    const res = calculateContractWorth({
      transferFee: 60,
      annualSalary: 10,
      contractYears: 5,
      agentFee: 5,
      signingBonus: 5,
      expectedMatchesPerSeason: 45,
    });
    expect(res.totalCommitment).toBe(120);
    expect(res.amortizationPerYear).toBe(12);
  });

  it('Tool 11: Fantasy Points Calculator (FPL Conventions)', () => {
    const resMid = calculateFantasyPoints({
      position: 'MID',
      minutesPlayed: 90,
      goalsScored: 2,
      assists: 1,
      cleanSheet: true,
      goalsConceded: 0,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      penaltySaves: 0,
      penaltyMisses: 0,
      saves: 0,
      bonusPoints: 3,
    });
    // 2 (mins) + 10 (2 goals*5) + 3 (assist) + 1 (clean sheet) - 1 (yellow) + 3 (bonus) = 18 pts
    expect(resMid.totalPoints).toBe(18);

    const resDef = calculateFantasyPoints({
      position: 'DEF',
      minutesPlayed: 90,
      goalsScored: 1,
      assists: 0,
      cleanSheet: true,
      goalsConceded: 0,
      yellowCards: 0,
      redCards: 0,
      ownGoals: 0,
      penaltySaves: 0,
      penaltyMisses: 0,
      saves: 0,
      bonusPoints: 0,
      cbit: 10,
    });
    // 2 (mins) + 6 (1 goal*6) + 4 (clean sheet) + 2 (defensive contribution 10 CBIT) = 14 pts
    expect(resDef.totalPoints).toBe(14);

    const resGk = calculateFantasyPoints({
      position: 'GK',
      minutesPlayed: 90,
      goalsScored: 1,
      assists: 0,
      cleanSheet: true,
      goalsConceded: 0,
      yellowCards: 0,
      redCards: 0,
      ownGoals: 0,
      penaltySaves: 1,
      penaltyMisses: 0,
      saves: 3,
      bonusPoints: 3,
    });
    // 2 (mins) + 10 (GK goal) + 4 (clean sheet) + 5 (pen save) + 1 (3 saves) + 3 (bonus) = 25 pts
    expect(resGk.totalPoints).toBe(25);

    const resFwd = calculateFantasyPoints({
      position: 'FWD',
      minutesPlayed: 90,
      goalsScored: 2,
      assists: 1,
      cleanSheet: true,
      goalsConceded: 0,
      yellowCards: 0,
      redCards: 0,
      ownGoals: 0,
      penaltySaves: 0,
      penaltyMisses: 0,
      saves: 0,
      bonusPoints: 0,
      cbirt: 12,
    });
    // 2 (mins) + 8 (2*4 goals) + 3 (assist) + 0 (clean sheet) + 2 (CBIRT bonus) = 15 pts
    expect(resFwd.totalPoints).toBe(15);
  });

  it('Tool 12: Best XI & Formation Selector', () => {
    const pool: BestXIPlayer[] = [
      { id: '1', name: 'Alisson', position: 'GK', projectedPoints: 8.5, cost: 5.5 },
      { id: '2', name: 'Raya', position: 'GK', projectedPoints: 7.0, cost: 5.0 },
      { id: '3', name: 'Alexander-Arnold', position: 'DEF', projectedPoints: 9.0, cost: 7.0 },
      { id: '4', name: 'Saliba', position: 'DEF', projectedPoints: 8.5, cost: 6.0 },
      { id: '5', name: 'Van Dijk', position: 'DEF', projectedPoints: 8.0, cost: 6.0 },
      { id: '6', name: 'Gvardiol', position: 'DEF', projectedPoints: 8.0, cost: 6.0 },
      { id: '7', name: 'White', position: 'DEF', projectedPoints: 7.5, cost: 5.5 },
      { id: '8', name: 'Salah', position: 'MID', projectedPoints: 9.5, cost: 13.0 },
      { id: '9', name: 'Saka', position: 'MID', projectedPoints: 9.0, cost: 10.0 },
      { id: '10', name: 'Palmer', position: 'MID', projectedPoints: 9.0, cost: 11.0 },
      { id: '11', name: 'Foden', position: 'MID', projectedPoints: 8.0, cost: 9.5 },
      { id: '12', name: 'Rice', position: 'MID', projectedPoints: 7.5, cost: 6.5 },
      { id: '13', name: 'Haaland', position: 'FWD', projectedPoints: 9.5, cost: 15.0 },
      { id: '14', name: 'Watkins', position: 'FWD', projectedPoints: 8.5, cost: 9.0 },
      { id: '15', name: 'Isak', position: 'FWD', projectedPoints: 8.5, cost: 8.5 },
    ];
    const res = selectBestXI(pool, '4-3-3', 100.0);
    expect(res.selectedXI.length).toBe(11);
    expect(res.totalCost).toBeLessThanOrEqual(100.0);
    expect(res.totalProjectedPoints).toBeGreaterThan(50);
  });

  it('Tool 13: Captain Pick Analyzer', () => {
    const res = analyzeCaptains([
      { id: '1', name: 'Salah', form: 9.0, fixtureDifficulty: 2, isHome: true, historicAgainstOpponent: 8.0, teamAttackingStrength: 2.5 },
      { id: '2', name: 'Haaland', form: 8.5, fixtureDifficulty: 4, isHome: false, historicAgainstOpponent: 6.0, teamAttackingStrength: 2.4 },
    ]);
    expect(res.length).toBe(2);
    expect(res[0].name).toBe('Salah');
  });

  it('Tool 14: Transfer Suggestion Engine', () => {
    const res = evaluateTransfer(
      { name: 'Player A', form: 5.0, next3Fdr: 4, cost: 8.0, expectedMinutes: 70 },
      { name: 'Player B', form: 8.5, next3Fdr: 2, cost: 7.5, expectedMinutes: 90 },
      2.0
    );
    expect(res.verdict).toBe('Strong Buy');
    expect(res.affordable).toBe(true);
  });

  it('Tool 15: League Table Simulator', () => {
    const teams: SimLeagueTeam[] = [
      { id: '1', name: 'Liverpool', played: 28, won: 20, drawn: 6, lost: 2, gf: 65, ga: 25 },
      { id: '2', name: 'Arsenal', played: 28, won: 19, drawn: 7, lost: 2, gf: 60, ga: 22 },
    ];
    const res = simulateLeagueTable(teams);
    expect(res[0].name).toBe('Liverpool');
    expect(res[0].pts).toBe(66);
    expect(res[0].gd).toBe(40);
  });

  it('Tool 16: Points Needed Calculator', () => {
    const res = calculatePointsNeeded({
      targetPoints: 75,
      currentPoints: 55,
      gamesRemaining: 8,
    });
    expect(res.pointsDeficit).toBe(20);
    expect(res.pointsPerGameNeeded).toBe(2.5);
    expect(res.feasibilityStatus).toContain('Difficult (2.0–2.5 PPG)');

    // Test gamesRemaining = 0
    const resZeroAchieved = calculatePointsNeeded({
      targetPoints: 75,
      currentPoints: 80,
      gamesRemaining: 0,
    });
    expect(resZeroAchieved.feasibilityStatus).toBe('Achieved');
    expect(resZeroAchieved.pointsPerGameNeeded).toBe(0);

    const resZeroMissed = calculatePointsNeeded({
      targetPoints: 75,
      currentPoints: 70,
      gamesRemaining: 0,
    });
    expect(resZeroMissed.feasibilityStatus).toBe('Mathematically Impossible');
    expect(resZeroMissed.pointsPerGameNeeded).toBe(0);
  });

  it('Tool 17: Head to Head Stats Comparison', () => {
    const res = calculateHeadToHead({
      teamAName: 'Real Madrid',
      teamBName: 'Barcelona',
      totalMatches: 24,
      teamAWins: 10,
      draws: 6,
      teamBWins: 8,
      teamAGoals: 35,
      teamBGoals: 30,
    });
    expect(res.totalGoals).toBe(65);
    expect(res.teamAWinRate).toBeCloseTo((10 / 24) * 100, 1);
    expect(res.verdict).toBe('Evenly Matched Historical Rivalry');
  });

  it('Tool 18: Season Goals Tracker & Projection', () => {
    const res = calculateSeasonGoals({
      goals: 18,
      gamesPlayed: 20,
      totalSeasonGames: 38,
      minutesPlayed: 1700,
      penaltiesScored: 3,
    });
    expect(res.projectedTotal).toBe(34);
    expect(res.goalsPerGame).toBeCloseTo(18 / 20, 2);
    expect(res.paceTier).toBe('Historic / Ballon d’Or Contender');
  });

  it('Tool 19: Formation Analyzer & Matchup Matrix', () => {
    const res = analyzeFormation('4-3-3', 'Possession');
    expect(res.attackRating).toBeGreaterThanOrEqual(10);
    expect(res.defenseRating).toBeGreaterThanOrEqual(10);
    expect(res.strengths.length).toBeGreaterThan(0);
  });

  it('Tool 20: Pressing Intensity Calculator (PPDA)', () => {
    const res = calculatePressingIntensity({
      opponentPassesInDefensiveZone: 150,
      tacklesInZone: 12,
      interceptionsInZone: 6,
      challengesInZone: 2,
      highTurnoversWon: 8,
      turnoverShotsGenerated: 3,
    });
    expect(res.ppda).toBe(7.5);
    expect(res.pressingTier).toContain('Gegenpress');
  });

  it('Tool 21: Set Piece Success Rate Calculator', () => {
    const res = calculateSetPieceSuccess({
      cornersTaken: 100,
      cornerShotsGenerated: 25,
      cornerGoals: 12,
      directFkTaken: 20,
      directFkShotsOnTarget: 8,
      directFkGoals: 3,
      indirectFkTaken: 15,
      indirectFkGoals: 2,
      penaltiesTaken: 10,
      penaltiesScored: 9,
    });
    expect(res.cornerGoalRate).toBe(12.0);
    expect(res.penaltyConversion).toBe(90.0);
  });

  describe('Numeral Normalization & ASCII Enforcement Suite', () => {
    it('normalizes Eastern Arabic numerals (٠-٩) to ASCII (0-9)', () => {
      expect(normalizeNumerals('٠١٢٣٤٥٦٧٨٩')).toBe('0123456789');
      expect(normalizeNumerals('goals: ٤, assists: ٢')).toBe('goals: 4, assists: 2');
      expect(normalizeNumerals('')).toBe('');
      expect(normalizeNumerals(null)).toBe('');
      expect(normalizeNumerals(undefined)).toBe('');
    });

    it('normalizes Persian/Urdu numerals (۰-۹) to ASCII (0-9)', () => {
      expect(normalizeNumerals('۰۱۲۳۴۵۶۷۸۹')).toBe('0123456789');
      expect(normalizeNumerals('pass: ۹۵%')).toBe('pass: 95%');
    });

    it('normalizes decimal separators and strips invalid characters via normalizeDecimalInput', () => {
      // Arabic comma '،' to dot '.'
      expect(normalizeDecimalInput('١٢،٥')).toBe('12.5');
      // Persian decimal separator '٫' to dot '.'
      expect(normalizeDecimalInput('۱۸٫۷۵')).toBe('18.75');
      // Standard comma ',' to dot '.'
      expect(normalizeDecimalInput('14,2')).toBe('14.2');
      // Integer-only mode removes decimals
      expect(normalizeDecimalInput('١٢،٥', false)).toBe('125');
      // Negative numbers when allowed
      expect(normalizeDecimalInput('-١٥', true, true)).toBe('-15');
      // Negative stripped when disallowed
      expect(normalizeDecimalInput('-١٥', true, false)).toBe('15');
      // Text and random symbols stripped
      expect(normalizeDecimalInput('test-٤٢.٥#')).toBe('42.5');
    });

    it('safely sanitizes numeric inputs with clamping and default fallbacks', () => {
      expect(sanitizeNumericInput('٢٥')).toBe(25);
      expect(sanitizeNumericInput('۱۰۰')).toBe(100);
      expect(sanitizeNumericInput('', 10)).toBe(10);
      expect(sanitizeNumericInput(null, 5)).toBe(5);
      expect(sanitizeNumericInput('invalid', 0)).toBe(0);
      // Clamping upper limit
      expect(sanitizeNumericInput('150', 0, 0, 100)).toBe(100);
      // Clamping lower limit
      expect(sanitizeNumericInput('-5', 0, 0, 100)).toBe(0);
    });

    it('formats numbers strictly with standard ASCII characters via en-US formatters', () => {
      // Integer
      expect(formatInteger(1234567)).toBe('1,234,567');
      expect(formatInteger(NaN)).toBe('0');

      // Decimal
      expect(formatDecimal(12.3456, 1)).toBe('12.3');
      expect(formatDecimal(12.3456, 2)).toBe('12.35');

      // Percent
      expect(formatPercent(85.45, 1)).toBe('85.5%');

      // Millions / Billions Currency
      expect(formatCurrencyM(65.5, '€')).toBe('€65.50M');
      expect(formatCurrencyM(1200, '€')).toBe('€1.20B');

      // Thousands Currency
      expect(formatCurrencyK(120, '€')).toBe('€120');

      // Exact Currency
      expect(formatCurrencyExact(2500000, '£')).toBe('£2,500,000');
    });

    it('handles division by zero and clamping gracefully', () => {
      expect(safeDivide(10, 0, 0)).toBe(0);
      expect(safeDivide(NaN, 5, 0)).toBe(0);
      expect(safeDivide(10, NaN, 0)).toBe(0);
      expect(clamp(150, 0, 100)).toBe(100);
      expect(clamp(-5, 0, 100)).toBe(0);
      expect(clamp(NaN, 0, 100)).toBe(0);
    });

    it('successfully processes Eastern Arabic inputs through calculation pipelines', () => {
      const goalsInput = sanitizeNumericInput('٢'); // 2
      const assistsInput = sanitizeNumericInput('١'); // 1
      const accuracyInput = sanitizeNumericInput('٨٥'); // 85

      const rating = calculatePlayerPerformance({
        position: 'FWD',
        goals: goalsInput,
        assists: assistsInput,
        passAccuracy: accuracyInput,
        shotsOnTargetPercent: 75,
        dribbles: 2,
        tackles: 1,
      });

      expect(rating.score).toBeGreaterThanOrEqual(70);
      expect(rating.score).toBeLessThanOrEqual(100);

      const passAcc = calculatePassAccuracy({
        totalPasses: sanitizeNumericInput('١٠٠'),
        completedPasses: sanitizeNumericInput('٩٠'),
        keyPasses: sanitizeNumericInput('٣'),
        longBallsAttempted: sanitizeNumericInput('١٠'),
        longBallsCompleted: sanitizeNumericInput('٨'),
      });
      expect(passAcc.passAccuracy).toBe(90);
    });
  });
});
