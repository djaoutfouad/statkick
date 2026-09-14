import { GuideItem } from '../types';

export const GUIDES_DATA: GuideItem[] = [
  {
    slug: 'beginners-guide-to-football-analytics',
    title: 'Beginner’s Guide to Football Analytics',
    tagline: 'A gentle, comprehensive introduction to understanding and interpreting modern football data',
    excerpt:
      'Start here if you are new to football analytics. Learn what numbers matter, how to avoid common pitfalls, and how to read modern match reports like a pro analyst.',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    readTime: '6 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-01-10',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['player-performance-rater', 'team-comparison', 'shot-conversion-rate'],
    references: [
      { title: 'The Numbers Game: Why Everything You Know About Football Is Wrong', source: 'Chris Anderson & David Sally (Penguin Books)' },
      { title: 'Opta Event Definitions & Metric Foundations', source: 'Stats Perform Analytics', url: 'https://theanalyst.com' },
    ],
    steps: [
      {
        title: 'Step 1: Understand Why the Scoreline Can Be Misleading',
        summary: 'Football is a low-scoring sport influenced by high short-term variance and refereeing decisions.',
        details: [
          'A 1-0 victory might occur from an unlucky deflection despite the losing team creating 3.5 Expected Goals and dominating 75% of territory.',
          'Analytics aims to measure performance quality rather than just celebrating or lamenting the final score.',
        ],
        proTip: 'Never judge a team or coach after a single 90-minute match without inspecting underlying metrics.',
      },
      {
        title: 'Step 2: Learn the Three Core Modern Metrics (xG, xA, PPDA)',
        summary: 'Master the fundamental triad of chance creation, playmaking, and pressing intensity.',
        details: [
          'Expected Goals (xG): Measures shot quality on a 0 to 1 scale.',
          'Expected Assists (xA): Measures the likelihood of a pass leading to a goal.',
          'PPDA: Measures defensive pressing aggressiveness in the opponent’s half.',
        ],
      },
      {
        title: 'Step 3: Always Contextualize by Role and Playing Time',
        summary: 'Convert raw numbers into "Per 90 Minutes" and compare players only within the same positional cohort.',
        details: [
          'Never compare a defensive fullback to an inverted winger on raw assist totals.',
          'Use StatKick’s Player Performance Rater to normalize outputs across all 4 positions.',
        ],
      },
    ],
    summaryTakeaway:
      'Football analytics does not replace the emotion or artistry of the game; it provides a rational lens to understand why events happen on the pitch.',
  },
  {
    slug: 'how-to-analyze-a-player',
    title: 'How to Analyze a Football Player with Modern Metrics',
    tagline: 'The recruitment analyst framework for evaluating individual player profiles',
    excerpt:
      'A structured scouting guide covering on-ball technical output, physical durability, positional benchmarks, and contract valuation models.',
    category: 'Scouting & Player Analysis',
    difficulty: 'Intermediate',
    readTime: '8 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-01-14',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['player-performance-rater', 'player-form-index', 'transfer-value-estimator', 'pass-accuracy-calculator'],
    references: [
      { title: 'Player Profiling and Radar Benchmark Systems', source: 'StatsBomb Data Science Group', url: 'https://statsbomb.com' },
      { title: 'Technical Scouting & Quantitative Assessment', source: 'European Club Association (ECA) High Performance Report' },
    ],
    steps: [
      {
        title: 'Step 1: Establish the Positional Role Definition',
        summary: 'Determine the specific tactical archetype rather than a generic position label.',
        details: [
          'Is the midfielder a deep-lying playmaker, a ball-winning destroyer, or an advanced creative 10?',
          'Different roles require distinct KPI priority weighting.',
        ],
      },
      {
        title: 'Step 2: Collect Per 90 Output Across at Least 900+ Minutes',
        summary: 'Ensure a statistically valid sample size before drawing conclusions.',
        details: [
          'Calculate goals, assists, key passes, progressive carries, and defensive duel win percentages per 90 minutes.',
          'Check for minute durability and disciplinary deductions using StatKick’s Player Form Index.',
        ],
        proTip: 'Beware of players with fewer than 10 full matches played; sample size variance can heavily inflate stats.',
      },
      {
        title: 'Step 3: Audit Market Valuation and Contract Amortization',
        summary: 'Connect on-pitch performance to financial market feasibility.',
        details: [
          'Examine remaining contract duration, age decay trajectory, and salary tier using the Transfer Value Estimator.',
        ],
      },
    ],
    summaryTakeaway:
      'A complete player analysis bridges tactical suitability, on-pitch output per 90, and financial sustainability.',
  },
  {
    slug: 'how-to-compare-two-football-teams',
    title: 'How to Compare Two Football Teams Using Data',
    tagline: 'A side-by-side diagnostic checklist for pre-match previews and tactical battles',
    excerpt:
      'Compare attacking firepower, defensive solidity, territorial dominance, and transition vulnerability between any two clubs.',
    category: 'Team & Tactical Analysis',
    difficulty: 'Intermediate',
    readTime: '7 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-01-22',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['team-comparison', 'formation-analyzer', 'head-to-head-stats'],
    references: [
      { title: 'Predictive Modeling for Football Match Outcomes', source: 'MIT Sloan Sports Analytics', url: 'https://www.sloansportsconference.com' },
      { title: 'Tactical Comparison Metrics in Domestic Leagues', source: 'UEFA Technical Studies Group' },
    ],
    steps: [
      {
        title: 'Step 1: Compare Expected Goal Differential (xGD/90)',
        summary: 'Determine which team creates higher net chance value on average.',
        details: [
          'A team with +1.10 xGD per match is structurally superior to a team with +0.20 xGD, regardless of table position.',
        ],
      },
      {
        title: 'Step 2: Contrast Pressing vs Buildup Profiles',
        summary: 'Check if Team A’s pressing style (PPDA) counters Team B’s pass accuracy under pressure.',
        details: [
          'If an aggressive high-pressing team faces a team prone to defensive third turnovers, the tactical match-up favors the press.',
        ],
      },
      {
        title: 'Step 3: Evaluate Set-Piece Threat Disparity',
        summary: 'Assess corner kick and free kick conversion efficiency.',
        details: [
          'In tight encounters between evenly matched squads, set-piece execution frequently determines the winning margin.',
        ],
      },
    ],
    summaryTakeaway:
      'Using StatKick’s Team Comparison Matrix, you can quickly evaluate head-to-head superiority across all 7 critical statistical dimensions.',
  },
  {
    slug: 'how-to-measure-pressing',
    title: 'How to Measure Pressing & Defensive Intensity',
    tagline: 'From PPDA to defensive line height: how to quantify defensive pressure',
    excerpt:
      'A complete practitioner’s handbook for calculating pressing intensity, recovery zones, and defensive turnover conversion.',
    category: 'Tactical Analytics',
    difficulty: 'Advanced',
    readTime: '9 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-01-26',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['pressing-intensity-calculator', 'formation-analyzer', 'possession-impact-analyzer'],
    references: [
      { title: 'Passes Per Defensive Action: Theoretical Foundations', source: 'StatsBomb Intelligence Unit', url: 'https://statsbomb.com' },
      { title: 'Quantifying Team Pressure in Modern European Football', source: 'Journal of Sports Analytics' },
    ],
    steps: [
      {
        title: 'Step 1: Gather Event Data for the Forward 60% of the Pitch',
        summary: 'Isolate defensive events initiated in the opponent’s defensive and middle zones.',
        details: [
          'Count opponent passes attempted in that zone alongside your team’s tackles, interceptions, challenges, and fouls.',
        ],
      },
      {
        title: 'Step 2: Calculate Passes Allowed Per Defensive Action (PPDA)',
        summary: 'Divide opponent passes by your total defensive actions in the target zone.',
        details: [
          'PPDA < 9.0 = Intense High Press (e.g., Gegenpressing).',
          'PPDA 9.0 - 13.0 = Active Mid Block.',
          'PPDA > 14.0 = Passive Low Block.',
        ],
        proTip: 'Combine PPDA with high turnovers to confirm whether pressing leads directly to dangerous shot opportunities.',
      },
      {
        title: 'Step 3: Analyze Formation Suitability',
        summary: 'Test how tactical systems (4-3-3, 4-2-3-1, 3-5-2) facilitate or hinder pressing coverage.',
        details: [
          'Evaluate wing coverage and central midfield trapping zones using the Formation Tactical Analyzer.',
        ],
      },
    ],
    summaryTakeaway:
      'Pressing is quantifiable. PPDA provides coaches and analysts with an exact mathematical metric to track pressing discipline and evolution.',
  },
  {
    slug: 'how-to-analyze-attacking-efficiency',
    title: 'How to Analyze Attacking Efficiency & Finishing',
    tagline: 'Diagnose whether a team’s goal tally is sustainable or due for regression',
    excerpt:
      'Explore shot conversion rates, big chance finishing, shot distance, and attacking shot distribution models.',
    category: 'Attacking Analysis',
    difficulty: 'Intermediate',
    readTime: '6 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-02-02',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['shot-conversion-rate', 'season-goals-tracker', 'player-performance-rater'],
    references: [
      { title: 'Finishing Efficiency and Goal Prediction Models', source: 'Opta Analyst Research', url: 'https://theanalyst.com' },
      { title: 'Shot Location and Probability in European Football', source: 'Binghamton University Sports Analytics Group' },
    ],
    steps: [
      {
        title: 'Step 1: Calculate the Overall Shot Conversion Rate',
        summary: 'Divide total goals scored by total shots taken.',
        details: [
          'Benchmark against the league average (12-15%). If a team or striker is converting at 28%, expect downward regression.',
        ],
      },
      {
        title: 'Step 2: Audit Big Chance Clinical Efficiency',
        summary: 'Measure the percentage of 1-on-1s and clear-cut opportunities converted into goals.',
        details: [
          'Elite finishers convert 55%+ of big chances; struggling forwards often drop below 35%.',
        ],
      },
      {
        title: 'Step 3: Project Full-Season Trajectories',
        summary: 'Use the Season Goal Tracker to forecast final seasonal finishes and Golden Boot targets.',
        details: [
          'Calculate goals per game pace across 38 matches to assess if historical scoring targets will be reached.',
        ],
      },
    ],
    summaryTakeaway:
      'Attacking efficiency combines shot volume with shot quality. True elite attacks produce high xG while finishing chances near or above historical benchmarks.',
  },
  {
    slug: 'how-to-analyze-defensive-performance',
    title: 'How to Analyze Defensive Performance & Solidity',
    tagline: 'Beyond clean sheets: evaluating underlying defensive durability and organization',
    excerpt:
      'Clean sheets can be misleading due to stellar goalkeeping. Learn how to isolate defensive structure, xGA, and box protection.',
    category: 'Defensive Analysis',
    difficulty: 'Intermediate',
    readTime: '7 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-02-04',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['team-comparison', 'formation-analyzer', 'set-piece-success-rate'],
    references: [
      { title: 'Evaluating Team Defensive Structure Beyond Outcome Bias', source: 'Journal of Quantitative Analysis in Sports' },
      { title: 'Shot Concession Topology and Defensive Line Height', source: 'StatsBomb Tactical Studies', url: 'https://statsbomb.com' },
    ],
    steps: [
      {
        title: 'Step 1: Separate Goalkeeping Heroics from Team Defense',
        summary: 'Analyze Expected Goals Conceded (xGA) vs Actual Goals Conceded.',
        details: [
          'A team that conceded 10 goals from 22.0 xGA has a world-class goalkeeper masking a fragile backline.',
        ],
      },
      {
        title: 'Step 2: Measure Danger Allowed on Set Pieces',
        summary: 'Calculate conceded corner and free kick threat index.',
        details: [
          'Evaluate whether zonal or man-marking schemes are leaking high-percentage header chances.',
        ],
      },
      {
        title: 'Step 3: Evaluate Central Defense Compactness',
        summary: 'Check average distance between defensive lines and shot proximity allowed.',
        details: [
          'Defenses that force opponents into low-xG long shots from outside the box are structurally sound.',
        ],
      },
    ],
    summaryTakeaway:
      'True defensive resilience is measured by minimizing high-probability scoring chances allowed, not simply counting clean sheets.',
  },
  {
    slug: 'how-to-use-football-statistics-correctly',
    title: 'How to Use Football Statistics Correctly: Avoiding Common Errors',
    tagline: 'The golden rules of statistical integrity and ethical data storytelling in football',
    excerpt:
      'Avoid cherry-picked numbers, confirmation bias, false correlations, and misleading sample sizes in football debates.',
    category: 'Methodology & Ethics',
    difficulty: 'Beginner',
    readTime: '5 min',
    author: 'StatKick Analytics Research Team',
    date: '2026-02-08',
    lastReviewed: '2026-02-28',
    relatedToolSlugs: ['team-comparison', 'player-performance-rater', 'possession-impact-analyzer'],
    references: [
      { title: 'Statistical Thinking for Sports Analysts', source: 'American Statistical Association (ASA)' },
      { title: 'Data Ethics and Responsible Metric Interpretation', source: 'Football Performance Analysis Society' },
    ],
    steps: [
      {
        title: 'Rule 1: Never Cherry-Pick Single-Game Stats Out of Context',
        summary: 'A player making 0 tackles in a match where their team held 80% possession is not "lazy".',
        details: [
          'Always account for team tactical game state and opportunity volume.',
        ],
      },
      {
        title: 'Rule 2: Respect Sample Sizes',
        summary: 'Do not extrapolate 3-game hot streaks into multi-year career conclusions.',
        details: [
          'A minimum of 900 to 1,500 minutes is required for statistical stability across most attacking metrics.',
        ],
      },
      {
        title: 'Rule 3: Pair Data with Video Scouting',
        summary: 'Quantitative statistics identify WHAT happened; tactical video analysis explains HOW and WHY.',
        details: [
          'The best modern football minds combine advanced statistical models with thorough tactical film study.',
        ],
      },
    ],
    summaryTakeaway:
      'Statistics are a powerful flashlight in modern football analysis, but they must be wielded with intellectual honesty, proper context, and mathematical rigour.',
  },
];
