import { ToolTranslation } from '../../types';

export const esToolsData: Record<string, ToolTranslation> = {
  'player-performance-rater': {
    name: 'Calificador de Rendimiento del Jugador',
    tagline: 'Calcula la valoración global del partido en las 4 posiciones del fútbol',
    description:
      'Evalúa el rendimiento de los futbolistas por posición (POR, DEF, MED, DEL) mediante fórmulas ponderadas que integran goles, asistencias, precisión de pase, regates, entradas y métricas de tiro normalizadas a una escala de 100 puntos.',
    formulaSummary: 'Índice compuesto ponderado por posición normalizado a 100',
    intro:
      'El Calificador de Rendimiento calcula una nota global sobre 100 para cualquier jugador en las cuatro demarcaciones básicas: Portero (POR), Defensa (DEF), Centrocampista (MED) y Delantero (DEL). Evaluando producción ofensiva, retención de balón, duelos de regate e intervenciones defensivas con pesos específicos, esta herramienta ofrece una evaluación objetiva del impacto individual.',
    metricExplanation:
      'Las estadísticas tradicionales suelen infravalorar a mediocampistas que controlan el ritmo o a defensas que ganan duelos clave. Las valoraciones ajustadas por posición corrigen esto: el score de un mediocentro prioriza el pase y las entradas, mientras que el de un delantero depende de su pegada y eficacia goleadora.',
    interpretation:
      'Las calificaciones van de 0 a 100: 90–100 representa Clase Mundial (actuación estelar decisiva); 80–89 Excelente (dominio absoluto de su zona); 65–79 Bueno (rendimiento sólido y fiable); 50–64 Promedio (partido estándar sin brillo); y menos de 50 Flojo o Insuficiente.',
    methodology:
      'Ponderaciones por posición: DEL = (Goles × 3) + (Asistencias × 2) + (%TiroPuerta × 0.3) + (%Pase × 0.2) + (Regates × 1.5); MED = (Goles × 2) + (Asistencias × 2.5) + (%Pase × 0.4) + (Regates × 1.5) + (Entradas × 1.5); DEF = (Entradas × 3) + (%Pase × 0.4) + (Goles × 1.5) + (Asistencias × 1) + BonusPorteríaACero; POR = (%Pase × 0.5) + (Entradas × 2) + (Paradas × 3) + BonusPorteríaACero.',
    footballContext:
      'En el fútbol de élite europeo (LaLiga, Premier League, Champions League), la nota media de un titular suele oscilar entre 62 y 72. Mantener calificaciones de 80+ durante varias jornadas distingue a los aspirantes al Balón de Oro de los jugadores de rotación.',
    faqs: [
      {
        question: '¿Cómo se normaliza la puntuación de 0 a 100?',
        answer:
          'La fórmula suma las contribuciones estadísticas ponderadas según la posición y las ajusta contra los baremos profesionales, acotando el resultado final entre 10 y 99.',
      },
      {
        question: '¿Por qué los defensas y porteros se evalúan diferente a los delanteros?',
        answer:
          'Un central rara vez marca goles, pero su valor reside en los duelos ganados, despejes, precisión en salida y porterías a cero. El motor adapta los pesos matemáticos a cada rol táctico.',
      },
      {
        question: '¿Puede un jugador alcanzar una nota de 99 o 100 de Clase Mundial?',
        answer:
          'Sí. Actuaciones memorables con múltiples goles o asistencias, precisión de pase superior al 90%, regates exitosos y gran aporte defensivo elevan al jugador al rango de Clase Mundial (90+).',
      },
    ],
    labels: {
      positionPresets: 'Cargar Preajustes por Posición',
      fwdPreset: 'DEL Preajuste',
      midPreset: 'MED Preajuste',
      defPreset: 'DEF Preajuste',
      gkPreset: 'POR Preajuste',
      positionRole: 'Demarcación Táctica',
      goals: 'Goles Marcados',
      assists: 'Asistencias',
      passAccuracy: 'Precisión de Pase %',
      shotsOnTargetPercent: 'Tiros a Puerta %',
      dribbles: 'Regates Completados',
      tackles: 'Entradas Ganadas',
      saves: 'Paradas Realizadas',
      cleanSheet: 'Portería a Cero (+Bonus)',
      matchRating: 'Calificación del Partido',
      performanceTier: 'Nivel de Rendimiento',
      attackingImpact: 'Impacto Ofensivo',
      attackingImpactSub: 'Amenaza ponderada de gol, asistencia y tiro',
      defensiveWork: 'Aporte Defensivo',
      defensiveWorkSub: 'Entradas, duelos, intercepciones y paradas',
      resetValues: 'Restablecer Valores',
    },
  },

  'team-comparison': {
    name: 'Matriz Comparativa de Equipos',
    tagline: 'Comparación estadística directa de equipos en 7 métricas clave de rendimiento',
    description:
      'Compara dos clubes de fútbol en 7 categorías estadísticas fundamentales: goles por partido, posesión %, tiros a puerta, pases completados, entradas y córners para calcular el dominio total.',
    formulaSummary: 'Agregación de victorias: Dominio % = (Categorías Ganadas / 7) × 100',
    intro:
      'La Matriz Comparativa enfrenta a dos clubes en siete facetas cruciales del juego: capacidad goleadora, control de la posesión, volumen de tiro, precisión de pase, intensidad defensiva y peligro a balón parado.',
    metricExplanation:
      'Comparar equipos solo por su posición liguera oculta ventajas de estilo. Un equipo con 58% de posesión puede generar menos peligro que un bloque directo y letal al contragolpe. Esta matriz expone fortalezas y carencias reales.',
    interpretation:
      'El dominio se mide sobre las 7 categorías: 5+ victorias indican superioridad abrumadora; 4 victorias representan ventaja táctica; los empates 3–3 señalan choques sumamente equilibrados.',
    methodology:
      'Cada una de las 7 métricas se compara de forma individual. El equipo con mayor valor suma 1 punto de categoría. En caso de empate exacto, ninguno puntúa. Dominio % = (Ganadas / 7) × 100.',
    footballContext:
      'Los campeones europeos suelen promediar más de 2.2 goles/partido, más del 58% de posesión, más del 86% de acierto en el pase y más de 6 saques de esquina por encuentro.',
    faqs: [
      {
        question: '¿Cómo se calcula el dominio estadístico entre dos equipos?',
        answer:
          'Se evalúan 7 pilares: Goles/Partido, Posesión %, Tiros Totales, Tiros a Puerta, Precisión de Pase, Entradas y Córners. El Dominio % equivale a las categorías ganadas divididas por 7.',
      },
      {
        question: '¿Qué sucede si hay empate en una métrica?',
        answer:
          'Si ambos equipos registran exactamente la misma cifra, la categoría se declara Empate y ningún equipo suma el punto.',
      },
      {
        question: '¿Puede un equipo con menor posesión ganar el dominio global?',
        answer:
          'Sí. Un equipo reactivo que supere al rival en goles, tiros a puerta, entradas y saques de esquina ganará la comparativa demostrando mayor efectividad.',
      },
    ],
    labels: {
      teamAProfile: 'Perfil del Equipo A',
      teamBProfile: 'Perfil del Equipo B',
      teamName: 'Nombre del Equipo',
      goalsPerGame: 'Goles / Partido',
      possession: 'Posesión %',
      shotsPerGame: 'Tiros / Partido',
      shotsOnTargetPerGame: 'Tiros a Puerta / Partido',
      passAccuracy: 'Precisión de Pase %',
      tacklesPerGame: 'Entradas / Partido',
      cornersPerGame: 'Córners / Partido',
      dominanceSummary: 'Resumen de Dominio Estadístico',
      categoriesWon: 'Categorías Ganadas',
      drawCategories: 'Categorías Empatadas',
      headToHeadBreakdown: 'Desglose Métrica a Métrica',
      advantage: 'Ventaja',
      tied: 'Empatado',
      resetData: 'Restablecer Comparación',
    },
  },

  'pass-accuracy-calculator': {
    name: 'Calculador de Precisión y Calidad de Pase',
    tagline: 'Mide acierto de pase, precisión en balones largos y calidad creativa',
    description:
      'Calcula porcentajes de pase corto y largo junto a un Índice de Calidad de Pase que premia los pases clave y la distribución progresiva.',
    formulaSummary: 'Calidad = (Pase% × 0.6) + (Pases Clave × 2) + (BalónLargo% × 0.4)',
    intro:
      'Esta herramienta mide la precisión del pase corto, el acierto en balones largos y la calidad creativa de la distribución. En lugar de limitarse al porcentaje bruto —que puede inflarse con pases horizontales sin riesgo—, incorpora pases clave y cambios de juego progresivos.',
    metricExplanation:
      'Un jugador con 95% de pase que solo juega en corto hacia atrás aporta menos que un organizador con 82% que filtra 5 pases clave y conecta 8 balones largos de 40 metros. El Índice de Calidad equilibra seguridad y progresión.',
    interpretation:
      'Una puntuación de Calidad de 85+ corresponde a un pasador de élite (estilo Toni Kroos o Kevin De Bruyne); 70–84 indica un distribuidor fiable; 55–69 representa el promedio; y menos de 55 refleja escaso impacto.',
    methodology:
      'Precisión de Pase % = (Pases Acertados / Totales) × 100; Precisión Balón Largo % = (Largos Acertados / Intentados) × 100; Calidad de Pase = (Pase% × 0.60) + (Pases Clave × 2.0) + (Balón Largo% × 0.40).',
    footballContext:
      'Los mediocentros organizadores de élite promedian 88–93% de acierto general y 65–75% en balones largos. Los mediapuntas suelen rondar 78–84% debido al tráfico en el último tercio.',
    faqs: [
      {
        question: '¿Qué es el Índice de Calidad de Pase?',
        answer:
          'Es una métrica que combina la retención del balón (60%), la precisión en envíos largos (40%) y los pases clave de gol (+2 pts cada uno).',
      },
      {
        question: '¿Cuál es un buen porcentaje de pase en el fútbol profesional?',
        answer:
          'Los centrales promedian 88–94% por menor presión; los mediocentros 84–90%; y los extremos creativos 74–82% por la densidad defensiva rival.',
      },
      {
        question: '¿Cómo se evitan errores con valores en cero?',
        answer:
          'El algoritmo incluye protecciones matemáticas contra divisiones por cero, devolviendo 0.0% de forma segura si no se registran intentos.',
      },
    ],
    labels: {
      totalPasses: 'Pases Totales Intentados',
      completedPasses: 'Pases Completados',
      keyPasses: 'Pases Clave / Ocasiones Creadas',
      longBallsAttempted: 'Balones Largos Intentados',
      longBallsCompleted: 'Balones Largos Completados',
      qualityScore: 'Índice de Calidad de Pase',
      overallAccuracy: 'Precisión Global de Pase',
      longBallAccuracy: 'Precisión en Balones Largos',
      resetSample: 'Restablecer Datos de Muestra',
    },
  },

  'shot-conversion-rate': {
    name: 'Tasa de Conversión y Eficacia de Tiro',
    tagline: 'Analiza la letalidad rematadora, puntería y conversión de grandes ocasiones',
    description:
      'Mide la eficacia goleadora analizando la tasa de conversión sobre tiros totales, tiros a puerta y grandes ocasiones transformadas frente a falladas.',
    formulaSummary: 'Conversión % = (Goles / Tiros) × 100 | Gran Ocasión % = ((GO - GOM) / GO) × 100',
    intro:
      'El Calculador de Conversión y Eficacia de Tiro cuantifica la letalidad rematadora. Al comparar goles frente a tiros totales, remates a portería y grandes ocasiones, distingue a los rematadores de alto volumen de los delanteros verdaderamente clínicos.',
    metricExplanation:
      'Un delantero que anota 15 goles en 120 tiros tiene un 12.5% de eficacia, mientras que uno que marca 15 en 65 disparos alcanza el 23.1%. La alta conversión permite a los equipos ganar partidos trabados.',
    interpretation:
      'Una conversión general superior al 20% es de Clase Mundial; 14–19% es un rematador clínico por encima de la media; 9–13% es el promedio de los delanteros europeos; y menos de 9% refleja poca puntería o exceso de tiros lejanos de bajo xG.',
    methodology:
      'Tasa de Conversión % = (Goles / Tiros Totales) × 100; Conversión a Puerta % = (Goles / Tiros a Puerta) × 100; Conversión Grandes Ocasiones % = ((Grandes Ocasiones - Falladas) / Grandes Ocasiones) × 100.',
    footballContext:
      'Los ganadores de la Bota de Oro suelen registrar tasas de conversión de tiro del 20–25%. Erling Haaland y Harry Kane superan habitualmente el 22%.',
    faqs: [
      {
        question: '¿Qué se considera una tasa de conversión de clase mundial?',
        answer:
          'En las cinco grandes ligas, una conversión general superior al 20% es de nivel mundial. La media de los delanteros se sitúa entre el 11% y el 13%.',
      },
      {
        question: '¿Por qué importa más la conversión de grandes ocasiones que el tiro total?',
        answer:
          'Los delanteros a veces prueban desde lejos, bajando su promedio global, pero la efectividad en mano a mano y balones en área pequeña revela la verdadera compostura rematadora.',
      },
      {
        question: '¿En qué se diferencia la conversión a puerta de la conversión total?',
        answer:
          'La conversión total incluye tiros bloqueados y fuera, mientras que la conversión a puerta mide el porcentaje de disparos que exigieron al portero y terminaron en gol.',
      },
    ],
    labels: {
      totalShots: 'Tiros Totales Intentados',
      goalsScored: 'Goles Marcados',
      shotsOnTarget: 'Tiros a Puerta',
      bigChances: 'Grandes Ocasiones Recibidas',
      bigChancesMissed: 'Grandes Ocasiones Falladas',
      conversionRate: 'Tasa Global de Conversión',
      onTargetConversion: 'Conversión de Tiros a Puerta',
      bigChanceConversion: 'Conversión de Grandes Ocasiones',
      resetSample: 'Restablecer Muestra',
    },
  },

  'possession-impact-analyzer': {
    name: 'Analizador de Impacto de la Posesión',
    tagline: 'Mide la rentabilidad del balón, victorias logradas y peligro ofensivo',
    description:
      'Evalúa si el control del balón se traduce en resultados reales calculando el Porcentaje de Victoria, Goles por Partido y el Índice de Posesión Efectiva.',
    formulaSummary: 'Eficacia = (Victoria% / Posesión%) | Goles/Partido = Goles / Partidos',
    intro:
      'El Analizador de Impacto de la Posesión examina si el dominio de la pelota genera réditos deportivos. Al sintetizar posesión, porcentaje de victorias y goles por partido, desenmascara la posesión estéril frente a la posesión incisiva.',
    metricExplanation:
      'Tener el 70% del balón no sirve si se pasa en horizontal y se pierde 0-1 a la contra. Este índice premia a los equipos que convierten la posesión en ocasiones, goles y triunfos.',
    interpretation:
      'Un índice superior a 1.25 representa Posesión Altamente Incisiva; 0.90–1.24 refleja Control Equilibrado; menos de 0.90 señala Posesión Estéril (demasiado pase sin daño).',
    methodology:
      'Victoria % = (Victorias / Partidos) × 100; Goles por Partido = Goles / Partidos; Índice de Eficacia = Victoria % / Posesión %; Clasificación táctica según la matriz de umbrales.',
    footballContext:
      'Los equipos campeones de Pep Guardiola combinan posesión muy alta (>65%) con gran eficacia (>1.30), promediando más de 2.5 goles por encuentro.',
    faqs: [
      {
        question: '¿Qué es la posesión estéril en el fútbol moderno?',
        answer:
          'Ocurre cuando un equipo acumula altos porcentajes de posesión (>65%) en zonas no peligrosas pero no genera tiros a puerta, dando un índice de eficacia bajo (<0.85).',
      },
      {
        question: '¿Pueden los equipos de contragolpe tener alta eficacia de posesión?',
        answer:
          'Sí. Un equipo reactivo con 40% de posesión que gana el 65% de sus partidos alcanza un índice de 1.63, reflejando transiciones letales.',
      },
      {
        question: '¿Cuál es un buen objetivo de goles por partido?',
        answer:
          'Los candidatos a títulos de liga apuntan a 2.1 – 2.6 goles por partido. Para clasificar a Champions League se suele requerir >1.8.',
      },
    ],
    labels: {
      matchesPlayed: 'Partidos Analizados',
      wins: 'Victorias',
      draws: 'Empates',
      losses: 'Derrotas',
      goalsScored: 'Goles Marcados',
      averagePossession: 'Posesión Media %',
      efficiencyIndex: 'Índice de Eficacia de Posesión',
      winRate: 'Porcentaje de Victoria %',
      goalsPerGame: 'Goles / Partido',
      resetData: 'Restablecer Análisis',
    },
  },

  'player-form-index': {
    name: 'Índice de Forma del Jugador',
    tagline: 'Monitorea el momento en los últimos 5 partidos, tarjetas y regularidad',
    description:
      'Cuantifica el estado de forma reciente en 5 encuentros a través de goles, asistencias, notas medias, tarjetas amarillas/rojas y bonus de minutos jugados en escala a 10.0.',
    formulaSummary: 'Forma = Base(Goles×1.5 + Asist×1.2 + Nota×0.8) - Tarjetas + BonusMinutos',
    intro:
      'El Índice de Forma cuantifica la inercia de los últimos 5 partidos en una escala de 1.0 a 10.0. Combinando goles, asistencias, calificaciones, disciplina y minutos jugados, detecta rachas estelares y caídas de rendimiento.',
    metricExplanation:
      'Las estadísticas acumuladas de la temporada esconden las dinámicas cortas. Los managers de Fantasy y ojeadores necesitan un índice móvil de 5 partidos para saber quién está en su pico de confianza.',
    interpretation:
      'Un índice de 8.5–10.0 significa En Racha / Pico de Forma; 7.0–8.4 Forma Fuerte; 5.5–6.9 Rendimiento Estable; menos de 5.5 indica Bache o lastre disciplinario.',
    methodology:
      'Puntuación Base = (Goles × 1.5) + (Asistencias × 1.2) + (Nota Media × 0.80); Descuento Disciplinario = (Amarillas × 0.25) + (Rojas × 1.50); Bonus Minutos = (Minutos / 450) × 0.50; Índice = Acotar(Base - Descuento + Bonus, 1.0, 10.0).',
    footballContext:
      'Estar en gran forma (Índice > 8.0) suele traducirse en alta precisión de tiro, más ocasiones generadas y titularidades indiscutibles.',
    faqs: [
      {
        question: '¿Por qué se usa una ventana de 5 partidos?',
        answer:
          'Una muestra de 5 partidos (aprox. 450 minutos) es el estándar en analítica para capturar la inercia sin distorsionarse por un solo partido atípico.',
      },
      {
        question: '¿Cuánto penaliza una tarjeta roja directa?',
        answer:
          'Resta 1.5 puntos completos del índice por el grave perjuicio táctico y anímico que supone para el equipo.',
      },
      {
        question: '¿Jugar los 90 minutos completos mejora la puntuación?',
        answer:
          'Sí. El bonus de regularidad otorga hasta +0.50 puntos a los jugadores que disputan el máximo de 450 minutos en la muestra.',
      },
    ],
    labels: {
      goalsLast5: 'Goles en Últimos 5 Partidos',
      assistsLast5: 'Asistencias en Últimos 5 Partidos',
      avgRatingLast5: 'Nota Media (Últimos 5)',
      yellowCardsLast5: 'Tarjetas Amarillas (Últimos 5)',
      redCardsLast5: 'Tarjetas Rojas (Últimos 5)',
      minutesPlayedLast5: 'Minutos Jugados (Últimos 5)',
      formScore: 'Índice de Forma (5 Partidos)',
      status: 'Estado Actual de Momento',
      resetData: 'Restablecer Datos de Forma',
    },
  },

  'transfer-value-estimator': {
    name: 'Estimador de Valor de Mercado y Traspaso',
    tagline: 'Estima el precio de traspaso con curvas de edad, nivel de liga y contrato',
    description:
      'Calcula una estimación de mercado razonable (€M) según posición, curva de edad, goles/asistencias, coeficiente de liga, años de contrato e internacionalidades.',
    formulaSummary: 'Valor = Base × MultEdad × MultRendimiento × MultLiga × MultContrato + BonusInternacional',
    intro:
      'El Estimador de Valor de Traspaso calcula precios de mercado realistas en millones de euros (€M). Evaluando la curva de edad, posición, estadísticas ofensivas, prestigio de la liga, años de contrato e internacionalidades, establece una tasación objetiva.',
    metricExplanation:
      'En el fútbol actual, la duración del contrato y la edad influyen tanto en el precio como los goles. Un jugador de 22 años con 4 años de contrato tiene un valor exponencial frente a uno de 31 años en su último año.',
    interpretation:
      'El valor refleja el traspaso fijo estimado: >€100M representa Estrellas Mundiales; €50–99M Titulares de Champions League; €20–49M Jugadores Consolidados de Primera División.',
    methodology:
      'Valor Base fijado por posición. Multiplicadores: Curva de Edad (pico a los 23–26 años), Rendimiento (goles/asistencias), Coeficiente de Liga (Premier League 1.6x, LaLiga/Serie A/Bundesliga 1.3x, etc.), Factor Contrato (4+ años 1.3x; 1 año 0.6x) y Bonus por Internacionalidades (€0.2M/partido).',
    footballContext:
      'Los atacantes y extremos desequilibrantes comandan las mayores primas en el mercado internacional de fichajes.',
    faqs: [
      {
        question: '¿Por qué el tiempo de contrato influye tanto en el valor?',
        answer:
          'Al entrar en los últimos 12 meses de contrato, el club vendedor pierde poder de negociación ante el riesgo de salida libre (Ley Bosman), reduciendo el precio un 40–50%.',
      },
      {
        question: '¿A qué edad alcanza su punto máximo el valor de un jugador?',
        answer:
          'Las curvas estadísticas alcanzan su cénit entre los 23 y los 26 años, donde coinciden el auge físico y el valor de reventa a largo plazo.',
      },
      {
        question: '¿Se incluyen variables y bonus por rendimiento?',
        answer:
          'El cálculo estima el importe fijo garantizado. Los bonus por objetivos suelen sumar entre un 15% y un 25% adicional.',
      },
    ],
    labels: {
      position: 'Posición',
      age: 'Edad del Jugador',
      goalsThisSeason: 'Goles esta Temporada',
      assistsThisSeason: 'Asistencias esta Temporada',
      leagueTier: 'Nivel de Liga Nacional',
      contractRemaining: 'Años de Contrato Restantes',
      internationalCaps: 'Partidos con Selección Absoluta',
      estimatedValue: 'Valor de Mercado Estimado',
      valuationTier: 'Nivel de Tasación',
      ageMultiplier: 'Multiplicador Curva de Edad',
      leagueMultiplier: 'Multiplicador de Liga',
      resetData: 'Restablecer Modelo',
    },
  },

  'wage-calculator': {
    name: 'Calculador de Salario y Estructura Salarial',
    tagline: 'Calcula el salario anual bruto, el sueldo semanal efectivo y primas de rendimiento',
    description:
      'Modela la retribución completa: sueldo base semanal (52 semanas), primas por partido, bonus por goles e incentivos por portería a cero en £, € o $.',
    formulaSummary: 'Anual = (Base Semanal × 52) + (Partidos × Prima Partido) + (Goles × Prima Gol) + (Porterías a Cero × Prima CS)',
    intro:
      'El Calculador de Salarios modela paquetes retributivos de jugadores combinando el salario base semanal garantizado con primas variables por partidos disputados, goles marcados y porterías a cero.',
    metricExplanation:
      'Los contratos modernos combinan salario base garantizado e incentivos por rendimiento. Esta herramienta desglosa el equilibrio exacto entre retribución fija e incentivos variables.',
    interpretation:
      'Indica los ingresos brutos anuales totales, el sueldo semanal efectivo ponderado a 52 semanas y el desglose porcentual entre salario fijo y variables.',
    methodology:
      'Salario Anual Base = Sueldo Semanal × 52; Primas por Partido = Prima Partido × Partidos; Primas por Gol = Prima Gol × Goles; Primas por Portería a Cero = Prima CS × Porterías a Cero; Ingresos Totales = Base Anual + Primas; Sueldo Semanal Efectivo = Ingresos Totales / 52.',
    footballContext:
      'Los grandes clubes europeos destinan entre el 55% y el 70% de sus ingresos anuales a la masa salarial. Los contratos por objetivos protegen a los clubes mientras premian el rendimiento.',
    faqs: [
      {
        question: '¿Cómo se calcula el sueldo semanal efectivo?',
        answer:
          'Divide los ingresos anuales brutos totales (salario base garantizado + total de primas ganadas) entre 52 semanas.',
      },
      {
        question: '¿Por qué se modelan las primas de partido y de gol por separado?',
        answer:
          'La estructura contractual diferencia cláusulas específicas para titulares habituales, delanteros goleadores y defensas para reflejar fielmente los contratos reales.',
      },
      {
        question: '¿Cuál es la proporción habitual entre salario fijo y primas?',
        answer:
          'En las grandes ligas europeas, el salario base garantizado suele representar entre el 75% y el 85% de la retribución total, mientras que las primas suponen el 15% al 25% restante.',
      },
    ],
    labels: {
      currency: 'Moneda',
      baseWeeklyWage: 'Sueldo Semanal Base',
      appearanceFee: 'Prima por Partido Jugado',
      matchesPlayed: 'Partidos Jugados en la Temporada',
      goalBonus: 'Prima por Gol Marcado',
      goalsScored: 'Goles Marcados',
      cleanSheetBonus: 'Prima por Portería a Cero',
      cleanSheetsKept: 'Porterías a Cero Logradas',
      totalAnnualEarnings: 'Ingresos Anuales Totales',
      effectiveWeeklyWage: 'Sueldo Semanal Efectivo',
      baseAnnualSalary: 'Salario Base Anual',
      totalPerformanceBonuses: 'Total Primas por Rendimiento',
      resetData: 'Restablecer Modelo Salarial',
    },
  },

  'squad-value-calculator': {
    name: 'Calculador de Valor y Profundidad de Plantilla',
    tagline: 'Suma el valor total del plantel, reparto por líneas y equilibrio financiero',
    description:
      'Calcula el valor de mercado total del equipo, la tasación media por jugador y el desglose por demarcaciones (Porteros, Defensas, Centrocampistas, Delanteros).',
    formulaSummary: 'Valor Total = Σ(Valores de Jugadores) | Índice de Equilibrio',
    intro:
      'El Calculador de Valor y Profundidad de Plantilla analiza el patrimonio deportivo de un club, el valor medio de sus integrantes y la distribución del presupuesto entre portería, defensa, mediocampo y delantera.',
    metricExplanation:
      'Una plantilla con €500M en atacantes pero solo €40M en defensas padece un desbalance estructural crítico. Esta herramienta permite verificar si la inversión está repartida armónicamente.',
    interpretation:
      'Un reparto equilibrado en un club de élite suele destinar aprox. 8–12% a Porteros, 28–35% a Defensas, 28–35% a Centrocampistas y 30–40% a Delanteros.',
    methodology:
      'Valor Total = Suma de valores individuales; Porcentaje por Línea = (Valor Línea / Valor Total) × 100; Puntuación de equilibrio comparada con plantillas campeonas.',
    footballContext:
      'Las plantillas campeonas de Champions League y Premier League superan habitualmente los €800M–€1.2B en valor total de mercado.',
    faqs: [
      {
        question: '¿Cuál es la distribución ideal del valor por posiciones?',
        answer:
          'Aproximadamente 10% en portería, 30% en defensa, 30% en mediocampo y 30% en delantera para evitar debilidades tácticas.',
      },
      {
        question: '¿Cuántos futbolistas deben computarse en el primer equipo?',
        answer:
          'Una plantilla profesional estándar cuenta con 22 a 25 futbolistas (dos por puesto más 3 comodines especializados).',
      },
      {
        question: '¿Garantiza el mayor valor de plantilla ganar títulos?',
        answer:
          'En ligas largas de 38 jornadas existe una correlación muy alta (r > 0.85), aunque en torneos de eliminación directa influye mucho la variabilidad del partido.',
      },
    ],
    labels: {
      addPlayer: 'Añadir Jugador a la Plantilla',
      playerName: 'Nombre del Jugador',
      position: 'Posición',
      marketValue: 'Valor de Mercado (€M)',
      totalSquadValue: 'Valor Total de la Plantilla',
      avgPlayerValue: 'Valor Medio por Jugador',
      squadSize: 'Tamaño de Plantilla',
      positionBreakdown: 'Distribución por Posiciones',
      resetSquad: 'Restablecer Plantilla',
    },
  },

  'contract-worth-analyzer': {
    name: 'Analizador de Contratos y Amortización FFP',
    tagline: 'Calcula la amortización contable anual y el compromiso financiero total',
    description:
      'Calcula la amortización anual del traspaso, el coste salarial acumulado y el impacto contable anual para el cumplimiento del Fair Play Financiero (FFP).',
    formulaSummary: 'Amortización Anual = Traspaso / Años Contrato | Coste Total = Traspaso + (Sueldo × 52 × Años)',
    intro:
      'El Analizador de Contratos y Amortización calcula el coste real de un fichaje. Evaluando la amortización lineal del traspaso, los salarios acumulados, primas de fichaje y comisiones de agentes, proyecta el impacto anual en las cuentas del club para el control económico.',
    metricExplanation:
      'Los traspasos no se imputan de golpe en la contabilidad, sino que se amortizan en partes iguales durante el contrato (hasta un máximo de 5 años por norma UEFA). Un fichaje de €100M a 5 años supone €20M/año de amortización que se suman a su salario anual.',
    interpretation:
      'El Impacto Anual en Cuentas es el parámetro clave: un jugador con €18M de amortización y €12M de sueldo genera un gasto anual de €30M en la cuenta de pérdidas y ganancias.',
    methodology:
      'Amortización Anual = Traspaso / Duración (tope 5 años UEFA); Coste Salarial Anual = Sueldo Semanal × 52; Coste Total Contrato = Traspaso + (Sueldo Anual × Años) + Prima Fichaje + Comisión; Cargo Contable Anual = Amortización + Sueldo Anual.',
    footballContext:
      'Las normativas de control económico de LaLiga y la Premier League sancionan excesos con deducción de puntos y bloqueos de inscripción de futbolistas.',
    faqs: [
      {
        question: '¿Qué es la amortización de un traspaso en el fútbol?',
        answer:
          'Es dividir el coste del fichaje a partes iguales entre los años de contrato. Un traspaso de €80M a 5 años computa a razón de €16M anuales.',
      },
      {
        question: '¿Por qué limitó la UEFA la amortización a 5 años?',
        answer:
          'En 2023 se limitó a 5 años para cerrar el resquicio de contratos de 8 o 9 años que reducían artificialmente el gasto contable anual.',
      },
      {
        question: '¿Qué ocurre si el jugador se vende antes de finalizar su contrato?',
        answer:
          'El valor neto contable pendiente se resta del precio de venta para determinar la plusvalía o minusvalía contable inmediata.',
      },
    ],
    labels: {
      transferFee: 'Precio del Traspaso (€M)',
      contractYears: 'Duración del Contrato (Años)',
      weeklyWage: 'Sueldo Semanal Base',
      signingBonus: 'Prima de Fichaje (€M)',
      agentFee: 'Comisión de Agente / Intermediario (€M)',
      annualAmortization: 'Amortización Anual del Traspaso',
      totalCostToClub: 'Compromiso Financiero Total',
      annualBudgetImpact: 'Impacto Contable Anual',
      amortizationSchedule: 'Calendario Plurianual de Amortización',
      resetData: 'Restablecer Modelo',
    },
  },

  'fantasy-football-points': {
    name: 'Calculador de Puntos Fantasy Football',
    tagline: 'Estimación analítica de puntos Fantasy por posición',
    description:
      'Estima los puntos Fantasy de una jornada según goles, asistencias, portería a cero, contribución defensiva (CBIT/CBIRT), paradas, penaltis, tarjetas y minutos jugados.',
    formulaSummary: 'Modelo analítico Fantasy por posición (POR/DEF/MED/DEL)',
    intro:
      'El Calculador de Puntos Fantasy proporciona una estimación analítica de la puntuación obtenida por un jugador según su rendimiento en el partido para cada posición.',
    metricExplanation:
      'Cada posición cuenta con un baremo específico: porteros (10 pts por gol), defensas (6 pts por gol, 4 pts portería a cero, bonus defensivo a partir de 10 CBIT), mediocampistas (5 pts por gol, bonus a partir de 12 CBIRT) y delanteros (4 pts por gol, bonus a partir de 12 CBIRT).',
    interpretation:
      'Una marca de 12+ puntos es una jornada sobresaliente de doble dígito (ideal para capitán); 6–9 puntos es una contribución sólida; 2–4 puntos es presencia estándar.',
    methodology:
      'Reglamento Fantasy: 60+ mins jugados (+2), 1-59 mins (+1); Goles (POR +10, DEF +6, MED +5, DEL +4); Asistencias (+3); Portería a cero (POR/DEF +4, MED +1); Contribución defensiva (+2 si DEF >= 10 CBIT o MED/DEL >= 12 CBIRT); Penaltis parados (+5); Penaltis fallados (-2); Paradas (1 pt por cada 3); Amarilla (-1); Roja (-3); Goles en propia (-2); Bonus BPS (+1 a +3).',
    footballContext:
      'Los cracks de Fantasy aspiran a promediar 6.0+ puntos por encuentro a lo largo de las 38 jornadas.',
    faqs: [
      {
        question: '¿Suman los mediocampistas puntos por portería a cero?',
        answer:
          'Sí, suman +1 punto por mantener su arco a cero si juegan al menos 60 minutos.',
      },
      {
        question: '¿Cómo funciona el bonus de contribución defensiva?',
        answer:
          'Los defensas suman +2 puntos al alcanzar 10 acciones CBIT (despejes, tiros bloqueados, intercepciones, entradas). Los mediocampistas y delanteros suman +2 puntos con 12 acciones CBIRT (incluyendo recuperaciones de balón).',
      },
      {
        question: '¿Cómo puntúan las paradas de los porteros?',
        answer:
          'Los guardametas suman +1 punto adicional por cada 3 paradas realizadas durante el partido.',
      },
      {
        question: '¿Qué ocurre con doble amarilla y expulsión?',
        answer:
          'El jugador recibe -3 puntos por la tarjeta roja (que sustituye a la deducción individual de las amarillas).',
      },
    ],
    labels: {
      position: 'Posición del Jugador',
      minutesPlayed: 'Minutos Jugados',
      goalsScored: 'Goles Marcados',
      assists: 'Asistencias',
      cleanSheet: 'Portería a Cero',
      cbitActions: 'Acciones Defensivas CBIT (Defensas)',
      cbirtActions: 'Acciones Defensivas CBIRT (Medios / Delanteros)',
      goalsConceded: 'Goles Encajados',
      saves: 'Paradas Realizadas',
      penaltySaves: 'Penaltis Parados',
      penaltyMisses: 'Penaltis Fallados',
      yellowCards: 'Tarjetas Amarillas',
      redCards: 'Tarjetas Rojas',
      ownGoals: 'Goles en Propia Puerta',
      bonusPoints: 'Puntos Bonus (BPS)',
      totalPoints: 'Puntos Totales de la Jornada',
      pointBreakdown: 'Desglose de Puntuación',
      resetData: 'Restablecer Calculador',
    },
  },

  'best-xi-selector': {
    name: 'Optimizador de Once Ideal y Formación',
    tagline: 'Selecciona el once titular óptimo en 6 formaciones según forma y precio',
    description:
      'Introduce tu lista de futbolistas con sus notas de forma y precios Fantasy para configurar automáticamente la mejor alineación en 4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 3-4-3 o 5-3-2.',
    formulaSummary: 'Maximización de eficiencia forma/precio sujeta a cuotas tácticas por posición',
    intro:
      'El Optimizador de Once Ideal selecciona el equipo más competitivo de tu lista cumpliendo las restricciones tácticas de cada formación y los límites de presupuesto.',
    metricExplanation:
      'Armar un once ganador exige combinar figuras caras con jugadores de bajo coste y gran rendimiento. Esta herramienta analiza múltiples sistemas para encontrar el esquema de mayor retorno.',
    interpretation:
      'Muestra el once titular optimizado con su puntuación de forma prevista y el coste total ajustado al tope salarial.',
    methodology:
      'Optimización lineal que maximiza la suma de forma de los jugadores respetando las cuotas de cada esquema táctico y el presupuesto disponible.',
    footballContext:
      'Las alineaciones con 3 delanteros (4-3-3, 3-4-3) maximizan el potencial ofensivo en jornadas favorables, mientras que un 5-3-2 aprovecha bonus defensivos.',
    faqs: [
      {
        question: '¿Qué formación ofrece mayor potencial de puntos?',
        answer:
          'El 3-4-3 y el 3-5-2 suelen ofrecer los techos de puntuación más altos al priorizar centrocampistas y atacantes con llegada.',
      },
      {
        question: '¿Cómo gestiona el límite de presupuesto?',
        answer:
          'Calcula el ratio de puntos por millón de coste para encontrar la combinación más eficiente bajo el límite fijado.',
      },
      {
        question: '¿Puedo personalizar los nombres y valores de los jugadores?',
        answer:
          'Sí, puedes editar nombres, costes, forma y posiciones directamente en la tabla inferior.',
      },
    ],
    labels: {
      formation: 'Seleccionar Formación Táctica',
      budgetLimit: 'Límite de Presupuesto (£M / €M)',
      playerPool: 'Lista de Jugadores Disponibles',
      addPlayer: 'Añadir Jugador a la Lista',
      optimalXi: 'Once Titular Optimizado',
      projectedTotalForm: 'Forma Total Proyectada',
      totalCost: 'Coste Total de la Alineación',
      resetPool: 'Restablecer Lista',
    },
  },

  'captain-pick-analyzer': {
    name: 'Analizador de Elección de Capitán',
    tagline: 'Comparador algorítmico de capitanía según forma, dificultad y precedentes',
    description:
      'Compara candidatos a capitán mediante un algoritmo ponderado: estado de forma (30%), facilidad del calendario (25%), ventaja de campo (15%), historial directo (15%) y poder ofensivo del equipo (15%).',
    formulaSummary: 'Puntuación de Capitanía = (Forma × 30%) + (Calendario × 25%) + (Localía × 15%) + (Historial × 15%) + (Ataque Equipo × 15%)',
    intro:
      'El Analizador de Capitán compara aspirantes al brazalete mediante un algoritmo que integra estado de forma (30%), facilidad del rival (25%), factor campo (15%), historial directo (15%) y fuerza ofensiva del equipo (15%) para calcular una Puntuación de Capitanía StatKick (0–100).',
    metricExplanation:
      'Elegir al capitán adecuado duplica sus puntos y es la decisión de mayor impacto en el Fantasy. Guiarse solo por la intuición cuesta puntos valiosos.',
    interpretation:
      'Una Puntuación >80 señala un Capitán Indispensable; 65–79 es un Fuerte Candidato; 50–64 es una Alternativa Diferencial de Riesgo; menos de 50 No es Recomendable.',
    methodology:
      'Puntuación de Capitanía = (Forma × 10 × 0.30) + ((6 - FDR) / 5 × 100 × 0.25) + (Local=100/Visitante=50 × 0.15) + (Retorno Histórico × 0.15) + (Fuerza Ataque Equipo × 0.15).',
    footballContext:
      'Los managers expertos eligen como capitán a jugadores locales ante rivales de la zona baja en más del 70% de las ocasiones.',
    faqs: [
      {
        question: '¿Por qué la localía pondera un 15%?',
        answer:
          'Los equipos locales marcan entre un 20% y un 30% más de goles históricamente, elevando la probabilidad de grandes puntuaciones.',
      },
      {
        question: '¿Qué es el FDR (Fixture Difficulty Rating)?',
        answer:
          'Es una escala del 1 (rival muy asequible como local) al 5 (el rival más difícil de la liga como visitante).',
      },
      {
        question: '¿Cuándo conviene arriesgar con un capitán diferencial?',
        answer:
          'Para remontar diferencias de puntos en la fase final de la liga, apostar por un diferencial con buen índice permite recortar distancias.',
      },
    ],
    labels: {
      candidateA: 'Candidato A',
      candidateB: 'Candidato B',
      candidateC: 'Candidato C (Opcional)',
      playerName: 'Nombre del Jugador',
      currentForm: 'Forma Actual (1–10)',
      fdr: 'Dificultad de Partido (FDR 1-5)',
      venue: 'Sede del Partido',
      home: 'Partido en Casa (Local)',
      away: 'Partido Fuera (Visitante)',
      historyReturn: 'Retorno Histórico vs Rival',
      captaincyVerdict: 'Recomendación de Capitanía',
      captainIndex: 'Puntuación de Capitanía StatKick',
      resetData: 'Restablecer Candidatos',
    },
  },

  'transfer-suggestion': {
    name: 'Motor de Estrategia de Fichajes Fantasy',
    tagline: 'Evalúa traspasos de venta frente a compra para maximizar puntos netos',
    description:
      'Analiza un traspaso evaluando la diferencia de forma, el calendario de los próximos 3 partidos, el impacto en presupuesto y la ganancia esperada de puntos.',
    formulaSummary: 'Valor Neto = (FormaEntrante - FormaSaliente) + (FDRSaliente - FDREntrante) × 1.2 + EficienciaPrecio',
    intro:
      'El Motor de Fichajes Fantasy evalúa operaciones de compra/venta considerando estados de forma, dificultad de los próximos 3 encuentros y remanente presupuestario para proyectar la ganancia neta de puntos.',
    metricExplanation:
      'Fichar solo por los puntos de la jornada anterior suele ser un error. Este modelo analiza el calendario futuro para confirmar si la operación justifica el gasto.',
    interpretation:
      'Una ganancia superior a +3.0 indica Traspaso Altamente Recomendado; +1.0 a +2.9 es Fichaje Positivo; 0.0 a +0.9 es Movimiento Marginal; valores negativos desaconsejan el cambio.',
    methodology:
      'Índice = (Forma Entrante - Forma Saliente) × 1.2 + (FDR 3 Partidos Saliente - FDR Entrante) × 1.5 + Factor de Eficiencia de Presupuesto.',
    footballContext:
      'Fichar jugadores que inician una racha de 4+ partidos ante defensas débiles es la estrategia más rentable en Fantasy.',
    faqs: [
      {
        question: '¿Merece la pena asumir una penalización de -4 puntos por fichar?',
        answer:
          'Solo si el jugador entrante tiene un índice superior a +3.5 y se prevé que supere al saliente por al menos 5 puntos en las próximas 3 jornadas.',
      },
      {
        question: '¿Por qué se evalúa un horizonte de 3 partidos?',
        answer:
          'Una sola jornada tiene mucha variabilidad; planificar a 3-5 semanas optimiza el valor de cada cambio gratuito.',
      },
      {
        question: '¿Cómo influye el dinero sobrante en caja?',
        answer:
          'El motor valora la liquidez liberada para reforzar otras líneas de la plantilla.',
      },
    ],
    labels: {
      transferOut: 'Jugador a Vender (Sale)',
      transferIn: 'Jugador a Fichar (Entra)',
      playerNameOut: 'Nombre Jugador (Sale)',
      sellingPrice: 'Precio de Venta (£M)',
      formOut: 'Índice de Forma (1–10)',
      fdrOut: 'FDR Próximos 3 (Media)',
      playerNameIn: 'Nombre Jugador (Entra)',
      purchasePrice: 'Precio de Compra (£M)',
      formIn: 'Índice de Forma (1–10)',
      fdrIn: 'FDR Próximos 3 (Media)',
      bankMoney: 'Dinero Disponible en Caja (£M)',
      transferVerdict: 'Evaluación del Traspaso',
      netGainScore: 'Puntuación de Ventaja Neta',
      budgetImpact: 'Saldo Final en Caja',
      resetData: 'Restablecer Evaluación',
    },
  },

  'league-table-simulator': {
    name: 'Simulador de Clasificación y Puntos de Liga',
    tagline: 'Simula jornadas restantes para proyectar título, Europa y descenso',
    description:
      'Introduce puntos actuales, partidos pendientes y previsiones de victorias/empates/derrotas para calcular puntuaciones finales, opciones de título y permanencia.',
    formulaSummary: 'Puntos Finales = Puntos Actuales + (Victorias × 3) + (Empates × 1)',
    intro:
      'El Simulador de Clasificación proyecta la tabla final de la temporada, los cortes de puestos europeos (Champions League, Europa League) y los puntos de salvación.',
    metricExplanation:
      'La lucha por el campeonato y la permanencia se define en el calendario restante. Esta herramienta permite proyectar los escenarios matemáticos de cada club.',
    interpretation:
      'Muestra la clasificación final proyectada con el campeón simulado, clasificados continentales y los puestos de descenso.',
    methodology:
      'Puntos Proyectados = Puntos Actuales + (Victorias × 3) + (Empates × 1). En caso de empate a puntos, se ordena por diferencia de goles estimada.',
    footballContext:
      'En una liga de 38 jornadas, entre 88 y 92 puntos garantizan el título, 70–74 aseguran Champions y 38–40 puntos marcan el umbral habitual de salvación.',
    faqs: [
      {
        question: '¿Cuántos puntos se necesitan históricamente para ganar la liga?',
        answer:
          'En las grandes ligas europeas, los campeones promedian unos 89 puntos en la última década.',
      },
      {
        question: '¿Sigue vigente la regla de los 40 puntos para salvar la categoría?',
        answer:
          'Aunque 40 puntos es la referencia clásica, en 8 de las últimas 10 temporadas bastaron entre 36 y 38 puntos para no descender.',
      },
      {
        question: '¿Cómo se desempatan los equipos con igual puntuación?',
        answer:
          'Se utiliza la diferencia de goles global como criterio principal de desempate en la simulación.',
      },
    ],
    labels: {
      teamName: 'Nombre del Equipo',
      currentPoints: 'Puntos Actuales',
      gamesRemaining: 'Partidos Restantes',
      projWins: 'Victorias Proyectadas',
      projDraws: 'Empates Proyectados',
      projLosses: 'Derrotas Proyectadas',
      projectedPoints: 'Puntos Finales Proyectados',
      champions: 'Campeón Simulado',
      uclZone: 'Zona Champions League',
      relegationZone: 'Zona de Descenso',
      simulateTable: 'Simular Clasificación',
      resetTable: 'Restablecer Tabla',
    },
  },

  'points-needed-calculator': {
    name: 'Calculador de Puntos Necesarios',
    tagline: 'Calcula las victorias y empates exactos para ser campeón, entrar en Champions o salvarse',
    description:
      'Determina las combinaciones matemáticas de victorias y empates en los partidos restantes para alcanzar un objetivo (Título, Champions, Europa League, Permanencia).',
    formulaSummary: 'Brecha = Puntos Objetivo - Puntos Actuales | % Victoria Requerido',
    intro:
      'El Calculador de Puntos Necesarios calcula todas las combinaciones posibles de victorias, empates y derrotas tolerables en las jornadas restantes para cumplir los objetivos de la temporada.',
    metricExplanation:
      'Saber que se necesitan 14 puntos en 7 jornadas resulta abstracto. Esta herramienta desglosa las combinaciones exactas (p. ej. 4 victorias, 2 empates, 1 derrota) y el porcentaje de efectividad requerido.',
    interpretation:
      'Indica la viabilidad del objetivo (Alcanzable, Muy Difícil, Matemáticamente Imposible) y lista cada combinación viable.',
    methodology:
      'Puntos Requeridos = Objetivo - Actuales; Puntos Máximos = Partidos × 3; Comprueba viabilidad y genera todas las combinaciones (V, E) donde (V×3 + E×1) >= Puntos Requeridos.',
    footballContext:
      'Necesitar más del 75% de victorias en las últimas 8 jornadas rara vez se consigue sin pinchazos continuos de los rivales directos.',
    faqs: [
      {
        question: '¿Qué ocurre si los puntos necesarios superan el máximo en juego?',
        answer:
          'La herramienta marcará de inmediato el objetivo como "Matemáticamente Imposible" e indicará el déficit de puntos.',
      },
      {
        question: '¿Cuál es un porcentaje de victoria asumible en el tramo final?',
        answer:
          'Un porcentaje requerido inferior al 50% es muy asequible para equipos de zona media-alta; superar el 70% exige ritmo de campeón.',
      },
      {
        question: '¿Se pueden probar puntuaciones personalizadas?',
        answer:
          'Sí, puedes seleccionar los objetivos predefinidos (Título = 88 pts, Top 4 = 72 pts, Permanencia = 38 pts) o escribir la cifra que desees.',
      },
    ],
    labels: {
      targetGoal: 'Objetivo de Temporada',
      customTarget: 'Puntos Objetivo Deseados',
      currentPoints: 'Puntos Actuales',
      matchesRemaining: 'Partidos Restantes',
      pointsNeeded: 'Puntos Necesarios',
      maxAvailable: 'Puntos Máximos Disponibles',
      requiredWinRate: '% de Victorias Requerido',
      targetStatus: 'Viabilidad del Objetivo',
      viableCombinations: 'Combinaciones Viables (V / E)',
      resetData: 'Restablecer Calculador',
    },
  },

  'head-to-head-stats': {
    name: 'Matriz Histórica de Enfrentamientos Directos (H2H)',
    tagline: 'Historial de rivalidad, victorias, goles y dominio entre dos clubes',
    description:
      'Analiza el balance histórico entre dos equipos de fútbol: porcentaje de victorias, empates, promedio de goles y diferencia de goles.',
    formulaSummary: 'Victoria % = (Victorias / Partidos) × 100 | Diferencia de Goles por Partido',
    intro:
      'La Matriz Histórica de Enfrentamientos analiza los duelos directos entre dos clubes a lo largo de su historia. Calcula porcentajes de victoria, empates y balance goleador medio para evaluar la dimensión psicológica del emparejamiento.',
    metricExplanation:
      'Los historiales cara a cara reflejan rivalidades, bestias negras y ventajas tácticas que la clasificación liguera del momento no siempre refleja.',
    interpretation:
      'Un porcentaje de victorias >55% demuestra clara superioridad histórica; 40–54% señala máxima igualdad; empates >35% indican duelos trabados.',
    methodology:
      'Victoria % = (Victorias / Partidos) × 100; Empate % = (Empates / Partidos) × 100; Goles por Partido = Goles Totales / Partidos.',
    footballContext:
      'Los grandes derbies (El Clásico, Derbi Madrileño, Gran Derbi) suelen romper los pronósticos de la tabla por la tensión emocional del encuentro.',
    faqs: [
      {
        question: '¿Por qué el historial directo a veces contradice la tabla actual?',
        answer:
          'Ciertos estilos de juego (como bloques bajos muy estrechos frente a equipos asociativos) incomodan sistemáticamente a determinados rivales.',
      },
      {
        question: '¿Cuántos goles se promedian en los grandes derbies europeos?',
        answer:
          'Los grandes clásicos promedian entre 2.7 y 3.1 goles por partido, ganando el equipo local alrededor del 44% de las veces.',
      },
      {
        question: '¿Cuántos partidos se recomiendan para una muestra fiable?',
        answer:
          'Una muestra de 6 a 12 partidos recientes refleja la era táctica actual manteniendo consistencia estadística.',
      },
    ],
    labels: {
      teamAName: 'Nombre Equipo A',
      teamBName: 'Nombre Equipo B',
      totalMatches: 'Partidos Totales Jugados',
      teamAWins: 'Victorias Equipo A',
      teamBWins: 'Victorias Equipo B',
      draws: 'Empates',
      teamAGoals: 'Goles Equipo A',
      teamBGoals: 'Goles Equipo B',
      h2hSummary: 'Resumen de Rivalidad Histórica',
      winPercentage: 'Porcentaje de Victoria',
      avgGoalsPerMatch: 'Goles Medios / Partido',
      goalDifference: 'Diferencia de Goles',
      resetData: 'Restablecer Datos',
    },
  },

  'season-goals-tracker': {
    name: 'Monitor y Proyección de Goles de Temporada',
    tagline: 'Proyecta la cifra final de goles y ritmo de cara al Pichichi y Bota de Oro',
    description:
      'Monitorea el ritmo goleador por partido, minutos por gol y proyecta el registro goleador final a lo largo de una temporada de 38 jornadas.',
    formulaSummary: 'Goles/Partido = Goles / Partidos | Proyección = Goles/Partido × Partidos Totales',
    intro:
      'El Monitor y Proyección de Goles sigue la trayectoria realizadora de jugadores o equipos, calcula la frecuencia de minutos por gol y proyecta la cifra final de la temporada y las metas de galardones como el Pichichi o la Bota de Oro.',
    metricExplanation:
      'Un jugador con 10 goles en 12 partidos lleva ritmo de 31 goles en liga. Monitorizar el ratio de goles por 90 minutos permite anticipar temporadas de récord o prever regresiones a la media.',
    interpretation:
      'Proyectar 30+ goles es temporada de Bota de Oro; 20–29 goles es Delantero de Élite Mundial; 12–19 es Titular Fiable; menos de 10 es Rol Secundario.',
    methodology:
      'Goles por Partido = Goles / Partidos Jugados; Minutos por Gol = Minutos Totales / Goles; Proyección = Goles por Partido × Partidos Totales de Liga (38 por defecto).',
    footballContext:
      'Ganar la Bota de Oro europea suele exigir entre 32 y 38 goles en ligas de 38 partidos (un ritmo de 0.85 a 1.00 goles/partido).',
    faqs: [
      {
        question: '¿A partir de qué jornada se estabiliza la proyección?',
        answer:
          'Las proyecciones ganan solidez tras 10–12 jornadas disputadas (unos 900 minutos), disipando rachas iniciales engañosas.',
      },
      {
        question: '¿Cuál es un ratio de minutos por gol de clase mundial?',
        answer:
          'Bajar de 110 minutos por gol es excelente. Los goleadores históricos (Haaland, Messi, Cristiano, Lewandowski) han llegado a bajar de los 75 mins/gol.',
      },
      {
        question: '¿Es compatible con ligas de 34 jornadas como la Bundesliga?',
        answer:
          'Sí, puedes cambiar los Partidos Totales a 34 o cualquier otra duración de torneo.',
      },
    ],
    labels: {
      matchesPlayed: 'Partidos Jugados en Liga',
      goalsScored: 'Goles Marcados',
      minutesPlayed: 'Minutos Totales Jugados',
      totalSeasonMatches: 'Partidos Totales de Temporada',
      projectedGoals: 'Goles Proyectados al Final',
      goalsPerGame: 'Goles / Partido',
      minsPerGoal: 'Minutos / Gol',
      paceTier: 'Ritmo Goleador Proyectado',
      resetData: 'Restablecer Monitor',
    },
  },

  'formation-analyzer': {
    name: 'Analizador Táctico de Formaciones',
    tagline: 'Evalúa fortalezas, debilidades y emparejamientos tácticos entre sistemas',
    description:
      'Analiza formaciones (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) para medir control del medio, solidez defensiva, peligro por bandas y presión alta.',
    formulaSummary: 'Matriz de Equilibrio Táctico: Puntuaciones en Mediocampo, Defensa, Bandas y Presión',
    intro:
      'El Analizador Táctico desglosa los principales sistemas de juego (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 3-4-3, 5-3-2) en cuatro dimensiones esenciales: Control de la Medular, Solidez Defensiva, Amenaza por Bandas y Capacidad de Presión Alta, señalando sistemas contrarios idóneos.',
    metricExplanation:
      'Los esquemas tácticos no son números estáticos; definen triángulos de pase, superioridades en banda y estructuras de contención. Elegir el contra-esquema adecuado neutraliza el punto fuerte del adversario.',
    interpretation:
      'Las notas sobre 10 evalúan el balance por zonas. Por ejemplo, el 4-3-3 ofrece gran peligro por banda (9/10) y presión alta (9/10), pero puede sufrir a la espalda de sus extremos si no repliegan.',
    methodology:
      'Matriz táctica que evalúa la ocupación espacial de la formación frente a referencias de densidad en el centro, anchura de la zaga y activación de la presión.',
    footballContext:
      'Los entrenadores modernos varían de dibujo según tengan o no el balón (p. ej. defender en 4-4-2 e iniciar salida en 3-2-4-1).',
    faqs: [
      {
        question: '¿Qué formación garantiza mayor dominio en el centro del campo?',
        answer:
          'Los esquemas con tres mediocentros como 4-3-3, 4-2-3-1 y 3-5-2 generan superioridad numérica natural ante medulares de dos hombres.',
      },
      {
        question: '¿Cómo contrarrestan las líneas de 3 centrales al 4-3-3?',
        answer:
          'El 3-5-2 empareja a sus carrileros con los extremos rivales y mantiene 3 centrales contra el delantero centro, cerrando espacios interiores.',
      },
      {
        question: '¿Cuál es la debilidad principal del 4-4-2 tradicional?',
        answer:
          'Puede verse en inferioridad 3 contra 2 en el medio y sufre ante mediapuntas que juegan entre líneas.',
      },
    ],
    labels: {
      selectFormation: 'Seleccionar Formación Táctica',
      formationOverview: 'Perfil Táctico del Esquema',
      midfieldControl: 'Control del Mediocampo',
      defensiveCompactness: 'Solidez y Bloque Defensivo',
      wideThreat: 'Peligro en Bandas',
      pressingCapability: 'Capacidad de Presión Alta',
      strengths: 'Puntos Fuertes del Sistema',
      weaknesses: 'Vulnerabilidades Tácticas',
      counterFormations: 'Sistemas Antídoto Recomendados',
      resetData: 'Restablecer Vista Táctica',
    },
  },

  'pressing-intensity-calculator': {
    name: 'Calculador de Intensidad de Presión (PPDA)',
    tagline: 'Mide los Pases Permitidos por Acción Defensiva para evaluar la presión alta',
    description:
      'Calcula el PPDA (Passes Allowed Per Defensive Action) para medir la agresividad sin balón y catalogar el estilo defensivo desde la presión asfixiante al bloque bajo.',
    formulaSummary: 'PPDA = Pases Rivales en 60% Ataque / (Entradas + Intercepciones + Faltas en Zona)',
    intro:
      'El Calculador de Intensidad de Presión (PPDA) computa los Pases Permitidos por Acción Defensiva en el 60% ofensivo del campo. Como métrica estándar en el fútbol profesional, el PPDA distingue la presión alta agresiva del repliegue en bloque medio o bajo.',
    metricExplanation:
      'Un valor bajo de PPDA (<9.0) significa que el rival da muy pocos pases antes de sufrir una entrada, corte o falta, señalando una presión alta implacable. Un PPDA alto (>16.0) refleja un equipo que espera replegado.',
    interpretation:
      'PPDA < 8.5 indica Presión Asfixiante (estilo Klopp/Guardiola); 8.5–11.5 Presión Alta Activa; 11.6–15.5 Contención en Bloque Medio; >15.5 Bloque Bajo.',
    methodology:
      'PPDA = Pases Rivales en Zona Defensiva / (Entradas + Intercepciones + Disputas en Zona); Índice de Peligro tras Recuperación = (Recuperaciones Altas × 1.5) + (Tiros tras Recuperación × 2.0).',
    footballContext:
      'Los equipos europeos más intensos en presión (p. ej. Manchester City, Bayern Múnich, Arsenal) registran PPDA entre 7.5 y 9.5.',
    faqs: [
      {
        question: '¿Por qué un número más bajo de PPDA indica mayor presión?',
        answer:
          'Porque mide cuántos pases concede tu equipo antes de morder y hacer una acción defensiva. Menos pases permitidos = presión más rápida.',
      },
      {
        question: '¿Qué parte del campo se contabiliza en el PPDA?',
        answer:
          'Se mide el 60% más adelantado del campo (campo rival y zona media), excluyendo las acciones cerca de tu propia portería.',
      },
      {
        question: '¿Es siempre mejor un PPDA bajo que uno alto?',
        answer:
          'No necesariamente. Equipos de contragolpe letal usan deliberadamente bloques medios con PPDA más alto para atraer al rival y atacar el espacio a la espalda.',
      },
    ],
    labels: {
      opponentPasses: 'Pases del Rival en su Zona Defensiva',
      tacklesInZone: 'Entradas en Zona de Presión',
      interceptionsInZone: 'Intercepciones en la Zona',
      challengesInZone: 'Disputas / Faltas en la Zona',
      highTurnovers: 'Recuperaciones en Campo Rival (<40m)',
      shotsFromTurnovers: 'Tiros tras Recuperación Alta',
      calculatedPpda: 'Puntuación PPDA Calculada',
      defensiveStyle: 'Arquetipo Defensivo de Presión',
      turnoverDanger: 'Peligro tras Recuperación',
      resetData: 'Restablecer Modelo PPDA',
    },
  },

  'set-piece-success-rate': {
    name: 'Tasa de Éxito y Peligro a Balón Parado',
    tagline: 'Evalúa la efectividad y peligro en córners, faltas directas, indirectas y penaltis',
    description:
      'Analiza la eficacia en saques de esquina, tiros libres directos, faltas indirectas y penaltis para generar un Índice de Peligro a Balón Parado para equipos y especialistas.',
    formulaSummary: 'Puntuación de Peligro = (Goles Córner% × 5) + (Tiros Córner% × 0.4) + (Precisión FLD% × 0.2) + (Goles FLD% × 1.5) + (Goles FLI% × 2.0) + (Penaltis% × 0.2)',
    intro:
      'El Calculador de Éxito a Balón Parado analiza la efectividad en saques de esquina, faltas directas, faltas indirectas y penaltis para calcular un Índice Compuesto de Peligro (0–100) para equipos y lanzadores especialistas.',
    metricExplanation:
      'Las jugadas a balón parado generan entre el 25% y el 35% de los goles en el fútbol de élite. La pizarra, los centros cerrados y la fiabilidad desde los once metros deciden eliminatorias y ligas.',
    interpretation:
      'Un índice >75 señala Peligro Máximo / Especialistas de Élite; 55–74 indica Rendimiento Notable; 35–54 Nivel Medio; menos de 35 Escaso Peligro.',
    methodology:
      'Tiro tras Córner % = (Remates / Córners) × 100; Gol tras Córner % = (Goles / Córners) × 100; Conversión Remates Córner % = (Goles / Remates) × 100; Precisión Falta Directa % = (Tiros a Puerta / Faltas) × 100; Gol Falta Directa % = (Goles / Faltas) × 100; Gol Falta Indirecta % = (Goles / Faltas Indirectas) × 100; Conversión Penaltis % = (Marcados / Lanzados) × 100; Puntuación Compuesta ponderada.',
    footballContext:
      'Los equipos con entrenadores dedicados a balón parado (como el Arsenal de Arteta) superan los 0.35 goles por partido solo en jugadas ensayadas.',
    faqs: [
      {
        question: '¿Cuál es una buena tasa de remate en saques de esquina?',
        answer:
          'Una buena ejecución genera remate en el 28–35% de los saques de esquina, con una tasa de gol del 3–5% respecto al total botado.',
      },
      {
        question: '¿Cuál es la tasa media de acierto en penaltis en el fútbol profesional?',
        answer:
          'En las grandes ligas y Champions League, el porcentaje histórico de acierto desde el punto de penalti se sitúa entre el 76% y el 79%.',
      },
      {
        question: '¿Por qué se prefieren los córners con rosca hacia dentro (cerrados)?',
        answer:
          'Curvan la trayectoria hacia el área pequeña, en el pasillo de incertidumbre para el portero, aumentando el remate un 18% frente a los abiertos.',
      },
    ],
    labels: {
      cornersTaken: 'Córners Lanzados',
      shotsFromCorners: 'Remates Generados de Córner',
      goalsFromCorners: 'Goles Nacidos de Córner',
      directFkTaken: 'Faltas Directas Lanzadas',
      directFkGoals: 'Goles de Falta Directa',
      indirectFkTaken: 'Faltas Indirectas Colgadas',
      goalsFromIndirectFk: 'Goles de Falta Indirecta',
      penaltiesAwarded: 'Penaltis a Favor Lanzados',
      penaltiesConverted: 'Penaltis Transformados',
      threatIndex: 'Índice de Peligro a Balón Parado',
      cornerShotRate: 'Remate tras Córner %',
      penaltyRate: 'Conversión de Penaltis %',
      threatLevel: 'Nivel de Peligro a Balón Parado',
      resetData: 'Restablecer Estadísticas',
    },
  },
};
