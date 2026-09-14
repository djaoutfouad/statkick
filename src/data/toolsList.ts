import { ToolMeta } from '../types';

export const TOOLS_LIST: ToolMeta[] = [
  // 1. Player Performance Rater
  {
    id: 'player-performance-rater',
    slug: 'player-performance-rater',
    name: 'Player Performance Rater',
    tagline: 'Calculate composite match performance ratings across all 4 positions',
    category: 'Performance',
    description:
      'Evaluate football player match performance across positions (GK, DEF, MID, FWD) using weighted formulas combining goals, assists, passing accuracy, dribbles, tackles, and shot metrics normalized to a 100-point scale.',
    icon: 'Activity',
    keywords: ['player rating', 'match rating', 'football stats', 'player score', 'positional rating'],
    formulaSummary: 'Position-specific weighted composite index normalized to 100',
    personaImageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Match Performance & Analytics Scout',
  },
  // 2. Team Comparison
  {
    id: 'team-comparison',
    slug: 'team-comparison',
    name: 'Team Comparison Matrix',
    tagline: 'Side-by-side team statistical battle across 7 key performance metrics',
    category: 'Performance',
    description:
      'Compare two football teams across 7 fundamental statistical categories including goals per game, possession %, shots on target, pass completion, tackles, and corners to calculate total statistical dominance.',
    icon: 'Columns2',
    keywords: ['team comparison', 'head to head team', 'team dominance', 'match stats comparison'],
    formulaSummary: 'Category win aggregation: Dominance % = (Categories Won / 7) × 100',
    personaImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Head of Tactical & Match Analysis',
  },
  // 3. Pass Accuracy Calculator
  {
    id: 'pass-accuracy-calculator',
    slug: 'pass-accuracy-calculator',
    name: 'Pass Accuracy & Quality Index',
    tagline: 'Measure completion rates, long ball precision, and creative passing quality',
    category: 'Performance',
    description:
      'Calculate short and long ball completion percentages alongside an advanced Passing Quality Index that rewards key creative passes and progressive distribution.',
    icon: 'Send',
    keywords: ['passing accuracy', 'pass completion', 'long balls', 'key passes', 'passing quality index'],
    formulaSummary: 'Quality = (Pass% × 0.6) + (Key Passes × 2) + (LongBall% × 0.4)',
    personaImageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Midfield Playmaker & Passing Specialist',
  },
  // 4. Shot Conversion Rate
  {
    id: 'shot-conversion-rate',
    slug: 'shot-conversion-rate',
    name: 'Shot Conversion & Finishing Rate',
    tagline: 'Analyze total shot efficiency, on-target conversion, and big chance clinical rate',
    category: 'Performance',
    description:
      'Measure goalscoring efficiency by analyzing conversion rates across total shots, shots on target, and big chances scored versus missed.',
    icon: 'Target',
    keywords: ['shot conversion', 'finishing rate', 'big chances', 'shots on target', 'striker efficiency'],
    formulaSummary: 'Conversion % = (Goals / Shots) × 100 | Big Chance % = ((BC - BCM) / BC) × 100',
    personaImageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Striker Finishing & xG Coach',
  },
  // 5. Possession Impact Analyzer
  {
    id: 'possession-impact-analyzer',
    slug: 'possession-impact-analyzer',
    name: 'Possession Impact Analyzer',
    tagline: 'Measure possession efficiency, win conversion, and goal threat return',
    category: 'Performance',
    description:
      'Evaluate whether possession translates into actual results. Calculates Win Rate, Goals Per Game (GPG), and the Possession Efficiency Index to determine dominant versus sterile possession.',
    icon: 'PieChart',
    keywords: ['possession efficiency', 'possession stats', 'win rate', 'possession value', 'sterile possession'],
    formulaSummary: 'Efficiency = (Win Rate / Possession %) | GPG = Goals / Matches',
    personaImageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Positional Play & Ball Control Lead',
  },
  // 6. Player Form Index
  {
    id: 'player-form-index',
    slug: 'player-form-index',
    name: 'Player Form Index',
    tagline: 'Track 5-match rolling momentum, discipline impact, and playing time bonus',
    category: 'Performance',
    description:
      'Quantify recent 5-game form through goals, assists, average ratings, disciplinary deductions (yellow/red cards), and minutes-played durability bonuses scaled to 10.0.',
    icon: 'Flame',
    keywords: ['player form', 'recent form index', 'form rating', 'momentum tracker', '5-match form'],
    formulaSummary: 'Form = Base(Goals×1.5 + Assists×1.2 + Rating×0.8) - Deductions + MinBonus',
    personaImageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80',
    personaRole: 'First-Team Form & Fitness Coach',
  },
  // 7. Transfer Value Estimator
  {
    id: 'transfer-value-estimator',
    slug: 'transfer-value-estimator',
    name: 'Transfer Value Estimator',
    tagline: 'Estimate realistic market transfer value with age curves, league tier, and contract terms',
    category: 'Market',
    description:
      'Compute a StatKick Transfer Value Estimate (€M) by evaluating positional baseline, age multiplier curve, goal/assist output, domestic league multiplier, contract duration, and international caps.',
    icon: 'Coins',
    keywords: ['transfer value', 'player price', 'market value calculator', 'football transfer fee'],
    formulaSummary: 'Value = Base × AgeMult × PerfMult × LeagueMult × ContractMult + CapsBonus',
    personaImageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Football Sporting Director & Scout',
  },
  // 8. Wage Calculator
  {
    id: 'wage-calculator',
    slug: 'wage-calculator',
    name: 'Player Wage & Salary Structure Calculator',
    tagline: 'Calculate gross annual earnings, effective weekly wage, and performance incentive bonuses',
    category: 'Market',
    description:
      'Model complete compensation structures including base weekly wages (52 weeks), match appearance fees, goal scoring bonuses, and clean sheet incentives in £, €, or $.',
    icon: 'Banknote',
    keywords: ['football wage', 'player salary', 'weekly wage calculator', 'wage structure', 'bonus calculator'],
    formulaSummary: 'Annual = (Weekly Base × 52) + (Matches × Appearance Fee) + (Goals × Goal Bonus) + (Clean Sheets × CS Bonus)',
    personaImageUrl: 'https://images.unsplash.com/photo-1524015368236-bbf6f72545b6?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Player Contract & Wage Strategist',
  },
  // 9. Squad Value Calculator
  {
    id: 'squad-value-calculator',
    slug: 'squad-value-calculator',
    name: 'Squad Value & Depth Calculator',
    tagline: 'Calculate total roster worth, Starting XI valuation, and bench capital distribution',
    category: 'Market',
    description:
      'Manage up to 25 players with names, positions, and valuations to compute total squad worth, Starting XI valuation (top 11 players), bench asset value, and identify the most valuable player.',
    icon: 'Users',
    keywords: ['squad value', 'team valuation', 'starting xi value', 'bench depth value', 'roster worth'],
    formulaSummary: 'Total = Σ Players | Starting XI = Top 11 Values | Bench = Total - Starting XI',
    personaImageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Chief Technical Officer & Roster Lead',
  },
  // 10. Contract Worth Analyzer
  {
    id: 'contract-worth-analyzer',
    slug: 'contract-worth-analyzer',
    name: 'Contract Worth & Commitment Analyzer',
    tagline: 'Calculate total financial commitment, annual accounting cost, and cost per match',
    category: 'Market',
    description:
      'Analyze the full financial scope of a player signing: transfer fee, annual salary over contract duration, agent fees, signing bonuses, and cost per match.',
    icon: 'FileText',
    keywords: ['contract worth', 'football contract analyzer', 'transfer fee commitment', 'salary cost', 'cost per match'],
    formulaSummary: 'Total Commitment = Transfer Fee + (Annual Salary × Years) + Agent Fee + Signing Bonus',
    personaImageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Financial Fair Play & Transfer Officer',
  },
  // 11. Fantasy Football Points
  {
    id: 'fantasy-football-points',
    slug: 'fantasy-football-points',
    name: 'Fantasy Points Calculator',
    tagline: 'Analytical FPL gameweek scoring estimate with minutes, clean sheets, goals, cards, and bonus',
    category: 'Fantasy',
    description:
      'Calculate an analytical estimate of Fantasy Premier League (FPL) gameweek points with standard positional scoring rules for goals, clean sheets, appearance thresholds, penalty saves, bonus points, and captaincy boosts.',
    icon: 'Award',
    keywords: ['fantasy football calculator', 'fpl points', 'fpl calculator', 'fantasy premier league score'],
    formulaSummary: 'Analytical FPL estimate: Minutes + Positional Goals + CleanSheet + Defensive Contribution + Cards + Saves + Bonus',
    personaImageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Fantasy Premier League (FPL) Quant Lead',
  },
  // 12. Best XI Selector
  {
    id: 'best-xi-selector',
    slug: 'best-xi-selector',
    name: 'Best XI & Formation Selector',
    tagline: 'Build an optimized Best XI lineup using a heuristic model across 6 classic formations',
    category: 'Fantasy',
    description:
      'Input your player pool with ratings and choose from formations (4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2, 3-4-3) to select an optimized Best XI lineup using a heuristic positional model.',
    icon: 'LayoutGrid',
    keywords: ['best xi', 'formation builder', 'starting xi selector', 'tactical pitch', 'football lineup'],
    formulaSummary: 'Heuristic positional ranking model matching formation quota constraints',
    personaImageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Starting XI Tactical Optimizer',
  },
  // 13. Captain Pick Analyzer
  {
    id: 'captain-pick-analyzer',
    slug: 'captain-pick-analyzer',
    name: 'Fantasy Captain Pick Analyzer',
    tagline: 'Compare fantasy captain candidates with fixture difficulty, form, and venue advantages',
    category: 'Fantasy',
    description:
      'Rank fantasy captain candidates through a weighted model: Player Form (30%), Fixture Ease (25%), Home Advantage (15%), History vs Opponent (15%), and Team Attack Strength (15%).',
    icon: 'Crown',
    keywords: ['captain pick', 'fpl captain analyzer', 'captaincy score', 'fdr rating', 'fantasy captain'],
    formulaSummary: 'StatKick Captaincy Score = (Form × 30%) + (Fixture × 25%) + (Home × 15%) + (History × 15%) + (Team Attack × 15%)',
    personaImageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Fantasy Captaincy & Form Analyst',
  },
  // 14. Transfer Suggestion
  {
    id: 'transfer-suggestion',
    slug: 'transfer-suggestion',
    name: 'Fantasy Transfer Strategy Engine',
    tagline: 'Generate 3 analytical player replacement profiles based on budget, horizon, and risk profile',
    category: 'Fantasy',
    description:
      'Receive structured transfer recommendations across three archetypes (High Ceiling, Safe Floor, Differential) tailored to your position requirement, remaining budget, and gameweek horizon.',
    icon: 'ArrowRightLeft',
    keywords: ['fantasy transfer', 'fpl transfer suggestions', 'differential pick', 'fantasy football strategy'],
    formulaSummary: 'Rule-based strategy matrix analyzing budget elasticity, fixture windows, and risk profiles',
    personaImageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Transfer Strategy & Differential Scout',
  },
  // 15. League Table Simulator
  {
    id: 'league-table-simulator',
    slug: 'league-table-simulator',
    name: 'League Table Simulator & PPG Projector',
    tagline: 'Simulate full league standings with points-per-game projections and title/relegation cutoffs',
    category: 'Simulation',
    description:
      'Track current standings (P, W, D, L, GF, GA, GD, Pts) and project end-of-season finishes using Points-Per-Game (PPG) trajectories with champion, European spots, and relegation zone highlighting.',
    icon: 'Trophy',
    keywords: ['league table simulator', 'ppg projector', 'football standings projection', 'points simulator'],
    formulaSummary: 'Points = W×3 + D | Projected Points = Current Pts + (PPG × Remaining Matches)',
    personaImageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80',
    personaRole: 'League Standings & Title Race Modeler',
  },
  // 16. Points Needed Calculator
  {
    id: 'points-needed-calculator',
    slug: 'points-needed-calculator',
    name: 'Points Needed Calculator',
    tagline: 'Calculate required wins and mathematical points to secure titles, Top 4, or avoid relegation',
    category: 'Simulation',
    description:
      'Determine required points, run-in points-per-game pace, and viable win-draw-loss combinations to achieve specific season objectives based on target points and games remaining.',
    icon: 'CheckCircle2',
    keywords: ['points needed', 'title race calculator', 'relegation calculator', 'magic number football'],
    formulaSummary: 'Points Deficit = Target Pts - Current Pts | Required PPG = Points Deficit / Games Remaining',
    personaImageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Relegation & European Race Analyst',
  },
  // 17. Head to Head Stats
  {
    id: 'head-to-head-stats',
    slug: 'head-to-head-stats',
    name: 'Head to Head Historical Record',
    tagline: 'Analyze historical derby records, win ratios, goal distribution, and dominance score',
    category: 'Simulation',
    description:
      'Compare historical rivalry records between two clubs: all-time win rates, draw frequency, goals scored per game, and historical dominance score.',
    icon: 'Swords',
    keywords: ['head to head', 'h2h football', 'historical record', 'team derby stats', 'rivalry stats'],
    formulaSummary: 'Win% = Wins/Total×100 | Dominance = (A Wins - B Wins) / Total × 100 with goal weighting',
    personaImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Derby & Rivalry Matchup Specialist',
  },
  // 18. Season Goals Tracker
  {
    id: 'season-goals-tracker',
    slug: 'season-goals-tracker',
    name: 'Season Goals Tracker & Milestone Pace',
    tagline: 'Track scoring rate, projected end-of-season tally, and 20/25/30/35/40 milestone timelines',
    category: 'Simulation',
    description:
      'Calculate a striker or team’s Goals Per Game (GPG), project total goals across full league or continental campaigns, and track exact trajectory toward elite scoring milestones.',
    icon: 'TrendingUp',
    keywords: ['season goals tracker', 'goals per game', 'golden boot projection', 'goal milestones'],
    formulaSummary: 'GPG = Goals / Matches | Projected = GPG × Season Matches | Milestone Pace Analysis',
    personaImageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Golden Boot & Goal Milestone Analyst',
  },
  // 19. Tactical Formation Analyzer
  {
    id: 'formation-analyzer',
    slug: 'formation-analyzer',
    name: 'Tactical Formation Matchup Analyzer',
    tagline: 'Evaluate tactical strengths, weaknesses, and key characteristics for any formation',
    category: 'Tactical',
    description:
      'Analyze attacking threat, defensive solidity, midfield control, pressing intensity, and counter-attack vulnerability across 8 major tactical setups and 4 playing philosophies.',
    icon: 'Shield',
    keywords: ['formation analyzer', 'tactical matchup', 'football tactics', 'formation counter', 'system comparison'],
    formulaSummary: 'Tactical evaluation matrix with playing style compatibility and balance analysis',
    personaImageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=600&q=80',
    personaRole: 'UEFA Pro Tactical Systems Analyst',
  },
  // 20. Pressing Intensity Calculator
  {
    id: 'pressing-intensity-calculator',
    slug: 'pressing-intensity-calculator',
    name: 'Pressing Intensity & PPDA Calculator',
    tagline: 'Calculate PPDA-style pressing estimate, high turnover efficiency, and press index',
    category: 'Tactical',
    description:
      'Measure defensive aggression with a PPDA-style pressing estimate, turnover conversion percentage, and an overall Pressing Intensity Index with benchmark comparisons.',
    icon: 'Gauge',
    keywords: ['ppda calculator', 'pressing intensity', 'high turnover', 'gegenpressing', 'defensive action'],
    formulaSummary: 'PPDA = Opponent Passes / Defensive Actions | Press Score = (12 - PPDA)×5 + SuccessRate×0.5',
    personaImageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80',
    personaRole: 'High Press & PPDA Defensive Analyst',
  },
  // 21. Set Piece Success Rate
  {
    id: 'set-piece-success-rate',
    slug: 'set-piece-success-rate',
    name: 'Set Piece Success Rate & Threat Index',
    tagline: 'Analyze corner conversion, direct/indirect free kicks, penalties, and overall danger rating',
    category: 'Tactical',
    description:
      'Evaluate dead-ball efficiency across corners, direct free kicks, indirect free kicks, and penalty kicks to produce a composite Set Piece Threat Score /100 and identify top scoring weapons.',
    icon: 'Crosshair',
    keywords: ['set piece success rate', 'corner conversion', 'free kick conversion', 'penalty conversion rate'],
    formulaSummary: 'Threat Score = (Corner Goal% × 5) + (Corner Shot% × 0.4) + (DFK Accuracy% × 0.2) + (DFK Goal% × 1.5) + (IFK Goal% × 2.0) + (Penalty% × 0.2)',
    personaImageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Set-Piece Specialist & Delivery Coach',
  },
];

export const CATEGORIES: { id: ToolMeta['category']; label: string; description: string }[] = [
  { id: 'Performance', label: 'Performance', description: 'Player ratings, passing precision, shooting conversion, and team dominance metrics.' },
  { id: 'Market', label: 'Market & Finance', description: 'Transfer valuations, player wages, full contract worth, and roster asset value.' },
  { id: 'Fantasy', label: 'Fantasy & Lineups', description: 'FPL gameweek scoring, Best XI builders, captaincy rankings, and transfer options.' },
  { id: 'Simulation', label: 'Simulation & Records', description: 'League table projections, points needed math, head-to-head rivalries, and goal milestones.' },
  { id: 'Tactical', label: 'Tactics & Analytics', description: 'Formation matchups, PPDA pressing metrics, and set-piece efficiency ratings.' },
];
