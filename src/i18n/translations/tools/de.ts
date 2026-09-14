import { ToolTranslation } from '../../types';

export const deToolsData: Record<string, ToolTranslation> = {
  'player-performance-rater': {
    name: 'Spieler-Leistungsbewertung',
    tagline: 'Berechne die Gesamt-Spielbewertung für alle 4 Positionen',
    description:
      'Bewerte die Leistung von Fußballspielern nach Position (TW, ABW, MIT, ST) mit gewichteten Formeln aus Toren, Vorlagen, Passquote, Dribblings, Zweikämpfen und Torschüssen, normiert auf eine 100-Punkte-Skala.',
    formulaSummary: 'Positionsspezifischer gewichteter Gesamtindex normiert auf 100',
    intro:
      'Die Spieler-Leistungsbewertung ermittelt eine umfassende Spielnote auf einer Skala von 0 bis 100 für die vier Grundpositionen Torhüter (TW), Verteidiger (ABW), Mittelfeldspieler (MIT) und Stürmer (ST). Durch positionsgenaue Gewichtung von Offensivaktionen, Passgenauigkeit, Dribblings und Defensivzweikämpfen liefert dieses Tool eine objektive Einschätzung des Spielbeitrags.',
    metricExplanation:
      'Klassische Torschützenlisten übersehen oft Strategen im Mittelfeld oder zweikampfstarke Innenverteidiger. Positionsspezifische Bewertungsmodelle gleichen dies aus: Für Mittelfeldspieler zählen Passsicherheit und Balleroberungen, während Angreifer an Effizienz und Torgefahr gemessen werden.',
    interpretation:
      'Notenskala 0 bis 100: 90–100 bedeutet Weltklasse (überragende, spielentscheidende Leistung); 80–89 Exzellent (starker, dominanter Auftritt); 65–79 Gut (solide, verlässliche Leistung); 50–64 Durchschnitt; unter 50 Schwach.',
    methodology:
      'Positionsgewichtung: ST = (Tore × 3) + (Vorlagen × 2) + (%TorschüsseAufsTor × 0.3) + (%Pässe × 0.2) + (Dribblings × 1.5); MIT = (Tore × 2) + (Vorlagen × 2.5) + (%Pässe × 0.4) + (Dribblings × 1.5) + (Tackles × 1.5); ABW = (Tackles × 3) + (%Pässe × 0.4) + (Tore × 1.5) + (Vorlagen × 1) + ZuNullBonus; TW = (%Pässe × 0.5) + (Tackles × 2) + (Paraden × 3) + ZuNullBonus.',
    footballContext:
      'Im europäischen Spitzenfußball (Bundesliga, Premier League, Champions League) liegen durchschnittliche Spielernoten zwischen 62 und 72. Regelmäßige 80+-Bewertungen zeichnen Ballon-d’Or-Kandidaten und Schlüsselspieler aus.',
    faqs: [
      {
        question: 'Wie wird die 0–100 Spielerbewertung berechnet?',
        answer:
          'Die Formel summiert gewichtete Leistungsdaten je nach Position und normiert das Ergebnis anhand professioneller Referenzwerte auf eine Skala von 10 bis 99.',
      },
      {
        question: 'Warum werden Abwehrspieler anders bewertet als Stürmer?',
        answer:
          'Ein Innenverteidiger schießt selten Tore, aber sein Wert liegt in Zweikampfquote, Pässen und Zu-Null-Spielen. Das Modell passt die Gewichtung exakt an die taktische Rolle an.',
      },
      {
        question: 'Kann ein Spieler eine 99 oder 100 Weltklasse-Note erreichen?',
        answer:
          'Ja. Herausragende Spiele mit mehreren Toren/Vorlagen, hoher Passquote (>90%) und starker Defensivarbeit heben den Spieler in den Weltklasse-Bereich (90+).',
      },
    ],
    labels: {
      positionPresets: 'Positions-Vorlagen laden',
      fwdPreset: 'ST Vorlage',
      midPreset: 'MIT Vorlage',
      defPreset: 'ABW Vorlage',
      gkPreset: 'TW Vorlage',
      positionRole: 'Taktische Position',
      goals: 'Erzielte Tore',
      assists: 'Vorlagen (Assists)',
      passAccuracy: 'Passgenauigkeit %',
      shotsOnTargetPercent: 'Schüsse aufs Tor %',
      dribbles: 'Erfolgreiche Dribblings',
      tackles: 'Gewonnene Zweikämpfe',
      saves: 'Paraden',
      cleanSheet: 'Zu Null gespielt (+Bonus)',
      matchRating: 'Berechnete Spielnote',
      performanceTier: 'Leistungsstufe',
      attackingImpact: 'Offensivwirkung',
      attackingImpactSub: 'Gewichtete Tore-, Vorlagen- und Schussgefahr',
      defensiveWork: 'Defensivarbeit',
      defensiveWorkSub: 'Tackles, Zweikämpfe, Ballgewinne und Paraden',
      resetValues: 'Werte zurücksetzen',
    },
  },

  'team-comparison': {
    name: 'Team-Vergleichsmatrix',
    tagline: 'Direkter statistischer Teamvergleich über 7 zentrale Leistungskennzahlen',
    description:
      'Vergleiche zwei Fußballmannschaften in 7 statistischen Kategorien: Tore pro Spiel, Ballbesitz %, Torschüsse, Passquote, Zweikämpfe und Ecken zur Ermittlung der statistischen Dominanz.',
    formulaSummary: 'Kategoriesiege: Dominanz % = (Gewonnene Kategorien / 7) × 100',
    intro:
      'Die Team-Vergleichsmatrix liefert einen direkten Leistungsvergleich zweier Vereine über sieben fundamentale Spielphasen: Torgefahr, Ballkontrolle, Schussvolumen, Passpräzision, Zweikampfhärte und Standarddruck.',
    metricExplanation:
      'Der Blick auf die Tabelle verschleiert oft stilistische Vorteile. Ein Team mit 58% Ballbesitz kann weniger echte Chancen kreieren als eine eiskalte Umschaltmannschaft. Diese Matrix deckt taktische Stärken auf.',
    interpretation:
      'Dominanz über alle 7 Kategorien: 5+ Siege zeigen deutliche Überlegenheit; 4 Siege einen klaren Vorteil; ein 3–3 Unentschieden spiegelt ein Duell auf Augenhöhe wider.',
    methodology:
      'Jede der 7 Kennzahlen wird separat verglichen. Der höhere Wert erhält 1 Kategoriesieg. Bei exaktem Gleichstand gibt es keinen Punkt. Gesamt-Dominanz % = (Gewonnene Kategorien / 7) × 100.',
    footballContext:
      'Deutsche und europäische Spitzenmannschaften erreichen meist >2.2 Tore/Spiel, >58% Ballbesitz, >86% Passquote und >6 Ecken pro Partie.',
    faqs: [
      {
        question: 'Wie wird die statistische Dominanz berechnet?',
        answer:
          'Es werden 7 Kernkategorien analysiert: Tore/Spiel, Ballbesitz %, Schüsse, Torschüsse, Passquote, Zweikämpfe und Ecken. Dominanz % entspricht den gewonnenen Kategorien geteilt durch 7.',
      },
      {
        question: 'Wie werden Unentschieden in einer Kategorie gewertet?',
        answer:
          'Haben beide Teams denselben Wert, gilt die Kategorie als Unentschieden und keines der Teams erhält einen Siegpunkt.',
      },
      {
        question: 'Kann ein Team mit weniger Ballbesitz dominieren?',
        answer:
          'Ja. Eine konterstarke Mannschaft, die mehr Tore erzielt, mehr Zweikämpfe gewinnt und präziser abschließt, kann die Mehrheit der Kategorien für sich entscheiden.',
      },
    ],
    labels: {
      teamAProfile: 'Profil Team A',
      teamBProfile: 'Profil Team B',
      teamName: 'Teamname',
      goalsPerGame: 'Tore / Spiel',
      possession: 'Ballbesitz %',
      shotsPerGame: 'Schüsse / Spiel',
      shotsOnTargetPerGame: 'Schüsse aufs Tor / Spiel',
      passAccuracy: 'Passgenauigkeit %',
      tacklesPerGame: 'Zweikämpfe / Spiel',
      cornersPerGame: 'Ecken / Spiel',
      dominanceSummary: 'Zusammenfassung der Dominanz',
      categoriesWon: 'Gewonnene Kategorien',
      drawCategories: 'Geteilte Kategorien',
      headToHeadBreakdown: 'Direkter Kennzahlen-Vergleich',
      advantage: 'Vorteil',
      tied: 'Gleichstand',
      resetData: 'Vergleichsdaten zurücksetzen',
    },
  },

  'pass-accuracy-calculator': {
    name: 'Passgenauigkeit & Passqualitäts-Index',
    tagline: 'Miss Passquote, lange Bälle und kreative Passqualität',
    description:
      'Berechne Kurz- und Langpassquoten sowie einen fortschrittlichen Passqualitäts-Index, der Schlüsselpässe und progressive Pässe belohnt.',
    formulaSummary: 'Qualität = (Pass% × 0.6) + (Schlüsselpässe × 2) + (LangeBälle% × 0.4)',
    intro:
      'Dieser Rechner analysiert Passgenauigkeit bei kurzen und langen Pässen sowie die kreative Qualität der Spieleröffnung. Statt nur die reine Passquote zu betrachten, fließen Schlüsselpässe und raumgewinnende Diagonalbälle ein.',
    metricExplanation:
      'Ein Spieler mit 95% Passquote, der nur risikolose Rückpässe spielt, hilft dem Team weniger als ein Spielmacher mit 82%, der 5 Großchancen kreiert und 8 präzise 40-Meter-Bälle schlägt.',
    interpretation:
      'Ein Passqualitäts-Wert von 85+ steht für absolute Elite-Spielmacher (wie Toni Kroos); 70–84 für zuverlässige Verteiler; 55–69 für soliden Durchschnitt; unter 55 für wenig Raumgewinn.',
    methodology:
      'Passquote % = (Angekommene Pässe / Gesamte Pässe) × 100; Langpassquote % = (Angekommene lange Bälle / Versuchte) × 100; Qualitäts-Index = (Pass% × 0.60) + (Schlüsselpässe × 2.0) + (Langpass% × 0.40).',
    footballContext:
      'Top-Sechser in Europa erreichen 88–93% Passquote und 65–75% bei langen Bällen. Zehner liegen aufgrund des Drucks im letzten Drittel meist bei 78–84%.',
    faqs: [
      {
        question: 'Was ist der Passqualitäts-Index?',
        answer:
          'Der Index kombiniert Ballsicherheit (60%), Genauigkeit bei langen Bällen (40%) und kreative Schlüsselpässe (+2 Punkte pro Chance).',
      },
      {
        question: 'Was ist eine gute Passquote im Profifußball?',
        answer:
          'Innenverteidiger erreichen 88–94%, zentrale Mittelfeldspieler 84–90% und Flügelspieler im Angriffsdrittel 74–82%.',
      },
      {
        question: 'Wie werden Null-Eingaben behandelt?',
        answer:
          'Das System besitzt Schutzmechanismen gegen Division durch Null und gibt bei 0 Pässen sicher 0.0% aus.',
      },
    ],
    labels: {
      totalPasses: 'Gespielte Pässe insgesamt',
      completedPasses: 'Angekommene Pässe',
      keyPasses: 'Schlüsselpässe / Chancen',
      longBallsAttempted: 'Lange Bälle versucht',
      longBallsCompleted: 'Lange Bälle angekommen',
      qualityScore: 'Passqualitäts-Index',
      overallAccuracy: 'Gesamte Passquote',
      longBallAccuracy: 'Präzision langer Bälle',
      resetSample: 'Beispieldaten zurücksetzen',
    },
  },

  'shot-conversion-rate': {
    name: 'Chancenverwertung & Abschlusseffizienz',
    tagline: 'Analysiere Schusseffizienz, Schüsse aufs Tor und Großchancenverwertung',
    description:
      'Miss die Torgefährlichkeit anhand von Gesamtschüssen, Schüssen aufs Tor und verwandelten Großchancen.',
    formulaSummary: 'Abschlussquote % = (Tore / Schüsse) × 100 | Großchancen % = ((GC - GCF) / GC) × 100',
    intro:
      'Der Chancenverwertungs-Rechner beziffert die Eiseskälte vor dem Tor. Durch den Vergleich von Toren mit Gesamtschüssen, Schüssen aufs Tor und Großchancen unterscheidet er Vielschießer von echten Torjägern.',
    metricExplanation:
      'Ein Stürmer mit 15 Toren aus 120 Schüssen hat 12.5% Effizienz; ein Angreifer mit 15 Toren aus 65 Schüssen erreicht 23.1%. Hohe Verwertung entscheidet enge Topspiele.',
    interpretation:
      'Über 20% Verwertung ist Weltklasse; 14–19% überdurchschnittlich stark; 9–13% Ligadurchschnitt europäischer Stürmer; unter 9% ineffizient.',
    methodology:
      'Gesamte Konvertierungsquote % = (Tore / Schüsse) × 100; Schüsse aufs Tor Quote % = (Tore / Schüsse aufs Tor) × 100; Großchancenverwertung % = ((Großchancen - Vergeben) / Großchancen) × 100.',
    footballContext:
      'Torschützenkönige wie Harry Kane oder Erling Haaland weisen regelmäßig Quoten von 22–25% auf.',
    faqs: [
      {
        question: 'Was gilt als weltklasse Chancenverwertung?',
        answer:
          'In den europäischen Top-5-Ligen gilt eine Gesamtschussverwertung von über 20% als absolute Weltklasse.',
      },
      {
        question: 'Warum ist die Großchancenverwertung so wichtig?',
        answer:
          'Distanzschüsse drücken oft die Gesamtquote, aber die Ruhe bei 1-gegen-1-Situationen im Strafraum zeigt wahre Stürmerklasse.',
      },
      {
        question: 'Was unterscheidet Schüsse aufs Tor von Gesamtschüssen?',
        answer:
          'Gesamtschüsse enthalten geblockte und verzogene Bälle; Schüsse aufs Tor messen nur Bälle, die den Torwart tatsächlich prüfen.',
      },
    ],
    labels: {
      totalShots: 'Schüsse insgesamt',
      goalsScored: 'Erzielte Tore',
      shotsOnTarget: 'Schüsse aufs Tor',
      bigChances: 'Großchancen erhalten',
      bigChancesMissed: 'Großchancen vergeben',
      conversionRate: 'Gesamte Chancenverwertung',
      onTargetConversion: 'Verwertung Schüsse aufs Tor',
      bigChanceConversion: 'Großchancenverwertung',
      resetSample: 'Musterdaten zurücksetzen',
    },
  },

  'possession-impact-analyzer': {
    name: 'Ballbesitz-Effizienz-Analyzer',
    tagline: 'Miss Sieg-Ertrag, Torausbeute und Effizienz aus Ballbesitzphasen',
    description:
      'Überprüfe, ob Ballbesitz zu Siegen führt. Berechnet Siegquote, Tore pro Spiel und den Ballbesitz-Effizienzindex.',
    formulaSummary: 'Effizienz = (Siegquote / Ballbesitz %) | Tore/Spiel = Tore / Spiele',
    intro:
      'Dieser Analyzer untersucht, ob viel Ballbesitz tatsächlich zu sportlichem Erfolg führt. Durch Gegenüberstellung von Ballbesitzanteil, Siegquote und Toren entlarvt er brotlosen Ballbesitz.',
    metricExplanation:
      '70% Ballbesitz ohne Raumgewinn und ein 0:1 durch Konter bringen keine Punkte. Der Effizienzindex belohnt zielstrebigen Ballbesitzfußball.',
    interpretation:
      'Ein Index über 1.25 signalisiert hocheffizienten Ballbesitz; 0.90–1.24 ausgewogene Kontrolle; unter 0.90 sterilen Ballbesitz ohne Torgefahr.',
    methodology:
      'Siegquote % = (Siege / Spiele) × 100; Tore pro Spiel = Tore / Spiele; Effizienzindex = Siegquote % / Ballbesitz %.',
    footballContext:
      'Dominante Meistermannschaften kombinieren hohen Ballbesitz (>65%) mit hoher Effizienz (>1.30) und über 2.4 Toren pro Partie.',
    faqs: [
      {
        question: 'Was bedeutet steriler Ballbesitz?',
        answer:
          'Wenn ein Team viel Ballbesitz in ungefährlichen Zonen hält, aber kaum Torschüsse kreiert (Effizienzindex <0.85).',
      },
      {
        question: 'Können Kontermannschaften eine hohe Ballbesitz-Effizienz haben?',
        answer:
          'Ja. Ein Umschaltteam mit 40% Ballbesitz, das 65% seiner Spiele gewinnt, erreicht einen herausragenden Index von 1.63.',
      },
      {
        question: 'Was ist ein guter Torschnitt pro Spiel?',
        answer:
          'Titelanwärter peilen 2.1 bis 2.6 Tore pro Spiel an. Für die Champions League sind mindestens 1.8 Tore nötig.',
      },
    ],
    labels: {
      matchesPlayed: 'Analysierte Spiele',
      wins: 'Siege',
      draws: 'Unentschieden',
      losses: 'Niederlagen',
      goalsScored: 'Erzielte Tore',
      averagePossession: 'Durchschnittlicher Ballbesitz %',
      efficiencyIndex: 'Ballbesitz-Effizienzindex',
      winRate: 'Siegquote %',
      goalsPerGame: 'Tore / Spiel',
      resetData: 'Daten zurücksetzen',
    },
  },

  'player-form-index': {
    name: 'Spieler-Formkurven-Index',
    tagline: 'Verfolge Formmomentum, Kartenabzüge und Einsatzzeit der letzten 5 Spiele',
    description:
      'Quantifiziere die aktuelle Form der letzten 5 Partien über Tore, Vorlagen, Noten, Karten und Spielzeitbonus auf einer Skala bis 10.0.',
    formulaSummary: 'Form = Basis(Tore×1.5 + Vorlagen×1.2 + Note×0.8) - Karten + Minutenbonus',
    intro:
      'Der Formkurven-Index erfasst den Lauf der letzten 5 Spiele auf einer 1.0 bis 10.0 Skala. Durch Kombination von Scorerpunkten, Noten, Disziplin und Einsatzminuten identifiziert er Spieler in Topform.',
    metricExplanation:
      'Saisonstatistiken verschleiern kurzfristige Leistungshochs. Fantasy-Manager und Scouts nutzen den 5-Spiele-Index, um heiße Phasen zu erkennen.',
    interpretation:
      'Ein Formwert von 8.5–10.0 bedeutet Topform / On Fire; 7.0–8.4 Starke Form; 5.5–6.9 Solide; unter 5.5 Formtief oder Disziplinprobleme.',
    methodology:
      'Basispunkte = (Tore × 1.5) + (Vorlagen × 1.2) + (Notenschnitt × 0.80); Kartenabzug = (Gelb × 0.25) + (Rot × 1.50); Minutenbonus = (Minuten / 450) × 0.50; Endwert zwischen 1.0 und 10.0 normiert.',
    footballContext:
      'Spieler mit einem Formindex über 8.0 treffen meist zuverlässig und kreieren kontinuierlich Torchancen.',
    faqs: [
      {
        question: 'Warum werden genau 5 Spiele betrachtet?',
        answer:
          'Ein 5-Spiele-Fenster (ca. 450 Minuten) ist der Standard in der Spielanalyse, um Trends von Einzelausrutschern zu trennen.',
      },
      {
        question: 'Wie stark wirkt sich ein Platzverweis aus?',
        answer:
          'Eine Rote Karte zieht 1.5 Punkte direkt ab, da sie das Team taktisch und ergebnistechnisch massiv schwächt.',
      },
      {
        question: 'Erhöhen volle 90 Minuten den Wert?',
        answer:
          'Ja. Ein Dauerbrenner-Bonus von bis zu +0.50 Punkten belohnt Spieler, die die vollen 450 Minuten auf dem Platz standen.',
      },
    ],
    labels: {
      goalsLast5: 'Tore in den letzten 5 Spielen',
      assistsLast5: 'Vorlagen in den letzten 5 Spielen',
      avgRatingLast5: 'Notenschnitt (letzte 5)',
      yellowCardsLast5: 'Gelbe Karten (letzte 5)',
      redCardsLast5: 'Rote Karten (letzte 5)',
      minutesPlayedLast5: 'Gespielte Minuten (letzte 5)',
      formScore: '5-Spiele-Formindex',
      status: 'Aktueller Formstatus',
      resetData: 'Formdaten zurücksetzen',
    },
  },

  'transfer-value-estimator': {
    name: 'Marktwert- & Ablöseschätzer',
    tagline: 'Schätze realistische Transfermarkt-Ablösen mit Alterskurve, Liga und Vertrag',
    description:
      'Berechne den fairen Transfermarktwert (€M) anhand von Position, Alterspeak, Toren/Vorlagen, Ligastärke, Restvertrag und Länderspielen.',
    formulaSummary: 'Wert = Basis × AlterMult × LeistMult × LigaMult × VertragMult + LänderspielBonus',
    intro:
      'Dieser Schätzer ermittelt realistische Marktwerte und Ablösesummen in Millionen Euro (€M). Durch Kombination von Alterskurven, Position, Scorerpunkten, Liganiveau, Vertragslaufzeit und Nationalteam-Erfahrung entsteht eine fundierte Bewertung.',
    metricExplanation:
      'Ablösen hängen stark von Restvertrag und Wiederverkaufswert ab. Ein 22-Jähriger mit 4 Jahren Vertrag hat einen enormen Marktwertvorteil gegenüber einem 31-Jährigen vor Vertragsende.',
    interpretation:
      'Werte über 100 Mio. € stehen für absolute Weltstars; 50–99 Mio. € für Champions-League-Stammkräfte; 20–49 Mio. € für gestandene Erstliga-Profis.',
    methodology:
      'Basiswert nach Position. Multiplikatoren: Alterskurve (Peak mit 23–26 Jahren), Scorer-Zuschlag, Liga-Koeffizient (Premier League 1.6x, Bundesliga 1.3x), Vertragsdauer (4+ Jahre 1.3x; 1 Jahr 0.6x) und Länderspiele (€0.2M/Spiel).',
    footballContext:
      'Offensivspieler und torgefährliche Außenstürmer erzielen auf dem internationalen Transfermarkt die höchsten Summen.',
    faqs: [
      {
        question: 'Warum senkt ein kurzer Vertrag den Transferwert so stark?',
        answer:
          'Im letzten Vertragsjahr droht ein ablösefreier Wechsel (Bosman-Urteil), wodurch der abgebende Verein bis zu 50% Abschlag hinnehmen muss.',
      },
      {
        question: 'In welchem Alter erreicht der Marktwert seinen Höhepunkt?',
        answer:
          'Statistisch liegt der Höchstwert zwischen 23 und 26 Jahren, wenn sportliche Höchstform und lange Restkarriere zusammentreffen.',
      },
      {
        question: 'Sind Bonuszahlungen im Wert enthalten?',
        answer:
          'Es wird die fixe Sockelablöse geschätzt. Leistungsabhängige Boni machen oft weitere 15–25% aus.',
      },
    ],
    labels: {
      position: 'Position',
      age: 'Alter des Spielers',
      goalsThisSeason: 'Tore in dieser Saison',
      assistsThisSeason: 'Vorlagen in dieser Saison',
      leagueTier: 'Nationales Liganiveau',
      contractRemaining: 'Verbleibende Vertragsjahre',
      internationalCaps: 'A-Länderspiele',
      estimatedValue: 'Geschätzter Marktwert',
      valuationTier: 'Marktwert-Kategorie',
      ageMultiplier: 'Alterskurven-Faktor',
      leagueMultiplier: 'Liga-Multiplikator',
      resetData: 'Bewertungsmodell zurücksetzen',
    },
  },

  'wage-calculator': {
    name: 'Spieler-Gehalts- & Vertragsrechner',
    tagline: 'Berechne Jahresbruttogehalt, effektives Wochengehalt und Leistungsboni',
    description:
      'Modelliere das gesamte Vergütungspaket: Grundgehalt (52 Wochen), Einsatzprämien, Torboni und Zu-Null-Prämien in £, € oder $.',
    formulaSummary: 'Jahreseinkommen = (Grundgehalt/Woche × 52) + (Spiele × Einsatzprämie) + (Tore × Torbonus) + (Zu-Null × CS-Bonus)',
    intro:
      'Der Gehaltsrechner modelliert Spielerverträge durch Kombination des garantierten wöchentlichen Grundgehalts mit leistungsabhängigen Boni für Einsätze, Tore und Zu-Null-Spiele.',
    metricExplanation:
      'Moderne Verträge balancieren Fixgehalt und Leistungsanreize. Dieser Rechner visualisiert die exakte Verteilung zwischen Basisgehalt und variablen Boni.',
    interpretation:
      'Zeigt das jährliche Bruttogesamteinkommen, das auf 52 Wochen bezogene effektive Wochengehalt und die prozentuale Aufteilung der Vergütungskomponenten.',
    methodology:
      'Jahresgrundgehalt = Wochengehalt × 52; Einsatzprämien = Prämie × Spiele; Torprämien = Prämie × Tore; Zu-Null-Prämien = Prämie × Zu-Null; Gesamteinkommen = Basis + Boni; Effektives Wochengehalt = Gesamteinkommen / 52.',
    footballContext:
      'Europäische Spitzenvereine wenden 55% bis 70% ihres Umsatzes für Spielergehälter auf. Leistungsbezogene Verträge minimieren das finanzielle Vereinsrisiko.',
    faqs: [
      {
        question: 'Wie wird das effektive Wochengehalt berechnet?',
        answer:
          'Es teilt das gesamte jährliche Bruttoeinkommen (Grundgehalt + alle erspielten Boni) durch 52 Wochen.',
      },
      {
        question: 'Warum werden Einsatz- und Torprämien getrennt erfasst?',
        answer:
          'Vertragsstrukturen unterscheiden gezielt zwischen Boni für Stammspieler, Torjäger und Abwehrspezialisten.',
      },
      {
        question: 'Wie hoch ist üblicherweise der Boni-Anteil im Profifußball?',
        answer:
          'In europäischen Top-Ligen macht das Grundgehalt meist 75% bis 85% der Gesamtvergütung aus, während Boni 15% bis 25% beisteuern.',
      },
    ],
    labels: {
      currency: 'Währung',
      baseWeeklyWage: 'Wöchentliches Grundgehalt',
      appearanceFee: 'Einsatzprämie pro Spiel',
      matchesPlayed: 'Gespielte Saisonspiele',
      goalBonus: 'Torprämie pro Treffer',
      goalsScored: 'Erzielte Tore',
      cleanSheetBonus: 'Zu-Null-Prämie',
      cleanSheetsKept: 'Zu-Null-Spiele',
      totalAnnualEarnings: 'Jährliches Gesamteinkommen',
      effectiveWeeklyWage: 'Effektives Wochengehalt',
      baseAnnualSalary: 'Jährliches Grundgehalt',
      totalPerformanceBonuses: 'Gesamte Leistungsboni',
      resetData: 'Gehaltsmodell zurücksetzen',
    },
  },

  'squad-value-calculator': {
    name: 'Kaderwert- & Kadertiefen-Rechner',
    tagline: 'Erfasse den Gesamt-Kaderwert, Verteilung nach Mannschaftsteilen und Balance',
    description:
      'Berechne den gesamten Kader-Marktwert, den Durchschnittswert pro Spieler und die Aufteilung auf Torwart, Abwehr, Mittelfeld und Angriff.',
    formulaSummary: 'Gesamtwert = Σ(Spielerwerte) | Ausgewogenheits-Index',
    intro:
      'Dieser Rechner summiert Marktwerte Ihres Kaders, ermittelt den Schnitt pro Spieler und zeigt, wie sich das Budget auf Tor, Abwehr, Mittelfeld und Sturm verteilt.',
    metricExplanation:
      'Ein Kader mit 500 Mio. € im Sturm, aber nur 40 Mio. € in der Abwehr leidet unter massiver Unwucht. Dieses Tool deckt strukturelle Lücken auf.',
    interpretation:
      'Ein gesunder Spitzenkader verteilt seinen Wert etwa so: 8–12% Torhüter, 28–35% Verteidiger, 28–35% Mittelfeld und 30–40% Stürmer.',
    methodology:
      'Gesamtwert = Summe aller Spielerwerte; Prozentualer Anteil = (Positionswert / Gesamtwert) × 100.',
    footballContext:
      'Champions-League-Sieger weisen meist Kader-Gesamtwerte von 800 Mio. € bis über 1,2 Milliarden € auf.',
    faqs: [
      {
        question: 'Wie sieht die ideale Positionsverteilung im Kader aus?',
        answer:
          'Erfolgreiche Klubs investieren rund 10% in Torhüter, 30% in die Abwehr, 30% ins Mittelfeld und 30% in den Angriff.',
      },
      {
        question: 'Wie viele Spieler umfasst ein Profikader?',
        answer:
          'Ein typischer Profikader besteht aus 22 bis 25 Spielern (zwei pro Position plus 3 Spezialisten).',
      },
      {
        question: 'Garantiert der höchste Kaderwert automatisch Titel?',
        answer:
          'Über 34 oder 38 Spieltage ist die Korrelation sehr hoch (r > 0.85), im Pokalmodus gibt es jedoch mehr Einflüsse.',
      },
    ],
    labels: {
      addPlayer: 'Spieler zum Kader hinzufügen',
      playerName: 'Spielername',
      position: 'Position',
      marketValue: 'Marktwert (€M)',
      totalSquadValue: 'Gesamter Kaderwert',
      avgPlayerValue: 'Durchschnittlicher Spielerwert',
      squadSize: 'Kadergröße',
      positionBreakdown: 'Verteilung nach Positionen',
      resetSquad: 'Kaderdaten zurücksetzen',
    },
  },

  'contract-worth-analyzer': {
    name: 'Vertragswert- & FFP-Abschreibungs-Analyzer',
    tagline: 'Berechne jährliche Buchwert-Abschreibungen und finanzielle Gesamtkosten',
    description:
      'Berechne die jährliche Transferabschreibung, gesamte Gehaltskosten über die Vertragslaufzeit und den jährlichen FFP-Aufwand.',
    formulaSummary: 'Abschreibung/Jahr = Ablöse / Vertragsjahre | Gesamtkosten = Ablöse + (Gehalt × 52 × Jahre)',
    intro:
      'Dieser Analyzer berechnet die tatsächliche finanzielle Belastung eines Transfers. Durch lineare Abschreibung der Ablösesumme und Erfassung von Gehältern und Beraterhonoraren wird der jährliche GuV-Aufwand für das Financial Fairplay (FFP) ermittelt.',
    metricExplanation:
      'Ablösesummen werden in der Vereinsbuchhaltung nicht sofort als Gesamtsumme verbucht, sondern über die Vertragslaufzeit (maximal 5 Jahre laut UEFA) gleichmäßig abgeschrieben.',
    interpretation:
      'Die jährliche Gesamtbelastung ist die entscheidende Kennzahl für Sportdirektoren: 18 Mio. € Abschreibung plus 12 Mio. € Gehalt belasten die Bilanz mit 30 Mio. €/Jahr.',
    methodology:
      'Jährliche Abschreibung = Ablöse / Jahre (max. 5 Jahre); Jährliche Gehaltskosten = Wochengehalt × 52; Gesamtkosten = Ablöse + (Jahresgehalt × Jahre) + Handgeld + Berater; Jährlicher FFP-Aufwand = Abschreibung + Jahresgehalt.',
    footballContext:
      'Die Finanzregeln der UEFA und nationaler Ligen sanktionieren Verstöße mit Punktabzügen und Transfersperren.',
    faqs: [
      {
        question: 'Was ist die Transferabschreibung im Fußball?',
        answer:
          'Die Anschaffungskosten für die Registrierung eines Spielers werden gleichmäßig über die Vertragslaufzeit verteilt (z.B. 80 Mio. € über 5 Jahre = 16 Mio. €/Jahr).',
      },
      {
        question: 'Warum hat die UEFA die Abschreibungsdauer auf 5 Jahre begrenzt?',
        answer:
          'Um Schlupflöcher mit 8- bis 9-jährigen Verträgen zur künstlichen Drückung der Jahresabschreibung zu schließen.',
      },
      {
        question: 'Was passiert beim vorzeitigen Verkauf des Spielers?',
        answer:
          'Der restliche Buchwert wird vom Verkaufserlös abgezogen; der Überschuss gilt sofort als Buchgewinn.',
      },
    ],
    labels: {
      transferFee: 'Ablösesumme (€M)',
      contractYears: 'Vertragslaufzeit (Jahre)',
      weeklyWage: 'Grund-Wochengehalt',
      signingBonus: 'Handgeld (€M)',
      agentFee: 'Beraterhonorar (€M)',
      annualAmortization: 'Jährliche Transfer-Abschreibung',
      totalCostToClub: 'Finanzielle Gesamtverpflichtung',
      annualBudgetImpact: 'Jährliche GuV-Belastung (FFP)',
      amortizationSchedule: 'Mehrjähriger Abschreibungsplan',
      resetData: 'Vertragsmodell zurücksetzen',
    },
  },

  'fantasy-football-points': {
    name: 'Fantasy-Fußball-Punkterechner',
    tagline: 'Analytische Fantasy-Punkte-Schätzung für alle Spielpositionen',
    description:
      'Ermittle die Fantasy-Punkte eines Spieltags aus Toren, Vorlagen, Zu-Null-Spielen, Defensiv-Aktionen (CBIT/CBIRT), Paraden, Elfmetern, Karten und Einsatzminuten.',
    formulaSummary: 'Analytisches Fantasy-Modell nach Position (TW/ABW/MIT/ST)',
    intro:
      'Der Fantasy-Punkterechner liefert eine analytische Punkteeinschätzung anhand realer Spielereignisse für Torhüter, Verteidiger, Mittelfeldspieler und Stürmer.',
    metricExplanation:
      'Verschiedene Positionen werden differenziert bewertet: Torhüter (10 Pkt pro Tor), Verteidiger (6 Pkt pro Tor, 4 Pkt Zu-Null, Defensivbonus ab 10 CBIT), Mittelfeldspieler (5 Pkt pro Tor, Bonus ab 12 CBIRT) und Stürmer (4 Pkt pro Tor, Bonus ab 12 CBIRT).',
    interpretation:
      '12+ Punkte ist eine zweistellige Ausbeute (Top-Kapitän); 6–9 Punkte solide Leistung; 2–4 Punkte Standard-Einsatzzeit.',
    methodology:
      'Fantasy-Regeln: 60+ Min gespielt (+2), 1-59 Min (+1); Tore (TW +10, ABW +6, MIT +5, ST +4); Vorlagen (+3); Zu Null (TW/ABW +4, MIT +1); Defensiv-Beitrag (+2 bei ABW >= 10 CBIT oder MIT/ST >= 12 CBIRT); Elfmeter gehalten (+5); Elfmeter verschossen (-2); Paraden (1 Pkt je 3 Paraden); Gelb (-1); Rot (-3); Eigentore (-2); Bonus BPS (+1 bis +3).',
    footballContext:
      'Top-Fantasy-Spieler zielen auf einen Schnitt von über 6.0 Punkten pro Spieltag ab.',
    faqs: [
      {
        question: 'Erhalten Mittelfeldspieler Punkte für Zu-Null-Spiele?',
        answer:
          'Ja, Mittelfeldspieler erhalten +1 Punkt für ein Zu-Null-Spiel bei mindestens 60 Minuten Spielzeit.',
      },
      {
        question: 'Wie funktioniert der Defensiv-Beitragsbonus?',
        answer:
          'Verteidiger erhalten +2 Punkte ab 10 CBIT-Aktionen (Befreiungsschläge, geblockte Schüsse, abgefangene Bälle, Tacklings). Mittelfeldspieler und Stürmer erhalten +2 Punkte ab 12 CBIRT-Aktionen (inkl. Balleroberungen).',
      },
      {
        question: 'Wie werden Torwartparaden gewertet?',
        answer:
          'Torhüter erhalten für jeweils 3 abgewehrte Torschüsse +1 zusätzlichen Punkt.',
      },
      {
        question: 'Was passiert bei Gelb-Rot?',
        answer:
          'Der Spieler erhält -3 Punkte für den Platzverweis (die einzelnen Gelben Karten werden nicht doppelt abgezogen).',
      },
    ],
    labels: {
      position: 'Spielerposition',
      minutesPlayed: 'Gespielte Minuten',
      goalsScored: 'Erzielte Tore',
      assists: 'Vorlagen',
      cleanSheet: 'Zu Null gespielt',
      cbitActions: 'Defensiv-Aktionen CBIT (Verteidiger)',
      cbirtActions: 'Defensiv-Aktionen CBIRT (Mittelfeld / Sturm)',
      goalsConceded: 'Gegentore',
      saves: 'Paraden',
      penaltySaves: 'Gehaltene Elfmeter',
      penaltyMisses: 'Verschossene Elfmeter',
      yellowCards: 'Gelbe Karten',
      redCards: 'Rote Karten',
      ownGoals: 'Eigentore',
      bonusPoints: 'Bonuspunkte (BPS)',
      totalPoints: 'Gesamte Spieltagspunkte',
      pointBreakdown: 'Punkte-Aufschlüsselung',
      resetData: 'Punkterechner zurücksetzen',
    },
  },

  'best-xi-selector': {
    name: 'Beste-Elf & Formations-Optimierer',
    tagline: 'Wähle die optimale Startelf in 6 taktischen Systemen nach Form und Preis',
    description:
      'Gib deinen Spielerkader mit Formwerten und Fantasy-Preisen ein, um automatisch die punktstärkste Startelf für Systeme wie 4-3-3, 4-4-2, 3-5-2 oder 4-2-3-1 zu berechnen.',
    formulaSummary: 'Form-Kosten-Optimierung unter Berücksichtigung von Positionsquoten und Budget',
    intro:
      'Der Beste-Elf-Optimierer stellt aus deinem Spielerkader die punktstärkste Startformation unter Einhaltung taktischer Formationen und Budgetgrenzen zusammen.',
    metricExplanation:
      'Eine siegreiche Aufstellung verlangt die Balance aus teuren Superstars und günstigen Punktelieferanten.',
    interpretation:
      'Zeigt die optimierte Startelf mit erwarteter Gesamtform und Gesamtkosten an.',
    methodology:
      'Lineare Optimierung: Maximiert die Summe der Formwerte der Spieler unter Einhaltung der Positionsanzahlen des gewählten Systems und des Budgets.',
    footballContext:
      'Formationen mit 3 Stürmern (4-3-3, 3-4-3) maximieren das Offensivpotenzial an leichten Spieltagen.',
    faqs: [
      {
        question: 'Welche Formation bringt die meisten Punkte?',
        answer:
          '3-4-3 und 3-5-2 bieten meist das höchste Punktepotenzial durch viele Mittelfeld- und Sturmpositionen.',
      },
      {
        question: 'Wie berücksichtigt der Rechner das Budget?',
        answer:
          'Er berechnet das Preis-Leistungs-Verhältnis (Punkte pro Million), um das Budget optimal auszuschöpfen.',
      },
      {
        question: 'Kann ich Spielerdaten anpassen?',
        answer:
          'Ja, Namen, Preise, Positionen und Formwerte können in der Tabelle frei editiert werden.',
      },
    ],
    labels: {
      formation: 'Taktische Formation wählen',
      budgetLimit: 'Budgetgrenze (£M / €M)',
      playerPool: 'Verfügbarer Spielerkader',
      addPlayer: 'Spieler zum Kader hinzufügen',
      optimalXi: 'Optimierte Startelf',
      projectedTotalForm: 'Prognostizierte Gesamtform',
      totalCost: 'Gesamtkosten der Aufstellung',
      resetPool: 'Kader zurücksetzen',
    },
  },

  'captain-pick-analyzer': {
    name: 'Kapitäns-Wahl-Analyzer',
    tagline: 'Algorithmischer Kapitänsvergleich nach Form, Gegnerstärke und Historie',
    description:
      'Vergleiche Kapitäns-Kandidaten über einen gewichteten Algorithmus: Form (30%), Spielplan-Schwierigkeit (25%), Heimvorteil (15%), Historie (15%) und Team-Offensivstärke (15%).',
    formulaSummary: 'Kapitäns-Score = (Form × 30%) + (Spielplan × 25%) + (Heimrecht × 15%) + (Historie × 15%) + (Team-Angriff × 15%)',
    intro:
      'Der Kapitäns-Analyzer vergleicht Binden-Kandidaten algorithmisch. Durch Bewertung von Form (30%), Gegnerstärke (25%), Heimrecht (15%), bisherigen Duellen (15%) und Team-Angriffskraft (15%) ermittelt er den StatKick Kapitäns-Score (0–100).',
    metricExplanation:
      'Die Kapitänsbinde verdoppelt die Punkte und ist die wichtigste Entscheidung im Fantasy-Fußball.',
    interpretation:
      'Ein Score >80 bedeutet Unverzichtbarer Top-Kapitän; 65–79 Starker Anwärter; 50–64 Riskanter Außenseiter; unter 50 Nicht empfohlen.',
    methodology:
      'StatKick Kapitäns-Score = (Form × 10 × 0.30) + ((6 - FDR) / 5 × 100 × 0.25) + (Heim=100/Auswärts=50 × 0.15) + (Historie × 0.15) + (Team-Angriff × 0.15).',
    footballContext:
      'Erfahrene Fantasy-Manager wählen in über 70% der Fälle Heimspieler gegen Teams aus dem unteren Tabellendrittel.',
    faqs: [
      {
        question: 'Warum wiegt der Heimvorteil 15%?',
        answer:
          'Heimteams erzielen historisch 20–30% mehr Tore, was die Wahrscheinlichkeit für hohe Punkteausbeuten deutlich steigert.',
      },
      {
        question: 'Was bedeutet der FDR-Wert (Fixture Difficulty Rating)?',
        answer:
          'Eine Skala von 1 (sehr leichter Gegner zuhause) bis 5 (stärkster Titelkandidat auswärts).',
      },
      {
        question: 'Wann lohnt sich ein Differential-Kapitän?',
        answer:
          'Um in der Schlussphase der Saison Rückstände in Mini-Ligen aufzuholen, bieten Außenseiter mit hohem Index Aufholchancen.',
      },
    ],
    labels: {
      candidateA: 'Kandidat A',
      candidateB: 'Kandidat B',
      candidateC: 'Kandidat C (Optional)',
      playerName: 'Spielername',
      currentForm: 'Aktuelle Form (1–10)',
      fdr: 'Gegnerstärke (FDR 1-5)',
      venue: 'Austragungsort',
      home: 'Heimspiel',
      away: 'Auswärtsspiel',
      historyReturn: 'Historische Quote vs Gegner',
      captaincyVerdict: 'Kapitäns-Empfehlung',
      captainIndex: 'StatKick Kapitäns-Score',
      resetData: 'Kandidaten zurücksetzen',
    },
  },

  'transfer-suggestion': {
    name: 'Fantasy-Transfer-Strategie-Engine',
    tagline: 'Vergleiche Verkaufs- und Kaufoptionen zur Maximierung des Punktertrags',
    description:
      'Analysiere einen Spielertransfer anhand von Formdifferenz, Spielplan der nächsten 3 Spieltage, Budget und prognostiziertem Punktegewinn.',
    formulaSummary: 'Transferwert = (FormNeu - FormAlt) + (FDRAlt - FDRNeu) × 1.2 + Budgeteffizienz',
    intro:
      'Diese Strategie-Engine bewertet geplante Transfers anhand von Formkurven, Gegnerkalender der nächsten 3 Spieltage und verbleibendem Restbudget.',
    metricExplanation:
      'Transfers nur wegen vergangener Punkte führen oft zu Frust. Dieser Rechner blickt voraus auf kommende Spieltage.',
    interpretation:
      'Ein Wert über +3.0 bedeutet Dringend empfohlener Transfer; +1.0 bis +2.9 Guter Transfer; negative Werte raten vom Wechsel ab.',
    methodology:
      'Index = (Form Neu - Form Alt) × 1.2 + (FDR Alt - FDR Neu) × 1.5 + Budget-Faktor.',
    footballContext:
      'Spieler mit einer leichten Serie von 4+ Spielen gegen schwache Abwehrreihen bringen den höchsten Ertrag.',
    faqs: [
      {
        question: 'Lohnt sich ein Punktabzug (-4 Pkt) für einen Transfer?',
        answer:
          'Nur wenn der neue Spieler einen Index >+3.5 hat und über 3 Spieltage mindestens 5 Punkte mehr erwartet werden.',
      },
      {
        question: 'Warum wird ein 3-Spiele-Horizont betrachtet?',
        answer:
          'Einzelne Spieltage haben hohe Zufallsschwankungen; 3 bis 5 Spiele sichern nachhaltigen Punkteertrag.',
      },
      {
        question: 'Wie wird verbleibendes Restbudget bewertet?',
        answer:
          'Freigesetztes Kapital für spätere Upgrades anderer Positionen wird positiv bonifiziert.',
      },
    ],
    labels: {
      transferOut: 'Zu verkaufender Spieler (Abgang)',
      transferIn: 'Zu kaufender Spieler (Zugang)',
      playerNameOut: 'Spielername (Abgang)',
      sellingPrice: 'Verkaufspreis (£M)',
      formOut: 'Formwert (1–10)',
      fdrOut: 'FDR nächste 3 (Schnitt)',
      playerNameIn: 'Spielername (Zugang)',
      purchasePrice: 'Kaufpreis (£M)',
      formIn: 'Formwert (1–10)',
      fdrIn: 'FDR nächste 3 (Schnitt)',
      bankMoney: 'Guthaben auf der Bank (£M)',
      transferVerdict: 'Transfer-Bewertung',
      netGainScore: 'Transfer-Vorteilswert',
      budgetImpact: 'Verbleibendes Bankguthaben',
      resetData: 'Transferbewertung zurücksetzen',
    },
  },

  'league-table-simulator': {
    name: 'Ligatabellen- & Punkte-Simulator',
    tagline: 'Simuliere verbleibende Spieltage für Meisterschaft, Europapokal und Abstieg',
    description:
      'Gib aktuelle Punkte, Restspiele und erwartete Siege/Remis/Niederlagen ein, um Endplatzierungen, Titelchancen und Klassenerhalt zu berechnen.',
    formulaSummary: 'Endpunkte = Aktuelle Punkte + (Siege × 3) + (Unentschieden × 1)',
    intro:
      'Der Ligatabellen-Simulator prognostiziert die Abschlusstabelle, Meisterschaftsgewinner, Europapokal-Plätze (Champions League, Europa League) und den Abstiegskampf.',
    metricExplanation:
      'Titelrennen und Abstiegskampf entscheiden sich im Restprogramm. Mit diesem Tool lassen sich alle mathematischen Szenarien durchspielen.',
    interpretation:
      'Zeigt die simulierte Endtabelle mit Meister, Europacup-Teilnehmern und Absteigern.',
    methodology:
      'Punkte = Aktuelle Punkte + (Siege × 3) + (Remis × 1). Bei Punktgleichheit entscheidet die Tordifferenz.',
    footballContext:
      'In einer 34-Spiele-Bundesliga reichen meist 75–80 Punkte zur Meisterschaft, 60–63 für die Champions League und 34–36 für den direkten Klassenerhalt.',
    faqs: [
      {
        question: 'Wie viele Punkte brauchte man historisch für die Meisterschaft?',
        answer:
          'In europäischen Topligen benötigt der Meister im Schnitt 2.35 bis 2.50 Punkte pro Spiel.',
      },
      {
        question: 'Gilt die 40-Punkte-Marke noch für den Klassenerhalt?',
        answer:
          'In der 34-Spiele-Bundesliga reichen meist schon 34 bis 36 Punkte für den sicheren Klassenerhalt.',
      },
      {
        question: 'Wie wird bei Punktgleichheit verfahren?',
        answer:
          'Die Tordifferenz dient als primäres Kriterium bei gleicher Punktzahl.',
      },
    ],
    labels: {
      teamName: 'Teamname',
      currentPoints: 'Aktuelle Punkte',
      gamesRemaining: 'Verbleibende Spiele',
      projWins: 'Prognostizierte Siege',
      projDraws: 'Prognostizierte Unentschieden',
      projLosses: 'Prognostizierte Niederlagen',
      projectedPoints: 'Prognostizierte Endpunkte',
      champions: 'Simulierter Meister',
      uclZone: 'Champions-League-Plätze',
      relegationZone: 'Abstiegszone',
      simulateTable: 'Tabelle simulieren',
      resetTable: 'Tabelle zurücksetzen',
    },
  },

  'points-needed-calculator': {
    name: 'Benötigte-Punkte-Rechner',
    tagline: 'Ermittle exakt benötigte Siege und Remis für Titel, Top 4 oder Klassenerhalt',
    description:
      'Berechne die nötigen Siege und Unentschieden aus den verbleibenden Spielen, um Saisonziele (Meisterschaft, Champions League, Klassenerhalt) sicher zu erreichen.',
    formulaSummary: 'Punktelücke = Zielpunkte - Aktuelle Punkte | Erforderliche Siegquote',
    intro:
      'Dieser Rechner ermittelt alle mathematischen Kombinationen aus Siegen, Remis und maximalen Niederlagen, die zum Erreichen des Saisonziels nötig sind.',
    metricExplanation:
      'Zu wissen, dass man 14 Punkte aus 7 Spielen braucht, ist abstrakt. Dieser Rechner zeigt konkrete Spieltage-Szenarien (z.B. 4 Siege, 2 Remis, 1 Niederlage).',
    interpretation:
      'Gibt den Machbarkeitsstatus an (Erreichbar, Sehr Schwer, Mathematisch Unmöglich) und listet alle Kombinationen auf.',
    methodology:
      'Punkte nötig = Ziel - Aktuell; Maximal möglich = Restspiele × 3; Ermittelt alle (S, U) Lösungen mit (S×3 + U×1) >= Punkte nötig.',
    footballContext:
      'Muss ein Team mehr als 75% der verbleibenden Spiele gewinnen, ist Schützenhilfe der Konkurrenz fast unausweichlich.',
    faqs: [
      {
        question: 'Was passiert, wenn die nötigen Punkte die Maximalpunkte übersteigen?',
        answer:
          'Das Ziel wird sofort als "Mathematisch Unmöglich" gekennzeichnet und die Punktelücke angezeigt.',
      },
      {
        question: 'Was gilt als machbare Siegquote im Endspurt?',
        answer:
          'Unter 50% Siegquote gilt für Teams der oberen Tabellenhälfte als absolut machbar; über 70% erfordert Meisterform.',
      },
      {
        question: 'Kann man eigene Zielwerte eingeben?',
        answer:
          'Ja, wählen Sie aus Standardzielen (Meisterschaft, Top 4, Klassenerhalt) oder geben Sie eine beliebige Punktzahl ein.',
      },
    ],
    labels: {
      targetGoal: 'Saisonziel',
      customTarget: 'Ziel-Punktzahl',
      currentPoints: 'Aktuelle Punkte',
      matchesRemaining: 'Verbleibende Spiele',
      pointsNeeded: 'Benötigte Punkte',
      maxAvailable: 'Maximal erreichbare Punkte',
      requiredWinRate: 'Erforderliche Siegquote %',
      targetStatus: 'Machbarkeit des Ziels',
      viableCombinations: 'Mögliche Sieg-/Remis-Kombinationen',
      resetData: 'Rechner zurücksetzen',
    },
  },

  'head-to-head-stats': {
    name: 'Direkter-Vergleich-Matrix (H2H)',
    tagline: 'Historische Duell-Bilanz, Siegquoten, Tore und Dominanz zweier Klubs',
    description:
      'Analysiere die historische Rivalität zweier Vereine: Siegquoten, Unentschieden, Torschnitt und Tordifferenz.',
    formulaSummary: 'Siegquote % = (Siege / Spiele) × 100 | Tordifferenz pro Spiel',
    intro:
      'Die Direkte-Vergleichs-Matrix analysiert das historische Duell zweier Fußballvereine. Sie berechnet Siegquoten, Tordurchschnitte und psychologische Tendenzen.',
    metricExplanation:
      'Direktduelle offenbaren Angstgegner und taktische Vor- oder Nachteile, die ein reiner Tabellenvergleich nicht zeigt.',
    interpretation:
      'Eine Siegquote >55% zeigt klare historische Dominanz; 40–54% maximale Ausgeglichenheit; hohe Remisquoten (>35%) zähe Abnutzungskämpfe.',
    methodology:
      'Siegquote % = (Siege / Spiele) × 100; Remisquote % = (Remis / Spiele) × 100; Torschnitt = Tore / Spiele.',
    footballContext:
      'In großen Derbys (z.B. Revierderby, El Clásico, Derby d’Italia) spielt die aktuelle Tabellenform durch emotionale Aufladung oft eine untergeordnete Rolle.',
    faqs: [
      {
        question: 'Warum weicht die Duell-Historie oft von der aktuellen Tabelle ab?',
        answer:
          'Bestimmte Spielstile (z.B. kompaktes Konterspiel gegen ballbesitzorientierte Teams) liegen manchen Gegnern traditionell gar nicht.',
      },
      {
        question: 'Wie viele Tore fallen im Schnitt in großen Derbys?',
        answer:
          'Europäische Top-Derbys weisen einen Torschnitt von 2.7 bis 3.1 Toren pro Spiel auf.',
      },
      {
        question: 'Wie viele Spiele sind für eine aussagekräftige Stichprobe nötig?',
        answer:
          'Eine Stichprobe von 6 bis 12 Spielen liefert statistische Relevanz bei aktueller taktischer Vergleichbarkeit.',
      },
    ],
    labels: {
      teamAName: 'Name Team A',
      teamBName: 'Name Team B',
      totalMatches: 'Gespielte Duelle insgesamt',
      teamAWins: 'Siege Team A',
      teamBWins: 'Siege Team B',
      draws: 'Unentschieden',
      teamAGoals: 'Tore Team A',
      teamBGoals: 'Tore Team B',
      h2hSummary: 'Zusammenfassung der Rivalität',
      winPercentage: 'Siegquote',
      avgGoalsPerMatch: 'Torschnitt / Spiel',
      goalDifference: 'Tordifferenz',
      resetData: 'Duell-Daten zurücksetzen',
    },
  },

  'season-goals-tracker': {
    name: 'Saison-Tor-Tracker & Projektion',
    tagline: 'Verfolge Torquoten und prognostiziere Saison-Gesamtwerte und Torjägerkronen',
    description:
      'Verfolge den Torschnitt pro Spiel, Minuten pro Tor und prognostiziere die Gesamttorausbeute über eine volle Saison.',
    formulaSummary: 'Tore pro Spiel = Tore / Spiele | Projektion = Tore pro Spiel × Saisonspiele',
    intro:
      'Der Saison-Tor-Tracker erfasst Torjäger-Trends, berechnet Minuten-pro-Tor-Werte und prognostiziert die Gesamtausbeute für die Torjägerkanone.',
    metricExplanation:
      'Ein Stürmer mit 10 Toren in 12 Spielen liegt auf Kurs zu einer 31-Tore-Saison. Die Analyse der Torfrequenz pro 90 Minuten zeigt historische Rekordläufe frühzeitig.',
    interpretation:
      '30+ Tore steht für Goldener-Schuh-Niveau; 20–29 Tore absolute Weltklasse; 12–19 Tore verlässlicher Stammstürmer; unter 10 Ergänzungsspieler.',
    methodology:
      'Tore pro Spiel = Tore / Spiele; Minuten pro Tor = Gesamtminuten / Tore; Projektion = Tore pro Spiel × Saisonspiele (Standard 34 oder 38).',
    footballContext:
      'Für den Goldenen Schuh Europas sind meist 32 bis 38 Tore in 34/38 Ligaspielen erforderlich (0.85 bis 1.00 Tore/Spiel).',
    faqs: [
      {
        question: 'Ab wann sind Saisonprognosen aussagekräftig?',
        answer:
          'Nach etwa 10 bis 12 Spieltagen (ca. 900 Minuten) stabilisieren sich Prognosen deutlich.',
      },
      {
        question: 'Was ist ein weltklasse Minuten-pro-Tor-Verhältnis?',
        answer:
          'Unter 110 Minuten pro Tor ist Spitzenklasse. Absolute Ausnahmestürmer (Haaland, Lewandowski) erreichen teils unter 85 Minuten/Tor.',
      },
      {
        question: 'Werden 34-Spiele-Ligen wie die Bundesliga unterstützt?',
        answer:
          'Ja, die Gesamtzahl der Saisonspiele kann flexibel auf 34, 38 oder jeden beliebigen Wert angepasst werden.',
      },
    ],
    labels: {
      matchesPlayed: 'Gespielte Saisonspiele',
      goalsScored: 'Erzielte Tore',
      minutesPlayed: 'Gespielte Minuten insgesamt',
      totalSeasonMatches: 'Saisonspiele gesamt',
      projectedGoals: 'Prognostizierte Saisontore',
      goalsPerGame: 'Tore / Spiel',
      minsPerGoal: 'Minuten / Tor',
      paceTier: 'Taktung & Torjäger-Kategorie',
      resetData: 'Tor-Tracker zurücksetzen',
    },
  },

  'formation-analyzer': {
    name: 'Formations- & Taktik-Analyzer',
    tagline: 'Analysiere Stärken, Schwächen und Gegensysteme taktischer Formationen',
    description:
      'Untersuche Systeme (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) auf Mittelfeldkontrolle, Kompaktheit, Flügelgefahr und Pressing.',
    formulaSummary: 'Taktische Balance-Matrix: Bewertungen in Mittelfeld, Defensive, Flügeln und Pressing',
    intro:
      'Der Taktik-Analyzer analysiert Grundordnungen (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) in vier Kerndimensionen: Mittelfeldkontrolle, defensive Kompaktheit, Flügelgefahr und Pressingfähigkeit.',
    metricExplanation:
      'Formationen sind dynamische Räume: Sie schaffen Dreiecke, Überzahlsituationen und Absicherungen gegen Konter. Das passende Gegensystem neutralisiert gegnerische Stärken.',
    interpretation:
      'Noten von 1 bis 10 bewerten Zonen. Ein 4-3-3 bietet enorme Flügelgefahr (9/10) und starkes Pressing (9/10), verlangt aber hohe Defensivdisziplin der Flügelstürmer.',
    methodology:
      'Taktische Bewertungsmatrix basierend auf Raumaufteilung, Zentrumsdichte, Kettenbreite und Pressingauslösern.',
    footballContext:
      'Moderne Trainer variieren oft zwischen Ballbesitz- und Defensivordnung (z.B. gegen den Ball 4-4-2, im Aufbau 3-2-4-1).',
    faqs: [
      {
        question: 'Welche Formation dominiert das Zentrum am stärksten?',
        answer:
          'Systeme mit drei zentralen Mittelfeldspielern (4-3-3, 4-2-3-1, 3-5-2) erzeugen natürliche Überzahl gegen Doppelsechs-Systeme.',
      },
      {
        question: 'Wie verteidigen Dreierketten-Systeme gegen 4-3-3?',
        answer:
          'Ein 3-5-2 stellt Schienenspieler gegen gegnerische Flügel und sichert das Zentrum mit 3 Innenverteidigern gegen den Mittelstürmer ab.',
      },
      {
        question: 'Wo liegt die Schwachstelle des klassischen 4-4-2?',
        answer:
          'Im flachen 4-4-2 droht im Zentrum eine 2-gegen-3-Unterzahl gegen Dreier-Mittelfelder.',
      },
    ],
    labels: {
      selectFormation: 'Taktische Formation wählen',
      formationOverview: 'Taktisches Formations-Profil',
      midfieldControl: 'Mittelfeldkontrolle',
      defensiveCompactness: 'Defensive Kompaktheit',
      wideThreat: 'Gefahr über die Flügel',
      pressingCapability: 'Pressingpotenzial',
      strengths: 'Systemstärken',
      weaknesses: 'Taktische Schwachstellen',
      counterFormations: 'Effektive Gegensysteme',
      resetData: 'Formationsansicht zurücksetzen',
    },
  },

  'pressing-intensity-calculator': {
    name: 'Pressing-Intensitäts-Rechner (PPDA)',
    tagline: 'Miss zugelassene Pässe pro Defensivaktion zur Bestimmung der Pressinghöhe',
    description:
      'Berechne den PPDA-Wert (Passes Allowed Per Defensive Action) zur Einstufung des Defensivstils von aggressivem Gegenpressing bis zum tiefen Abwehrriegel.',
    formulaSummary: 'PPDA = Gegnerpässe in 60% Angriffsfeld / (Tackles + Interceptions + Fouls in Zone)',
    intro:
      'Der PPDA-Rechner ermittelt die zugelassenen Pässe pro Abwehraktion im gegnerischen Aufbau (vordere 60% des Spielfelds). Als Profi-Standardmetric unterscheidet PPDA aggressives Gegenpressing von tiefem Blockieren.',
    metricExplanation:
      'Ein niedriger PPDA-Wert (<9.0) bedeutet, dass der Gegner kaum Pässe spielen kann, bevor er attackiert wird. Ein hoher Wert (>16.0) steht für passives Abwarten.',
    interpretation:
      'PPDA < 8.5 steht für extremes Gegenpressing (Klopp/Guardiola-Stil); 8.5–11.5 Aktives Angriffspressing; 11.6–15.5 Mittelfeldpressing; >15.5 Tiefer Abwehrblock.',
    methodology:
      'PPDA = Gegnerpässe in vorderen 60% / (Zweikämpfe + Ballabfänge + Fouls in Zone); Umschaltgefahr = (Hohe Ballgewinne × 1.5) + (Schüsse nach Ballgewinn × 2.0).',
    footballContext:
      'Top-Pressing-Teams (wie Manchester City, Bayern München, Arsenal) halten ihren PPDA konstant zwischen 7.5 und 9.5.',
    faqs: [
      {
        question: 'Warum bedeutet ein niedrigerer PPDA-Wert mehr Pressing?',
        answer:
          'Weil weniger gegnerische Pässe zugelassen werden, bevor deine Mannschaft aktiv den Ball erobert.',
      },
      {
        question: 'Welcher Spielfeldbereich fließt in den PPDA ein?',
        answer:
          'Die gegnerischen 60% des Feldes (gegnerische Abwehr- und Mittelfeldzone), Aktionen am eigenen Strafraum werden nicht gezählt.',
      },
      {
        question: 'Ist ein niedriger PPDA immer besser?',
        answer:
          'Nicht zwingend. Konterstarke Teams nutzen bewusst Mittelfeldpressing mit höherem PPDA, um Raum für Umschaltsituationen zu schaffen.',
      },
    ],
    labels: {
      opponentPasses: 'Gegnerpässe in gegnerischer Hälfte',
      tacklesInZone: 'Zweikämpfe in Pressingzone',
      interceptionsInZone: 'Abgefangene Bälle in Zone',
      challengesInZone: 'Zweikampfduelle / Fouls in Zone',
      highTurnovers: 'Hohe Ballgewinne (<40m vor Tor)',
      shotsFromTurnovers: 'Schüsse nach Ballgewinn',
      calculatedPpda: 'Berechneter PPDA-Wert',
      defensiveStyle: 'Pressing-Archetyp',
      turnoverDanger: 'Gefahr nach Ballgewinn',
      resetData: 'PPDA-Modell zurücksetzen',
    },
  },

  'set-piece-success-rate': {
    name: 'Standardsituationen-Erfolgsquote & Torgefahr',
    tagline: 'Bewerte Effizienz und Gefahrenindex bei Ecken, Freistößen und Elfmetern',
    description:
      'Analysiere Verwertungsquoten bei Eckbällen, direkten Freistößen, indirekten Freistößen und Elfmetern zur Berechnung des Standard-Gefahrenindexes.',
    formulaSummary: 'Standardgefahr-Score = (Ecken-Tore% × 5) + (Ecken-Schüsse% × 0.4) + (Freistoß-Präzision% × 0.2) + (Freistoß-Tore% × 1.5) + (Flankenfreistoß-Tore% × 2.0) + (Elfmeter% × 0.2)',
    intro:
      'Dieser Rechner analysiert Ecken, direkte Freistöße, indirekte Freistöße und Elfmeter zur Ermittlung eines ganzheitlichen Standard-Gefahrenindexes (0–100) für Teams und Spezialisten.',
    metricExplanation:
      'Standardsituationen machen 25% bis 35% aller Tore im Spitzenfußball aus. Eingeübte Varianten und verlässliche Schützen entscheiden Titelkämpfe.',
    interpretation:
      'Gefahrenindex >75 Elite-Standardgefahr; 55–74 Überdurchschnittlich gefährlich; 35–54 Durchschnitt; unter 35 Geringe Gefahr.',
    methodology:
      'Eckball-Schussquote % = (Schüsse / Ecken) × 100; Eckball-Torquote % = (Tore / Ecken) × 100; Ecken-Abschlussverwertung % = (Tore / Schüsse) × 100; Direkte Freistoß-Präzision % = (Torschüsse / Freistöße) × 100; Direkte Freistoß-Torquote % = (Tore / Freistöße) × 100; Indirekte Freistoß-Torquote % = (Tore / Flankenfreistöße) × 100; Elfmeterquote % = (Verwandelt / Geschossen) × 100; Standardgefahr-Score gewichtet.',
    footballContext:
      'Spitzenteams mit Spezialtrainern für ruhende Bälle (z.B. Arsenal) erzielen über 0.35 Tore pro Spiel rein aus Standards.',
    faqs: [
      {
        question: 'Was ist eine gute Abschlussquote nach Eckbällen?',
        answer:
          'Aus 28–35% aller Ecken einen Torabschluss zu generieren gilt als Spitzenwert; die Torquote liegt bei 3–5% aller getretenen Ecken.',
      },
      {
        question: 'Wie hoch ist die durchschnittliche Elfmeterquote?',
        answer:
          'Im Profifußball liegt die durchschnittliche Elfmeter-Erfolgsquote bei 76% bis 79%. Spezialisten erreichen 90%+.',
      },
      {
        question: 'Warum werden mit Schnitt zum Tor geschlagene Ecken bevorzugt?',
        answer:
          'Sie drehen sich gefährlich in den 5-Meter-Raum zwischen Torwart und Abwehrlinie, was die Abschlusschance um ca. 18% steigert.',
      },
    ],
    labels: {
      cornersTaken: 'Ausgeführte Ecken',
      shotsFromCorners: 'Schüsse nach Ecken',
      goalsFromCorners: 'Tore nach Ecken',
      directFkTaken: 'Direkte Freistöße geschossen',
      directFkGoals: 'Tore aus direkten Freistößen',
      indirectFkTaken: 'Flankenfreistöße getreten',
      goalsFromIndirectFk: 'Tore aus Freistoßflanken',
      penaltiesAwarded: 'Zugesprochene Elfmeter',
      penaltiesConverted: 'Verwandelte Elfmeter',
      threatIndex: 'Standard-Gefahrenindex',
      cornerShotRate: 'Schussquote nach Ecken %',
      penaltyRate: 'Elfmeter-Erfolgsquote %',
      threatLevel: 'Gefahren-Einstufung',
      resetData: 'Standarddaten zurücksetzen',
    },
  },
};
