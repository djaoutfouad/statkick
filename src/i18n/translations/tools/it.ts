import { ToolTranslation } from '../../types';

export const itToolsData: Record<string, ToolTranslation> = {
  'player-performance-rater': {
    name: 'Valutatore di Rendimento del Giocatore',
    tagline: 'Calcola il voto globale della partita per i 4 ruoli del calcio',
    description:
      'Valuta le prestazioni dei calciatori per ruolo (POR, DIF, CEN, ATT) tramite formule ponderate con gol, assist, precisione passaggi, dribbling, contrasti e tiri in porta su scala da 100 punti.',
    formulaSummary: 'Indice composito ponderato per ruolo normalizzato a 100',
    intro:
      'Il Valutatore di Rendimento calcola un voto partita complessivo su 100 per i quattro ruoli cardine: Portiere (POR), Difensore (DIF), Centrocampista (CEN) e Attaccante (ATT). Valutando fase offensiva, possesso palla, duelli e contrasti difensivi con pesi specifici, questo strumento offre una valutazione oggettiva.',
    metricExplanation:
      'I tabellini tradizionali spesso sottovalutano i registi che dettano i ritmi o i difensori centrali che vincono contrasti rischiosi. I voti tarati per ruolo correggono questo squilibrio: il punteggio di un centrocampista premia la precisione nei passaggi e i contrasti vinti, mentre quello di un attaccante si basa su cinismo e gol segnati.',
    interpretation:
      'Scala voti da 0 a 100: 90–100 Fuoriclasse Mondiale (prestazione decisiva da protagonista assoluto); 80–89 Eccellente (dominio del ruolo); 65–79 Buono (prestazione solida e affidabile); 50–64 Sufficiente / Medio; meno di 50 Insufficiente.',
    methodology:
      'Pesi per ruolo: ATT = (Gol × 3) + (Assist × 2) + (%TiriInPorta × 0.3) + (%Passaggi × 0.2) + (Dribbling × 1.5); CEN = (Gol × 2) + (Assist × 2.5) + (%Passaggi × 0.4) + (Dribbling × 1.5) + (Contrasti × 1.5); DIF = (Contrasti × 3) + (%Passaggi × 0.4) + (Gol × 1.5) + (Assist × 1) + BonusPortaInviolata; POR = (%Passaggi × 0.5) + (Contrasti × 2) + (Parate × 3) + BonusPortaInviolata.',
    footballContext:
      'Nel calcio europeo di vertice (Serie A, Champions League, Premier League), la media voto di un titolare si attesta tra 62 e 72. Mantenere voti sopra l’80 per più giornate distingue i candidati al Pallone d’Oro dai giocatori di rotazione.',
    faqs: [
      {
        question: 'Come viene normalizzato il voto da 0 a 100?',
        answer:
          'La formula somma i contributi statistici ponderati in base al ruolo e li rapporta ai parametri professionali, racchiudendo il risultato tra 10 e 99.',
      },
      {
        question: 'Perché difensori e portieri sono valutati diversamente dagli attaccanti?',
        answer:
          'Un difensore centrale segna raramente, ma il suo valore risiede nei duelli vinti, nelle uscite pulite e nelle porte inviolate. Il modello adatta i pesi ad ogni funzione tattica.',
      },
      {
        question: 'Un giocatore può raggiungere un voto di 99 o 100?',
        answer:
          'Sì. Prestazioni memorabili con più gol/assist, oltre il 90% di precisione nei passaggi e grandi recuperi difensivi portano il giocatore nella fascia Fuoriclasse (90+).',
      },
    ],
    labels: {
      positionPresets: 'Carica Preimpostazioni di Ruolo',
      fwdPreset: 'Preimpostazione ATT',
      midPreset: 'Preimpostazione CEN',
      defPreset: 'Preimpostazione DIF',
      gkPreset: 'Preimpostazione POR',
      positionRole: 'Ruolo Tattico',
      goals: 'Gol Segnati',
      assists: 'Assist',
      passAccuracy: 'Precisione Passaggi %',
      shotsOnTargetPercent: 'Tiri nello Specchio %',
      dribbles: 'Dribbling Riusciti',
      tackles: 'Contrasti Vinti',
      saves: 'Parate Effettuate',
      cleanSheet: 'Porta Inviolata (+Bonus)',
      matchRating: 'Voto Partita Calcolato',
      performanceTier: 'Fascia di Rendimento',
      attackingImpact: 'Impatto Offensivo',
      attackingImpactSub: 'Pericolo ponderato da gol, assist e conclusioni',
      defensiveWork: 'Lavoro Difensivo',
      defensiveWorkSub: 'Contrasti, duelli, intercettazioni e parate',
      resetValues: 'Reimposta Valori',
    },
  },

  'team-comparison': {
    name: 'Matrice di Confronto tra Squadre',
    tagline: 'Scontro statistico diretto su 7 parametri chiave di rendimento',
    description:
      'Confronta due squadre di calcio su 7 categorie statistiche: gol a partita, possesso palla %, tiri in porta, precisione passaggi, contrasti e calci d’angolo per determinare il dominio totale.',
    formulaSummary: 'Vittorie per categoria: Dominio % = (Categorie Vinte / 7) × 100',
    intro:
      'La Matrice di Confronto mette a confronto due club su sette aspetti fondamentali del gioco: prolificità offensiva, controllo del possesso, volume di conclusioni, precisione nel palleggio, intensità difensiva e pericolosità sui corner.',
    metricExplanation:
      'Confrontare le squadre solo tramite la classifica nasconde i punti di forza stilistici. Una squadra con il 58% di possesso può creare meno occasioni di una formazione micidiale in contropiede.',
    interpretation:
      'Dominio complessivo sulle 7 categorie: 5+ vittorie indicano netta superiorità; 4 vittorie un vantaggio competitivo; un pareggio 3–3 riflette una sfida equilibratissima.',
    methodology:
      'Ognuno dei 7 parametri viene confrontato singolarmente. La squadra con il valore più alto guadagna 1 punto di categoria. In caso di perfetta parità, nessun punto viene assegnato. Dominio % = (Vinte / 7) × 100.',
    footballContext:
      'Le squadre al vertice europeo viaggiano su medie superiori a 2.2 gol a partita, oltre il 58% di possesso palla e più dell’86% di passaggi riusciti.',
    faqs: [
      {
        question: 'Come si calcola il dominio statistico tra due squadre?',
        answer:
          'Viene calcolato su 7 pilastri: Gol/Partita, Possesso %, Tiri Totali, Tiri in Porta, Precisione Passaggi, Contrasti e Calci d’Angolo. Dominio % = Categorie vinte su 7.',
      },
      {
        question: 'Cosa succede in caso di parità in una categoria?',
        answer:
          'Se entrambe le formazioni registrano lo stesso identico dato, la categoria finisce in Pareggio e nessuna delle due riceve il punto.',
      },
      {
        question: 'Una squadra con meno possesso può risultare dominante?',
        answer:
          'Sì. Una squadra abile in ripartenza che supera l’avversario in gol, tiri nello specchio, contrasti e corner vincerà il confronto.',
      },
    ],
    labels: {
      teamAProfile: 'Profilo Squadra A',
      teamBProfile: 'Profilo Squadra B',
      teamName: 'Nome della Squadra',
      goalsPerGame: 'Gol / Partita',
      possession: 'Possesso Palla %',
      shotsPerGame: 'Tiri / Partita',
      shotsOnTargetPerGame: 'Tiri in Porta / Partita',
      passAccuracy: 'Precisione Passaggi %',
      tacklesPerGame: 'Contrasti / Partita',
      cornersPerGame: 'Corner / Partita',
      dominanceSummary: 'Riepilogo Dominio Statistico',
      categoriesWon: 'Categorie Vinte',
      drawCategories: 'Categorie Pareggiate',
      headToHeadBreakdown: 'Dettaglio Parametro per Parametro',
      advantage: 'Vantaggio',
      tied: 'Parità',
      resetData: 'Reimposta Confronto',
    },
  },

  'pass-accuracy-calculator': {
    name: 'Calcolatore di Precisione e Qualità dei Passaggi',
    tagline: 'Misura accuratezza dei passaggi, precisione nei lanci lunghi e visione di gioco',
    description:
      'Calcola le percentuali di passaggi corti e lunghi insieme a un Indice di Qualità del Passaggio che premia i passaggi chiave e la distribuzione progressiva.',
    formulaSummary: 'Qualità = (Passaggi% × 0.6) + (Passaggi Chiave × 2) + (LanciLunghi% × 0.4)',
    intro:
      'Questo calcolatore analizza l’accuratezza nei passaggi corti e nei lanci lunghi, oltre alla qualità creativa della manovra. Più che guardare solo la percentuale grezza, premia le aperture filtranti e i cambi di gioco progressivi.',
    metricExplanation:
      'Un giocatore con il 95% di passaggi riusciti che gioca solo all’indietro offre meno valore di un regista all’82% che imbuca 5 passaggi chiave e indovina 8 lanci di 40 metri.',
    interpretation:
      'Un Indice di Qualità di 85+ rappresenta registi d’élite (alla Toni Kroos o Pirlo); 70–84 un costruttore affidabile; 55–69 la media; sotto 55 scarso impatto nella manovra.',
    methodology:
      'Precisione % = (Completati / Totali) × 100; Precisione Lanci Lunghi % = (Lanci Riusciti / Tentati) × 100; Indice Qualità = (Passaggi% × 0.60) + (Passaggi Chiave × 2.0) + (Lanci Lunghi% × 0.40).',
    footballContext:
      'I centrocampisti centrali di vertice registrano l’88–93% di precisione complessiva e il 65–75% sui lanci lunghi. I trequartisti si attestano sul 78–84% per via della densità negli ultimi 25 metri.',
    faqs: [
      {
        question: 'Che cos’è l’Indice di Qualità dei Passaggi?',
        answer:
          'È un indice che sintetizza il mantenimento del pallone (60%), la precisione nei lanci lunghi (40%) e i passaggi chiave da gol (+2 punti ciascuno).',
      },
      {
        question: 'Qual è una buona percentuale di passaggi nel calcio professionistico?',
        answer:
          'I difensori centrali viaggiano su 88–94%, i centrocampisti centrali su 84–90% e gli esterni offensivi su 74–82%.',
      },
      {
        question: 'Come vengono gestiti i valori a zero?',
        answer:
          'Il sistema adotta tutele matematiche contro la divisione per zero, restituendo 0.0% in modo sicuro.',
      },
    ],
    labels: {
      totalPasses: 'Passaggi Totali Tentati',
      completedPasses: 'Passaggi Riusciti',
      keyPasses: 'Passaggi Chiave / Occasioni Create',
      longBallsAttempted: 'Lanci Lunghi Tentati',
      longBallsCompleted: 'Lanci Lunghi Riusciti',
      qualityScore: 'Indice di Qualità del Palleggio',
      overallAccuracy: 'Precisione Globale Passaggi',
      longBallAccuracy: 'Precisione Lanci Lunghi',
      resetSample: 'Reimposta Dati Esempio',
    },
  },

  'shot-conversion-rate': {
    name: 'Tasso di Conversione ed Efficienza di Tiro',
    tagline: 'Analizza il cinismo sotto porta, i tiri nello specchio e le grandi occasioni',
    description:
      'Misura la letalità dei bomber confrontando gol su tiri totali, conclusioni nello specchio e grandi occasioni trasformate rispetto a quelle fallite.',
    formulaSummary: 'Conversione % = (Gol / Tiri) × 100 | Grandi Occasioni % = ((GO - GOM) / GO) × 100',
    intro:
      'Il Calcolatore di Conversione di Tiro quantifica la freddezza sotto porta. Mettendo a confronto gol, tiri totali, conclusioni nello specchio e grandi occasioni, distingue chi tira tanto da chi finalizza con cinismo.',
    metricExplanation:
      'Un attaccante da 15 gol in 120 tiri ha un’efficienza del 12.5%, mentre uno da 15 gol in 65 conclusioni raggiunge il 23.1%. L’alta conversione permette di vincere le partite più bloccate.',
    interpretation:
      'Oltre il 20% è livello Fuoriclasse; 14–19% finalizzatore sopra la media; 9–13% media degli attaccanti europei; sotto il 9% poca precisione o troppi tiri da fuori a basso xG.',
    methodology:
      'Tasso di Conversione % = (Gol / Tiri Totali) × 100; Conversione Tiri in Porta % = (Gol / Tiri in Porta) × 100; Conversione Grandi Occasioni % = ((Grandi Occasioni - Sbagliate) / Grandi Occasioni) × 100.',
    footballContext:
      'I vincitori della Scarpa d’Oro (come Erling Haaland o Harry Kane) viaggiano stabilmente su tassi di conversione del 22–25%.',
    faqs: [
      {
        question: 'Cosa si intende per tasso di conversione di livello mondiale?',
        answer:
          'Nei primi 5 campionati d’Europa, una percentuale complessiva superiore al 20% è considerata da fuoriclasse assoluto.',
      },
      {
        question: 'Perché la conversione delle grandi occasioni è fondamentale?',
        answer:
          'I tiri da lontano abbassano la media complessiva, ma la freddezza negli 1 contro 1 e dentro l’area piccola mostra la vera caratura del centravanti.',
      },
      {
        question: 'Che differenza c’è tra tiri nello specchio e tiri totali?',
        answer:
          'I tiri totali includono conclusioni murate e fuori bersaglio, mentre i tiri nello specchio misurano le conclusioni che impegnano direttamente il portiere.',
      },
    ],
    labels: {
      totalShots: 'Tiri Totali Tentati',
      goalsScored: 'Gol Segnati',
      shotsOnTarget: 'Tiri nello Specchio',
      bigChances: 'Grandi Occasioni Ricevute',
      bigChancesMissed: 'Grandi Occasioni Fallite',
      conversionRate: 'Tasso Globale di Conversione',
      onTargetConversion: 'Conversione Tiri nello Specchio',
      bigChanceConversion: 'Conversione Grandi Occasioni',
      resetSample: 'Reimposta Campione',
    },
  },

  'possession-impact-analyzer': {
    name: 'Analizzatore d’Impatto del Possesso',
    tagline: 'Misura la resa del pallone, percentuale di vittorie ed efficacia offensiva',
    description:
      'Valuta se il controllo della palla porta a vittorie concrete. Calcola Percentuale di Vittoria, Gol a Partita e Indice di Efficienza del Possesso.',
    formulaSummary: 'Efficienza = (Vittoria% / Possesso%) | Gol/Partita = Gol / Partite',
    intro:
      'L’Analizzatore d’Impatto del Possesso valuta se la gestione del pallone si traduce in successi. Sintetizzando possesso, percentuale di vittorie e gol a partita, smaschera il possesso sterile a favore di quello incisivo.',
    metricExplanation:
      'Avere il 70% di possesso non serve a nulla se si palleggia all’indietro e si perde 0-1 in contropiede. Questo indice premia chi trasforma il palleggio in occasioni e vittorie.',
    interpretation:
      'Un indice superiore a 1.25 denota Possesso Altamente Incisivo; 0.90–1.24 Controllo Equilibrato; sotto 0.90 Possesso Sterile (tanto palleggio, poca pericolosità).',
    methodology:
      'Percentuale Vittoria % = (Vittorie / Partite) × 100; Gol a Partita = Gol / Partite; Indice di Efficienza = Vittoria % / Possesso %.',
    footballContext:
      'Le grandi squadre dominatrici uniscono possesso elevato (>65%) e grande efficienza (>1.30), segnando oltre 2.4 gol a incontro.',
    faqs: [
      {
        question: 'Che cos’è il possesso sterile?',
        answer:
          'Si verifica quando una squadra fa girare la palla in zone innocue senza creare pericoli o tiri in porta (Indice <0.85).',
      },
      {
        question: 'Le squadre da contropiede possono avere un’alta efficienza?',
        answer:
          'Sì. Una squadra al 40% di possesso che vince il 65% delle gare ottiene un eccezionale indice di 1.63, testimoniando transizioni letali.',
      },
      {
        question: 'Qual è un buon traguardo di gol a partita?',
        answer:
          'Chi punta a vincere lo scudetto deve viaggiare tra 2.1 e 2.6 gol a partita. Per la zona Champions occorrono almeno 1.8 gol a gara.',
      },
    ],
    labels: {
      matchesPlayed: 'Partite Analizzate',
      wins: 'Vittorie',
      draws: 'Pareggi',
      losses: 'Sconfitte',
      goalsScored: 'Gol Segnati',
      averagePossession: 'Possesso Medio %',
      efficiencyIndex: 'Indice di Efficienza del Possesso',
      winRate: 'Percentuale di Vittoria %',
      goalsPerGame: 'Gol / Partita',
      resetData: 'Reimposta Analisi',
    },
  },

  'player-form-index': {
    name: 'Indice di Forma del Calciatore',
    tagline: 'Monitora la condizione nelle ultime 5 gare, cartellini e minutaggio',
    description:
      'Quantifica lo stato di forma recente nelle ultime 5 partite attraverso gol, assist, media voto, cartellini e bonus minuti su scala fino a 10.0.',
    formulaSummary: 'Forma = Base(Gol×1.5 + Assist×1.2 + Voto×0.8) - Cartellini + BonusMinuti',
    intro:
      'L’Indice di Forma misura il momento di forma nelle ultime 5 partite su una scala da 1.0 a 10.0. Unendo gol, assist, voti in pagella, disciplina e minutaggio, individua i giocatori in striscia positiva.',
    metricExplanation:
      'I dati complessivi dell’intera stagione nascondono i picchi di forma a breve termine. I fantallenatori e gli osservatori usano la media mobile su 5 gare per capire chi è al top della fiducia.',
    interpretation:
      'Un punteggio di 8.5–10.0 indica Giocatore On Fire / Picco di Forma; 7.0–8.4 Ottima Forma; 5.5–6.9 Rendimento Stabile; sotto 5.5 Calo di forma o problemi disciplinari.',
    methodology:
      'Punteggio Base = (Gol × 1.5) + (Assist × 1.2) + (Media Voto × 0.80); Detrazioni Disciplina = (Gialli × 0.25) + (Rossi × 1.50); Bonus Minuti = (Minuti / 450) × 0.50; Punteggio compreso tra 1.0 e 10.0.',
    footballContext:
      'Uno stato di forma eccellente (Indice > 8.0) si riflette in grande fiducia al tiro, maggiori passaggi chiave e titolarità fissa.',
    faqs: [
      {
        question: 'Perché si analizza un campione di 5 partite?',
        answer:
          'Un blocco di 5 gare (circa 450 minuti) è il punto di riferimento statistico per cogliere il trend senza farsi ingannare da una singola partita anomala.',
      },
      {
        question: 'Quanto pesa un’espulsione con cartellino rosso?',
        answer:
          'Un cartellino rosso toglie 1.5 punti all’indice per via del grave danno tattico e del momento negativo causato alla squadra.',
      },
      {
        question: 'Giocare tutti i 90 minuti aumenta il voto finale?',
        answer:
          'Sì. Il bonus continuità premia con fino a +0.50 punti i titolari che disputano i 450 minuti completi dell’arco temporale.',
      },
    ],
    labels: {
      goalsLast5: 'Gol nelle Ultime 5 Partite',
      assistsLast5: 'Assist nelle Ultime 5 Partite',
      avgRatingLast5: 'Media Voto (Ultime 5)',
      yellowCardsLast5: 'Ammonizioni (Ultime 5)',
      redCardsLast5: 'Espulsioni (Ultime 5)',
      minutesPlayedLast5: 'Minuti Giocati (Ultime 5)',
      formScore: 'Indice di Forma (5 Gare)',
      status: 'Stato Attuale di Forma',
      resetData: 'Reimposta Dati Forma',
    },
  },

  'transfer-value-estimator': {
    name: 'Stimatore di Valore di Mercato e Cartellino',
    tagline: 'Stima la quotazione di mercato con curva d’età, campionato e contratto',
    description:
      'Calcola la stima del valore di mercato (€M) considerando ruolo, curva dell’età, gol/assist, coefficiente del campionato, scadenza contrattuale e presenze in Nazionale.',
    formulaSummary: 'Valore = Base × MultEtà × MultRend × MultLega × MultContratto + BonusNazionale',
    intro:
      'Lo Stimatore di Valore di Mercato calcola il prezzo del cartellino in milioni di euro (€M). Valutando curva dell’età, ruolo, statistiche realizzative, livello del campionato, durata del contratto e presenze in Nazionale, elabora una stima obiettiva.',
    metricExplanation:
      'Nel calciomercato odierno la durata del contratto e l’età contano quanto i gol segnati. Un talento di 22 anni con 4 anni di contratto vale enormemente di più di un trentunenne in scadenza tra 12 mesi.',
    interpretation:
      'Oltre 100M€ corrisponde a Top Player Mondiali; 50–99M€ Titolari da Champions League; 20–49M€ Giocatori Affermati di Serie A.',
    methodology:
      'Valore base per ruolo. Moltiplicatori: Curva Età (picco a 23–26 anni), Rendimento (gol/assist), Coefficiente Campionato (Premier League 1.6x, Serie A/LaLiga/Bundesliga 1.3x), Fattore Contratto (4+ anni 1.3x; 1 anno 0.6x) e Bonus Presenze in Nazionale (0.2M€ a presenza).',
    footballContext:
      'Attaccanti ed esterni offensivi capaci di saltare l’uomo raggiungono le quotazioni più alte nel calciomercato globale.',
    faqs: [
      {
        question: 'Perché la scadenza contrattuale incide così tanto sulla valutazione?',
        answer:
          'Negli ultimi 12 mesi di contratto il club proprietario perde forza contrattuale a causa del rischio di svincolo a parametro zero (Sentenza Bosman), subendo sconti del 40–50%.',
      },
      {
        question: 'A che età il valore di un calciatore raggiunge il picco?',
        answer:
          'Statistiche alla mano il picco si colloca tra i 23 e i 26 anni, dove si uniscono maturità atletica e valore di rivendita futura.',
      },
      {
        question: 'I bonus di rendimento sono inclusi nella stima?',
        answer:
          'Il calcolo stima la quota fissa garantita del trasferimento. I bonus legati agli obiettivi aggiungono solitamente un 15–25% in più.',
      },
    ],
    labels: {
      position: 'Ruolo',
      age: 'Età del Giocatore',
      goalsThisSeason: 'Gol in Questa Stagione',
      assistsThisSeason: 'Assist in Questa Stagione',
      leagueTier: 'Livello del Campionato',
      contractRemaining: 'Anni di Contratto Residui',
      internationalCaps: 'Presenze in Nazionale Maggiore',
      estimatedValue: 'Valore di Mercato Stimato',
      valuationTier: 'Fascia di Quotazione',
      ageMultiplier: 'Moltiplicatore Curva Età',
      leagueMultiplier: 'Moltiplicatore Campionato',
      resetData: 'Reimposta Modello',
    },
  },

  'wage-calculator': {
    name: 'Calcolatore di Stipendio e Struttura Contrattuale',
    tagline: 'Calcola stipendio annuo lordo, stipendio settimanale effettivo e premi rendimento',
    description:
      'Modella l’intero pacchetto retributivo: stipendio base settimanale (52 settimane), premi presenza, bonus gol e incentivi porta inviolata in £, € o $.',
    formulaSummary: 'Guadagno Annuo = (Base Settimanale × 52) + (Presenze × Premio Presenza) + (Gol × Premio Gol) + (Clean Sheet × Premio CS)',
    intro:
      'Il Calcolatore di Stipendi modella i contratti dei calciatori combinando lo stipendio base settimanale garantito con premi variabili per presenze disputate, gol segnati e partite a porta inviolata.',
    metricExplanation:
      'I contratti moderni bilanciano stipendio fisso e incentivi di rendimento. Questo strumento visualizza l’esatta proporzione tra retribuzione fissa e bonus variabili.',
    interpretation:
      'Indica i guadagni lordi annui complessivi, lo stipendio settimanale effettivo riparametrato su 52 settimane e la suddivisione percentuale dei componenti salariali.',
    methodology:
      'Stipendio Base Annuo = Stipendio Settimanale × 52; Premi Presenza = Premio × Partite; Premi Gol = Premio × Gol; Premi Clean Sheet = Premio × Clean Sheet; Guadagni Totali = Base + Premi; Stipendio Settimanale Effettivo = Guadagni Totali / 52.',
    footballContext:
      'I grandi club europei destinano tra il 55% e il 70% dei propri ricavi alla massa salariale. I contratti a rendimento proteggono i club premiando le prestazioni.',
    faqs: [
      {
        question: 'Come viene calcolato lo stipendio settimanale effettivo?',
        answer:
          'Divide i guadagni complessivi annui lordi (stipendio base garantito + totale premi maturati) per 52 settimane.',
      },
      {
        question: 'Perché i premi presenza e i bonus gol sono separati?',
        answer:
          'La struttura contrattuale differenzia clausole mirate per titolari fissi, attaccanti e specialisti difensivi.',
      },
      {
        question: 'Qual è l’incidenza tipica dei bonus nel calcio professionistico?',
        answer:
          'Nei massimi campionati europei lo stipendio base garantito rappresenta il 75%–85% della retribuzione totale, mentre i bonus coprono il restante 15%–25%.',
      },
    ],
    labels: {
      currency: 'Valuta',
      baseWeeklyWage: 'Stipendio Settimanale Base',
      appearanceFee: 'Premio Presenza a Partita',
      matchesPlayed: 'Partite Giocate in Stagione',
      goalBonus: 'Premio a Singolo Gol',
      goalsScored: 'Gol Segnati',
      cleanSheetBonus: 'Premio Porta Inviolata',
      cleanSheetsKept: 'Partite a Porta Inviolata',
      totalAnnualEarnings: 'Guadagni Totali Annui',
      effectiveWeeklyWage: 'Stipendio Settimanale Effettivo',
      baseAnnualSalary: 'Stipendio Base Annuo',
      totalPerformanceBonuses: 'Totale Premi di Rendimento',
      resetData: 'Reimposta Modello Salariale',
    },
  },

  'squad-value-calculator': {
    name: 'Calcolatore di Valore e Profondità della Rosa',
    tagline: 'Somma il valore complessivo dell’organico, ripartizione per reparto ed equilibrio',
    description:
      'Calcola il valore di mercato totale della rosa, la quotazione media per giocatore e il riparto per reparto (Portieri, Difensori, Centrocampisti, Attaccanti).',
    formulaSummary: 'Valore Totale = Σ(Valore Giocatori) | Indice di Equilibrio della Rosa',
    intro:
      'Il Calcolatore di Valore della Rosa analizza il patrimonio tecnico di una squadra, la quotazione media dei singoli e la distribuzione degli investimenti tra portieri, difensori, centrocampisti e attaccanti.',
    metricExplanation:
      'Una rosa con 500M€ in attacco ma solo 40M€ in difesa presenta un evidente squilibrio strutturale. Questo strumento verifica l’armonia degli investimenti.',
    interpretation:
      'Una rosa europea bilanciata ripartisce circa l’8–12% sui Portieri, il 28–35% sui Difensori, il 28–35% sui Centrocampisti e il 30–40% sugli Attaccanti.',
    methodology:
      'Valore Totale = Somma dei singoli valori; Quota % per Reparto = (Valore Reparto / Valore Totale) × 100.',
    footballContext:
      'Le rose che vincono la Champions League o la Serie A presentano valori totali compresi tra 800M€ e oltre 1,2 miliardi di euro.',
    faqs: [
      {
        question: 'Qual è la distribuzione ideale del valore per reparti?',
        answer:
          'Circa 10% in porta, 30% in difesa, 30% a centrocampo e 30% in attacco per evitare falle tattiche.',
      },
      {
        question: 'Quanti giocatori compongono una prima squadra professionistica?',
        answer:
          'Una rosa standard conta 22–25 elementi (due per ruolo più 3 alternative polivalenti).',
      },
      {
        question: 'Avere la rosa dal valore più alto garantisce la vittoria dello scudetto?',
        answer:
          'Su un campionato lungo di 38 giornate la correlazione è altissima (r > 0.85), sebbene nelle coppe a eliminazione diretta contino molto gli episodi.',
      },
    ],
    labels: {
      addPlayer: 'Aggiungi Giocatore alla Rosa',
      playerName: 'Nome del Giocatore',
      position: 'Ruolo',
      marketValue: 'Valore di Mercato (€M)',
      totalSquadValue: 'Valore Complessivo Rosa',
      avgPlayerValue: 'Valore Medio per Giocatore',
      squadSize: 'Numero di Giocatori',
      positionBreakdown: 'Distribuzione per Reparto',
      resetSquad: 'Reimposta Rosa',
    },
  },

  'contract-worth-analyzer': {
    name: 'Analizzatore Contratti e Ammortamento FFP',
    tagline: 'Calcola l’ammortamento a bilancio annuale e l’impegno finanziario complessivo',
    description:
      'Calcola la quota di ammortamento annuale del cartellino, l’impegno salariale totale e l’impatto annuale a bilancio ai fini del Fair Play Finanziario (FFP).',
    formulaSummary: 'Ammortamento Annuo = Cartellino / Anni Contratto | Costo Totale = Cartellino + (Stipendio × 52 × Anni)',
    intro:
      'L’Analizzatore di Contratti e Ammortamento stima il reale peso a bilancio di un nuovo acquisto. Analizzando l’ammortamento a quote costanti del cartellino, gli stipendi cumulati e le commissioni, calcola l’impatto annuale sul conto economico ai fini FFP.',
    metricExplanation:
      'I costi dei cartellini non vengono iscritti a bilancio in un’unica soluzione, ma sono ammortizzati lungo la durata del contratto (entro il tetto massimo di 5 anni fissato dalla UEFA). Un acquisto da 100M€ su 5 anni pesa per 20M€/anno di ammortamento oltre all’ingaggio lordo.',
    interpretation:
      'Il Peso Annuo a Bilancio è il dato cardine per i direttori sportivi: 18M€ di ammortamento più 12M€ di stipendio gravano per 30M€/anno sul conto economico.',
    methodology:
      'Ammortamento Annuo = Cartellino / Durata (max 5 anni UEFA); Costo Stipendio Annuo = Settimanale × 52; Costo Complessivo = Cartellino + (Stipendio Annuo × Anni) + Bonus Firma + Commissioni; Impatto Annuo = Ammortamento + Stipendio Annuo.',
    footballContext:
      'I regolamenti di controllo economico di UEFA e FIGC sanzionano gli sforamenti con multe, penalizzazioni in classifica e blocchi del mercato.',
    faqs: [
      {
        question: 'Cos’è l’ammortamento di un cartellino nel calcio?',
        answer:
          'È la suddivisione del costo d’acquisto dei diritti sportivi del calciatore in parti uguali su ciascun anno di contratto (es. 80M€ su 5 anni = 16M€/anno).',
      },
      {
        question: 'Perché la UEFA ha posto un limite massimo di 5 anni all’ammortamento?',
        answer:
          'Nel 2023 la UEFA ha chiuso la scappatoia dei contratti di 8 o 9 anni usati per abbassare artificialmente la quota di ammortamento annuale.',
      },
      {
        question: 'Cosa accade se il giocatore viene ceduto prima della scadenza?',
        answer:
          'Il valore residuo non ammortizzato viene sottratto dalla cifra di vendita per determinare la plusvalenza o minusvalenza contabile immediata.',
      },
    ],
    labels: {
      transferFee: 'Costo del Cartellino (€M)',
      contractYears: 'Durata del Contratto (Anni)',
      weeklyWage: 'Stipendio Settimanale Base',
      signingBonus: 'Bonus alla Firma (€M)',
      agentFee: 'Commissione Agente / Intermediario (€M)',
      annualAmortization: 'Ammortamento Annuo del Cartellino',
      totalCostToClub: 'Impegno Finanziario Complessivo',
      annualBudgetImpact: 'Impatto Annuo a Bilancio (FFP)',
      amortizationSchedule: 'Piano Pluriennale di Ammortamento',
      resetData: 'Reimposta Modello',
    },
  },

  'fantasy-football-points': {
    name: 'Calcolatore di Punti Fantacalcio',
    tagline: 'Stima analitica dei fantapunti per ogni ruolo',
    description:
      'Stima i fantapunti di giornata considerando gol, assist, porta inviolata, contributi difensivi (CBIT/CBIRT), parate, rigori, cartellini e minutaggio.',
    formulaSummary: 'Modello analitico Fantacalcio per ruolo (POR/DIF/CEN/ATT)',
    intro:
      'Il Calcolatore di Punti Fantacalcio fornisce una stima analitica del punteggio ottenuto da un calciatore in base alle prestazioni reali sul campo per ciascun ruolo.',
    metricExplanation:
      'Ogni ruolo ha una scala punteggi dedicata: portieri (10 pt per gol), difensori (6 pt per gol, 4 pt porta inviolata, bonus contributo difensivo da 10 CBIT), centrocampisti (5 pt per gol, bonus da 12 CBIRT) e attaccanti (4 pt per gol, bonus da 12 CBIRT).',
    interpretation:
      'Un punteggio di 12+ punti rappresenta una prestazione da doppia cifra (perfetto come capitano); 6–9 punti un ottimo rendimento; 2–4 punti voto base di presenza.',
    methodology:
      'Regole Fantacalcio: 60+ min giocati (+2), 1-59 min (+1); Gol (POR +10, DIF +6, CEN +5, ATT +4); Assist (+3); Porta inviolata (POR/DIF +4, CEN +1); Contributo difensivo (+2 se DIF >= 10 CBIT o CEN/ATT >= 12 CBIRT); Rigore parato (+5); Rigore sbagliato (-2); Parate (1 pt ogni 3 parate); Giallo (-1); Rosso (-3); Autogol (-2); Bonus BPS (+1 a +3).',
    footballContext:
      'I top player del Fantacalcio puntano a una fantamedia superiore al 6.0/6.5 lungo l’arco di tutte le 38 giornate.',
    faqs: [
      {
        question: 'I centrocampisti prendono punti per la porta inviolata?',
        answer:
          'Sì, i centrocampisti ricevono +1 punto per la porta inviolata a patto di giocare almeno 60 minuti.',
      },
      {
        question: 'Come funziona il bonus di contributo difensivo?',
        answer:
          'I difensori ricevono +2 punti raggiungendo 10 azioni CBIT (spazzate, tiri respinti, intercettazioni, contrasti). Centrocampisti e attaccanti ricevono +2 punti con 12 azioni CBIRT (inclusi recuperi palla).',
      },
      {
        question: 'Come vengono conteggiate le parate del portiere?',
        answer:
          'I portieri guadagnano +1 punto extra ogni 3 parate compiute durante la partita.',
      },
      {
        question: 'Cosa succede in caso di espulsione per doppio giallo?',
        answer:
          'Il giocatore riceve -3 punti per il cartellino rosso (che sostituisce la detrazione dei singoli gialli).',
      },
    ],
    labels: {
      position: 'Ruolo del Giocatore',
      minutesPlayed: 'Minuti Giocati',
      goalsScored: 'Gol Segnati',
      assists: 'Assist Serviti',
      cleanSheet: 'Porta Inviolata (Clean Sheet)',
      cbitActions: 'Azioni Difensive CBIT (Difensori)',
      cbirtActions: 'Azioni Difensive CBIRT (Centrocampisti / Attaccanti)',
      goalsConceded: 'Gol Subiti',
      saves: 'Parate Effettuate',
      penaltySaves: 'Rigori Parati',
      penaltyMisses: 'Rigori Sbagliati',
      yellowCards: 'Ammonizioni',
      redCards: 'Espulsioni',
      ownGoals: 'Autogol',
      bonusPoints: 'Punti Bonus (BPS)',
      totalPoints: 'Fantapunti Totali di Giornata',
      pointBreakdown: 'Dettaglio Punteggio',
      resetData: 'Reimposta Calcolatore',
    },
  },

  'best-xi-selector': {
    name: 'Ottimizzatore della Top 11 & Modulo',
    tagline: 'Schiera la migliore formazione titolare su 6 moduli in base a forma e prezzo',
    description:
      'Inserisci la tua rosa di giocatori con indici di forma e quotazioni per schierare in automatico la migliore formazione possibile (4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 3-4-3, 5-3-2).',
    formulaSummary: 'Ottimizzazione forma/prezzo con vincoli di ruolo per modulo e budget',
    intro:
      'L’Ottimizzatore della Top 11 compone la formazione titolare con il punteggio stimato più alto nel rispetto del modulo scelto e del budget prefissato.',
    metricExplanation:
      'Costruire un undici vincente richiede il giusto bilanciamento tra top player costosi ed elementi low cost ad alto rendimento.',
    interpretation:
      'Mostra la formazione titolare ottimizzata con la forma complessiva prevista e il costo totale nei limiti consentiti.',
    methodology:
      'Ottimizzazione lineare vincolata che massimizza la somma degli indici di forma rispettando le quote di ruolo del modulo e il budget.',
    footballContext:
      'Moduli a 3 punte (4-3-3, 3-4-3) massimizzano il potenziale offensivo nelle giornate con partite sulla carta agevoli.',
    faqs: [
      {
        question: 'Quale modulo offre il potenziale di punteggio più alto?',
        answer:
          'Il 3-4-3 e il 3-5-2 offrono solitamente i punteggi massimi più alti grazie al maggior numero di centrocampisti e attaccanti.',
      },
      {
        question: 'In che modo l’ottimizzatore rispetta il budget?',
        answer:
          'Calcola il rendimento per milione di spesa per identificare la combinazione più redditizia sotto il tetto massimo.',
      },
      {
        question: 'Posso modificare i nomi e le valutazioni dei calciatori?',
        answer:
          'Sì, puoi modificare nomi, costi, ruoli e indici di forma direttamente nella tabella sottostante.',
      },
    ],
    labels: {
      formation: 'Seleziona Modulo Tattico',
      budgetLimit: 'Limite di Budget (£M / €M)',
      playerPool: 'Rosa dei Giocatori Disponibili',
      addPlayer: 'Aggiungi Giocatore alla Rosa',
      optimalXi: 'Top 11 Ottimizzata',
      projectedTotalForm: 'Indice di Forma Totale Stimato',
      totalCost: 'Costo Complessivo Schieramento',
      resetPool: 'Reimposta Rosa',
    },
  },

  'captain-pick-analyzer': {
    name: 'Analizzatore Scelta del Capitano',
    tagline: 'Confronto algoritmico per la fascia da capitano secondo forma, calendario e precedenti',
    description:
      'Confronta i candidati alla fascia con un algoritmo ponderato: stato di forma (30%), calendario avversario (25%), fattore campo (15%), precedenti storici (15%) e forza offensiva di squadra (15%).',
    formulaSummary: 'Punteggio Capitano = (Forma × 30%) + (Calendario × 25%) + (Casa × 15%) + (Precedenti × 15%) + (Attacco Squadra × 15%)',
    intro:
      'L’Analizzatore della Scelta del Capitano valuta i candidati alla fascia tramite un modello che integra forma recente (30%), coefficiente del calendario (25%), fattore casa (15%), precedenti storici (15%) e pericolosità offensiva di squadra (15%) per calcolare il Punteggio Capitano StatKick (0–100).',
    metricExplanation:
      'La fascia da capitano raddoppia i punti conquistati ed è la scelta con il peso più determinante in ogni giornata di Fantacalcio.',
    interpretation:
      'Un Punteggio >80 indica un Capitano Assoluto; 65–79 un’Ottima Scelta; 50–64 una Scelta Differenziale Rischiosa; sotto 50 Sconsigliato.',
    methodology:
      'Punteggio Capitano StatKick = (Forma × 10 × 0.30) + ((6 - FDR) / 5 × 100 × 0.25) + (Casa=100/Trasferta=50 × 0.15) + (Rendimento Storico × 0.15) + (Attacco Squadra × 0.15).',
    footballContext:
      'I fantallenatori più vincenti scelgono il capitano tra i giocatori che giocano in casa contro squadre della parte bassa della classifica in oltre il 70% dei casi.',
    faqs: [
      {
        question: 'Perché il fattore campo pesa per il 15%?',
        answer:
          'Le formazioni di casa segnano storicamente il 20–30% di gol in più e producono più xG, aumentando la probabilità di grandi punteggi.',
      },
      {
        question: 'Che cos’è il rating FDR (Fixture Difficulty Rating)?',
        answer:
          'È una scala da 1 (avversario facilissimo in casa) a 5 (trasferta sul campo della capolista).',
      },
      {
        question: 'Quando conviene scegliere un capitano differenziale?',
        answer:
          'Per recuperare punti di distacco nelle ultime giornate, puntare su un capitano differenziale ad alto indice offre una leva decisiva.',
      },
    ],
    labels: {
      candidateA: 'Candidato A',
      candidateB: 'Candidato B',
      candidateC: 'Candidato C (Opzionale)',
      playerName: 'Nome del Giocatore',
      currentForm: 'Forma Attuale (1–10)',
      fdr: 'Difficoltà Partita (FDR 1-5)',
      venue: 'Sede della Partita',
      home: 'Partita in Casa',
      away: 'Partita in Trasferta',
      historyReturn: 'Rendimento Storico vs Avversario',
      captaincyVerdict: 'Raccomandazione Capitano',
      captainIndex: 'Punteggio Capitano StatKick',
      resetData: 'Reimposta Candidati',
    },
  },

  'transfer-suggestion': {
    name: 'Motore di Strategia di Mercato Fantasy',
    tagline: 'Confronta cessioni e acquisti per massimizzare il guadagno netto di punti',
    description:
      'Analizza un’operazione di scambio o mercato valutando il differenziale di forma, il calendario delle prossime 3 gare, l’impatto sul budget e i punti attesi.',
    formulaSummary: 'Valore Scambio = (FormaEntrante - FormaUscente) + (FDRUscente - FDREntrante) × 1.2 + EfficienzaBudget',
    intro:
      'Il Motore di Strategia di Mercato valuta le operazioni di compravendita analizzando trend di rendimento, calendario delle prossime 3 giornate e liquidità residua.',
    metricExplanation:
      'Comprare un giocatore solo per i punti fatti nella giornata precedente porta a delusioni. Questo modello guarda al calendario futuro per verificare se la mossa conviene davvero.',
    interpretation:
      'Un valore superiore a +3.0 indica Scambio Altamente Consigliato; +1.0 a +2.9 Buon Acquisto; valori negativi sconsigliano l’operazione.',
    methodology:
      'Indice = (Forma Entrante - Forma Uscente) × 1.2 + (FDR 3 Gare Uscente - FDR Entrante) × 1.5 + Fattore Efficienza Budget.',
    footballContext:
      'Acquistare calciatori prima di una serie di 4+ partite abbordabili contro difese fragili è la strategia più redditizia.',
    faqs: [
      {
        question: 'Vale la pena fare cambi extra con penalizzazione?',
        answer:
          'Solo se il nuovo arrivato vanta un indice >+3.5 e ci si aspetta porti almeno 5 punti in più nelle 3 gare successive.',
      },
      {
        question: 'Perché si guarda a un orizzonte di 3 partite?',
        answer:
          'Una singola giornata è soggetta a troppi imprevisti; ragionare su 3-5 gare valorizza ogni cambio di mercato.',
      },
      {
        question: 'In che modo viene conteggiato il credito rimasto in cassa?',
        answer:
          'Il motore premia la liquidità liberata per rinforzare altri ruoli scoperti della rosa.',
      },
    ],
    labels: {
      transferOut: 'Calciatore da Cedere (Uscente)',
      transferIn: 'Calciatore da Acquistare (Entrante)',
      playerNameOut: 'Nome Giocatore (Uscente)',
      sellingPrice: 'Prezzo di Cessione (£M)',
      formOut: 'Indice di Forma (1–10)',
      fdrOut: 'FDR Prossime 3 (Media)',
      playerNameIn: 'Nome Giocatore (Entrante)',
      purchasePrice: 'Prezzo d’Acquisto (£M)',
      formIn: 'Indice di Forma (1–10)',
      fdrIn: 'FDR Prossime 3 (Media)',
      bankMoney: 'Crediti Rimasti in Cassa (£M)',
      transferVerdict: 'Valutazione dell’Operazione',
      netGainScore: 'Punteggio di Vantaggio Netto',
      budgetImpact: 'Credito Finale Residuo',
      resetData: 'Reimposta Valutazione',
    },
  },

  'league-table-simulator': {
    name: 'Simulatore di Classifica e Punti Campionato',
    tagline: 'Simula le partite rimanenti per proiettare scudetto, coppe europee e salvezza',
    description:
      'Inserisci punti attuali, gare rimanenti e pronostici di vittorie/pareggi/sconfitte per calcolare punteggi finali, corsa scudetto e lotta per non retrocedere.',
    formulaSummary: 'Punti Finali = Punti Attuali + (Vittorie × 3) + (Pareggi × 1)',
    intro:
      'Il Simulatore di Classifica proietta la graduatoria finale della stagione, la vincitrice dello scudetto, le qualificate alle coppe europee (Champions League, Europa League) e le quote salvezza.',
    metricExplanation:
      'La corsa scudetto e la lotta salvezza si decidono nel calendario residuo. Questo strumento permette di testare tutti gli scenari matematici per ogni squadra.',
    interpretation:
      'Mostra la classifica finale stimata con la squadra campione, le qualificate all’Europa e le retrocesse.',
    methodology:
      'Punti Stimati = Punti Attuali + (Vittorie × 3) + (Pareggi × 1). In caso di parità a punti, la differenza reti stimata stabilisce l’ordine.',
    footballContext:
      'In una stagione di Serie A da 38 partite, 88–92 punti garantiscono lo scudetto, 70–74 assicurano la Champions League e 36–38 punti rappresentano la classica quota salvezza.',
    faqs: [
      {
        question: 'Quanti punti servono storicamente per vincere lo scudetto?',
        answer:
          'Nei principali campionati europei, le squadre campioni viaggiano a una media di circa 89 punti nell’ultimo decennio.',
      },
      {
        question: 'La quota 40 punti per salvarsi è ancora valida?',
        answer:
          'Benché 40 punti sia il riferimento storico, in 8 delle ultime 10 stagioni sono bastati tra 35 e 37 punti per restare in massima serie.',
      },
      {
        question: 'Come si risolvono le parità di punteggio nella simulazione?',
        answer:
          'La differenza reti generale funge da criterio principale di spareggio nella simulazione.',
      },
    ],
    labels: {
      teamName: 'Nome della Squadra',
      currentPoints: 'Punti Attuali',
      gamesRemaining: 'Partite Rimanenti',
      projWins: 'Vittorie Previste',
      projDraws: 'Pareggi Previsti',
      projLosses: 'Sconfitte Previste',
      projectedPoints: 'Punti Finali Previsti',
      champions: 'Campione Simulato',
      uclZone: 'Zona Champions League',
      relegationZone: 'Zona Retrocessione',
      simulateTable: 'Simula Classifica',
      resetTable: 'Reimposta Classifica',
    },
  },

  'points-needed-calculator': {
    name: 'Calcolatore di Punti Necessari',
    tagline: 'Calcola le vittorie e i pareggi indispensabili per scudetto, Champions o salvezza',
    description:
      'Determina le combinazioni matematiche di vittorie e pareggi nelle gare rimaste per raggiungere gli obiettivi stagionali (Scudetto, Champions League, Salvezza).',
    formulaSummary: 'Distacco = Punti Obiettivo - Punti Attuali | Percentuale di Vittoria Richiesta',
    intro:
      'Il Calcolatore di Punti Necessari calcola tutte le combinazioni di vittorie, pareggi e sconfitte tollerabili nelle giornate rimanenti per centrare gli obiettivi prefissati.',
    metricExplanation:
      'Sapere che mancano 14 punti in 7 partite è generico. Questo calcolatore dettaglia le combinazioni esatte di risultati (es. 4 vittorie, 2 pareggi, 1 sconfitta) e la percentuale di successo richiesta.',
    interpretation:
      'Indica la fattibilità dell’obiettivo (Raggiungibile, Difficile, Matematicamente Impossibile) ed elenca tutte le combinazioni valide.',
    methodology:
      'Punti Mancanti = Obiettivo - Attuali; Punti Massimi in Palio = Gare Rimanenti × 3; Genera tutte le combinazioni (V, P) in cui (V×3 + P×1) >= Punti Mancanti.',
    footballContext:
      'Dover vincere oltre il 75% delle ultime 8 partite è un’impresa quasi impossibile senza passi falsi continui delle dirette rivali.',
    faqs: [
      {
        question: 'Cosa accade se i punti necessari superano quelli disponibili?',
        answer:
          'L’obiettivo viene subito etichettato come "Matematicamente Impossibile", evidenziando il deficit di punti.',
      },
      {
        question: 'Qual è una percentuale di vittoria sostenibile nel finale di stagione?',
        answer:
          'Una percentuale richiesta sotto il 50% è ampiamente alla portata delle squadre di metà-alta classifica; superare il 70% richiede un passo da scudetto.',
      },
      {
        question: 'È possibile impostare un punteggio personalizzato?',
        answer:
          'Sì, puoi scegliere tra i traguardi tipici (Scudetto = 88 pt, Champions = 72 pt, Salvezza = 38 pt) o inserire una quota a piacere.',
      },
    ],
    labels: {
      targetGoal: 'Obiettivo Stagionale',
      customTarget: 'Quota Punti Desiderata',
      currentPoints: 'Punti Attuali',
      matchesRemaining: 'Partite Rimanenti',
      pointsNeeded: 'Punti Necessari',
      maxAvailable: 'Punti Massimi Disponibili',
      requiredWinRate: 'Percentuale di Vittoria Richiesta %',
      targetStatus: 'Fattibilità dell’Obiettivo',
      viableCombinations: 'Combinazioni Valide (V / P)',
      resetData: 'Reimposta Calcolatore',
    },
  },

  'head-to-head-stats': {
    name: 'Matrice Storica Scontri Diretti (H2H)',
    tagline: 'Bilancio storico dei precedenti, vittorie, gol e supremazia tra due squadre',
    description:
      'Esamina i precedenti storici tra due club di calcio: percentuali di vittoria, pareggi, media gol segnati e differenza reti.',
    formulaSummary: 'Vittoria % = (Vittorie / Partite) × 100 | Differenza Reti per Gara',
    intro:
      'La Matrice Storica Scontri Diretti analizza le sfide tra due club nel corso della loro storia. Calcola percentuali di vittoria, pareggi e media realizzativa per misurare l’ascendente psicologico.',
    metricExplanation:
      'Gli scontri diretti rivelano le classiche bestie nere e i vantaggi tattici che la classifica attuale non sempre riesce a spiegare.',
    interpretation:
      'Una percentuale di vittorie >55% testimonia netta supremazia storica; 40–54% grande equilibrio; pareggi frequenti (>35%) gare molto bloccate.',
    methodology:
      'Vittoria % = (Vittorie / Gare) × 100; Pareggio % = (Pareggi / Gare) × 100; Gol a Partita = Gol Totali / Gare.',
    footballContext:
      'I grandi derby (Derby d’Italia, Derby di Milano, Derby di Roma) sfuggono spesso alle logiche della classifica per l’alta carica emotiva in campo.',
    faqs: [
      {
        question: 'Perché i precedenti diretti a volte contraddicono la classifica?',
        answer:
          'Alcuni assetti tattici (ad esempio un blocco basso molto stretto contro squadre di possesso) mettono storicamente in difficoltà determinati avversari.',
      },
      {
        question: 'Quanti gol si segnano in media nei grandi derby europei?',
        answer:
          'I grandi derby europei viaggiano su medie tra 2.7 e 3.1 gol a partita, con la squadra di casa vincente circa il 44% delle volte.',
      },
      {
        question: 'Quante partite servono per un campione statisticamente valido?',
        answer:
          'Un campione di 6–12 partite recenti riflette l’era tattica moderna garantendo al contempo solidità statistica.',
      },
    ],
    labels: {
      teamAName: 'Nome Squadra A',
      teamBName: 'Nome Squadra B',
      totalMatches: 'Partite Totali Disputate',
      teamAWins: 'Vittorie Squadra A',
      teamBWins: 'Vittorie Squadra B',
      draws: 'Pareggi',
      teamAGoals: 'Gol Segnati Squadra A',
      teamBGoals: 'Gol Segnati Squadra B',
      h2hSummary: 'Riepilogo Storico della Rivalità',
      winPercentage: 'Percentuale di Vittoria',
      avgGoalsPerMatch: 'Gol Medi / Partita',
      goalDifference: 'Differenza Reti',
      resetData: 'Reimposta Dati',
    },
  },

  'season-goals-tracker': {
    name: 'Monitoraggio e Proiezione Gol Stagionali',
    tagline: 'Segui la media realizzativa e proietta il bottino finale di gol e classifica marcatori',
    description:
      'Monitora la media gol a partita, i minuti per gol e proietta il computo finale di reti lungo l’intero campionato di 38 giornate.',
    formulaSummary: 'Gol a Partita = Gol / Gare | Proiezione = Gol a Partita × Gare Totali',
    intro:
      'Il Monitoraggio e Proiezione Gol segue la marcia dei bomber o delle squadre, calcola la frequenza di minuti per gol e proietta la quota finale per la classifica marcatori e la Scarpa d’Oro.',
    metricExplanation:
      'Un attaccante con 10 gol in 12 gare viaggia su una proiezione di 31 gol a fine campionato. L’analisi della frequenza di reti ogni 90 minuti individua in anticipo le annate da record.',
    interpretation:
      'Proiettare 30+ gol è da Scarpa d’Oro; 20–29 gol Fuoriclasse Mondiale; 12–19 gol Titolare Affidabile; sotto 10 gol Elemento di Supporto.',
    methodology:
      'Gol a Partita = Gol / Gare Giocate; Minuti per Gol = Minuti Totali / Gol; Proiezione = Gol a Partita × Gare Totali della Stagione (38 di default).',
    footballContext:
      'Conquistare la classifica marcatori o la Scarpa d’Oro richiede abitualmente tra 30 e 36 gol in 38 partite (media di 0.80–0.95 gol a gara).',
    faqs: [
      {
        question: 'Da quale giornata le proiezioni gol diventano attendibili?',
        answer:
          'Le proiezioni si stabilizzano dopo circa 10–12 giornate (circa 900 minuti giocati), riducendo l’effetto delle fiammate iniziali.',
      },
      {
        question: 'Qual è un rapporto minuti per gol di livello mondiale?',
        answer:
          'Scendere sotto i 110 minuti a gol è eccellente. I migliori goleador al mondo (Haaland, Kane, Lewandowski) scendono frequentemente sotto gli 85 min/gol.',
      },
      {
        question: 'Supporta campionati a 34 partite come la Bundesliga?',
        answer:
          'Sì, puoi modificare il campo Gare Totali della Stagione impostando 34 o qualsiasi altro numero di partite.',
      },
    ],
    labels: {
      matchesPlayed: 'Partite Giocate in Campionato',
      goalsScored: 'Gol Segnati',
      minutesPlayed: 'Minuti Giocati Complessivi',
      totalSeasonMatches: 'Partite Totali nel Campionato',
      projectedGoals: 'Gol Proiettati a Fine Stagione',
      goalsPerGame: 'Gol / Partita',
      minsPerGoal: 'Minuti / Gol',
      paceTier: 'Ritmo e Fascia Realizzativa',
      resetData: 'Reimposta Monitoraggio',
    },
  },

  'formation-analyzer': {
    name: 'Analizzatore Tattico dei Moduli',
    tagline: 'Valuta punti di forza, debolezze e contromisure tra sistemi tattici',
    description:
      'Analizza i moduli di gioco (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) per verificare controllo del centrocampo, compattezza, spinta sulle corsie e pressing.',
    formulaSummary: 'Matrice di Equilibrio Tattico: Valutazioni su Centrocampo, Difesa, Fasce e Pressing',
    intro:
      'L’Analizzatore Tattico esamina i principali moduli di gioco (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) su quattro pilastri fondamentali: Controllo della Mediana, Compattezza Difensiva, Pericolosità sulle Fasce e Capacità di Pressing Alto.',
    metricExplanation:
      'I sistemi di gioco creano triangoli di passaggio, superiorità numeriche e coperture preventive. Scegliere il contromodulo idoneo neutralizza i punti di forza avversari.',
    interpretation:
      'Voti su scala da 1 a 10 misurano l’equilibrio per zona. Ad esempio, il 4-3-3 garantisce grandissima spinta sugli esterni (9/10) e pressing alto (9/10), ma richiede grande ripiegamento delle ali.',
    methodology:
      'Matrice tattica che valuta l’occupazione degli spazi rispetto ai parametri di densità centrale, ampiezza difensiva e innesco del pressing.',
    footballContext:
      'Gli allenatori moderni alternano spesso schieramento in fase di non possesso e possesso (es. 4-4-2 difensivo che diventa 3-2-4-1 in costruzione).',
    faqs: [
      {
        question: 'Quale modulo garantisce il maggior controllo al centro del campo?',
        answer:
          'I moduli con tre centrocampisti centrali (4-3-3, 4-2-3-1, 3-5-2) creano una naturale superiorità numerica contro le mediane a due.',
      },
      {
        question: 'Come neutralizzano il 4-3-3 le difese a 3 centrali?',
        answer:
          'Il 3-5-2 accoppia i quinti di centrocampo con le ali avversarie e mantiene 3 difensori centrali sulla punta solitaria, blindando il centro.',
      },
      {
        question: 'Qual è il punto debole del classico 4-4-2 in linea?',
        answer:
          'Può trovarsi in inferiorità 2 contro 3 in mezzo al campo e soffre i trequartisti che agiscono tra le linee.',
      },
    ],
    labels: {
      selectFormation: 'Seleziona Modulo Tattico',
      formationOverview: 'Profilo Tattico del Modulo',
      midfieldControl: 'Controllo del Centrocampo',
      defensiveCompactness: 'Compattezza e Blocco Difensivo',
      wideThreat: 'Spinta sulle Fasce',
      pressingCapability: 'Efficacia del Pressing Alto',
      strengths: 'Punti di Forza del Sistema',
      weaknesses: 'Vulnerabilità Tattiche',
      counterFormations: 'Contromoduli Consigliati',
      resetData: 'Reimposta Vista Tattica',
    },
  },

  'pressing-intensity-calculator': {
    name: 'Calcolatore di Intensità del Pressing (PPDA)',
    tagline: 'Misura i Passaggi Concessi per Azione Difensiva per valutare l’altezza del blocco',
    description:
      'Calcola il valore di PPDA (Passes Allowed Per Defensive Action) per misurare l’aggressività senza palla e inquadrare lo stile difensivo, dal Gegenpressing al blocco basso.',
    formulaSummary: 'PPDA = Passaggi Avversari nel 60% d’Attacco / (Contrasti + Intercettazioni + Falli in Zona)',
    intro:
      'Il Calcolatore di Intensità del Pressing (PPDA) calcola i Passaggi Concessi per Azione Difensiva nel 60% offensivo del campo. Parametro standard nel calcio moderno, il PPDA distingue il pressing asfissiante dall’attesa in blocco basso.',
    metricExplanation:
      'Un valore basso di PPDA (<9.0) indica che l’avversario compie pochissimi passaggi prima di subire un contrasto o un anticipo, segnale di un pressing feroce. Un valore alto (>16.0) descrive una squadra rintanata.',
    interpretation:
      'PPDA < 8.5 : Gegenpressing Ultra-Aggressivo (stile Klopp/Guardiola); 8.5–11.5 : Pressing Alto Attivo; 11.6–15.5 : Blocco Medio; >15.5 : Blocco Basso Passivo.',
    methodology:
      'PPDA = Passaggi Avversari nel 60% d’Attacco / (Contrasti in Zona + Intercettazioni + Duelli/Falli); Indice Pericolo da Recupero = (Recuperi Alti × 1.5) + (Tiri da Recupero × 2.0).',
    footballContext:
      'Le migliori formazioni europee per intensità di pressing (Manchester City, Bayern Monaco, Arsenal) mantengono costantemente un PPDA compreso tra 7.5 e 9.5.',
    faqs: [
      {
        question: 'Perché un valore di PPDA più basso significa più pressing?',
        answer:
          'Il PPDA misura i passaggi avversari concessi prima di intervenire. Meno passaggi concessi = intervento più rapido e pressing più aggressivo.',
      },
      {
        question: 'Quale zona del campo viene considerata nel calcolo?',
        answer:
          'Il 60% più avanzato del terreno di gioco (metà campo avversaria e zona centrale), escludendo le azioni difensive nella propria trequarti.',
      },
      {
        question: 'Un PPDA basso è sempre preferibile a uno alto?',
        answer:
          'Non necessariamente. Le squadre da contropiede utilizzano volontariamente un blocco medio con PPDA più alto per attirare l’avversario e attaccare lo spazio alle spalle.',
      },
    ],
    labels: {
      opponentPasses: 'Passaggi Avversari in Zona d’Impostazione',
      tacklesInZone: 'Contrasti in Zona di Pressing',
      interceptionsInZone: 'Intercettazioni nella Zona',
      challengesInZone: 'Duelli / Falli nella Zona',
      highTurnovers: 'Recuperi Alti (<40m dalla porta)',
      shotsFromTurnovers: 'Tiri nati da Recupero Alto',
      calculatedPpda: 'Valore PPDA Calcolato',
      defensiveStyle: 'Stile di Pressing Difensivo',
      turnoverDanger: 'Pericolo da Palla Recuperata',
      resetData: 'Reimposta Modello PPDA',
    },
  },

  'set-piece-success-rate': {
    name: 'Tasso di Successo e Pericolo su Palle Inattive',
    tagline: 'Valuta efficacia e indice di pericolosità su corner, punizioni dirette, indirette e rigori',
    description:
      'Analizza la trasformazione su calci d’angolo, punizioni dirette, punizioni indirette e rigori per elaborare un Indice di Pericolosità su Palla Inattiva per squadre e specialisti.',
    formulaSummary: 'Punteggio di Pericolosità = (Gol Corner% × 5) + (Tiri Corner% × 0.4) + (Precisione PD% × 0.2) + (Gol PD% × 1.5) + (Gol PI% × 2.0) + (Rigori% × 0.2)',
    intro:
      'Il Calcolatore di Palle Inattive misura l’efficacia su calci d’angolo, punizioni dirette, punizioni indirette e rigori per elaborare un Indice di Pericolosità (0–100) per squadre e tiratori specialisti.',
    metricExplanation:
      'Le palle inattive fruttano dal 25% al 35% di tutti i gol nel calcio di vertice. Schemi provati in allenamento e precisione dei battitori decidono campionati ed eliminatorie.',
    interpretation:
      'Indice >75 : Pericolo Massimo / Specialisti d’Élite; 55–74 : Pericolo Alto; 35–54 : Media; sotto 35 : Bassa Pericolosità.',
    methodology:
      'Tiro da Corner % = (Tiri / Corner) × 100; Gol da Corner % = (Gol / Corner) × 100; Conversione Tiri Corner % = (Gol / Tiri) × 100; Precisione Punizione Diretta % = (Tiri in Porta / Punizioni) × 100; Gol Punizione Diretta % = (Gol / Punizioni) × 100; Gol Punizione Indiretta % = (Gol / Punizioni Indirette) × 100; Conversione Rigori % = (Segnati / Tirati) × 100; Punteggio Composito ponderato.',
    footballContext:
      'Le squadre che impiegano tattici dedicati ai calci piazzati (come l’Arsenal) superano gli 0.35 gol a partita solo da schema su palla inattiva.',
    faqs: [
      {
        question: 'Qual è una buona percentuale di tiri scaturiti da calcio d’angolo?',
        answer:
          'Riuscire a concludere verso la porta sul 28–35% dei corner calciati è un ottimo dato, con una percentuale di gol compresa tra il 3% e il 5% dei corner totali.',
      },
      {
        question: 'Qual è la media di realizzazione dei calci di rigore?',
        answer:
          'Nei massimi campionati europei la media storica dal dischetto si colloca tra il 76% e il 79%. Gli specialisti superano il 90%.',
      },
      {
        question: 'Perché i corner a rientrare verso la porta sono preferiti?',
        answer:
          'La traiettoria a rientrare piomba nel corridoio tra portiere e linea difensiva, aumentando le conclusioni di circa il 18% rispetto alle traiettorie a uscire.',
      },
    ],
    labels: {
      cornersTaken: 'Calci d’Angolo Battuti',
      shotsFromCorners: 'Tiri Nati da Corner',
      goalsFromCorners: 'Gol Segnati da Corner',
      directFkTaken: 'Punizioni Dirette Calciate',
      directFkGoals: 'Gol su Punizione Diretta',
      indirectFkTaken: 'Punizioni Indirette Scodellate',
      goalsFromIndirectFk: 'Gol su Punizione Indiretta',
      penaltiesAwarded: 'Calci di Rigore a Favore',
      penaltiesConverted: 'Rigori Trasformati',
      threatIndex: 'Indice di Pericolosità Palle Inattive',
      cornerShotRate: 'Tiro da Corner %',
      penaltyRate: 'Trasformazione Rigori %',
      threatLevel: 'Livello di Pericolo su Calcio Piazzato',
      resetData: 'Reimposta Statistiche',
    },
  },
};
