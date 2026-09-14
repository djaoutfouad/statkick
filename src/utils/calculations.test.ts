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

    it('rigorously handles zero, negative, and edge-case inputs across all calculators without NaN or Infinity', () => {
      // 1. Player Performance with zero and negative numbers
      const perfZero = calculatePlayerPerformance({
        position: 'FWD',
        goals: -5 as any,
        assists: NaN as any,
        passAccuracy: 0,
        shotsOnTargetPercent: 0,
        dribbles: 0,
        tackles: 0,
      });
      expect(Number.isFinite(perfZero.score)).toBe(true);
      expect(Number.isFinite(perfZero.breakdown.rawScore)).toBe(true);
      expect(perfZero.score).toBeGreaterThanOrEqual(10);
      expect(perfZero.score).toBeLessThanOrEqual(99);

      // 2. Team Comparison with missing/NaN values
      const compRes = compareTeams(
        { name: '', goalsPerGame: NaN as any, possession: -10 as any, shotsPerGame: 0, shotsOnTargetPerGame: 0, passAccuracy: 0, tacklesPerGame: 0, cornersPerGame: 0 },
        { name: '', goalsPerGame: 0, possession: 0, shotsPerGame: 0, shotsOnTargetPerGame: 0, passAccuracy: 0, tacklesPerGame: 0, cornersPerGame: 0 }
      );
      expect(Number.isFinite(compRes.teamADominance)).toBe(true);
      expect(Number.isFinite(compRes.teamBDominance)).toBe(true);
      expect(compRes.overallWinner).toBeDefined();

      // 3. Pass Accuracy with 0 total passes and completed > attempted
      const passZero = calculatePassAccuracy({
        totalPasses: 0,
        completedPasses: 10,
        keyPasses: 0,
        longBallsAttempted: 0,
        longBallsCompleted: 5,
      });
      expect(passZero.passAccuracy).toBe(0);
      expect(passZero.longBallAccuracy).toBe(0);
      expect(Number.isFinite(passZero.qualityScore)).toBe(true);
      expect(passZero.qualityScore).toBeGreaterThanOrEqual(0);
      expect(passZero.qualityScore).toBeLessThanOrEqual(100);

      // 4. Shot Conversion with 0 shots and goals > shots
      const shotZero = calculateShotConversion({
        totalShots: 0,
        goals: 5,
        shotsOnTarget: 0,
        bigChances: 0,
        bigChancesMissed: 0,
      });
      expect(shotZero.conversionRate).toBe(0);
      expect(shotZero.onTargetConversion).toBe(0);
      expect(shotZero.bigChanceConversion).toBe(0);
      expect(Number.isFinite(shotZero.conversionRate)).toBe(true);

      // 5. Possession Impact with 0 matches and 0 possession
      const possZero = calculatePossessionImpact({
        possessionPercent: 0,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsScored: 0,
        goalsConceded: 0,
      });
      expect(Number.isFinite(possZero.winRate)).toBe(true);
      expect(Number.isFinite(possZero.goalsPerGame)).toBe(true);
      expect(Number.isFinite(possZero.efficiencyIndex)).toBe(true);

      // 6. Player Form with negative cards, 0 minutes
      const formZero = calculatePlayerForm({
        goalsLast5: 0,
        assistsLast5: 0,
        avgRatingLast5: 0,
        minutesLast5: 0,
        yellowCards: -2 as any,
        redCards: -1 as any,
      });
      expect(Number.isFinite(formZero.formScore)).toBe(true);
      expect(formZero.formScore).toBeGreaterThanOrEqual(1.0);
      expect(formZero.formScore).toBeLessThanOrEqual(10.0);

      // 7. Transfer Value with boundary age and negative G/A
      const transferZero = calculateTransferValue({
        age: 12 as any,
        position: 'FWD',
        goalsSeason: -5 as any,
        assistsSeason: -2 as any,
        leagueLevel: 'Tier1',
        contractYears: 0,
        internationalCaps: 0,
      });
      expect(Number.isFinite(transferZero.estimatedValue)).toBe(true);
      expect(transferZero.estimatedValue).toBeGreaterThan(0);

      // 8. Wage Structure & Wage with 0 transfer value and zero bonuses
      const wageZero = calculateWage({
        transferValueM: 0,
        leagueLevel: 'Tier3',
        squadStatus: 'Youth',
        age: 18,
      });
      expect(Number.isFinite(wageZero.weeklyWage)).toBe(true);
      expect(wageZero.weeklyWage).toBeGreaterThanOrEqual(1000);

      const wageStructZero = calculateWageStructure({
        currency: '€',
        baseWeeklyWage: 0,
        goalBonus: 0,
        cleanSheetBonus: 0,
        appearanceFee: 0,
        matchesPlayed: 0,
        goalsScored: 0,
        cleanSheetsKept: 0,
      });
      expect(wageStructZero.totalAnnualEarnings).toBe(0);
      expect(wageStructZero.effectiveWeeklyWage).toBe(0);

      // 9. Squad Value with empty array
      const emptySquad = calculateSquadValue([]);
      expect(emptySquad.totalValue).toBe(0);
      expect(emptySquad.averageValue).toBe(0);
      expect(emptySquad.averageAge).toBe(0);

      // 10. Contract Worth with 0 matches and 0 contract years
      const contractZero = calculateContractWorth({
        transferFee: 0,
        annualSalary: 0,
        contractYears: 0,
        agentFee: 0,
        signingBonus: 0,
        expectedMatchesPerSeason: 0,
      });
      expect(Number.isFinite(contractZero.annualCost)).toBe(true);
      expect(Number.isFinite(contractZero.costPerMatch)).toBe(true);
      expect(contractZero.costPerMatch).not.toBe(Infinity);

      // 11. Points Needed with 0 games remaining and negative points deficit
      const ptsZero = calculatePointsNeeded({
        currentPoints: 85,
        targetPoints: 80,
        gamesRemaining: 0,
      });
      expect(ptsZero.pointsDeficit).toBe(0);
      expect(ptsZero.pointsPerGameNeeded).toBe(0);
      expect(ptsZero.feasibilityStatus).toBe('Achieved');

      // 12. Head to Head with 0 matches
      const h2hZero = calculateHeadToHead({
        teamAName: 'Team A',
        teamBName: 'Team B',
        totalMatches: 0,
        teamAWins: 0,
        draws: 0,
        teamBWins: 0,
        teamAGoals: 0,
        teamBGoals: 0,
      });
      expect(h2hZero.teamAWinRate).toBe(0);
      expect(h2hZero.drawRate).toBe(0);
      expect(h2hZero.teamBWinRate).toBe(0);
      expect(h2hZero.avgGoalsPerMatch).toBe(0);

      // 13. Season Goals with 0 games played and 0 minutes
      const seasonZero = calculateSeasonGoals({
        goals: 0,
        gamesPlayed: 0,
        totalSeasonGames: 38,
        minutesPlayed: 0,
        penaltiesScored: 0,
      });
      expect(seasonZero.goalsPerGame).toBe(0);
      expect(seasonZero.minutesPerGoal).toBe(0);
      expect(seasonZero.projectedTotal).toBe(0);
      expect(seasonZero.nonPenaltyGPG).toBe(0);

      // 14. Pressing Intensity (PPDA) with 0 defensive actions and 0 turnovers
      const ppdaZero = calculatePressingIntensity({
        opponentPassesInDefensiveZone: 0,
        tacklesInZone: 0,
        interceptionsInZone: 0,
        challengesInZone: 0,
        highTurnoversWon: 0,
        turnoverShotsGenerated: 0,
      });
      expect(ppdaZero.ppda).toBe(0);
      expect(ppdaZero.defensiveActions).toBe(0);
      expect(ppdaZero.turnoverShotConversion).toBe(0);
      expect(Number.isFinite(ppdaZero.ppda)).toBe(true);

      // 15. Set Piece Success with 0 attempts across all set pieces
      const setPieceZero = calculateSetPieceSuccess({
        cornersTaken: 0,
        cornerShotsGenerated: 0,
        cornerGoals: 0,
        directFkTaken: 0,
        directFkShotsOnTarget: 0,
        directFkGoals: 0,
        indirectFkTaken: 0,
        indirectFkGoals: 0,
        penaltiesTaken: 0,
        penaltiesScored: 0,
      });
      expect(setPieceZero.cornerGoalRate).toBe(0);
      expect(setPieceZero.cornerShotGeneration).toBe(0);
      expect(setPieceZero.directFkAccuracy).toBe(0);
      expect(setPieceZero.penaltyConversion).toBe(0);
      expect(Number.isFinite(setPieceZero.overallEfficiencyScore)).toBe(true);
      expect(setPieceZero.overallEfficiencyScore).toBeGreaterThanOrEqual(10);

      // 16. Fantasy Football Points with all zeros
      const fplZero = calculateFantasyPoints({
        position: 'MID',
        minutesPlayed: 0,
        goalsScored: 0,
        assists: 0,
        cleanSheet: false,
        goalsConceded: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0,
        penaltySaves: 0,
        penaltyMisses: 0,
        saves: 0,
        bonusPoints: 0,
      });
      expect(fplZero.totalPoints).toBe(0);
      expect(Array.isArray(fplZero.breakdown)).toBe(true);

      // 17. Best XI Selector with empty player array
      const bestXIEmpty = selectBestXI([], '4-3-3', 100);
      expect(bestXIEmpty.isFeasible).toBe(false);
      expect(bestXIEmpty.selectedXI.length).toBe(0);
      expect(bestXIEmpty.infeasibleReason).toContain('Insufficient players');

      // 18. Captain Pick Analyzer with empty candidate array
      const captainEmpty = analyzeCaptains([]);
      expect(Array.isArray(captainEmpty)).toBe(true);
      expect(captainEmpty.length).toBe(0);

      // 19. Transfer Suggestion with zero bank budget and negative delta
      const transferEvalZero = evaluateTransfer(
        { name: 'Player A', cost: 10, form: 5, next3Fdr: 3, expectedMinutes: 90 },
        { name: 'Player B', cost: 15, form: 4, next3Fdr: 4, expectedMinutes: 90 },
        0
      );
      expect(transferEvalZero.affordable).toBe(false);
      expect(transferEvalZero.verdict).toBe('Unaffordable');
      expect(Number.isFinite(transferEvalZero.viabilityScore)).toBe(true);

      // 20. League Table Simulator with empty list
      const simEmpty = simulateLeagueTable([]);
      expect(Array.isArray(simEmpty)).toBe(true);
      expect(simEmpty.length).toBe(0);

      // 21. Formation Analyzer with edge formations and styles
      const formationZero = analyzeFormation('' as any, '' as any);
      expect(formationZero.attackRating).toBeGreaterThanOrEqual(10);
      expect(formationZero.defenseRating).toBeGreaterThanOrEqual(10);
      expect(Array.isArray(formationZero.strengths)).toBe(true);
      expect(Array.isArray(formationZero.weaknesses)).toBe(true);
    });
  });
});
