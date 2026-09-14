import { ToolTranslation } from '../../types';

export const frToolsData: Record<string, ToolTranslation> = {
  'player-performance-rater': {
    name: 'Évaluateur de Performance des Joueurs',
    tagline: 'Calculez la note globale du match sur les 4 postes du football',
    description:
      'Évaluez la performance des joueurs (GB, DEF, MIL, ATT) grâce à des formules pondérées combinant buts, passes décisives, précision des passes, dribbles, tacles et tirs sur une échelle de 100 points.',
    formulaSummary: 'Indice composite pondéré par poste normalisé sur 100',
    intro:
      'L’Évaluateur de Performance calcule une note de match complète sur 100 pour chaque joueur sur les quatre postes majeurs : Gardien (GB), Défenseur (DEF), Milieu (MIL) et Attaquant (ATT). En évaluant l’apport offensif, la conservation du ballon, les duels de dribble et les interventions défensives, cet outil fournit une note objective.',
    metricExplanation:
      'Les statistiques brutes sous-évaluent souvent les milieux organisateurs ou les défenseurs centraux. Les notes ajustées par poste calibrent les exigences : la note d’un milieu valorise la précision de passe et les tacles, tandis que celle d’un attaquant dépend de son efficacité devant le but.',
    interpretation:
      'Notes de 0 à 100 : 90–100 représente la Classe Mondiale (match exceptionnel et décisif) ; 80–89 Excellent (très forte influence) ; 65–79 Bon (performance solide et fiable) ; 50–64 Moyen ; moins de 50 Faible ou Décevant.',
    methodology:
      'Pondération par poste : ATT = (Buts × 3) + (Passes Décisives × 2) + (%TirsCadrés × 0.3) + (%Passes × 0.2) + (Dribbles × 1.5) ; MIL = (Buts × 2) + (Passes Décisives × 2.5) + (%Passes × 0.4) + (Dribbles × 1.5) + (Tacles × 1.5) ; DEF = (Tacles × 3) + (%Passes × 0.4) + (Buts × 1.5) + (Passes Décisives × 1) + BonusCleanSheet ; GB = (%Passes × 0.5) + (Tacles × 2) + (Arrêts × 3) + BonusCleanSheet.',
    footballContext:
      'Dans le football de haut niveau européen (Ligue 1, Ligue des Champions, Premier League), la note moyenne d’un titulaire se situe entre 62 et 72. Obtenir régulièrement plus de 80 distingue les candidats au Ballon d’Or des joueurs de rotation.',
    faqs: [
      {
        question: 'Comment la note de 0 à 100 est-elle normalisée ?',
        answer:
          'La formule agrège les statistiques pondérées selon le poste et les étalonne par rapport aux standards professionnels, bornant le résultat entre 10 et 99.',
      },
      {
        question: 'Pourquoi les défenseurs et gardiens sont-ils notés différemment des attaquants ?',
        answer:
          'Un défenseur marque rarement, mais sa valeur repose sur ses duels gagnés, relances et clean sheets. Le moteur adapte mathématiquement les coefficients à chaque rôle.',
      },
      {
        question: 'Un joueur peut-il obtenir une note Classe Mondiale de 99 ou 100 ?',
        answer:
          'Oui. Des performances extraordinaires avec plusieurs buts/passes décisives, plus de 90% de passes réussies et un gros travail défensif propulsent le joueur au-delà de 90.',
      },
    ],
    labels: {
      positionPresets: 'Charger les Préréglages de Poste',
      fwdPreset: 'Préréglage ATT',
      midPreset: 'Préréglage MIL',
      defPreset: 'Préréglage DEF',
      gkPreset: 'Préréglage GB',
      positionRole: 'Rôle / Poste',
      goals: 'Buts Marqués',
      assists: 'Passes Décisives',
      passAccuracy: 'Précision des Passes %',
      shotsOnTargetPercent: 'Tirs Cadrés %',
      dribbles: 'Dribbles Réussis',
      tackles: 'Tacles Gagnés',
      saves: 'Arrêts Réalisés',
      cleanSheet: 'Clean Sheet Réalisé (+Bonus)',
      matchRating: 'Note de Match Calculée',
      performanceTier: 'Niveau de Performance',
      attackingImpact: 'Impact Offensif',
      attackingImpactSub: 'Menace buts, passes décisives et tirs',
      defensiveWork: 'Travail Défensif',
      defensiveWorkSub: 'Tacles, duels, interceptions et arrêts',
      resetValues: 'Réinitialiser les Valeurs',
    },
  },

  'team-comparison': {
    name: 'Matrice de Comparaison d’Équipes',
    tagline: 'Face-à-face statistique d’équipes sur 7 indicateurs clés de performance',
    description:
      'Comparez deux clubs de football sur 7 catégories statistiques : buts par match, possession %, tirs cadrés, précision de passe, tacles et corners pour calculer la domination totale.',
    formulaSummary: 'Agrégation des victoires : Domination % = (Catégories Gagnées / 7) × 100',
    intro:
      'La Matrice de Comparaison d’Équipes confronte deux clubs sur sept aspects majeurs du jeu : efficacité offensive, contrôle de la possession, volume de tir, précision des passes, intensité défensive et danger sur coups de pied arrêtés.',
    metricExplanation:
      'Comparer deux équipes uniquement via le classement occulte les styles de jeu. Une équipe à 58% de possession peut créer moins de danger qu’une équipe redoutable en transition rapide.',
    interpretation:
      'Domination sur les 7 catégories : 5+ victoires indiquent une supériorité nette ; 4 victoires un avantage compétitif ; un score de 3–3 reflète un équilibre parfait.',
    methodology:
      'Chacune des 7 métriques est comparée individuellement. La meilleure équipe remporte 1 point de catégorie. En cas d’égalité exacte, aucun point n’est attribué. Domination % = (Gagnées / 7) × 100.',
    footballContext:
      'Les prétendants aux titres européens tournent généralement à plus de 2.2 buts/match, plus de 58% de possession et plus de 86% de passes réussies.',
    faqs: [
      {
        question: 'Comment la domination statistique est-elle calculée ?',
        answer:
          'Elle est mesurée sur 7 piliers : Buts/Match, Possession %, Tirs, Tirs Cadrés, Précision de Passe, Tacles et Corners. Domination % = Catégories gagnées divisées par 7.',
      },
      {
        question: 'Comment sont gérées les égalités sur une métrique ?',
        answer:
          'Si les deux équipes affichent exactement la même valeur, la catégorie est déclarée Nulle et aucune équipe ne marque de point.',
      },
      {
        question: 'Une équipe avec moins de possession peut-elle dominer ?',
        answer:
          'Oui. Une équipe de contre qui domine son adversaire en buts, tirs cadrés, tacles et corners remportera la majorité des catégories.',
      },
    ],
    labels: {
      teamAProfile: 'Profil Équipe A',
      teamBProfile: 'Profil Équipe B',
      teamName: 'Nom de l’Équipe',
      goalsPerGame: 'Buts / Match',
      possession: 'Possession %',
      shotsPerGame: 'Tirs / Match',
      shotsOnTargetPerGame: 'Tirs Cadrés / Match',
      passAccuracy: 'Précision des Passes %',
      tacklesPerGame: 'Tacles / Match',
      cornersPerGame: 'Corners / Match',
      dominanceSummary: 'Résumé de la Domination Statistique',
      categoriesWon: 'Catégories Gagnées',
      drawCategories: 'Catégories Égalisées',
      headToHeadBreakdown: 'Détail Métrique par Métrique',
      advantage: 'Avantage',
      tied: 'Égalité',
      resetData: 'Réinitialiser la Comparaison',
    },
  },

  'pass-accuracy-calculator': {
    name: 'Calculateur de Précision et Qualité de Passe',
    tagline: 'Mesurez le taux de réussite, le jeu long et la qualité créative',
    description:
      'Calculez les pourcentages de passes courtes et longues ainsi qu’un Indice de Qualité de Passe récompensant les passes clés et le jeu vers l’avant.',
    formulaSummary: 'Qualité = (Passes% × 0.6) + (Passes Clés × 2) + (PassesLongues% × 0.4)',
    intro:
      'Ce calculateur évalue la précision des passes courtes et longues ainsi que la qualité créative de la distribution. Au lieu de se fier au seul pourcentage brut, il intègre les passes clés et les ouvertures diagonales progressives.',
    metricExplanation:
      'Un joueur à 95% de réussite qui ne fait que des passes en retrait apporte moins qu’un meneur à 82% qui délivre 5 passes clés et réussit 8 transversales de 40 mètres. L’Indice de Qualité équilibre sécurité et création.',
    interpretation:
      'Un score de 85+ correspond à un créateur d’élite (type Toni Kroos ou De Bruyne) ; 70–84 à un relais fiable ; 55–69 au standard moyen ; moins de 55 à un jeu sans impact.',
    methodology:
      'Précision % = (Réussies / Totales) × 100 ; Précision Jeu Long % = (Longues Réussies / Longues Tentées) × 100 ; Indice de Qualité = (Passes% × 0.60) + (Passes Clés × 2.0) + (Jeu Long% × 0.40).',
    footballContext:
      'Les milieux relayeurs d’élite affichent 88–93% de réussite globale et 65–75% sur le jeu long. Les numéros 10 tournent autour de 78–84% en raison de la densité du dernier tiers.',
    faqs: [
      {
        question: 'Qu’est-ce que l’Indice de Qualité de Passe ?',
        answer:
          'Cet indice combine la conservation du ballon (60%), la précision des transversales (40%) et les passes clés créatrices d’occasions (+2 pts par passe clé).',
      },
      {
        question: 'Quel est un bon pourcentage de passes réussies chez les pros ?',
        answer:
          'Les défenseurs centraux tournent à 88–94%, les milieux centraux à 84–90% et les ailiers créatifs à 74–82%.',
      },
      {
        question: 'Comment sont traitées les valeurs nulles ?',
        answer:
          'Des sécurités mathématiques empêchent les erreurs de division par zéro, retournant 0.0% en toute sécurité.',
      },
    ],
    labels: {
      totalPasses: 'Passes Totales Tentées',
      completedPasses: 'Passes Réussies',
      keyPasses: 'Passes Clés / Occasions Créées',
      longBallsAttempted: 'Passes Longues Tentées',
      longBallsCompleted: 'Passes Longues Réussies',
      qualityScore: 'Indice de Qualité de Passe',
      overallAccuracy: 'Précision Globale des Passes',
      longBallAccuracy: 'Précision du Jeu Long',
      resetSample: 'Réinitialiser l’Échantillon',
    },
  },

  'shot-conversion-rate': {
    name: 'Taux de Conversion et Efficacité au Tir',
    tagline: 'Analysez la létalité devant le but, les tirs cadrés et les grosses occasions',
    description:
      'Mesurez l’efficacité des attaquants en analysant le ratio buts/tirs, la conversion des tirs cadrés et des grosses occasions de but.',
    formulaSummary: 'Conversion % = (Buts / Tirs) × 100 | Grosses Occasions % = ((GO - GOM) / GO) × 100',
    intro:
      'Le Calculateur de Conversion au Tir mesure le réalisme devant le but. En comparant les buts inscrits au total de tirs, aux tirs cadrés et aux grosses occasions, il sépare les tireurs compulsifs des véritables buteurs cliniques.',
    metricExplanation:
      'Un attaquant marquant 15 buts en 120 tirs affiche 12.5% d’efficacité, alors qu’un buteur marquant 15 buts en 65 tirs atteint 23.1%. Une haute conversion permet de gagner les matches fermés.',
    interpretation:
      'Plus de 20% est digne de la Classe Mondiale ; 14–19% est un finisseur au-dessus de la moyenne ; 9–13% est la moyenne des attaquants européens ; moins de 9% indique un manque d’efficacité.',
    methodology:
      'Taux de Conversion % = (Buts / Tirs Totaux) × 100 ; Conversion Tirs Cadrés % = (Buts / Tirs Cadrés) × 100 ; Conversion Grosses Occasions % = ((Grosses Occasions - Manquées) / Grosses Occasions) × 100.',
    footballContext:
      'Les lauréats du Soulier d’Or comme Erling Haaland et Harry Kane affichent régulièrement des taux de conversion de 22% à 25%.',
    faqs: [
      {
        question: 'Quel est un taux de conversion de classe mondiale ?',
        answer:
          'Dans les 5 grands championnats européens, dépasser 20% de conversion globale est considéré comme un niveau d’élite mondiale.',
      },
      {
        question: 'Pourquoi la conversion des grosses occasions est-elle cruciale ?',
        answer:
          'Les tirs lointains réduisent le pourcentage global, mais la finition sur les face-à-face et dans les 6 mètres révèle le vrai sang-froid.',
      },
      {
        question: 'Quelle est la différence entre tirs totaux et tirs cadrés ?',
        answer:
          'Les tirs totaux incluent les tirs contrés et non cadrés, tandis que les tirs cadrés mesurent les frappes qui mettent réellement le gardien à l’épreuve.',
      },
    ],
    labels: {
      totalShots: 'Tirs Totaux Tentés',
      goalsScored: 'Buts Marqués',
      shotsOnTarget: 'Tirs Cadrés',
      bigChances: 'Grosses Occasions Obtenues',
      bigChancesMissed: 'Grosses Occasions Manquées',
      conversionRate: 'Taux Global de Conversion',
      onTargetConversion: 'Conversion des Tirs Cadrés',
      bigChanceConversion: 'Conversion des Grosses Occasions',
      resetSample: 'Réinitialiser l’Échantillon',
    },
  },

  'possession-impact-analyzer': {
    name: 'Analyseur d’Impact de la Possession',
    tagline: 'Mesurez le rendement du ballon, le taux de victoire et l’efficacité offensive',
    description:
      'Évaluez si la possession se traduit en victoires. Calcule le Taux de Victoire, les Buts par Match et l’Indice d’Efficacité de Possession.',
    formulaSummary: 'Efficacité = (Taux Victoire / Possession %) | Buts/Match = Buts / Matches',
    intro:
      'L’Analyseur d’Impact de la Possession détermine si dominer le ballon apporte des résultats tangibles. En confrontant la possession, le taux de victoire et les buts par match, il distingue la possession stérile de la domination incisive.',
    metricExplanation:
      'Avoir 70% de possession ne sert à rien si l’on s’incline 0-1 en contre. Cet indice valorise les équipes capables de transformer la possession en occasions et victoires.',
    interpretation:
      'Un indice supérieur à 1.25 reflète une Possession Très Incisive ; 0.90–1.24 un Contrôle Équilibré ; moins de 0.90 une Possession Stérile (beaucoup de passes sans danger).',
    methodology:
      'Taux de Victoire % = (Victoires / Matches) × 100 ; Buts par Match = Buts / Matches ; Indice d’Efficacité = Taux de Victoire % / Possession %.',
    footballContext:
      'Les équipes titrées de Pep Guardiola combinent une très forte possession (>65%) avec une grande efficacité (>1.30), tournant à plus de 2.5 buts/match.',
    faqs: [
      {
        question: 'Qu’est-ce que la possession stérile ?',
        answer:
          'Elle survient lorsqu’une équipe fait tourner le ballon dans des zones sans danger sans parvenir à inquiéter le gardien adverse (Indice <0.85).',
      },
      {
        question: 'Les équipes de contre peuvent-elles avoir une haute efficacité ?',
        answer:
          'Oui. Une équipe à 40% de possession qui remporte 65% de ses matches atteint un indice exceptionnel de 1.63.',
      },
      {
        question: 'Quel est un bon objectif de buts par match ?',
        answer:
          'Les prétendants au titre visent entre 2.1 et 2.6 buts par match. Pour se qualifier en Ligue des Champions, il faut au moins 1.8.',
      },
    ],
    labels: {
      matchesPlayed: 'Matches Analysés',
      wins: 'Victoires',
      draws: 'Nuls',
      losses: 'Défaites',
      goalsScored: 'Buts Marqués',
      averagePossession: 'Possession Moyenne %',
      efficiencyIndex: 'Indice d’Efficacité de Possession',
      winRate: 'Taux de Victoire %',
      goalsPerGame: 'Buts / Match',
      resetData: 'Réinitialiser l’Analyse',
    },
  },

  'player-form-index': {
    name: 'Indice de Forme du Joueur',
    tagline: 'Suivez la dynamique sur 5 matches, l’impact disciplinaire et le temps de jeu',
    description:
      'Quantifiez la forme récente sur 5 matches grâce aux buts, passes décisives, notes moyennes, cartons et bonus de temps de jeu sur une échelle de 10.0.',
    formulaSummary: 'Forme = Base(Buts×1.5 + PassesD×1.2 + Note×0.8) - Cartons + BonusTempsJeu',
    intro:
      'L’Indice de Forme quantifie la dynamique sur les 5 derniers matches sur une échelle de 1.0 à 10.0. En combinant l’apport offensif, les notes, la discipline et les minutes disputées, il identifie les joueurs en grande forme.',
    metricExplanation:
      'Les statistiques annuelles masquent les séries courtes. Les managers de Fantasy et recruteurs s’appuient sur un indice glissant de 5 matches pour repérer les joueurs en pleine confiance.',
    interpretation:
      'Un indice de 8.5–10.0 signifie En Pleine Forme / Au Sommet ; 7.0–8.4 Forte Forme ; 5.5–6.9 Rendement Régulier ; moins de 5.5 Baisse de régime ou problème disciplinaire.',
    methodology:
      'Score de Base = (Buts × 1.5) + (Passes Décisives × 1.2) + (Note Moyenne × 0.80) ; Déduction Discipline = (Jaunes × 0.25) + (Rouges × 1.50) ; Bonus Minutes = (Minutes / 450) × 0.50 ; Indice final entre 1.0 et 10.0.',
    footballContext:
      'Une excellente forme (Indice > 8.0) s’accompagne généralement d’une grande réussite face au but et d’une place de titulaire indiscutable.',
    faqs: [
      {
        question: 'Pourquoi utiliser une fenêtre de 5 matches ?',
        answer:
          'Un échantillon de 5 matches (env. 450 minutes) est le standard pour capter une tendance sans être faussé par un seul exploit ou contre-performance.',
      },
      {
        question: 'Quel est l’impact d’un carton rouge ?',
        answer:
          'Un carton rouge retire 1.5 point à l’indice en raison du lourd handicap infligé à l’équipe.',
      },
      {
        question: 'Jouer 90 minutes complètes améliore-t-il la note ?',
        answer:
          'Oui. Un bonus d’endurance jusqu’à +0.50 récompense les joueurs qui disputent l’intégralité des 450 minutes de l’échantillon.',
      },
    ],
    labels: {
      goalsLast5: 'Buts sur les 5 Derniers Matches',
      assistsLast5: 'Passes D sur les 5 Derniers Matches',
      avgRatingLast5: 'Note Moyenne (5 Derniers)',
      yellowCardsLast5: 'Cartons Jaunes (5 Derniers)',
      redCardsLast5: 'Cartons Rouges (5 Derniers)',
      minutesPlayedLast5: 'Minutes Jouées (5 Derniers)',
      formScore: 'Indice de Forme (5 Matches)',
      status: 'Statut Actuel de Forme',
      resetData: 'Réinitialiser la Forme',
    },
  },

  'transfer-value-estimator': {
    name: 'Estimateur de Valeur Marchande & Transfert',
    tagline: 'Estimez la valeur marchande avec courbe d’âge, niveau de ligue et contrat',
    description:
      'Estimez la valeur de transfert équitable (€M) selon le poste, la courbe d’âge, les buts/passes décisives, le coefficient de ligue, la durée de contrat et les sélections nationales.',
    formulaSummary: 'Valeur = Base × MultÂge × MultPerf × MultLigue × MultContrat + BonusSélections',
    intro:
      'L’Estimateur de Valeur Marchande évalue le prix d’un transfert en millions d’euros (€M). En synthétisant la courbe de valorisation par âge, le poste, les statistiques, le prestige du championnat, la durée de contrat et l’expérience internationale, il calcule un repère objectif.',
    metricExplanation:
      'Sur le marché actuel, la durée restante du contrat et l’âge pèsent autant que les performances sur le terrain. Un joueur de 22 ans sous contrat pour 4 ans possède une valeur marchande bien supérieure à celle d’un joueur de 31 ans en fin de bail.',
    interpretation:
      'Plus de 100M€ représente les Stars Mondiales ; 50–99M€ les Titulaires de Ligue des Champions ; 20–49M€ les Joueurs Confirmés de première division.',
    methodology:
      'Valeur de base par poste. Multiplicateurs : Âge (pic entre 23 et 26 ans), Performance (buts/passes D), Coefficient de Ligue (Premier League 1.6x, Ligue 1/Bundesliga/Serie A 1.3x), Facteur Contrat (4+ ans 1.3x ; 1 an 0.6x) et Bonus Sélections (0.2M€/sélection).',
    footballContext:
      'Les attaquants et les ailiers déstabilisateurs enregistrent les primes de valorisation les plus élevées sur le marché international.',
    faqs: [
      {
        question: 'Pourquoi la durée du contrat influe-t-elle autant sur la valeur ?',
        answer:
          'Lors des 12 derniers mois de contrat, le club vendeur perd son pouvoir de négociation avec le risque d’un départ libre (arrêt Bosman), entraînant une décote de 40 à 50%.',
      },
      {
        question: 'À quel âge la valeur d’un joueur atteint-elle son pic ?',
        answer:
          'Les courbes statistiques situent l’apogée entre 23 et 26 ans, au croisement du pic physique et de la perspective de revente.',
      },
      {
        question: 'Les bonus de performance sont-ils inclus ?',
        answer:
          'L’outil estime l’indemnité fixe garantie. Les bonus variables ajoutent couramment 15 à 25% de valeur supplémentaire.',
      },
    ],
    labels: {
      position: 'Poste',
      age: 'Âge du Joueur',
      goalsThisSeason: 'Buts cette Saison',
      assistsThisSeason: 'Passes Décisives cette Saison',
      leagueTier: 'Niveau du Championnat',
      contractRemaining: 'Années de Contrat Restantes',
      internationalCaps: 'Sélections Internationales A',
      estimatedValue: 'Valeur Marchande Estimée',
      valuationTier: 'Catégorie de Valorisation',
      ageMultiplier: 'Multiplicateur Courbe d’Âge',
      leagueMultiplier: 'Multiplicateur de Championnat',
      resetData: 'Réinitialiser le Modèle',
    },
  },

  'wage-calculator': {
    name: 'Calculateur de Salaire et Structure Salariale',
    tagline: 'Calculez le salaire annuel brut, le salaire hebdomadaire effectif et les primes',
    description:
      'Modélisez la rémunération complète : salaire de base hebdomadaire (52 semaines), primes de match, bonus de buts et primes de clean sheet en £, € ou $.',
    formulaSummary: 'Annuel = (Base Hebdo × 52) + (Matches × Prime Match) + (Buts × Prime But) + (Clean Sheets × Prime CS)',
    intro:
      'Le Calculateur de Salaire modélise la rémunération globale des joueurs en combinant le salaire fixe garanti et les primes de performance (apparitions, buts, clean sheets).',
    metricExplanation:
      'Les contrats modernes associent salaire fixe et primes de performance. Cet outil détaille la répartition exacte entre rémunération garantie et variables d’objectifs.',
    interpretation:
      'Indique la rémunération annuelle brute totale, le salaire hebdomadaire effectif lissé sur 52 semaines, et la part relative des primes de performance.',
    methodology:
      'Salaire Annuel Fixe = Base Hebdo × 52 ; Primes de Match = Prime × Matches Joués ; Primes de Buts = Prime But × Buts Marqués ; Primes Clean Sheet = Prime CS × Clean Sheets ; Gains Annuels Totaux = Base Annuelle + Primes ; Salaire Hebdo Effectif = Total Annuel / 52.',
    footballContext:
      'Les clubs européens consacrent entre 55% et 70% de leurs revenus à la masse salariale. Les contrats incitatifs protègent les clubs tout en récompensant les joueurs décisifs.',
    faqs: [
      {
        question: 'Comment est calculé le salaire hebdomadaire effectif ?',
        answer:
          'Il divise la rémunération annuelle brute globale (salaire fixe + ensemble des primes perçues) par 52 semaines.',
      },
      {
        question: 'Pourquoi modéliser les primes de match et de but séparément ?',
        answer:
          'La structure contractuelle différencie les clauses pour les titulaires réguliers, les buteurs et les défenseurs afin de refléter fidèlement les pratiques du milieu.',
      },
      {
        question: 'Quelle est la part habituelle des primes dans la rémunération totale ?',
        answer:
          'Dans les grands championnats, le salaire fixe garanti représente 75% à 85% de la rémunération globale, les primes constituant les 15% à 25% restants.',
      },
    ],
    labels: {
      currency: 'Devise',
      baseWeeklyWage: 'Salaire Hebdomadaire de Base',
      appearanceFee: 'Prime de Match / Apparition',
      matchesPlayed: 'Matches Joués dans la Saison',
      goalBonus: 'Prime par But Marqué',
      goalsScored: 'Buts Marqués',
      cleanSheetBonus: 'Prime de Clean Sheet',
      cleanSheetsKept: 'Clean Sheets Réalisés',
      totalAnnualEarnings: 'Rémunération Annuelle Globale',
      effectiveWeeklyWage: 'Salaire Hebdomadaire Effectif',
      baseAnnualSalary: 'Salaire Fixe Annuel de Base',
      totalPerformanceBonuses: 'Total des Primes de Performance',
      resetData: 'Réinitialiser le Modèle Salarial',
    },
  },

  'squad-value-calculator': {
    name: 'Calculateur de Valeur et Profondeur d’Effectif',
    tagline: 'Cumulez la valeur totale de l’équipe, la répartition par ligne et l’équilibre',
    description:
      'Calculez la valeur marchande totale du groupe, la valeur moyenne par joueur et la ventilation par ligne (Gardiens, Défenseurs, Milieux, Attaquants).',
    formulaSummary: 'Valeur Totale = Σ(Valeurs Joueurs) | Indice d’Équilibre',
    intro:
      'Le Calculateur de Valeur d’Effectif analyse la richesse de l’effectif d’un club, la valeur moyenne par joueur et la répartition des investissements entre gardiens, défenseurs, milieux et attaquants.',
    metricExplanation:
      'Un effectif avec 500M€ en attaque mais seulement 40M€ en défense souffre d’un déséquilibre tactique aigu. Cet outil vérifie l’harmonie des investissements.',
    interpretation:
      'Un effectif européen équilibré alloue environ 8–12% aux Gardiens, 28–35% aux Défenseurs, 28–35% aux Milieux et 30–40% aux Attaquants.',
    methodology:
      'Valeur Totale = Somme des valeurs individuelles ; Part par Ligne % = (Valeur Ligne / Valeur Totale) × 100.',
    footballContext:
      'Les effectifs vainqueurs de Ligue des Champions et championnats majeurs atteignent 800M€ à 1,2 milliard d’euros de valeur totale.',
    faqs: [
      {
        question: 'Quelle est la répartition idéale de la valeur par poste ?',
        answer:
          'Environ 10% sur les gardiens, 30% en défense, 30% au milieu et 30% en attaque pour éviter toute faille structurelle.',
      },
      {
        question: 'Combien de joueurs composent un effectif professionnel ?',
        answer:
          'Un groupe professionnel type réunit 22 à 25 joueurs (deux par poste plus 3 doublures polyvalentes).',
      },
      {
        question: 'Avoir l’effectif le plus cher garantit-il les titres ?',
        answer:
          'Sur un championnat de 38 journées, la corrélation est très forte (r > 0.85), mais les coupes à élimination directe restent soumises aux aléas.',
      },
    ],
    labels: {
      addPlayer: 'Ajouter un Joueur à l’Effectif',
      playerName: 'Nom du Joueur',
      position: 'Poste',
      marketValue: 'Valeur Marchande (€M)',
      totalSquadValue: 'Valeur Totale de l’Effectif',
      avgPlayerValue: 'Valeur Moyenne par Joueur',
      squadSize: 'Taille de l’Effectif',
      positionBreakdown: 'Répartition par Poste',
      resetSquad: 'Réinitialiser l’Effectif',
    },
  },

  'contract-worth-analyzer': {
    name: 'Analyseur de Contrat et Amortissement FPF',
    tagline: 'Calculez l’amortissement comptable annuel et l’engagement financier global',
    description:
      'Calculez l’amortissement annuel du transfert, l’engagement salarial total et la charge comptable annuelle pour le respect du Fair-Play Financier (FPF).',
    formulaSummary: 'Amortissement Annuel = Indemnité / Années Contrat | Coût Total = Indemnité + (Salaire × 52 × Années)',
    intro:
      'L’Analyseur de Contrat et Amortissement calcule le coût réel d’un recrutement. En analysant l’amortissement linéaire de l’indemnité, les salaires cumulés et les commissions, il modélise la charge annuelle dans les comptes du club pour le Fair-Play Financier.',
    metricExplanation:
      'Les indemnités de transfert ne sont pas comptabilisées en une seule fois ; elles sont amorties de manière égale sur la durée du contrat (dans la limite de 5 ans fixée par l’UEFA). Un transfert de 100M€ sur 5 ans représente 20M€/an d’amortissement en plus du salaire annuel.',
    interpretation:
      'La Charge Annuelle est l’indicateur clé : un joueur avec 18M€ d’amortissement et 12M€ de salaire génère une charge de 30M€/an dans le compte de résultat du club.',
    methodology:
      'Amortissement Annuel = Indemnité / Durée (max 5 ans UEFA) ; Coût Salarial Annuel = Salaire Hebdo × 52 ; Coût Global = Indemnité + (Salaire Annuel × Années) + Prime Signature + Commissions ; Charge Annuelle = Amortissement + Salaire Annuel.',
    footballContext:
      'Les règles de durabilité financière de l’UEFA et de la DNCG sanctionnent les dépassements par des pénalités financières et des restrictions d’enregistrement.',
    faqs: [
      {
        question: 'Qu’est-ce que l’amortissement d’un transfert dans le football ?',
        answer:
          'L’amortissement étale le coût d’acquisition des droits d’un joueur de manière égale sur la durée de son contrat (ex. 80M€ sur 5 ans = 16M€/an).',
      },
      {
        question: 'Pourquoi l’UEFA a-t-elle limité l’amortissement à 5 ans ?',
        answer:
          'En 2023, l’UEFA a supprimé l’échappatoire des contrats de 8 ou 9 ans visant à réduire artificiellement la charge comptable annuelle.',
      },
      {
        question: 'Que se passe-t-il si le joueur est revendu avant la fin du contrat ?',
        answer:
          'La valeur nette comptable restante est déduite du montant de la vente pour déterminer la plus-value ou moins-value comptable immédiate.',
      },
    ],
    labels: {
      transferFee: 'Indemnité de Transfert (€M)',
      contractYears: 'Durée du Contrat (Années)',
      weeklyWage: 'Salaire Hebdomadaire de Base',
      signingBonus: 'Prime à la Signature (€M)',
      agentFee: 'Commission d’Agent (€M)',
      annualAmortization: 'Amortissement Annuel du Transfert',
      totalCostToClub: 'Engagement Financier Global',
      annualBudgetImpact: 'Charge Comptable Annuelle (FPF)',
      amortizationSchedule: 'Échéancier Pluriannuel d’Amortissement',
      resetData: 'Réinitialiser le Modèle',
    },
  },

  'fantasy-football-points': {
    name: 'Calculateur de Points Fantasy Football',
    tagline: 'Estimation analytique des points Fantasy par poste',
    description:
      'Estimez les points Fantasy d’une journée selon les buts, passes décisives, clean sheets, actions défensives (CBIT/CBIRT), arrêts, penaltys, cartons et minutes jouées.',
    formulaSummary: 'Modèle Fantasy analytique par poste (GB/DEF/MIL/ATT)',
    intro:
      'Le Calculateur de Points Fantasy Football fournit une estimation analytique des points obtenus lors d’une journée de championnat selon les performances réelles pour chaque poste.',
    metricExplanation:
      'Chaque poste bénéficie d’un barème spécifique : gardiens (10 pts par but), défenseurs (6 pts par but, 4 pts clean sheet, bonus contribution défensive dès 10 CBIT), milieux (5 pts par but, bonus dès 12 CBIRT) et attaquants (4 pts par but, bonus dès 12 CBIRT).',
    interpretation:
      'Un score de 12+ points représente une journée majeure à deux chiffres (idéal pour le capitanat) ; 6–9 points un apport solide ; 2–4 points un score de présence standard.',
    methodology:
      'Règles Fantasy : 60+ min jouées (+2), 1-59 min (+1) ; Buts (GB +10, DEF +6, MIL +5, ATT +4) ; Passes D (+3) ; Clean Sheet (GB/DEF +4, MIL +1) ; Contribution défensive (+2 si DEF >= 10 CBIT ou MIL/ATT >= 12 CBIRT) ; Penalty arrêté (+5) ; Penalty manqué (-2) ; Arrêts (1 pt pour 3 arrêts) ; Jaune (-1) ; Rouge (-3) ; But contre son camp (-2) ; Bonus BPS (+1 à +3).',
    footballContext:
      'Les stars de Fantasy Football visent une moyenne de plus de 6.0 points par match sur une saison complète.',
    faqs: [
      {
        question: 'Les milieux de terrain reçoivent-ils des points de clean sheet ?',
        answer:
          'Oui, les milieux reçoivent +1 point pour un clean sheet s’ils ont joué au moins 60 minutes.',
      },
      {
        question: 'Comment fonctionne le bonus de contribution défensive ?',
        answer:
          'Les défenseurs reçoivent +2 points dès 10 actions CBIT (dégagements, tirs contrés, interceptions, tacles). Les milieux et attaquants reçoivent +2 points dès 12 actions CBIRT (incluant les récupérations).',
      },
      {
        question: 'Comment sont comptabilisés les arrêts des gardiens ?',
        answer:
          'Les gardiens gagnent +1 point supplémentaire tous les 3 arrêts effectués pendant la rencontre.',
      },
      {
        question: 'Que se passe-t-il en cas de deuxième carton jaune suivi d’un rouge ?',
        answer:
          'Le joueur écope de -3 points pour le carton rouge (les cartons jaunes individuels sont remplacés par la déduction du rouge).',
      },
    ],
    labels: {
      position: 'Poste du Joueur',
      minutesPlayed: 'Minutes Jouées',
      goalsScored: 'Buts Marqués',
      assists: 'Passes Décisives',
      cleanSheet: 'Clean Sheet Réalisé',
      cbitActions: 'Actions Défensives CBIT (Défenseurs)',
      cbirtActions: 'Actions Défensives CBIRT (Milieux / Attaquants)',
      goalsConceded: 'Buts Encaissés',
      saves: 'Arrêts Réalisés',
      penaltySaves: 'Penaltys Arrêtés',
      penaltyMisses: 'Penaltys Manqués',
      yellowCards: 'Cartons Jaunes',
      redCards: 'Cartons Rouges',
      ownGoals: 'Buts Contre Son Camp',
      bonusPoints: 'Points Bonus (BPS)',
      totalPoints: 'Points Totaux de la Journée',
      pointBreakdown: 'Détail des Points',
      resetData: 'Réinitialiser le Calculateur',
    },
  },

  'best-xi-selector': {
    name: 'Optimiseur de Onze Idéal & Dispositif',
    tagline: 'Sélectionnez le meilleur onze titulaire sur 6 schémas tactiques selon forme et prix',
    description:
      'Entrez votre réservoir de joueurs avec leurs notes de forme et coûts Fantasy pour configurer automatiquement la formation la plus performante (4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 3-4-3, 5-3-2).',
    formulaSummary: 'Optimisation forme/coût sous contraintes de quotas par poste et budget',
    intro:
      'L’Optimiseur de Onze Idéal compose l’équipe titulaire la plus prolifique parmi vos joueurs en respectant les contraintes tactiques et le budget disponible.',
    metricExplanation:
      'Sélectionner une équipe gagnante exige d’équilibrer stars onéreuses et pépites abordables à fort rendement.',
    interpretation:
      'Affiche le onze de départ optimisé avec sa note de forme totale projetée et le respect du plafond budgétaire.',
    methodology:
      'Optimisation linéaire sous contrainte maximisant la forme globale de l’équipe dans les limites des quotas du système et du budget.',
    footballContext:
      'Les schémas avec 3 attaquants (4-3-3, 3-4-3) maximisent le potentiel offensif lors des journées favorables.',
    faqs: [
      {
        question: 'Quel dispositif offre le potentiel de points le plus élevé ?',
        answer:
          'Le 3-4-3 et le 3-5-2 offrent souvent les plafonds les plus élevés en favorisant les postes offensifs.',
      },
      {
        question: 'Comment l’optimiseur gère-t-il la contrainte de budget ?',
        answer:
          'Il calcule le ratio de forme par million pour identifier la combinaison la plus rentable sous votre plafond.',
      },
      {
        question: 'Puis-je modifier les noms et notes des joueurs ?',
        answer:
          'Oui, les noms, coûts, postes et notes de forme sont entièrement éditables dans le tableau ci-dessous.',
      },
    ],
    labels: {
      formation: 'Sélectionner le Dispositif Tactique',
      budgetLimit: 'Budget Limite (£M / €M)',
      playerPool: 'Réservoir de Joueurs Disponibles',
      addPlayer: 'Ajouter un Joueur',
      optimalXi: 'Onze Titulaire Optimisé',
      projectedTotalForm: 'Note de Forme Totale Projetée',
      totalCost: 'Coût Global de la Composition',
      resetPool: 'Réinitialiser le Réservoir',
    },
  },

  'captain-pick-analyzer': {
    name: 'Analyseur de Choix de Capitaine',
    tagline: 'Comparaison algorithmique du capitanat selon forme, calendrier et antécédents',
    description:
      'Comparez des prétendants au brassard grâce à un algorithme pondéré : forme du joueur (30%), calendrier adverse (25%), avantage à domicile (15%), historique direct (15%) et force d’attaque collective (15%).',
    formulaSummary: 'Score Capitaine = (Forme × 30%) + (Calendrier × 25%) + (Domicile × 15%) + (Historique × 15%) + (Attaque Équipe × 15%)',
    intro:
      'L’Analyseur de Capitaine compare les candidats au brassard selon un modèle évaluant la forme récente (30%), la facilité du calendrier (25%), l’avantage du terrain (15%), l’historique direct (15%) et la puissance offensive de l’équipe (15%) pour calculer un Score de Capitanat StatKick (0–100).',
    metricExplanation:
      'Le brassard de capitaine double les points du joueur choisi et constitue le choix le plus décisif chaque semaine en Fantasy Football.',
    interpretation:
      'Un Score >80 désigne un Capitaine Incontournable ; 65–79 un Très Bon Choix ; 50–64 une Option Différentielle Risquée ; moins de 50 Non Recommandé.',
    methodology:
      'Score de Capitanat = (Forme × 10 × 0.30) + ((6 - FDR) / 5 × 100 × 0.25) + (Domicile=100/Extérieur=50 × 0.15) + (Score Historique × 0.15) + (Force Attaque Équipe × 0.15).',
    footballContext:
      'Les managers expérimentés désignent un joueur évoluant à domicile contre une équipe du bas de tableau dans plus de 70% des cas.',
    faqs: [
      {
        question: 'Pourquoi l’avantage à domicile pèse-t-il 15% ?',
        answer:
          'Les équipes à domicile inscrivent 20 à 30% de buts en plus et génèrent plus d’xG, augmentant la probabilité de gros scores.',
      },
      {
        question: 'Qu’est-ce que l’indice FDR (Fixture Difficulty Rating) ?',
        answer:
          'Une échelle de 1 (adversaire très abordable à domicile) à 5 (déplacement chez le favori pour le titre).',
      },
      {
        question: 'Faut-il choisir un capitaine différentiel ?',
        answer:
          'Pour rattraper un retard de points en fin de saison, choisir un différentiel avec un fort indice permet de faire la différence.',
      },
    ],
    labels: {
      candidateA: 'Candidat A',
      candidateB: 'Candidat B',
      candidateC: 'Candidat C (Optionnel)',
      playerName: 'Nom du Joueur',
      currentForm: 'Forme Actuelle (1–10)',
      fdr: 'Difficulté Adversaire (FDR 1-5)',
      venue: 'Lieu du Match',
      home: 'Match à Domicile',
      away: 'Match à l’Extérieur',
      historyReturn: 'Rendement Historique vs Adversaire',
      captaincyVerdict: 'Recommandation de Capitanat',
      captainIndex: 'Score de Capitanat StatKick',
      resetData: 'Réinitialiser les Candidats',
    },
  },

  'transfer-suggestion': {
    name: 'Moteur de Stratégie de Transfert Fantasy',
    tagline: 'Évaluez les transferts vente vs achat pour maximiser le gain net de points',
    description:
      'Analysez une opération de transfert selon l’écart de forme, le calendrier des 3 prochaines journées, l’impact budgétaire et le gain projeté de points.',
    formulaSummary: 'Valeur Transfert = (FormeEntrant - FormeSortant) + (FDRSortant - FDREntrant) × 1.2 + EfficacitéBudget',
    intro:
      'Le Moteur de Stratégie Fantasy évalue les pistes de transfert en examinant les dynamiques de forme, le calendrier des 3 prochains matches et la marge budgétaire pour projeter le gain net de points.',
    metricExplanation:
      'Transférer un joueur uniquement d’après les points du match précédent mène souvent à des déceptions. Cet outil analyse le calendrier futur pour valider l’intérêt réel de l’opération.',
    interpretation:
      'Un score supérieur à +3.0 indique un Transfert Fortement Recommandé ; +1.0 à +2.9 un Bon Transfert ; les valeurs négatives déconseillent l’opération.',
    methodology:
      'Indice = (Forme Entrant - Forme Sortant) × 1.2 + (FDR 3 Matches Sortant - FDR Entrant) × 1.5 + Facteur Efficacité Budget.',
    footballContext:
      'Cibler des joueurs qui abordent une série de 4+ matches abordables contre des défenses perméables procure le meilleur retour sur investissement.',
    faqs: [
      {
        question: 'Prendre une pénalité de -4 points pour un transfert en vaut-il la peine ?',
        answer:
          'Uniquement si le joueur entrant affiche un indice >+3.5 et devrait rapporter au moins 5 points de plus sur les 3 prochains matches.',
      },
      {
        question: 'Pourquoi évaluer un horizon de 3 matches ?',
        answer:
          'Une seule journée comporte trop d’aléas ; planifier sur 3 à 5 matches rentabilise durablement chaque transfert gratuit.',
      },
      {
        question: 'Comment l’argent en banque est-il pris en compte ?',
        answer:
          'Le moteur valorise la flexibilité financière libérée pour renforcer d’autres secteurs de l’équipe.',
      },
    ],
    labels: {
      transferOut: 'Joueur à Vendre (Sortant)',
      transferIn: 'Joueur à Acheter (Entrant)',
      playerNameOut: 'Nom du Joueur (Sortant)',
      sellingPrice: 'Prix de Vente (£M)',
      formOut: 'Indice de Forme (1–10)',
      fdrOut: 'FDR 3 Prochains (Moyenne)',
      playerNameIn: 'Nom du Joueur (Entrant)',
      purchasePrice: 'Prix d’Achat (£M)',
      formIn: 'Indice de Forme (1–10)',
      fdrIn: 'FDR 3 Prochains (Moyenne)',
      bankMoney: 'Budget Restant en Banque (£M)',
      transferVerdict: 'Verdict sur le Transfert',
      netGainScore: 'Score de Gain Net',
      budgetImpact: 'Solde Restant en Banque',
      resetData: 'Réinitialiser l’Évaluation',
    },
  },

  'league-table-simulator': {
    name: 'Simulateur de Classement et Points de Championnat',
    tagline: 'Simulez les matches restants pour projeter titre, places européennes et maintien',
    description:
      'Entrez les points actuels, les matches restants et les prévisions de victoires/nuls/défaites pour projeter le classement final, le titre et le maintien.',
    formulaSummary: 'Points Finaux = Points Actuels + (Victoires × 3) + (Nuls × 1)',
    intro:
      'Le Simulateur de Classement projette le tableau final du championnat, le vainqueur du titre, les qualifiés pour les Coupes d’Europe (Ligue des Champions, Ligue Europa) et la lutte pour le maintien.',
    metricExplanation:
      'La course au titre et le maintien se jouent dans le calendrier restant. Cet outil permet d’anticiper tous les scénarios mathématiques pour chaque club.',
    interpretation:
      'Affiche le classement final projeté avec le champion simulé, les qualifiés continentaux et les relégables.',
    methodology:
      'Points Projetés = Points Actuels + (Victoires × 3) + (Nuls × 1). En cas d’égalité, le goal-average simulé fait la différence.',
    footballContext:
      'Sur une saison de 38 matches, 88–92 points garantissent généralement le titre, 70–74 assurent la Ligue des Champions et 38–40 points marquent le seuil classique du maintien.',
    faqs: [
      {
        question: 'Combien de points faut-il historiquement pour remporter le titre ?',
        answer:
          'Dans les grands championnats européens, les champions tournent en moyenne à 89 points sur la dernière décennie.',
      },
      {
        question: 'La barre des 40 points est-elle toujours d’actualité pour le maintien ?',
        answer:
          'Bien que 40 points reste la référence, 36 à 38 points ont suffi pour se maintenir dans 8 des 10 dernières saisons.',
      },
      {
        question: 'Comment sont départagées les équipes à égalité de points ?',
        answer:
          'La différence de buts globale sert de critère principal de départage dans la simulation.',
      },
    ],
    labels: {
      teamName: 'Nom de l’Équipe',
      currentPoints: 'Points Actuels',
      gamesRemaining: 'Matches Restants',
      projWins: 'Victoires Projetées',
      projDraws: 'Nuls Projetés',
      projLosses: 'Défaites Projetées',
      projectedPoints: 'Points Finaux Projetés',
      champions: 'Champion Simulé',
      uclZone: 'Zone Ligue des Champions',
      relegationZone: 'Zone de Relégation',
      simulateTable: 'Simuler le Classement',
      resetTable: 'Réinitialiser le Tableau',
    },
  },

  'points-needed-calculator': {
    name: 'Calculateur de Points Requis',
    tagline: 'Déterminez les victoires et nuls exacts pour le titre, le top 4 ou le maintien',
    description:
      'Calculez les victoires et nuls indispensables sur les matches restants pour atteindre un objectif de saison (Titre, Ligue des Champions, Top 6, Maintien).',
    formulaSummary: 'Écart = Points Cibles - Points Actuels | % de Victoire Requis',
    intro:
      'Le Calculateur de Points Requis détermine toutes les combinaisons mathématiques de victoires, nuls et défaites tolérables sur les matches restants pour atteindre les objectifs de fin de saison.',
    metricExplanation:
      'Savoir qu’il manque 14 points en 7 matches reste abstrait. Cet outil décompose les combinaisons exactes (ex. 4 victoires, 2 nuls, 1 défaite) et le taux d’efficacité exigé.',
    interpretation:
      'Indique la faisabilité de l’objectif (Accessible, Difficile, Mathématiquement Impossible) et dresse la liste des combinaisons viables.',
    methodology:
      'Points Requis = Cible - Actuels ; Points Max Possibles = Matches Restants × 3 ; Génère les solutions (V, N) où (V×3 + N×1) >= Points Requis.',
    footballContext:
      'Avoir besoin de plus de 75% de victoires sur les 8 dernières journées est rarement couronné de succès sans faux pas des rivaux directs.',
    faqs: [
      {
        question: 'Que se passe-t-il si les points requis dépassent le maximum possible ?',
        answer:
          'L’outil indique immédiatement l’objectif comme "Mathématiquement Impossible" et précise le déficit de points.',
      },
      {
        question: 'Quel est un pourcentage de victoire accessible en fin de saison ?',
        answer:
          'Un taux de victoire requis inférieur à 50% est très abordable pour une équipe de première moitié de tableau ; dépasser 70% réclame un rythme de champion.',
      },
      {
        question: 'Peut-on tester des objectifs personnalisés ?',
        answer:
          'Oui, choisissez parmi les repères prédéfinis (Titre = 88 pts, Top 4 = 72 pts, Maintien = 38 pts) ou saisissez votre propre objectif.',
      },
    ],
    labels: {
      targetGoal: 'Objectif de Fin de Saison',
      customTarget: 'Points Cibles Souhaités',
      currentPoints: 'Points Actuels',
      matchesRemaining: 'Matches Restants',
      pointsNeeded: 'Points Requis',
      maxAvailable: 'Points Maximums en Jeu',
      requiredWinRate: 'Taux de Victoire Requis %',
      targetStatus: 'Faisabilité de l’Objectif',
      viableCombinations: 'Combinaisons Viables (V / N)',
      resetData: 'Réinitialiser le Calculateur',
    },
  },

  'head-to-head-stats': {
    name: 'Matrice Historique des Confrontations Directes (H2H)',
    tagline: 'Historique des duels, taux de victoire, buts et domination entre deux clubs',
    description:
      'Analysez le bilan historique entre deux clubs de football : pourcentage de victoires, nuls, moyenne de buts et différence de buts.',
    formulaSummary: 'Taux de Victoire % = (Victoires / Matches) × 100 | Différence de Buts par Match',
    intro:
      'La Matrice Historique des Confrontations Directes analyse les duels entre deux clubs à travers l’histoire. Elle calcule les pourcentages de victoire, les nuls et le bilan moyen de buts pour évaluer l’ascendant psychologique.',
    metricExplanation:
      'Les confrontations directes révèlent les bêtes noires et les avantages tactiques que le classement actuel ne montre pas toujours.',
    interpretation:
      'Un taux de victoire >55% indique une supériorité historique nette ; 40–54% une rivalité équilibrée ; un fort taux de nuls (>35%) des duels très serrés.',
    methodology:
      'Victoire % = (Victoires / Matches) × 100 ; Nuls % = (Nuls / Matches) × 100 ; Buts par Match = Buts Totaux / Matches.',
    footballContext:
      'Les grands derbies et classiques défient souvent les dynamiques du championnat en raison de l’intensité émotionnelle des rencontres.',
    faqs: [
      {
        question: 'Pourquoi l’historique direct contredit-il parfois le classement actuel ?',
        answer:
          'Certains schémas tactiques (ex. bloc bas compact contre équipe de possession) posent traditionnellement problème à certains adversaires.',
      },
      {
        question: 'Combien de buts sont marqués en moyenne dans les grands derbies ?',
        answer:
          'Les grands chocs européens tournent entre 2.7 et 3.1 buts par match, l’équipe à domicile l’emportant environ 44% du temps.',
      },
      {
        question: 'Combien de matches faut-il pour un échantillon fiable ?',
        answer:
          'Un échantillon de 6 à 12 confrontations récentes capture l’ère tactique actuelle tout en offrant une bonne fiabilité statistique.',
      },
    ],
    labels: {
      teamAName: 'Nom Équipe A',
      teamBName: 'Nom Équipe B',
      totalMatches: 'Matches Totaux Joués',
      teamAWins: 'Victoires Équipe A',
      teamBWins: 'Victoires Équipe B',
      draws: 'Matches Nuls',
      teamAGoals: 'Buts Marqués Équipe A',
      teamBGoals: 'Buts Marqués Équipe B',
      h2hSummary: 'Bilan de la Rivalité Historique',
      winPercentage: 'Taux de Victoire',
      avgGoalsPerMatch: 'Buts Moyens / Match',
      goalDifference: 'Différence de Buts',
      resetData: 'Réinitialiser les Données',
    },
  },

  'season-goals-tracker': {
    name: 'Suivi et Projection des Buts de la Saison',
    tagline: 'Suivez le rythme de buts et projetez le total en fin de saison et Soulier d’Or',
    description:
      'Suivez la cadence de buts par match, les minutes par but et projetez le total final sur une saison complète de 38 matches.',
    formulaSummary: 'Buts/Match = Buts / Matches | Projection = Buts/Match × Matches Totaux',
    intro:
      'Le Suivi et Projection des Buts suit la trajectoire des buteurs ou équipes, calcule le ratio de minutes par but et projette mathématiquement le total de fin de saison pour la course aux trophées de meilleur buteur.',
    metricExplanation:
      'Un joueur à 10 buts en 12 matches est sur les bases d’une saison à 31 buts. L’analyse de la fréquence de buts par 90 minutes permet d’anticiper les saisons historiques.',
    interpretation:
      'Une projection de 30+ buts correspond au niveau Soulier d’Or ; 20–29 buts Buteur Mondial de Premier Plan ; 12–19 buts Titulaire Régulier ; moins de 10 buts Rôle Secondaire.',
    methodology:
      'Buts par Match = Buts / Matches Joués ; Minutes par But = Minutes Totales / Buts ; Projection = Buts par Match × Matches Totaux de Saison (38 par défaut).',
    footballContext:
      'Remporter le Soulier d’Or européen requiert généralement entre 32 et 38 buts sur un championnat de 38 matches (rythme de 0.85 à 1.00 but/match).',
    faqs: [
      {
        question: 'À partir de quand les projections de buts deviennent-elles fiables ?',
        answer:
          'Les projections se stabilisent après 10 à 12 journées (environ 900 minutes disputées), atténuant les séries initiales trompeuses.',
      },
      {
        question: 'Quel est un excellent ratio de minutes par but ?',
        answer:
          'Passer sous les 110 minutes par but est remarquable. Les meilleurs buteurs mondiaux (Haaland, Kane, Lewandowski) descendent régulièrement sous les 85 min/but.',
      },
      {
        question: 'L’outil est-il compatible avec les championnats à 34 matches comme la Bundesliga ?',
        answer:
          'Oui, le champ Matches Totaux de Saison peut être ajusté à 34 ou toute autre durée de compétition.',
      },
    ],
    labels: {
      matchesPlayed: 'Matches Joués en Championnat',
      goalsScored: 'Buts Marqués',
      minutesPlayed: 'Minutes Totales Jouées',
      totalSeasonMatches: 'Total Matches dans la Saison',
      projectedGoals: 'Buts Projetés en Fin de Saison',
      goalsPerGame: 'Buts / Match',
      minsPerGoal: 'Minutes / But',
      paceTier: 'Cadence et Catégorie de Buteur',
      resetData: 'Réinitialiser le Suivi',
    },
  },

  'formation-analyzer': {
    name: 'Analyseur Tactique de Formations',
    tagline: 'Évaluez les forces, faiblesses et oppositions tactiques entre systèmes',
    description:
      'Analysez les schémas tactiques (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) pour évaluer le contrôle du milieu, la compacité défensive, le danger sur les ailes et le pressing.',
    formulaSummary: 'Matrice d’Équilibre Tactique : Notes en Milieu, Défense, Ailes et Pressing',
    intro:
      'L’Analyseur Tactique décortique les dispositifs de jeu majeurs (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) selon quatre piliers fondamentaux : Maîtrise du Milieu, Compacité Défensive, Danger sur les Côtés et Capacité de Pressing Haut.',
    metricExplanation:
      'Les dispositifs tactiques créent des triangles de passe, des supériorités numériques et des structures de protection contre les transitions. Choisir le bon contre-système neutralise la force adverse.',
    interpretation:
      'Des notes sur 10 évaluent chaque secteur. Par exemple, le 4-3-3 offre un très fort danger sur les ailes (9/10) et un gros pressing (9/10), mais exige un repli rigoureux des ailiers.',
    methodology:
      'Matrice tactique évaluant l’occupation de l’espace par rapport aux repères de densité dans l’axe, de largeur de ligne défensive et de déclenchement du pressing.',
    footballContext:
      'Les entraîneurs modernes alternent souvent entre organisation sans ballon et avec ballon (ex. 4-4-2 en bloc médian devenant 3-2-4-1 à la relance).',
    faqs: [
      {
        question: 'Quel schéma offre la plus forte domination dans l’axe du milieu ?',
        answer:
          'Les systèmes à trois milieux axiaux (4-3-3, 4-2-3-1, 3-5-2) créent une supériorité numérique naturelle contre les milieux à deux.',
      },
      {
        question: 'Comment les défenses à 3 centraux neutralisent-elles le 4-3-3 ?',
        answer:
          'Le 3-5-2 place ses pistons face aux ailiers adverses et conserve 3 défenseurs axiaux contre l’attaquant de pointe, fermant l’axe.',
      },
      {
        question: 'Quelle est la principale faiblesse du 4-4-2 classique ?',
        answer:
          'Le 4-4-2 à plat peut se retrouver en infériorité 2 contre 3 au milieu et souffre face aux meneurs jouant entre les lignes.',
      },
    ],
    labels: {
      selectFormation: 'Sélectionner le Schéma Tactique',
      formationOverview: 'Profil Tactique du Dispositif',
      midfieldControl: 'Contrôle du Milieu de Terrain',
      defensiveCompactness: 'Compacité et Bloc Défensif',
      wideThreat: 'Danger sur les Côtés',
      pressingCapability: 'Capacité de Pressing Haut',
      strengths: 'Points Forts du Dispositif',
      weaknesses: 'Vulnérabilités Tactiques',
      counterFormations: 'Contre-Systèmes Recommandés',
      resetData: 'Réinitialiser la Vue Tactique',
    },
  },

  'pressing-intensity-calculator': {
    name: 'Calculateur d’Intensité de Pressing (PPDA)',
    tagline: 'Mesurez les Passes Autorisées par Action Défensive pour évaluer la hauteur du bloc',
    description:
      'Calculez le PPDA (Passes Allowed Per Defensive Action) pour mesurer l’agressivité sans ballon et caractériser le style défensif, du Gegenpressing au bloc bas.',
    formulaSummary: 'PPDA = Passes Adverses dans les 60% d’Attaque / (Tacles + Interceptions + Fautes en Zone)',
    intro:
      'Le Calculateur d’Intensité de Pressing (PPDA) calcule les Passes Autorisées par Action Défensive dans les 60% offensifs du terrain. Indicateur de référence, le PPDA distingue le pressing tout terrain asphyxiant du repli en bloc bas.',
    metricExplanation:
      'Un score PPDA bas (<9.0) signifie que l’adversaire enchaîne très peu de passes avant de subir un tacle ou une interception, signe d’un pressing étouffant. Un score élevé (>16.0) indique une équipe qui attend en bloc bas.',
    interpretation:
      'PPDA < 8.5 : Gegenpressing Ultra-Agressif (style Klopp/Guardiola) ; 8.5–11.5 : Pressing Haut Actif ; 11.6–15.5 : Bloc Médian ; >15.5 : Bloc Bas Passif.',
    methodology:
      'PPDA = Passes Adverses dans les 60% / (Tacles en Zone + Interceptions + Duels/Fautes) ; Indice de Danger après Récupération = (Récupérations Hautes × 1.5) + (Tirs après Récupération × 2.0).',
    footballContext:
      'Les équipes européennes les plus intenses au pressing (Manchester City, Bayern Munich, Arsenal) affichent un PPDA compris entre 7.5 et 9.5.',
    faqs: [
      {
        question: 'Pourquoi un chiffre PPDA plus bas signifie-t-il un pressing plus fort ?',
        answer:
          'Le PPDA compte les passes adverses concédées avant d’intervenir. Moins de passes tolérées = intervention plus rapide et pressing plus intense.',
      },
      {
        question: 'Quelle zone du terrain est comptabilisée dans le PPDA ?',
        answer:
          'Les 60% les plus avancés du terrain (moitié adverse et zone médiane), les actions dans ses propres 30 mètres étant exclues.',
      },
      {
        question: 'Un PPDA bas est-il toujours supérieur à un PPDA élevé ?',
        answer:
          'Pas obligatoirement. Les équipes de contre utilisent sciemment un bloc médian avec un PPDA plus haut pour aspirer l’adversaire et attaquer la profondeur.',
      },
    ],
    labels: {
      opponentPasses: 'Passes Adverses dans leur Zone de Relance',
      tacklesInZone: 'Tacles dans la Zone de Pressing',
      interceptionsInZone: 'Interceptions dans la Zone',
      challengesInZone: 'Duels / Fautes dans la Zone',
      highTurnovers: 'Récupérations Hautes (<40m du but)',
      shotsFromTurnovers: 'Tirs après Récupération Haute',
      calculatedPpda: 'Score PPDA Calculé',
      defensiveStyle: 'Archétype de Pressing Défensif',
      turnoverDanger: 'Danger après Récupération',
      resetData: 'Réinitialiser le Modèle PPDA',
    },
  },

  'set-piece-success-rate': {
    name: 'Taux de Réussite et Danger sur Coups de Pied Arrêtés',
    tagline: 'Évaluez l’efficacité et l’indice de danger sur corners, coups francs et penaltys',
    description:
      'Analysez la conversion sur corners, coups francs directs, coups francs indirects et penaltys pour calculer un Indice de Menace sur Coups de Pied Arrêtés complet.',
    formulaSummary: 'Score de Menace = (Buts Corner% × 5) + (Tirs Corner% × 0.4) + (Précision CFD% × 0.2) + (Buts CFD% × 1.5) + (Buts CFI% × 2.0) + (Penalty% × 0.2)',
    intro:
      'Le Calculateur de Coups de Pied Arrêtés mesure l’efficacité sur corners, coups francs directs, coups francs indirects et penaltys pour calculer un Indice Composite de Danger (0–100) pour les clubs et tireurs d’élite.',
    metricExplanation:
      'Les coups de pied arrêtés représentent 25% à 35% des buts dans le football professionnel. Les combinaisons travaillées et la précision des tireurs font souvent basculer les rencontres décisives.',
    interpretation:
      'Indice >75 : Danger Maximal / Spécialistes d’Élite ; 55–74 : Danger Notable ; 35–54 : Moyenne ; moins de 35 : Faible Danger.',
    methodology:
      'Tir sur Corner % = (Tirs / Corners) × 100 ; But sur Corner % = (Buts / Corners) × 100 ; Conversion Tirs Corner % = (Buts / Tirs) × 100 ; Précision CFD % = (Tirs Cadrés / CFD) × 100 ; Buts CFD % = (Buts / CFD) × 100 ; Buts CFI % = (Buts / CFI) × 100 ; Conversion Penalty % = (Marqués / Tirés) × 100 ; Score Composite = (Buts Corner% × 5) + (Tirs Corner% × 0.4) + (Précision CFD% × 0.2) + (Buts CFD% × 1.5) + (Buts CFI% × 2.0) + (Penalty% × 0.2).',
    footballContext:
      'Les meilleures équipes dotées d’entraîneurs dédiés aux phases arrêtées (ex. Arsenal) dépassent 0.35 but par match uniquement sur ces phases.',
    faqs: [
      {
        question: 'Quel est un bon taux de tir généré sur corner ?',
        answer:
          'Générer une frappe sur 28 à 35% des corners est considéré comme excellent, avec un taux de transformation en but de 3 à 5% de l’ensemble des corners.',
      },
      {
        question: 'Quel est le taux moyen de conversion des penaltys ?',
        answer:
          'Au plus haut niveau européen, le taux moyen historique de réussite sur penalty se situe entre 76% et 79%. Les spécialistes atteignent 90%+.',
      },
      {
        question: 'Pourquoi les corners rentrants sont-ils privilégiés ?',
        answer:
          'Leur trajectoire plonge vers le but dans le couloir d’incertitude à 5-6 mètres, augmentant les tirs d’environ 18% par rapport aux corners sortants.',
      },
    ],
    labels: {
      cornersTaken: 'Corners Tirés',
      shotsFromCorners: 'Tirs Générés sur Corner',
      goalsFromCorners: 'Buts Inscrits sur Corner',
      directFkTaken: 'Coups Francs Directs Tentés',
      directFkGoals: 'Buts sur Coup Franc Direct',
      indirectFkTaken: 'Coups Francs Indirects Centrés',
      goalsFromIndirectFk: 'Buts sur Coup Franc Indirect',
      penaltiesAwarded: 'Penaltys Obtenus',
      penaltiesConverted: 'Penaltys Transformés',
      threatIndex: 'Indice de Danger sur Coup de Pied Arrêté',
      cornerShotRate: 'Tirs sur Corner %',
      penaltyRate: 'Conversion des Penaltys %',
      threatLevel: 'Niveau de Menace sur Phase Arrêtée',
      resetData: 'Réinitialiser les Statistiques',
    },
  },
};
