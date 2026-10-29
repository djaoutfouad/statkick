import { ToolMeta } from '../types';

export const TOOLS_LIST: ToolMeta[] = [
  // 1. Player Performance Rater
  {
    id: 'player-performance-rater',
    slug: 'player-performance-rater',
    name: 'Player Performance Rater',
    seoTitle: 'Player Performance Rater & Match Score | StatKick',
    tagline: 'Calculate composite match performance ratings across all 4 positions',
    category: 'Performance',
    description:
      'Evaluate football player match performance across GK, DEF, MID, and FWD roles using weighted stats for goals, assists, passes, and tackles out of 100.',
    icon: 'Activity',
    keywords: ['player rating', 'match rating', 'football stats', 'player score', 'positional rating'],
    formulaSummary: 'Position-specific weighted composite index normalized to 100',
    personaImageUrl: '/images/tool-performance-rater.webp',
    personaRole: 'Match Performance & Analytics Focus',
  },
  // 2. Team Comparison
  {
    id: 'team-comparison',
    slug: 'team-comparison',
    name: 'Team Comparison Matrix',
    seoTitle: 'Football Team Comparison Matrix & Stats | StatKick',
    tagline: 'Side-by-side team statistical battle across 7 key performance metrics',
    category: 'Performance',
    description:
      'Compare two football teams side-by-side across 7 core match metrics including goals per game, possession, shots on target, pass accuracy, and tackles.',
    icon: 'Columns2',
    keywords: ['team comparison', 'head to head team', 'team dominance', 'match stats comparison'],
    formulaSummary: 'Category win aggregation: Dominance % = (Categories Won / 7) × 100',
    personaImageUrl: '/images/tool-team-comparison.webp',
    personaRole: 'Tactical & Match Comparison Focus',
  },
  // 3. Pass Accuracy Calculator
  {
    id: 'pass-accuracy-calculator',
    slug: 'pass-accuracy-calculator',
    name: 'Pass Accuracy & Quality Index',
    seoTitle: 'Pass Accuracy & Passing Quality Index | StatKick',
    tagline: 'Measure completion rates, long ball precision, and creative passing quality',
    category: 'Performance',
    description:
      'Calculate football pass completion rates, long-ball precision, and an advanced Passing Quality Index that rewards creative key passes and progression.',
    icon: 'Send',
    keywords: ['passing accuracy', 'pass completion', 'long balls', 'key passes', 'passing quality index'],
    formulaSummary: 'Quality = (Pass% × 0.6) + (Key Passes × 2) + (LongBall% × 0.4)',
    personaImageUrl: '/images/tool-pass-accuracy.webp',
    personaRole: 'Passing Accuracy & Distribution Focus',
  },
  // 4. Shot Conversion Rate
  {
    id: 'shot-conversion-rate',
    slug: 'shot-conversion-rate',
    name: 'Shot Conversion & Finishing Rate',
    seoTitle: 'Shot Conversion Rate & Finishing Stats | StatKick',
    tagline: 'Analyze total shot efficiency, on-target conversion, and big chance clinical rate',
    category: 'Performance',
    description:
      'Measure football goalscoring efficiency by calculating overall shot conversion rates, on-target shooting accuracy, and big chance clinical finishing.',
    icon: 'Target',
    keywords: ['shot conversion', 'finishing rate', 'big chances', 'shots on target', 'striker efficiency'],
    formulaSummary: 'Conversion % = (Goals / Shots) × 100 | Big Chance % = ((BC - BCM) / BC) × 100',
    personaImageUrl: '/images/tool-shot-conversion.webp',
    personaRole: 'Finishing & Shot Conversion Focus',
  },
  // 5. Possession Impact Analyzer
  {
    id: 'possession-impact-analyzer',
    slug: 'possession-impact-analyzer',
    name: 'Possession Impact Analyzer',
    seoTitle: 'Possession Impact & Efficiency Analyzer | StatKick',
    tagline: 'Measure possession efficiency, win conversion, and goal threat return',
    category: 'Performance',
    description:
      'Evaluate whether football ball possession translates into results by calculating Win Rate, Goals Per Game, and the Possession Efficiency Index score.',
    icon: 'PieChart',
    keywords: ['possession efficiency', 'possession stats', 'win rate', 'possession value', 'sterile possession'],
    formulaSummary: 'Efficiency = (Win Rate / Possession %) | GPG = Goals / Matches',
    personaImageUrl: '/images/tool-pass-accuracy.webp',
    personaRole: 'Possession & Control Efficiency Focus',
  },
  // 6. Player Form Index
  {
    id: 'player-form-index',
    slug: 'player-form-index',
    name: 'Player Form Index',
    seoTitle: 'Football Player Form Index & Momentum | StatKick',
    tagline: 'Track 5-match rolling momentum, discipline impact, and playing time bonus',
    category: 'Performance',
    description:
      'Quantify recent 5-match football player form using goals, assists, match ratings, card deductions, and playing time durability bonuses on a 10 scale.',
    icon: 'Flame',
    keywords: ['player form', 'recent form index', 'form rating', 'momentum tracker', '5-match form'],
    formulaSummary: 'Form = Base(Goals×1.5 + Assists×1.2 + Rating×0.8) - Deductions + MinBonus',
    personaImageUrl: '/images/tool-player-form.webp',
    personaRole: 'Recent Match Momentum & Form Focus',
  },
  // 7. Transfer Value Estimator
  {
    id: 'transfer-value-estimator',
    slug: 'transfer-value-estimator',
    name: 'Transfer Value Estimator',
    seoTitle: 'Football Transfer Value Estimator Model | StatKick',
    tagline: 'Estimate realistic market transfer value with age curves, league tier, and contract terms',
    category: 'Market',
    description:
      'Estimate football player market transfer values (€M) using positional baselines, age curves, goal output, league tiers, and remaining contract years.',
    icon: 'Coins',
    keywords: ['transfer value', 'player price', 'market value calculator', 'football transfer fee'],
    formulaSummary: 'Value = Base × AgeMult × PerfMult × LeagueMult × ContractMult + CapsBonus',
    personaImageUrl: '/images/tool-transfer-value.webp',
    personaRole: 'Transfer Market Statistical Estimation Focus',
  },
  // 8. Wage Calculator
  {
    id: 'wage-calculator',
    slug: 'wage-calculator',
    name: 'Player Wage & Salary Structure Calculator',
    seoTitle: 'Football Player Wage & Salary Calculator | StatKick',
    tagline: 'Calculate gross annual earnings, effective weekly wage, and performance incentive bonuses',
    category: 'Market',
    description:
      'Model football player salary structures including base weekly wages, match appearance fees, goal bonuses, and clean sheet incentives in £, €, or $.',
    icon: 'Banknote',
    keywords: ['football wage', 'player salary', 'weekly wage calculator', 'wage structure', 'bonus calculator'],
    formulaSummary: 'Annual = (Weekly Base × 52) + (Matches × Appearance Fee) + (Goals × Goal Bonus) + (Clean Sheets × CS Bonus)',
    personaImageUrl: '/images/tool-wage-calculator.webp',
    personaRole: 'Player Wage & Salary Structure Focus',
  },
  // 9. Squad Value Calculator
  {
    id: 'squad-value-calculator',
    slug: 'squad-value-calculator',
    name: 'Squad Value & Depth Calculator',
    seoTitle: 'Football Squad Value & Depth Calculator | StatKick',
    tagline: 'Calculate total roster worth, Starting XI valuation, and bench capital distribution',
    category: 'Market',
    description:
      'Calculate total football squad market value, Starting XI valuation, bench depth capital, and positional investment balance across all 4 pitch units.',
    icon: 'Users',
    keywords: ['squad value', 'team valuation', 'starting xi value', 'bench depth value', 'roster worth'],
    formulaSummary: 'Total = Σ Players | Starting XI = Top 11 Values | Bench = Total - Starting XI',
    personaImageUrl: '/images/tool-player-form.webp',
    personaRole: 'Squad Valuation & Roster Depth Focus',
  },
  // 10. Contract Worth Analyzer
  {
    id: 'contract-worth-analyzer',
    slug: 'contract-worth-analyzer',
    name: 'Contract Worth & Commitment Analyzer',
    seoTitle: 'Football Contract Worth & FFP Analyzer | StatKick',
    tagline: 'Calculate total financial commitment, annual accounting cost, and cost per match',
    category: 'Market',
    description:
      'Calculate total player contract commitment, annual FFP/PSR transfer fee amortization, gross wage liabilities, agent fees, and club cost per match.',
    icon: 'FileText',
    keywords: ['contract worth', 'football contract analyzer', 'transfer fee commitment', 'salary cost', 'cost per match'],
    formulaSummary: 'Total Commitment = Transfer Fee + (Annual Salary × Years) + Agent Fee + Signing Bonus',
    personaImageUrl: '/images/tool-contract-worth.webp',
    personaRole: 'Contract Commitment & Amortization Focus',
  },
  // 11. Fantasy Football Points
  {
    id: 'fantasy-football-points',
    slug: 'fantasy-football-points',
    name: 'Fantasy Points Calculator',
    seoTitle: 'Fantasy Football Points Calculator (FPL) | StatKick',
    tagline: 'Analytical FPL gameweek scoring estimate with minutes, clean sheets, goals, cards, and bonus',
    category: 'Fantasy',
    description:
      'Calculate gameweek fantasy football points by position with rules for minutes, goals, assists, clean sheets, CBIT/CBIRT defensive actions, and bonus.',
    icon: 'Award',
    keywords: ['fantasy football calculator', 'fpl points', 'fpl calculator', 'fantasy premier league score'],
    formulaSummary: 'Analytical FPL estimate: Minutes + Positional Goals + CleanSheet + Defensive Contribution + Cards + Saves + Bonus',
    personaImageUrl: '/images/tool-fantasy-points.webp',
    personaRole: 'Unofficial Fantasy Scoring & Points Focus',
  },
  // 12. Best XI Selector
  {
    id: 'best-xi-selector',
    slug: 'best-xi-selector',
    name: 'Best XI & Formation Selector',
    seoTitle: 'Best XI Lineup & Tactical Formation Tool | StatKick',
    tagline: 'Build an optimized Best XI lineup using a heuristic model across 6 classic formations',
    category: 'Fantasy',
    description:
      'Build an optimized Best XI football lineup across 6 tactical formations (4-3-3, 4-4-2, 3-5-2) using player form ratings, positions, and budget limits.',
    icon: 'LayoutGrid',
    keywords: ['best xi', 'formation builder', 'starting xi selector', 'tactical pitch', 'football lineup'],
    formulaSummary: 'Heuristic positional ranking model matching formation quota constraints',
    personaImageUrl: '/images/tool-formation-tactics.webp',
    personaRole: 'Lineup & Formation Optimization Focus',
  },
  // 13. Captain Pick Analyzer
  {
    id: 'captain-pick-analyzer',
    slug: 'captain-pick-analyzer',
    name: 'Fantasy Captain Pick Analyzer',
    seoTitle: 'Fantasy Football Captain Pick Analyzer | StatKick',
    tagline: 'Compare fantasy captain candidates with fixture difficulty, form, and venue advantages',
    category: 'Fantasy',
    description:
      'Compare fantasy football captain candidates with a weighted model combining player form, fixture difficulty (FDR), home advantage, and team attack.',
    icon: 'Crown',
    keywords: ['captain pick', 'fpl captain analyzer', 'captaincy score', 'fdr rating', 'fantasy captain'],
    formulaSummary: 'StatKick Captaincy Score = (Form × 30%) + (Fixture × 25%) + (Home × 15%) + (History × 15%) + (Team Attack × 15%)',
    personaImageUrl: '/images/tool-captain-pick.webp',
    personaRole: 'Captaincy Selection & Risk Matrix Focus',
  },
  // 14. Transfer Suggestion
  {
    id: 'transfer-suggestion',
    slug: 'transfer-suggestion',
    name: 'Fantasy Transfer Strategy Engine',
    seoTitle: 'Fantasy Transfer Strategy Engine & Model | StatKick',
    tagline: 'Generate 3 analytical player replacement profiles based on budget, horizon, and risk profile',
    category: 'Fantasy',
    description:
      'Evaluate fantasy football transfers by comparing outgoing and incoming player form, upcoming 3-match fixture difficulty, budget delta, and net points.',
    icon: 'ArrowRightLeft',
    keywords: ['fantasy transfer', 'fpl transfer suggestions', 'differential pick', 'fantasy football strategy'],
    formulaSummary: 'Rule-based strategy matrix analyzing budget elasticity, fixture windows, and risk profiles',
    personaImageUrl: '/images/tool-transfer-value.webp',
    personaRole: 'Fantasy Transfer Strategy & Archetypes Focus',
  },
  // 15. League Table Simulator
  {
    id: 'league-table-simulator',
    slug: 'league-table-simulator',
    name: 'League Table Simulator & PPG Projector',
    seoTitle: 'Football League Table & PPG Simulator | StatKick',
    tagline: 'Simulate full league standings with points-per-game projections and title/relegation cutoffs',
    category: 'Simulation',
    description:
      'Simulate football league standings and project final point totals, title winners, Champions League spots, and relegation cutoffs using PPG trajectories.',
    icon: 'Trophy',
    keywords: ['league table simulator', 'ppg projector', 'football standings projection', 'points simulator'],
    formulaSummary: 'Points = W×3 + D | Projected Points = Current Pts + (PPG × Remaining Matches)',
    personaImageUrl: '/images/tool-league-simulator.webp',
    personaRole: 'League Standings & Projections Focus',
  },
  // 16. Points Needed Calculator
  {
    id: 'points-needed-calculator',
    slug: 'points-needed-calculator',
    name: 'Points Needed Calculator',
    seoTitle: 'Football Points Needed & Pace Calculator | StatKick',
    tagline: 'Calculate required wins and mathematical points to secure titles, Top 4, or avoid relegation',
    category: 'Simulation',
    description:
      'Calculate exact wins, draws, and points-per-game pace needed from remaining fixtures to secure league titles, Top 4 qualification, or avoid relegation.',
    icon: 'CheckCircle2',
    keywords: ['points needed', 'title race calculator', 'relegation calculator', 'magic number football'],
    formulaSummary: 'Points Deficit = Target Pts - Current Pts | Required PPG = Points Deficit / Games Remaining',
    personaImageUrl: '/images/tool-league-simulator.webp',
    personaRole: 'Points & Objectives Pace Focus',
  },
  // 17. Head to Head Stats
  {
    id: 'head-to-head-stats',
    slug: 'head-to-head-stats',
    name: 'Head to Head Historical Record',
    seoTitle: 'Football Head-to-Head Rivalry Calculator | StatKick',
    tagline: 'Analyze historical derby records, win ratios, goal distribution, and dominance score',
    category: 'Simulation',
    description:
      'Compare historical head-to-head records between two football clubs including win percentages, draw frequency, goals per game, and rivalry dominance.',
    icon: 'Swords',
    keywords: ['head to head', 'h2h football', 'historical record', 'team derby stats', 'rivalry stats'],
    formulaSummary: 'Win% = Wins/Total×100 | Dominance = (A Wins - B Wins) / Total × 100 with goal weighting',
    personaImageUrl: '/images/tool-team-comparison.webp',
    personaRole: 'Rivalry & Historical Matchup Focus',
  },
  // 18. Season Goals Tracker
  {
    id: 'season-goals-tracker',
    slug: 'season-goals-tracker',
    name: 'Season Goals Tracker & Milestone Pace',
    seoTitle: 'Season Goals Tracker & Scoring Projector | StatKick',
    tagline: 'Track scoring rate, projected end-of-season tally, and 20/25/30/35/40 milestone timelines',
    category: 'Simulation',
    description:
      'Track striker or team Goals Per Game (GPG), minutes per goal, and projected end-of-season goal totals across 34 or 38 matches with milestone timelines.',
    icon: 'TrendingUp',
    keywords: ['season goals tracker', 'goals per game', 'golden boot projection', 'goal milestones'],
    formulaSummary: 'GPG = Goals / Matches | Projected = GPG × Season Matches | Milestone Pace Analysis',
    personaImageUrl: '/images/tool-season-goals.webp',
    personaRole: 'Goal Pace & Scoring Milestones Focus',
  },
  // 19. Tactical Formation Analyzer
  {
    id: 'formation-analyzer',
    slug: 'formation-analyzer',
    name: 'Tactical Formation Matchup Analyzer',
    seoTitle: 'Tactical Formation Matchup Analyzer Tool | StatKick',
    tagline: 'Evaluate tactical strengths, weaknesses, and key characteristics for any formation',
    category: 'Tactical',
    description:
      'Analyze 8 football tactical formations across midfield control, defensive solidity, wide threat, and pressing intensity to find optimal counter-systems.',
    icon: 'Shield',
    keywords: ['formation analyzer', 'tactical matchup', 'football tactics', 'formation counter', 'system comparison'],
    formulaSummary: 'Tactical evaluation matrix with playing style compatibility and balance analysis',
    personaImageUrl: '/images/tool-formation-tactics.webp',
    personaRole: 'Tactical Shape & Formation Matchup Focus',
  },
  // 20. Pressing Intensity Calculator
  {
    id: 'pressing-intensity-calculator',
    slug: 'pressing-intensity-calculator',
    name: 'Pressing Intensity & PPDA Calculator',
    seoTitle: 'Pressing Intensity & PPDA Calculator Tool | StatKick',
    tagline: 'Calculate PPDA-style pressing estimate, high turnover efficiency, and press index',
    category: 'Tactical',
    description:
      'Calculate Passes Allowed Per Defensive Action (PPDA), high turnover conversion rates, and pressing intensity scores to classify team defensive style.',
    icon: 'Gauge',
    keywords: ['ppda calculator', 'pressing intensity', 'high turnover', 'gegenpressing', 'defensive action'],
    formulaSummary: 'PPDA = Opponent Passes / Defensive Actions | Press Score = (12 - PPDA)×5 + SuccessRate×0.5',
    personaImageUrl: '/images/tool-pressing-ppda.webp',
    personaRole: 'Pressing Intensity & PPDA Metrics Focus',
  },
  // 21. Set Piece Success Rate
  {
    id: 'set-piece-success-rate',
    slug: 'set-piece-success-rate',
    name: 'Set Piece Success Rate & Threat Index',
    seoTitle: 'Set-Piece Success Rate & Threat Calculator | StatKick',
    tagline: 'Analyze corner conversion, direct/indirect free kicks, penalties, and overall danger rating',
    category: 'Tactical',
    description:
      'Evaluate football dead-ball efficiency across corners, direct and indirect free kicks, and penalties to calculate a composite Set-Piece Threat Score.',
    icon: 'Crosshair',
    keywords: ['set piece success rate', 'corner conversion', 'free kick conversion', 'penalty conversion rate'],
    formulaSummary: 'Threat Score = (Corner Goal% × 5) + (Corner Shot% × 0.4) + (DFK Accuracy% × 0.2) + (DFK Goal% × 1.5) + (IFK Goal% × 2.0) + (Penalty% × 0.2)',
    personaImageUrl: '/images/tool-set-piece.webp',
    personaRole: 'Dead-Ball Delivery & Set-Piece Focus',
  },
];

export const CATEGORIES: { id: ToolMeta['category']; label: string; description: string }[] = [
  { id: 'Performance', label: 'Performance', description: 'Player ratings, passing precision, shooting conversion, and team dominance metrics.' },
  { id: 'Market', label: 'Market & Finance', description: 'Transfer valuations, player wages, full contract worth, and roster asset value.' },
  { id: 'Fantasy', label: 'Fantasy & Lineups', description: 'FPL gameweek scoring, Best XI builders, captaincy rankings, and transfer options.' },
  { id: 'Simulation', label: 'Simulation & Records', description: 'League table projections, points needed math, head-to-head rivalries, and goal milestones.' },
  { id: 'Tactical', label: 'Tactics & Analytics', description: 'Formation matchups, PPDA pressing metrics, and set-piece efficiency ratings.' },
];
