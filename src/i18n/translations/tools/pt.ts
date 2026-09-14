import { ToolTranslation } from '../../types';

export const ptToolsData: Record<string, ToolTranslation> = {
  'player-performance-rater': {
    name: 'Avaliador de Desempenho do Jogador',
    tagline: 'Calcule a nota geral da partida para as 4 posições do futebol',
    description:
      'Avalie o desempenho dos jogadores por posição (GR, DEF, MÉD, AVA) através de fórmulas ponderadas com golos, assistências, eficácia de passe, dribles, desarmes e remates numa escala de 100 pontos.',
    formulaSummary: 'Índice composto ponderado por posição normalizado a 100',
    intro:
      'O Avaliador de Desempenho calcula uma nota completa de jogo até 100 para as quatro principais posições do futebol: Guarda-Redes (GR), Defesa (DEF), Médio (MÉD) e Avançado (AVA). Ao ponderar o contributo ofensivo, conservação da posse, duelos de drible e ações defensivas, proporciona uma avaliação objetiva.',
    metricExplanation:
      'Estatísticas simples muitas vezes subavaliam médios organizadores ou defesas-centrais. Notas calibradas por posição equilibram as exigências: a nota de um médio valoriza a precisão de passe e desarmes, enquanto a de um avançado depende da eficácia e golos.',
    interpretation:
      'Escala de 0 a 100: 90–100 Classe Mundial (exibição de elite e decisiva); 80–89 Excelente (forte protagonismo); 65–79 Bom (exibição consistente e sólida); 50–64 Médio; abaixo de 50 Fraco ou Insuficiente.',
    methodology:
      'Ponderação por posição: AVA = (Golos × 3) + (Assistências × 2) + (%RematesÀBaliza × 0.3) + (%Passes × 0.2) + (Dribles × 1.5); MÉD = (Golos × 2) + (Assistências × 2.5) + (%Passes × 0.4) + (Dribles × 1.5) + (Desarmes × 1.5); DEF = (Desarmes × 3) + (%Passes × 0.4) + (Golos × 1.5) + (Assistências × 1) + BónusJogoSemSofrer; GR = (%Passes × 0.5) + (Desarmes × 2) + (Defesas × 3) + BónusJogoSemSofrer.',
    footballContext:
      'Nas principais ligas europeias (Primeira Liga, Premier League, Champions League), a nota média de um titular situa-se entre 62 e 72. Pontuações constantes acima de 80 distinguem os candidatos à Bola de Ouro dos suplentes.',
    faqs: [
      {
        question: 'Como é normalizada a pontuação de 0 a 100?',
        answer:
          'A fórmula soma as estatísticas ponderadas consoante a posição e equilibra o valor com padrões profissionais, limitando a nota entre 10 e 99.',
      },
      {
        question: 'Porque é que defesas e guarda-redes são avaliados de forma diferente dos avançados?',
        answer:
          'Um defesa raramente marca golos, mas o seu valor reside em desarmes, lançamentos e manter a baliza a zeros. O algoritmo adapta-se a cada função táctica.',
      },
      {
        question: 'Um jogador pode alcançar uma nota de 99 ou 100?',
        answer:
          'Sim. Exibições extraordinárias com múltiplos golos/assistências, mais de 90% de eficácia de passe e forte trabalho defensivo elevam o jogador ao escalão de Classe Mundial (90+).',
      },
    ],
    labels: {
      positionPresets: 'Carregar Predefinições por Posição',
      fwdPreset: 'Predefinição AVA',
      midPreset: 'Predefinição MÉD',
      defPreset: 'Predefinição DEF',
      gkPreset: 'Predefinição GR',
      positionRole: 'Posição / Função',
      goals: 'Golos Marcados',
      assists: 'Assistências',
      passAccuracy: 'Eficácia de Passe %',
      shotsOnTargetPercent: 'Remates à Baliza %',
      dribbles: 'Dribles Efetuados',
      tackles: 'Desarmes Ganhos',
      saves: 'Defesas Efetuadas',
      cleanSheet: 'Baliza a Zeros (+Bónus)',
      matchRating: 'Nota do Jogo Calculada',
      performanceTier: 'Escalão de Desempenho',
      attackingImpact: 'Impacto Ofensivo',
      attackingImpactSub: 'Ameaça ponderada de golos, assistências e remates',
      defensiveWork: 'Trabalho Defensivo',
      defensiveWorkSub: 'Desarmes, duelos, interceções e defesas',
      resetValues: 'Repor Valores',
    },
  },

  'team-comparison': {
    name: 'Matriz de Comparação de Equipas',
    tagline: 'Confronto estatístico direto em 7 métricas-chave de desempenho',
    description:
      'Compare duas equipas de futebol em 7 categorias estatísticas: golos por jogo, posse de bola %, remates à baliza, eficácia de passe, desarmes e pontapés de canto.',
    formulaSummary: 'Vitórias por categoria: Domínio % = (Categorias Vencidas / 7) × 100',
    intro:
      'A Matriz de Comparação de Equipas confronta dois clubes em sete dimensões essenciais do jogo: capacidade goleadora, controlo de posse, volume de remates, precisão de passe, agressividade defensiva e perigo em bolas paradas.',
    metricExplanation:
      'Avaliar equipas apenas pela classificação esconde aspetos táticos. Uma equipa com 58% de posse pode criar menos perigo do que uma formação letal no contra-ataque.',
    interpretation:
      'Domínio global nas 7 categorias: 5+ vitórias indicam superioridade evidente; 4 vitórias uma vantagem competitiva; empate 3–3 reflete equilíbrio total.',
    methodology:
      'Cada uma das 7 métricas é comparada individualmente. A equipa com o valor mais alto vence 1 ponto de categoria. Em caso de empate exato, nenhum ponto é atribuído. Domínio % = (Vencidas / 7) × 100.',
    footballContext:
      'As equipas de topo europeu mantêm médias superiores a 2.2 golos/jogo, mais de 58% de posse e acima de 86% de passes certos.',
    faqs: [
      {
        question: 'Como é calculado o domínio estatístico?',
        answer:
          'É avaliado em 7 pilares: Golos/Jogo, Posse %, Remates, Remates à Baliza, Eficácia de Passe, Desarmes e Cantos. Domínio % = Categorias ganhas a dividir por 7.',
      },
      {
        question: 'O que acontece em caso de empate numa métrica?',
        answer:
          'Se ambas as equipas registarem exatamente o mesmo valor, a categoria é dada como Empate e nenhuma soma ponto.',
      },
      {
        question: 'Uma equipa com menos posse pode ser a vencedora estatística?',
        answer:
          'Sim. Uma equipa de transição rápida que supere o adversário em golos, remates enquadrados, desarmes e cantos vencerá o confronto.',
      },
    ],
    labels: {
      teamAProfile: 'Perfil da Equipa A',
      teamBProfile: 'Perfil da Equipa B',
      teamName: 'Nome da Equipa',
      goalsPerGame: 'Golos / Jogo',
      possession: 'Posse de Bola %',
      shotsPerGame: 'Remates / Jogo',
      shotsOnTargetPerGame: 'Remates à Baliza / Jogo',
      passAccuracy: 'Eficácia de Passe %',
      tacklesPerGame: 'Desarmes / Jogo',
      cornersPerGame: 'Cantos / Jogo',
      dominanceSummary: 'Resumo do Domínio Estatístico',
      categoriesWon: 'Categorias Ganhas',
      drawCategories: 'Categorias Empatadas',
      headToHeadBreakdown: 'Detalhe Métrica por Métrica',
      advantage: 'Vantagem',
      tied: 'Empate',
      resetData: 'Repor Comparação',
    },
  },

  'pass-accuracy-calculator': {
    name: 'Calculadora de Eficácia e Qualidade de Passe',
    tagline: 'Meça a precisão de passes, passe longo e qualidade criativa',
    description:
      'Calcule as percentagens de passes curtos e longos juntamente com um Índice de Qualidade de Passe que premeia passes-chave e visão de jogo.',
    formulaSummary: 'Qualidade = (Passes% × 0.6) + (Passes-Chave × 2) + (PassesLongos% × 0.4)',
    intro:
      'Esta calculadora mede a eficácia em passes curtos e lançamentos longos, além da qualidade criativa do jogo associativo. Vai além da percentagem bruta, valorizando passes-chave e variações de flanco progressivas.',
    metricExplanation:
      'Um jogador com 95% de passes certos que apenas joga para trás produz menos do que um organizador com 82% que oferece 5 passes para golo e acerta 8 lançamentos de 40 metros.',
    interpretation:
      'Pontuação de 85+ representa criadores de topo mundial; 70–84 distribuidores fiáveis; 55–69 nível médio; abaixo de 55 pouca influência no jogo.',
    methodology:
      'Eficácia % = (Completos / Totais) × 100; Precisão Passe Longo % = (Longos Certos / Longos Tentados) × 100; Índice de Qualidade = (Passes% × 0.60) + (Passes-Chave × 2.0) + (Passe Longo% × 0.40).',
    footballContext:
      'Médios-centro de elite mantêm 88–93% de acerto global e 65–75% no passe longo. Os médios-ofensivos rondam os 78–84% devido ao risco acrescido no último terço.',
    faqs: [
      {
        question: 'O que é o Índice de Qualidade de Passe?',
        answer:
          'É uma métrica que conjuga segurança de posse (60%), precisão em lançamentos longos (40%) e criação de perigo (+2 pontos por cada passe-chave).',
      },
      {
        question: 'Qual é uma boa percentagem de passes no futebol profissional?',
        answer:
          'Defesas-centrais situam-se em 88–94%, médios-centro em 84–90% e extremos criativos em 74–82%.',
      },
      {
        question: 'Como são tratados os valores a zero?',
        answer:
          'O sistema inclui proteções contra divisões por zero, retornando 0.0% com segurança.',
      },
    ],
    labels: {
      totalPasses: 'Passes Totais Tentados',
      completedPasses: 'Passes Certos',
      keyPasses: 'Passes-Chave / Ocasiões Criadas',
      longBallsAttempted: 'Passes Longos Tentados',
      longBallsCompleted: 'Passes Longos Certos',
      qualityScore: 'Índice de Qualidade de Passe',
      overallAccuracy: 'Eficácia Global de Passe',
      longBallAccuracy: 'Precisão em Passes Longos',
      resetSample: 'Repor Amostra',
    },
  },

  'shot-conversion-rate': {
    name: 'Taxa de Conversão e Eficácia no Remate',
    tagline: 'Analise a frieza na finalização, remates à baliza e grandes oportunidades',
    description:
      'Meça a pontaria dos avançados comparando golos com total de remates, disparos à baliza e grandes oportunidades concretizadas vs desperdiçadas.',
    formulaSummary: 'Conversão % = (Golos / Remates) × 100 | Grandes Ocasiões % = ((GO - GOD) / GO) × 100',
    intro:
      'A Calculadora de Conversão de Remate afere a eficácia em frente à baliza. Confrontando golos com total de remates, remates enquadrados e grandes ocasiões, separa quem remata sem critério dos verdadeiros matadores.',
    metricExplanation:
      'Um avançado com 15 golos em 120 remates apresenta 12.5% de eficácia, enquanto um com 15 golos em 65 remates atinge 23.1%. Alta conversão ganha jogos equilibrados.',
    interpretation:
      'Mais de 20% é nível de Classe Mundial; 14–19% finalizador acima da média; 9–13% média dos avançados europeus; menos de 9% finalização perdulária.',
    methodology:
      'Taxa de Conversão % = (Golos / Remates Totais) × 100; Conversão Remates à Baliza % = (Golos / Remates à Baliza) × 100; Conversão Grandes Ocasiões % = ((Grandes Ocasiões - Desperdiçadas) / Grandes Ocasiões) × 100.',
    footballContext:
      'Vencedores da Bota de Ouro (como Erling Haaland ou Harry Kane) mantêm taxas de conversão de remate entre 22% e 25%.',
    faqs: [
      {
        question: 'O que é uma taxa de conversão de elite mundial?',
        answer:
          'Nas 5 principais ligas da Europa, superar 20% de conversão geral é considerado o padrão de topo mundial.',
      },
      {
        question: 'Porque é a conversão de grandes ocasiões tão relevante?',
        answer:
          'Remates de longe baixam a média geral, mas a frieza no 1 contra 1 e na pequena área reflete o verdadeiro instinto goleador.',
      },
      {
        question: 'Qual a diferença entre remates totais e remates à baliza?',
        answer:
          'Remates totais incluem bolas bloqueadas e para fora, enquanto remates à baliza medem os lances que obrigam o guarda-redes a intervir.',
      },
    ],
    labels: {
      totalShots: 'Remates Totais Tentados',
      goalsScored: 'Golos Marcados',
      shotsOnTarget: 'Remates à Baliza',
      bigChances: 'Grandes Ocasiões Criadas',
      bigChancesMissed: 'Grandes Ocasiões Desperdiçadas',
      conversionRate: 'Taxa Global de Conversão',
      onTargetConversion: 'Conversão Remates à Baliza',
      bigChanceConversion: 'Conversão de Grandes Ocasiões',
      resetSample: 'Repor Amostra',
    },
  },

  'possession-impact-analyzer': {
    name: 'Analisador de Impacto da Posse de Bola',
    tagline: 'Avalie o rendimento da bola, taxa de vitória e produção ofensiva',
    description:
      'Avalie se o controlo do jogo se traduz em vitórias reais. Calcula a Taxa de Vitória, Golos por Jogo e o Índice de Eficiência da Posse.',
    formulaSummary: 'Eficiência = (Taxa Vitória / Posse %) | Golos/Jogo = Golos / Jogos',
    intro:
      'O Analisador de Impacto da Posse avalia se ter bola dá resultados práticos. Ao cruzar posse, percentagem de vitórias e golos marcados, distingue a posse inofensiva do domínio agressivo.',
    metricExplanation:
      'Ter 70% de posse é inútil se a equipa apenas circular para o lado e perder 0-1 em contra-ataque. Este índice premeia equipas que transformam posse em perigo e vitórias.',
    interpretation:
      'Índice superior a 1.25 representa Posse Altamente Incisiva; 0.90–1.24 Controlo Equilibrado; abaixo de 0.90 Posse Estéril (muito passe, pouco perigo).',
    methodology:
      'Taxa de Vitória % = (Vitórias / Jogos) × 100; Golos por Jogo = Golos / Jogos; Índice de Eficiência = Taxa de Vitória % / Posse %.',
    footballContext:
      'As equipas dominadoras combinam elevada posse (>65%) e grande eficácia (>1.30), com médias superiores a 2.4 golos por encontro.',
    faqs: [
      {
        question: 'O que é a posse estéril?',
        answer:
          'Acontece quando uma equipa circula a bola em zonas inofensivas sem criar lances de perigo ou remates à baliza (Índice <0.85).',
      },
      {
        question: 'As equipas de contra-ataque podem ter alta eficácia?',
        answer:
          'Sim. Uma equipa com 40% de posse que vença 65% dos jogos atinge um índice impressionante de 1.63.',
      },
      {
        question: 'Qual é uma boa meta de golos por jogo?',
        answer:
          'Candidatos ao título necessitam de 2.1 a 2.6 golos por jogo. Para atingir os lugares de Champions é preciso pelo menos 1.8 golos por partida.',
      },
    ],
    labels: {
      matchesPlayed: 'Jogos Analisados',
      wins: 'Vitórias',
      draws: 'Empates',
      losses: 'Derrotas',
      goalsScored: 'Golos Marcados',
      averagePossession: 'Posse Média %',
      efficiencyIndex: 'Índice de Eficiência de Posse',
      winRate: 'Taxa de Vitória %',
      goalsPerGame: 'Golos / Jogo',
      resetData: 'Repor Análise',
    },
  },

  'player-form-index': {
    name: 'Índice de Forma do Jogador',
    tagline: 'Acompanhe o momento nos últimos 5 jogos, disciplina e minutos jogados',
    description:
      'Quantifique a forma recente nos últimos 5 jogos através de golos, assistências, nota média, cartões e bónus de minutos numa escala até 10.0.',
    formulaSummary: 'Forma = Base(Golos×1.5 + Assist×1.2 + Nota×0.8) - Cartões + BónusMinutos',
    intro:
      'O Índice de Forma afere o momento competitivo nos últimos 5 jogos numa escala de 1.0 a 10.0. Ao associar golos, assistências, notas exibicionais, disciplina e minutos, identifica quem está em grande fase.',
    metricExplanation:
      'Os totais de uma época inteira escondem picos momentâneos. Treinadores de Fantasy e olheiros analisam médias móveis de 5 jogos para encontrar jogadores em alta confiança.',
    interpretation:
      'Pontuação de 8.5–10.0 indica Jogador em Grande Forma / No Auge; 7.0–8.4 Boa Forma; 5.5–6.9 Rendimento Regular; abaixo de 5.5 Quebra de forma ou problemas disciplinares.',
    methodology:
      'Pontuação Base = (Golos × 1.5) + (Assistências × 1.2) + (Nota Média × 0.80); Deduções Disciplinares = (Amarelos × 0.25) + (Vermelhos × 1.50); Bónus Minutos = (Minutos / 450) × 0.50; Índice final de 1.0 a 10.0.',
    footballContext:
      'Um excelente momento de forma (Índice > 8.0) traduz-se em confiança na finalização, maior arrojo no drible e titularidade indiscutível.',
    faqs: [
      {
        question: 'Porque se utiliza uma janela de 5 jogos?',
        answer:
          'Um bloco de 5 jogos (cerca de 450 minutos) é a referência para captar a tendência real sem a distorção de um único jogo atípico.',
      },
      {
        question: 'Qual o impacto de um cartão vermelho?',
        answer:
          'Um cartão vermelho retira 1.5 pontos ao índice devido ao forte prejuízo tático causado à equipa.',
      },
      {
        question: 'Jogar os 90 minutos completos aumenta a nota?',
        answer:
          'Sim. O bónus de regularidade atribui até +0.50 pontos aos titulares que disputam os 450 minutos da amostra.',
      },
    ],
    labels: {
      goalsLast5: 'Golos nos Últimos 5 Jogos',
      assistsLast5: 'Assistências nos Últimos 5 Jogos',
      avgRatingLast5: 'Nota Média (Últimos 5)',
      yellowCardsLast5: 'Cartões Amarelos (Últimos 5)',
      redCardsLast5: 'Cartões Vermelhos (Últimos 5)',
      minutesPlayedLast5: 'Minutos Jogados (Últimos 5)',
      formScore: 'Índice de Forma (5 Jogos)',
      status: 'Estado Atual de Forma',
      resetData: 'Repor Dados de Forma',
    },
  },

  'transfer-value-estimator': {
    name: 'Estimador de Valor de Mercado e Passe',
    tagline: 'Estime a cotação com curva de idade, nível de liga e duração de contrato',
    description:
      'Calcule a estimativa de valor de transferência (€M) com base na posição, curva de idade, golos/assistências, coeficiente da liga, anos de contrato e internacionalizações.',
    formulaSummary: 'Valor = Base × MultIdade × MultDesemp × MultLiga × MultContrato + BónusSeleção',
    intro:
      'O Estimador de Valor de Mercado calcula a cotação financeira de um jogador em milhões de euros (€M). Conjugando curva de idade, posição, números estatísticos, prestígio do campeonato, vínculo contratual e internacionalizações, gera uma avaliação sólida.',
    metricExplanation:
      'No mercado atual, o tempo restante de contrato e a idade pesam tanto como os golos. Um jovem de 22 anos com 4 anos de contrato vale muito mais do que um jogador de 31 anos a terminar contrato.',
    interpretation:
      'Mais de 100M€ representa Estrelas Mundiais; 50–99M€ Titulares de Liga dos Campeões; 20–49M€ Jogadores Consolidados de primeira liga.',
    methodology:
      'Valor base por posição. Multiplicadores: Curva de Idade (pico entre 23 e 26 anos), Desempenho (golos/assistências), Coeficiente da Liga (Premier League 1.6x, Primeira Liga/LaLiga/Bundesliga 1.3x), Fator Contrato (4+ anos 1.3x; 1 ano 0.6x) e Bónus Seleção A (0.2M€ por internacionalização).',
    footballContext:
      'Avançados e extremos desequilibradores atingem as cotações mais altas no mercado internacional.',
    faqs: [
      {
        question: 'Porque é que o fim de contrato reduz tanto o valor de mercado?',
        answer:
          'Nos últimos 12 meses de contrato o clube perde poder negocial pelo risco de saída a custo zero (Lei Bosman), gerando desvalorizações de 40 a 50%.',
      },
      {
        question: 'Com que idade o valor de um futebolista atinge o pico?',
        answer:
          'Os dados revelam que o ápice ocorre entre os 23 e os 26 anos, quando o rendimento atlético e a perspetiva de revenda estão no máximo.',
      },
      {
        question: 'Os bónus por objetivos estão incluídos?',
        answer:
          'O modelo calcula o valor fixo garantido do passe. Os bónus por objetivos acrescentam habitualmente entre 15% e 25% adicionais.',
      },
    ],
    labels: {
      position: 'Posição',
      age: 'Idade do Jogador',
      goalsThisSeason: 'Golos nesta Época',
      assistsThisSeason: 'Assistências nesta Época',
      leagueTier: 'Nível do Campeonato',
      contractRemaining: 'Anos de Contrato Restantes',
      internationalCaps: 'Internacionalizações pela Seleção A',
      estimatedValue: 'Valor de Mercado Estimado',
      valuationTier: 'Escalão de Avaliação',
      ageMultiplier: 'Multiplicador Curva de Idade',
      leagueMultiplier: 'Multiplicador de Liga',
      resetData: 'Repor Modelo',
    },
  },

  'wage-calculator': {
    name: 'Calculadora de Salário e Estrutura Contratual',
    tagline: 'Calcule salário anual bruto, salário semanal efetivo e bónus de rendimento',
    description:
      'Modele todo o pacote remuneratório: salário base semanal (52 semanas), prémios de jogo, bónus por golo e incentivos de baliza a zeros em £, € ou $.',
    formulaSummary: 'Rendimento Anual = (Base Semanal × 52) + (Jogos × Prémio Jogo) + (Golos × Prémio Golo) + (Clean Sheets × Prémio CS)',
    intro:
      'A Calculadora de Salários modela contratos de jogadores conjugando o salário base semanal garantido com prémios variáveis de utilização, golos marcados e jogos sem sofrer golos.',
    metricExplanation:
      'Os contratos modernos equilibram remuneração fixa e incentivos de desempenho. Esta ferramenta visualiza a repartição exata entre salário base e bónus variáveis.',
    interpretation:
      'Apresenta os ganhos anuais brutos totais, o salário semanal efetivo ajustado a 52 semanas e a repartição percentual das componentes remuneratórias.',
    methodology:
      'Salário Base Anual = Salário Semanal × 52; Prémios de Jogo = Prémio × Jogos; Prémios de Golo = Prémio × Golos; Prémios Baliza a Zeros = Prémio × Clean Sheets; Rendimento Total = Base + Bónus; Salário Semanal Efetivo = Rendimento Total / 52.',
    footballContext:
      'Os principais clubes europeus canalizam entre 55% e 70% das suas receitas totais para a massa salarial. Contratos por objetivos protegem as finanças do clube.',
    faqs: [
      {
        question: 'Como é calculado o salário semanal efetivo?',
        answer:
          'Divide o total de ganhos brutos anuais (salário base garantido + total de prémios de rendimento) por 52 semanas.',
      },
      {
        question: 'Porque são os prémios de jogo e de golo contabilizados em separado?',
        answer:
          'A estrutura contratual no futebol profissional diferencia cláusulas para titulares, goleadores e especialistas defensivos.',
      },
      {
        question: 'Qual é o peso habitual dos bónus no salário dos jogadores?',
        answer:
          'Nas principais ligas europeias, o salário fixo representa 75% a 85% da remuneração total, enquanto as variáveis de desempenho perfazem 15% a 25%.',
      },
    ],
    labels: {
      currency: 'Moeda',
      baseWeeklyWage: 'Salário Semanal Base',
      appearanceFee: 'Prémio por Jogo Disputado',
      matchesPlayed: 'Jogos Disputados na Época',
      goalBonus: 'Prémio por Golo Marcado',
      goalsScored: 'Golos Marcados',
      cleanSheetBonus: 'Prémio por Jogo Sem Sofrer Golos',
      cleanSheetsKept: 'Jogos com Baliza a Zeros',
      totalAnnualEarnings: 'Rendimento Anual Bruto Total',
      effectiveWeeklyWage: 'Salário Semanal Efetivo',
      baseAnnualSalary: 'Salário Base Anual',
      totalPerformanceBonuses: 'Total de Prémios por Desempenho',
      resetData: 'Repor Modelo Salarial',
    },
  },

  'squad-value-calculator': {
    name: 'Calculadora de Valor e Profundidade do Plantel',
    tagline: 'Some o valor total da equipa, repartição por setores e equilíbrio tático',
    description:
      'Calcule o valor total de mercado do plantel, o valor médio por futebolista e a repartição por setores (Guarda-Redes, Defesas, Médios, Avançados).',
    formulaSummary: 'Valor Total = Σ(Valor Jogadores) | Índice de Equilíbrio do Plantel',
    intro:
      'A Calculadora de Valor do Plantel analisa a riqueza do plantel de um clube, o valor médio individual e a distribuição dos investimentos entre guarda-redes, defesas, médios e avançados.',
    metricExplanation:
      'Um plantel com 500M€ no ataque mas apenas 40M€ na defesa padece de um grave desequilíbrio estrutural. Esta ferramenta valida o equilíbrio financeiro.',
    interpretation:
      'Um plantel europeu equilibrado reparte cerca de 8–12% nos Guarda-Redes, 28–35% nos Defesas, 28–35% nos Médios e 30–40% nos Avançados.',
    methodology:
      'Valor Total = Soma dos valores individuais; Percentagem por Setor % = (Valor Setor / Valor Total) × 100.',
    footballContext:
      'Plantéis campeões europeus e de ligas principais atingem valores globais entre 800M€ e mais de 1,2 mil milhões de euros.',
    faqs: [
      {
        question: 'Qual a repartição ideal do valor por setores?',
        answer:
          'Cerca de 10% na baliza, 30% na defesa, 30% no meio-campo e 30% no ataque para evitar fragilidades estruturais.',
      },
      {
        question: 'Quantos jogadores constituem um plantel profissional?',
        answer:
          'Um plantel sénior padrão integra 22 a 25 jogadores (dois por posição mais 3 opções polivalentes).',
      },
      {
        question: 'Ter o plantel mais valioso garante o título de campeão?',
        answer:
          'Num campeonato longo de 38 jornadas a correlação é muito alta (r > 0.85), embora as taças a eliminar reservem sempre surpresas.',
      },
    ],
    labels: {
      addPlayer: 'Adicionar Jogador ao Plantel',
      playerName: 'Nome do Jogador',
      position: 'Posição',
      marketValue: 'Valor de Mercado (€M)',
      totalSquadValue: 'Valor Total do Plantel',
      avgPlayerValue: 'Valor Médio por Jogador',
      squadSize: 'Número de Jogadores',
      positionBreakdown: 'Distribuição por Setores',
      resetSquad: 'Repor Plantel',
    },
  },

  'contract-worth-analyzer': {
    name: 'Analisador de Contratos e Amortização FPF',
    tagline: 'Calcule a amortização contabilística anual e o encargo financeiro total',
    description:
      'Calcule a quota de amortização anual da transferência, o encargo salarial global e o impacto anual nas contas para efeitos de Fair-Play Financeiro (FPF).',
    formulaSummary: 'Amortização Anual = Custo / Anos Contrato | Custo Total = Custo + (Salário × 52 × Anos)',
    intro:
      'O Analisador de Contratos e Amortização avalia o verdadeiro custo de uma contratação. Ao analisar a amortização linear do passe, salários acumulados e comissões, projeta o encargo anual nas contas do clube para efeitos de FPF.',
    metricExplanation:
      'O custo de uma transferência não entra todo no primeiro ano; é amortizado em parcelas iguais pela duração do contrato (até ao limite de 5 anos imposto pela UEFA). Uma contratação de 100M€ a 5 anos traduz-se em 20M€/ano de amortização somados ao salário bruto.',
    interpretation:
      'O Encargo Anual nas Contas é o indicador-chave: 18M€ de amortização mais 12M€ de ordenado resultam num impacto de 30M€/ano nas contas do clube.',
    methodology:
      'Amortização Anual = Custo de Transferência / Duração (máx 5 anos UEFA); Custo Salarial Anual = Salário Semanal × 52; Custo Global = Transferência + (Salário Anual × Anos) + Prémio Assinatura + Comissões; Encargo Anual = Amortização + Salário Anual.',
    footballContext:
      'Os regulamentos de sustentabilidade financeira da UEFA penalizam derrapagens com multas avultadas, perda de pontos e restrições na inscrição de jogadores.',
    faqs: [
      {
        question: 'O que é a amortização de uma transferência no futebol?',
        answer:
          'É a divisão do custo de aquisição dos direitos desportivos do futebolista em partes iguais por cada ano de contrato (ex: 80M€ a 5 anos = 16M€/ano).',
      },
      {
        question: 'Porque limitou a UEFA a amortização a um máximo de 5 anos?',
        answer:
          'Em 2023 a UEFA acabou com a lacuna dos contratos de 8 e 9 anos usados para reduzir artificialmente a amortização anual.',
      },
      {
        question: 'O que acontece se o jogador for vendido antes do término do contrato?',
        answer:
          'O valor contabilístico residual é subtraído ao valor da venda para apurar a mais-valia ou menos-valia imediata.',
      },
    ],
    labels: {
      transferFee: 'Valor da Transferência (€M)',
      contractYears: 'Duração do Contrato (Anos)',
      weeklyWage: 'Salário Semanal Base',
      signingBonus: 'Prémio de Assinatura (€M)',
      agentFee: 'Comissão de Agente / Intermediário (€M)',
      annualAmortization: 'Amortização Anual da Transferência',
      totalCostToClub: 'Encargo Financeiro Global',
      annualBudgetImpact: 'Impacto Anual nas Contas (FPF)',
      amortizationSchedule: 'Plano Plurianual de Amortização',
      resetData: 'Repor Modelo',
    },
  },

  'fantasy-football-points': {
    name: 'Calculadora de Pontos Fantasy Football',
    tagline: 'Estimativa analítica de pontuações Fantasy para todas as posições',
    description:
      'Estime os pontos de uma jornada considerando golos, assistências, baliza a zeros, ações defensivas (CBIT/CBIRT), defesas, penáltis, cartões e minutos em campo.',
    formulaSummary: 'Modelo analítico Fantasy por posição (GR/DEF/MÉD/AVA)',
    intro:
      'A Calculadora de Pontos Fantasy Football oferece uma estimativa analítica da pontuação obtida por um jogador em função dos lances reais ocorridos para cada posição.',
    metricExplanation:
      'Cada posição tem a sua escala de pontos: guarda-redes (10 pts por golo), defesas (6 pts por golo, 4 pts baliza a zeros, bónus de ação defensiva a partir de 10 CBIT), médios (5 pts por golo, bónus a partir de 12 CBIRT) e avançados (4 pts por golo, bónus a partir de 12 CBIRT).',
    interpretation:
      'Pontuação de 12+ pontos representa uma grande exibição de dois dígitos (ideal para capitão); 6–9 pontos rendimento consistente; 2–4 pontos pontuação normal de presença.',
    methodology:
      'Regras Fantasy: 60+ min jogados (+2), 1-59 min (+1); Golos (GR +10, DEF +6, MÉD +5, AVA +4); Assistências (+3); Baliza a zeros (GR/DEF +4, MÉD +1); Ação defensiva (+2 com DEF >= 10 CBIT ou MÉD/AVA >= 12 CBIRT); Penálti defendido (+5); Penálti falhado (-2); Defesas (1 pt por cada 3 defesas); Amarelo (-1); Vermelho (-3); Autogolo (-2); Bónus BPS (+1 a +3).',
    footballContext:
      'Os melhores jogadores de Fantasy mantêm médias superiores a 6.0 pontos por jogo ao longo de toda a época.',
    faqs: [
      {
        question: 'Os médios recebem pontos por jogo sem sofrer golos?',
        answer:
          'Sim, os médios recebem +1 ponto de clean sheet se tiverem jogado no mínimo 60 minutos.',
      },
      {
        question: 'Como funciona o bónus de contribuição defensiva?',
        answer:
          'Os defesas recebem +2 pontos ao atingir 10 ações CBIT (cortes, remates bloqueados, interceções, desarmes). Médios e avançados recebem +2 pontos com 12 ações CBIRT (incluindo recuperações de bola).',
      },
      {
        question: 'Como são atribuídos os pontos por defesas do guarda-redes?',
        answer:
          'Os guarda-redes ganham +1 ponto extra por cada conjunto de 3 defesas efetuadas na partida.',
      },
      {
        question: 'O que sucede na expulsão por duplo amarelo?',
        answer:
          'O jogador recebe -3 pontos pelo cartão vermelho (substituindo a penalização dos amarelos isolados).',
      },
    ],
    labels: {
      position: 'Posição do Jogador',
      minutesPlayed: 'Minutos Jogados',
      goalsScored: 'Golos Marcados',
      assists: 'Assistências',
      cleanSheet: 'Baliza a Zeros (Clean Sheet)',
      cbitActions: 'Ações Defensivas CBIT (Defesas)',
      cbirtActions: 'Ações Defensivas CBIRT (Médios / Avançados)',
      goalsConceded: 'Golos Sofridos',
      saves: 'Defesas Efetuadas',
      penaltySaves: 'Penáltis Defendidos',
      penaltyMisses: 'Penáltis Falhados',
      yellowCards: 'Cartões Amarelos',
      redCards: 'Cartões Vermelhos',
      ownGoals: 'Autogolos',
      bonusPoints: 'Pontos de Bónus (BPS)',
      totalPoints: 'Pontuação Total da Jornada',
      pointBreakdown: 'Detalhe dos Pontos',
      resetData: 'Repor Calculadora',
    },
  },

  'best-xi-selector': {
    name: 'Otimizador de Onze Ideal & Tática',
    tagline: 'Escolha a melhor equipa titular em 6 táticas segundo a forma e o preço',
    description:
      'Insira a sua lista de jogadores com índices de forma e preços Fantasy para montar automaticamente o onze titular de maior pontuação (4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 3-4-3, 5-3-2).',
    formulaSummary: 'Otimização forma/custo com restrições de posições e teto orçamental',
    intro:
      'O Otimizador de Onze Ideal monta a formação titular com o maior somatório de pontos previsto, respeitando o esquema tático e o orçamento disponível.',
    metricExplanation:
      'Montar uma equipa ganhadora exige dosar estrelas consagradas de alto custo com apostas económicas de grande rendimento.',
    interpretation:
      'Apresenta o onze titular otimizado com a forma global estimada e o custo total dentro do teto definido.',
    methodology:
      'Otimização linear com restrições que maximiza o índice de forma respeitando as vagas por setor da tática e o orçamento.',
    footballContext:
      'Táticas com 3 avançados (4-3-3, 3-4-3) potenciam a pontuação ofensiva em jornadas com jogos teoricamente favoráveis.',
    faqs: [
      {
        question: 'Qual a tática que oferece o maior teto de pontos?',
        answer:
          'O 3-4-3 e o 3-5-2 oferecem frequentemente as pontuações máximas mais elevadas ao privilegiarem setores ofensivos.',
      },
      {
        question: 'Como gere o otimizador a restrição orçamental?',
        answer:
          'Calcula o rácio de forma por milhão para identificar a combinação mais rentável abaixo do orçamento.',
      },
      {
        question: 'Posso editar nomes e pontuações dos jogadores?',
        answer:
          'Sim, pode alterar nomes, preços, posições e índices de forma livremente na tabela abaixo.',
      },
    ],
    labels: {
      formation: 'Selecionar Esquema Tático',
      budgetLimit: 'Limite Orçamental (£M / €M)',
      playerPool: 'Lista de Jogadores Disponíveis',
      addPlayer: 'Adicionar Jogador',
      optimalXi: 'Onze Titular Otimizado',
      projectedTotalForm: 'Índice de Forma Global Previsto',
      totalCost: 'Custo Total da Formação',
      resetPool: 'Repor Lista de Jogadores',
    },
  },

  'captain-pick-analyzer': {
    name: 'Analisador de Escolha do Capitão',
    tagline: 'Comparação algorítmica da braçadeira segundo forma, calendário e histórico',
    description:
      'Compare candidatos à braçadeira com um algoritmo ponderado: forma do jogador (30%), calendário adversário (25%), fator casa (15%), registo direto (15%) e poder de ataque da equipa (15%).',
    formulaSummary: 'Pontuação de Capitão = (Forma × 30%) + (Calendário × 25%) + (Casa × 15%) + (Histórico × 15%) + (Ataque Equipa × 15%)',
    intro:
      'O Analisador de Escolha do Capitão avalia candidatos à braçadeira com base num modelo que conjuga forma recente (30%), dificuldade do adversário (25%), fator casa (15%), histórico direto (15%) e caudal ofensivo da equipa (15%) para gerar a Pontuação de Capitão StatKick (0–100).',
    metricExplanation:
      'A braçadeira de capitão duplica os pontos do jogador e é a decisão individual com maior peso a cada jornada de Fantasy.',
    interpretation:
      'Pontuação >80 indica Capitão Indiscutível; 65–79 Excelente Opção; 50–64 Opção Diferencial de Risco; abaixo de 50 Não Recomendado.',
    methodology:
      'Pontuação de Capitão StatKick = (Forma × 10 × 0.30) + ((6 - FDR) / 5 × 100 × 0.25) + (Casa=100/Fora=50 × 0.15) + (Rendimento Histórico × 0.15) + (Ataque Equipa × 0.15).',
    footballContext:
      'Os melhores jogadores de Fantasy escolhem capitães que jogam em casa contra equipas dos últimos lugares em mais de 70% das jornadas.',
    faqs: [
      {
        question: 'Porque vale o fator casa 15%?',
        answer:
          'Equipas a jogar em casa marcam 20 a 30% mais golos e criam mais xG, aumentando a probabilidade de grandes pontuações.',
      },
      {
        question: 'O que é o índice FDR (Fixture Difficulty Rating)?',
        answer:
          'É uma escala de 1 (adversário muito fácil em casa) a 5 (visita ao terreno do favorito ao título).',
      },
      {
        question: 'Quando compensa apostar num capitão diferencial?',
        answer:
          'Para recuperar atrasos na classificação nas últimas jornadas, um capitão diferencial com índice elevado é a melhor alavanca.',
      },
    ],
    labels: {
      candidateA: 'Candidato A',
      candidateB: 'Candidato B',
      candidateC: 'Candidato C (Opcional)',
      playerName: 'Nome do Jogador',
      currentForm: 'Forma Atual (1–10)',
      fdr: 'Dificuldade do Jogo (FDR 1-5)',
      venue: 'Local do Jogo',
      home: 'Jogo em Casa',
      away: 'Jogo Fora',
      historyReturn: 'Rendimento Histórico vs Adversário',
      captaincyVerdict: 'Recomendação de Capitão',
      captainIndex: 'Pontuação de Capitão StatKick',
      resetData: 'Repor Candidatos',
    },
  },

  'transfer-suggestion': {
    name: 'Motor de Estratégia de Transferências Fantasy',
    tagline: 'Compare saídas e entradas para maximizar o ganho líquido de pontos',
    description:
      'Analise trocas de jogadores ponderando a diferença de forma, calendário das próximas 3 jornadas, impacto no orçamento e pontos esperados.',
    formulaSummary: 'Valor Troca = (FormaEntra - FormaSai) + (FDRSai - FDREntra) × 1.2 + EficiênciaOrçamento',
    intro:
      'O Motor de Estratégia Fantasy avalia opções de transferência cruzando momentos de forma, calendário das próximas 3 jornadas e saldo orçamental.',
    metricExplanation:
      'Trocar jogadores apenas pelos pontos da jornada anterior costuma trazer desilusões. Esta ferramenta analisa o calendário futuro para confirmar a validade do negócio.',
    interpretation:
      'Pontuação acima de +3.0 indica Transferência Altamente Recomendada; +1.0 a +2.9 Boa Troca; valores negativos desaconselham a alteração.',
    methodology:
      'Índice = (Forma Entra - Forma Sai) × 1.2 + (FDR 3 Jogos Sai - FDR Entra) × 1.5 + Fator Eficiência Orçamental.',
    footballContext:
      'Contratar futebolistas antes de uma sequência de 4+ jogos acessíveis contra defesas frágeis garante o melhor retorno.',
    faqs: [
      {
        question: 'Vale a pena fazer transferências com penalização de -4 pontos?',
        answer:
          'Apenas se o jogador a entrar tiver índice >+3.5 e perspetiva de somar pelo menos 5 pontos a mais nas próximas 3 rondas.',
      },
      {
        question: 'Porque se avalia um horizonte de 3 jogos?',
        answer:
          'Uma única jornada envolve demasiada incerteza; planear a 3-5 jogos rentabiliza cada transferência gratuita.',
      },
      {
        question: 'Como é considerado o dinheiro restante no banco?',
        answer:
          'O algoritmo premeia a folga orçamental gerada para reforçar outras posições carenciadas.',
      },
    ],
    labels: {
      transferOut: 'Jogador a Vender (Saída)',
      transferIn: 'Jogador a Comprar (Entrada)',
      playerNameOut: 'Nome do Jogador (Saída)',
      sellingPrice: 'Preço de Venda (£M)',
      formOut: 'Índice de Forma (1–10)',
      fdrOut: 'FDR Próximos 3 (Média)',
      playerNameIn: 'Nome do Jogador (Entrada)',
      purchasePrice: 'Preço de Compra (£M)',
      formIn: 'Índice de Forma (1–10)',
      fdrIn: 'FDR Próximos 3 (Média)',
      bankMoney: 'Orçamento Restante (£M)',
      transferVerdict: 'Avaliação da Transferência',
      netGainScore: 'Pontuação de Ganho Líquido',
      budgetImpact: 'Saldo Restante no Banco',
      resetData: 'Repor Avaliação',
    },
  },

  'league-table-simulator': {
    name: 'Simulador de Classificação e Pontos da Liga',
    tagline: 'Simule os jogos restantes para projetar campeão, lugares europeus e descida',
    description:
      'Insira pontos atuais, jogos em falta e prognósticos de vitórias/empates/derrotas para calcular a pontuação final, título e permanência.',
    formulaSummary: 'Pontos Finais = Pontos Atuais + (Vitórias × 3) + (Empates × 1)',
    intro:
      'O Simulador de Classificação projeta a tabela final do campeonato, a equipa campeã, os apurados para as provas da UEFA (Champions League, Europa League) e a luta pela permanência.',
    metricExplanation:
      'A decisão do campeonato e a fuga à descida resolvem-se no calendário restante. Esta ferramenta permite antecipar todos os cenários matemáticos para cada clube.',
    interpretation:
      'Apresenta a classificação final projetada com campeão simulado, lugares europeus e despromovidos.',
    methodology:
      'Pontos Projetados = Pontos Atuais + (Vitórias × 3) + (Empates × 1). Em caso de empate pontual, a diferença de golos simulada serve de desempate.',
    footballContext:
      'Numa época de 34 ou 38 jornadas, médias de 2.3 a 2.4 pontos por jogo asseguram o título de campeão, enquanto cerca de 36 a 38 pontos costumam garantir a manutenção.',
    faqs: [
      {
        question: 'Quantos pontos são precisos historicamente para ser campeão?',
        answer:
          'Nos campeonatos europeus, os campeões terminam com uma média aproximada de 88 a 90 pontos na última década.',
      },
      {
        question: 'A barreira dos 40 pontos ainda é necessária para a permanência?',
        answer:
          'Embora 40 pontos continue a ser a meta psicológica, em 8 das últimas 10 épocas bastaram 35 a 37 pontos para não descer.',
      },
      {
        question: 'Como são desempatadas equipas com os mesmos pontos na simulação?',
        answer:
          'A diferença global de golos atua como critério primário de desempate no simulador.',
      },
    ],
    labels: {
      teamName: 'Nome da Equipa',
      currentPoints: 'Pontos Atuais',
      gamesRemaining: 'Jogos em Falta',
      projWins: 'Vitórias Previstas',
      projDraws: 'Empates Previstos',
      projLosses: 'Derrotas Previstas',
      projectedPoints: 'Pontos Finais Projetados',
      champions: 'Campeão Simulado',
      uclZone: 'Lugares Liga dos Campeões',
      relegationZone: 'Zona de Despromoção',
      simulateTable: 'Simular Classificação',
      resetTable: 'Repor Tabela',
    },
  },

  'points-needed-calculator': {
    name: 'Calculadora de Pontos Necessários',
    tagline: 'Calcule as vitórias e empates indispensáveis para o título, Europa ou manutenção',
    description:
      'Determine as combinações matemáticas de vitórias e empates nas jornadas em falta para alcançar as metas da época (Campeonato, Champions, Manutenção).',
    formulaSummary: 'Diferença = Pontos Alvo - Pontos Atuais | Taxa de Vitória Necessária',
    intro:
      'A Calculadora de Pontos Necessários calcula todas as combinações viáveis de vitórias, empates e derrotas admissíveis nos jogos restantes para cumprir os objetivos da época.',
    metricExplanation:
      'Saber que faltam 14 pontos em 7 jogos é vago. Esta calculadora discrimina as combinações exatas (ex: 4 vitórias, 2 empates, 1 derrota) e o nível de aproveitamento exigido.',
    interpretation:
      'Informa a viabilidade do objetivo (Acessível, Difícil, Matematicamente Impossível) e apresenta a listagem de combinações válidas.',
    methodology:
      'Pontos em Falta = Alvo - Atuais; Pontos Máximos em Disputa = Jogos Restantes × 3; Apura as soluções (V, E) onde (V×3 + E×1) >= Pontos em Falta.',
    footballContext:
      'Necessitar de mais de 75% de vitórias nas derradeiras 8 jornadas raramente tem sucesso sem deslizes contínuos dos rivais diretos.',
    faqs: [
      {
        question: 'O que sucede se os pontos necessários excederem o máximo possível?',
        answer:
          'O objetivo é imediatamente classificado como "Matematicamente Impossível", detalhando o défice de pontos.',
      },
      {
        question: 'Qual é uma taxa de vitória acessível na reta final?',
        answer:
          'Uma taxa exigida abaixo de 50% é perfeitamente acessível para equipas da primeira metade; superar 70% exige ritmo de campeão.',
      },
      {
        question: 'É possível testar pontuações personalizadas?',
        answer:
          'Sim, escolha entre os marcos predefinidos (Título = 88 pts, Champions = 72 pts, Manutenção = 38 pts) ou introduza a sua meta.',
      },
    ],
    labels: {
      targetGoal: 'Objetivo da Época',
      customTarget: 'Meta de Pontos Desejada',
      currentPoints: 'Pontos Atuais',
      matchesRemaining: 'Jogos Restantes',
      pointsNeeded: 'Pontos Necessários',
      maxAvailable: 'Pontos Máximos Possíveis',
      requiredWinRate: 'Taxa de Vitória Exigida %',
      targetStatus: 'Viabilidade do Objetivo',
      viableCombinations: 'Combinações Válidas (V / E)',
      resetData: 'Repor Calculadora',
    },
  },

  'head-to-head-stats': {
    name: 'Matriz Histórica de Confrontos Diretos (H2H)',
    tagline: 'Registo histórico de duelos, vitórias, golos e supremacia entre dois clubes',
    description:
      'Analise o histórico direto entre dois clubes de futebol: percentagem de vitórias, empates, média de golos marcados e diferença de golos.',
    formulaSummary: 'Vitória % = (Vitórias / Jogos) × 100 | Diferença de Golos por Encontro',
    intro:
      'A Matriz Histórica de Confrontos Diretos analisa os embates entre dois clubes ao longo dos tempos. Calcula percentagens de vitória, empates e registo de golos para avaliar a ascendência psicológica.',
    metricExplanation:
      'Os confrontos diretos expõem as tradicionais "bestas negras" e vantagens táticas que a classificação atual nem sempre reflete.',
    interpretation:
      'Taxa de vitórias >55% traduz supremacia histórica evidente; 40–54% grande equilíbrio; empates frequentes (>35%) jogos muito disputados.',
    methodology:
      'Vitória % = (Vitórias / Jogos) × 100; Empate % = (Empates / Jogos) × 100; Golos por Jogo = Golos Totais / Jogos.',
    footballContext:
      'Os grandes clássicos e dérbis escapam frequentemente à lógica das tabelas classificativas pela enorme carga emocional.',
    faqs: [
      {
        question: 'Porque contradiz o histórico direto por vezes a classificação?',
        answer:
          'Certos modelos táticos (ex: bloco baixo compacto contra equipas de posse) criam historicamente dificuldades a determinados adversários.',
      },
      {
        question: 'Quantos golos se marcam em média nos grandes clássicos europeus?',
        answer:
          'Os clássicos europeus mantêm médias entre 2.7 e 3.1 golos por jogo, com a equipa visitada a vencer cerca de 44% das vezes.',
      },
      {
        question: 'Quantos jogos são precisos para uma amostra fiável?',
        answer:
          'Uma amostra de 6 a 12 jogos recentes retrata a era tática contemporânea garantindo solidez estatística.',
      },
    ],
    labels: {
      teamAName: 'Nome Equipa A',
      teamBName: 'Nome Equipa B',
      totalMatches: 'Total de Jogos Disputados',
      teamAWins: 'Vitórias Equipa A',
      teamBWins: 'Vitórias Equipa B',
      draws: 'Empates',
      teamAGoals: 'Golos Marcados Equipa A',
      teamBGoals: 'Golos Marcados Equipa B',
      h2hSummary: 'Resumo Histórico da Rivalidade',
      winPercentage: 'Taxa de Vitória',
      avgGoalsPerMatch: 'Média Golos / Jogo',
      goalDifference: 'Diferença de Golos',
      resetData: 'Repor Dados',
    },
  },

  'season-goals-tracker': {
    name: 'Monitor e Projeção de Golos da Época',
    tagline: 'Acompanhe a média de golos e projete os números finais e corrida à Bota de Ouro',
    description:
      'Acompanhe a média de golos por jogo, minutos por golo e projete o registo final ao longo de uma época completa de 38 jornadas.',
    formulaSummary: 'Golos/Jogo = Golos / Jogos | Projeção = Golos/Jogo × Total Jogos',
    intro:
      'O Monitor e Projeção de Golos acompanha o ritmo dos goleadores ou equipas, calcula a cadência de minutos por golo e projeta matematicamente o total de final de época para as contas de melhor marcador.',
    metricExplanation:
      'Um avançado com 10 golos em 12 jogos segue na rota de uma época de 31 golos. A análise da frequência por 90 minutos antecipa temporadas históricas.',
    interpretation:
      'Projeção de 30+ golos é nível de Bota de Ouro; 20–29 golos Avançado de Elite Mundial; 12–19 golos Titular Regular; menos de 10 golos Papel Secundário.',
    methodology:
      'Golos por Jogo = Golos / Jogos Realizados; Minutos por Golo = Minutos Totais / Golos; Projeção = Golos por Jogo × Total de Jogos da Época (38 por defeito).',
    footballContext:
      'Conquistar a Bota de Ouro europeia requer habitualmente entre 32 e 38 golos num campeonato de 38 jornadas (média de 0.85 a 1.00 golo/jogo).',
    faqs: [
      {
        question: 'A partir de que altura as projeções de golos ganham fiabilidade?',
        answer:
          'As projeções estabilizam a partir da 10ª a 12ª jornada (cerca de 900 minutos jogados), atenuando arranques atípicos.',
      },
      {
        question: 'Qual é um rácio minutos por golo de classe mundial?',
        answer:
          'Ficar abaixo dos 110 minutos por golo é excelente. Os maiores artilheiros mundiais (Haaland, Kane, Lewandowski) descem com frequência dos 85 min/golo.',
      },
      {
        question: 'Funciona com ligas de 34 jogos como a Bundesliga ou Primeira Liga?',
        answer:
          'Sim, o campo Total de Jogos da Época pode ser ajustado para 34 ou qualquer outra extensão de prova.',
      },
    ],
    labels: {
      matchesPlayed: 'Jogos Disputados no Campeonato',
      goalsScored: 'Golos Marcados',
      minutesPlayed: 'Minutos Totais Jogados',
      totalSeasonMatches: 'Total de Jogos na Época',
      projectedGoals: 'Golos Projetados no Final da Época',
      goalsPerGame: 'Golos / Jogo',
      minsPerGoal: 'Minutos / Golo',
      paceTier: 'Cadência e Escalão Goleador',
      resetData: 'Repor Monitor',
    },
  },

  'formation-analyzer': {
    name: 'Analisador Tático de Esquemas de Jogo',
    tagline: 'Avalie pontos fortes, debilidades e contramedidas táticas entre sistemas',
    description:
      'Analise esquemas táticos (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) para avaliar o controlo do meio-campo, solidez defensiva, perigo nas alas e pressão.',
    formulaSummary: 'Matriz de Equilíbrio Tático: Notas de Meio-campo, Defesa, Alas e Pressão',
    intro:
      'O Analisador Tático disseca os principais desenhos táticos (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) em quatro pilares vitais: Domínio do Meio-campo, Solidez Defensiva, Ameaça pelas Alas e Eficácia da Pressão Alta.',
    metricExplanation:
      'Os desenhos táticos formam linhas de passe triangulares, superioridades numéricas e coberturas de segurança. Escolher o controssistema certo neutraliza os pontos fortes do adversário.',
    interpretation:
      'Notas de 1 a 10 qualificam cada setor. Por exemplo, o 4-3-3 oferece enorme perigo nas alas (9/10) e pressão adiantada (9/10), mas requer empenho defensivo dos extremos.',
    methodology:
      'Matriz tática que afere a ocupação espacial face a padrões de densidade central, largura da linha recuada e gatilhos de pressão.',
    footballContext:
      'Treinadores de topo alternam frequentemente entre a disposição sem bola e com bola (ex: 4-4-2 defensivo que passa a 3-2-4-1 na fase de construção).',
    faqs: [
      {
        question: 'Qual a tática que oferece maior domínio no centro do terreno?',
        answer:
          'Sistemas com três médios-centro (4-3-3, 4-2-3-1, 3-5-2) garantem superioridade numérica natural contra duplas de meio-campo.',
      },
      {
        question: 'Como travam as defesas a 3 o 4-3-3?',
        answer:
          'O 3-5-2 emparelha os alas com os extremos adversários e mantém 3 centrais sobre o ponta-de-lança solitário, bloqueando o corredor central.',
      },
      {
        question: 'Qual a principal vulnerabilidade do clássico 4-4-2 em linha?',
        answer:
          'Pode ficar em inferioridade 2 contra 3 no miolo e sofre com médios-ofensivos que jogam no espaço entre linhas.',
      },
    ],
    labels: {
      selectFormation: 'Selecionar Esquema Tático',
      formationOverview: 'Perfil Tático do Sistema',
      midfieldControl: 'Controlo do Meio-campo',
      defensiveCompactness: 'Solidez e Bloco Defensivo',
      wideThreat: 'Perigo pelas Alas',
      pressingCapability: 'Capacidade de Pressão Alta',
      strengths: 'Pontos Fortes do Sistema',
      weaknesses: 'Vulnerabilidades Táticas',
      counterFormations: 'Controssistemas Recomendados',
      resetData: 'Repor Vista Tática',
    },
  },

  'pressing-intensity-calculator': {
    name: 'Calculadora de Intensidade de Pressão (PPDA)',
    tagline: 'Meça os Passes Permitidos por Ação Defensiva para determinar a altura do bloco',
    description:
      'Calcule o PPDA (Passes Allowed Per Defensive Action) para medir a agressividade sem bola e classificar o estilo defensivo, do Gegenpressing ao bloco baixo.',
    formulaSummary: 'PPDA = Passes Adversários nos 60% de Ataque / (Desarmes + Interceções + Faltas no Setor)',
    intro:
      'A Calculadora de Intensidade de Pressão (PPDA) apura os Passes Concedidos por Ação Defensiva nos 60% mais adiantados do terreno. Métrica de referência no futebol atual, o PPDA distingue a pressão sufocante do recuo em bloco baixo.',
    metricExplanation:
      'Um valor baixo de PPDA (<9.0) indica que o oponente dá pouquíssimos passes antes de sofrer um desarme ou interceção, sinal de pressão asfixiante. Um valor alto (>16.0) traduz um bloco recolhido.',
    interpretation:
      'PPDA < 8.5 : Gegenpressing Ultra-Agressivo (estilo Klopp/Guardiola); 8.5–11.5 : Pressão Alta Ativa; 11.6–15.5 : Bloco Médio; >15.5 : Bloco Baixo Passivo.',
    methodology:
      'PPDA = Passes Adversários nos 60% / (Desarmes no Setor + Interceções + Duelos/Faltas); Índice de Perigo em Recuperações = (Recuperações Altas × 1.5) + (Remates após Recuperação × 2.0).',
    footballContext:
      'As equipas europeias mais agressivas na pressão (Manchester City, Bayern Munique, Arsenal) apresentam um PPDA entre 7.5 e 9.5.',
    faqs: [
      {
        question: 'Porque significa um valor de PPDA mais baixo uma pressão mais forte?',
        answer:
          'O PPDA mede os passes que o adversário consegue trocar antes de sofrer uma intervenção. Menos passes permitidos = intervenção mais rápida e pressão mais intensa.',
      },
      {
        question: 'Que setor do campo é contabilizado no PPDA?',
        answer:
          'Os 60% mais adiantados do terreno (meio-campo adversário e terço central), excluindo ações no próprio terço defensivo.',
      },
      {
        question: 'Um PPDA baixo é sempre melhor do que um PPDA alto?',
        answer:
          'Não necessariamente. Equipas de contra-ataque utilizam deliberadamente um bloco médio com PPDA mais alto para atrair o rival e explorar o espaço nas costas.',
      },
    ],
    labels: {
      opponentPasses: 'Passes Adversários na Fase de Construção',
      tacklesInZone: 'Desarmes no Setor de Pressão',
      interceptionsInZone: 'Interceções no Setor',
      challengesInZone: 'Duelos / Faltas no Setor',
      highTurnovers: 'Recuperações Altas (<40m da baliza)',
      shotsFromTurnovers: 'Remates Nascidos de Recuperação Alta',
      calculatedPpda: 'Valor PPDA Calculado',
      defensiveStyle: 'Estilo de Pressão Defensiva',
      turnoverDanger: 'Perigo Criado em Recuperações',
      resetData: 'Repor Modelo PPDA',
    },
  },

  'set-piece-success-rate': {
    name: 'Taxa de Sucesso e Perigo em Bolas Paradas',
    tagline: 'Avalie a eficácia e índice de perigo em cantos, livres diretos, indiretos e penáltis',
    description:
      'Analise a eficácia em cantos, livres diretos, livres indiretos e grandes penalidades para apurar um Índice de Perigo em Bolas Paradas completo para equipas e especialistas.',
    formulaSummary: 'Pontuação de Ameaça = (Golos Canto% × 5) + (Remates Canto% × 0.4) + (Precisão LD% × 0.2) + (Golos LD% × 1.5) + (Golos LI% × 2.0) + (Penáltis% × 0.2)',
    intro:
      'A Calculadora de Bolas Paradas afere o aproveitamento em cantos, livres diretos, livres indiretos e penáltis para gerar um Índice Composto de Perigo (0–100) para equipas e marcadores especialistas.',
    metricExplanation:
      'As bolas paradas representam 25% a 35% de todos os golos no futebol sénior. Esquemas bem ensaiados e a perícia dos batedores decidem frequentemente finais e jogos equilibrados.',
    interpretation:
      'Índice >75 : Ameaça Máxima / Especialistas de Elite; 55–74 : Elevado Perigo; 35–54 : Médio; abaixo de 35 : Pouco Perigo.',
    methodology:
      'Remate em Canto % = (Remates / Cantos) × 100; Golo em Canto % = (Golos / Cantos) × 100; Conversão Remates Canto % = (Golos / Remates) × 100; Precisão Livre Direto % = (Remates Enquadrados / Livres) × 100; Golo Livre Direto % = (Golos / Livres) × 100; Golo Livre Indireto % = (Golos / Livres Indiretos) × 100; Conversão Penáltis % = (Convertidos / Marcados) × 100; Pontuação Composta ponderada.',
    footballContext:
      'Clubes de topo com treinadores especializados em lances de bola parada (como o Arsenal) superam 0.35 golos por jogo exclusivamente através destes esquemas.',
    faqs: [
      {
        question: 'Qual é uma boa taxa de remate em pontapés de canto?',
        answer:
          'Conseguir rematar à baliza em 28 a 35% dos cantos marcados é excelente, com uma taxa de golo entre 3% e 5% do total de cantos.',
      },
      {
        question: 'Qual é a taxa média de conversão de grandes penalidades?',
        answer:
          'No futebol europeu de primeira linha, a média histórica de sucesso em penáltis situa-se entre 76% e 79%. Os grandes especialistas ultrapassam os 90%.',
      },
      {
        question: 'Porque são preferidos os cantos com efeito para dentro?',
        answer:
          'A trajetória descendente em direção à baliza ataca o corredor de incerteza a 5 metros da linha, aumentando os remates em cerca de 18% face a trajetórias abertas.',
      },
    ],
    labels: {
      cornersTaken: 'Pontapés de Canto Marcados',
      shotsFromCorners: 'Remates Nascidos de Cantos',
      goalsFromCorners: 'Golos Marcados em Cantos',
      directFkTaken: 'Livres Diretos Marcados',
      directFkGoals: 'Golos de Livre Direto',
      indirectFkTaken: 'Livres Indiretos Cruzados',
      goalsFromIndirectFk: 'Golos de Livre Indireto',
      penaltiesAwarded: 'Grandes Penalidades a Favor',
      penaltiesConverted: 'Penáltis Convertidos',
      threatIndex: 'Índice de Perigo em Bolas Paradas',
      cornerShotRate: 'Remates em Cantos %',
      penaltyRate: 'Conversão de Grandes Penalidades %',
      threatLevel: 'Nível de Ameaça em Bolas Paradas',
      resetData: 'Repor Estatísticas',
    },
  },
};
