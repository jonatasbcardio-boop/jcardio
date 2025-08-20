// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Dados dos Estudos ---
    // Os percentis são armazenados como um objeto onde a chave é a idade (ou o ponto médio da faixa etária),
    // e o valor é um objeto contendo os valores do escore de cálcio para cada percentil.
    // Os dados brutos podem conter inconsistências que serão corrigidas pelas funções de ajuste.
    const studyData = {
        deRonde: {
            female: {
                western: [
                    { age: 37.5, range: [35, 39], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 2, '95': 6 } },
                    { age: 42.5, range: [40, 44], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 5, '95': 17 } },
                    { age: 47.5, range: [45, 49], percentiles: { '10': 0, '25': 0, '50': 0, '75': 1, '90': 20, '95': 55 } },
                    { age: 52.5, range: [50, 54], percentiles: { '10': 0, '25': 0, '50': 0, '75': 4, '90': 51, '95': 98 } },
                    { age: 57.5, range: [55, 59], percentiles: { '10': 0, '25': 0, '50': 0, '75': 20, '90': 126, '95': 236 } },
                    { age: 62.5, range: [60, 64], percentiles: { '10': 0, '25': 0, '50': 2, '75': 57, '90': 199, '95': 448 } },
                    { age: 67.5, range: [65, 69], percentiles: { '10': 0, '25': 0, '50': 15, '75': 123, '90': 352, '95': 598 } },
                    { age: 72.5, range: [70, 74], percentiles: { '10': 0, '25': 2, '50': 42, '75': 210, '90': 544, '95': 952 } },
                    { age: 77.5, range: [75, 79], percentiles: { '10': 0, '25': 13, '50': 121, '75': 419, '90': 911, '95': 1633 } },
                ],
                asian: [
                    { age: 37.5, range: [35, 39], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 0, '95': 0 } },
                    { age: 42.5, range: [40, 44], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 3, '95': 4 } },
                    { age: 47.5, range: [45, 49], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 1, '95': 6 } },
                    { age: 52.5, range: [50, 54], percentiles: { '10': 0, '25': 0, '50': 0, '75': 3, '90': 12, '95': 42 } },
                    { age: 57.5, range: [55, 59], percentiles: { '10': 0, '25': 0, '50': 0, '75': 50, '90': 112, '95': 221 } },
                    { age: 62.5, range: [60, 64], percentiles: { '10': 0, '25': 0, '50': 23, '75': 96, '90': 183, '95': 352 } },
                    { age: 67.5, range: [65, 69], percentiles: { '10': 0, '25': 0, '50': 6, '75': 98, '90': 311, '95': 514 } },
                    { age: 72.5, range: [70, 74], percentiles: { '10': 0, '25': 0, '50': 41, '75': 146, '90': 409, '95': 476 } },
                    { age: 77.5, range: [75, 79], percentiles: { '10': 11, '25': 52, '50': 80, '75': 150, '90': 236, '95': 150 } },
                ],
            },
            male: {
                western: [
                    { age: 37.5, range: [35, 39], percentiles: { '10': 0, '25': 0, '50': 1, '75': 2, '90': 14, '95': 42 } },
                    { age: 42.5, range: [40, 44], percentiles: { '10': 0, '25': 0, '50': 0, '75': 8, '90': 51, '95': 114 } },
                    { age: 47.5, range: [45, 49], percentiles: { '10': 0, '25': 0, '50': 2, '75': 32, '90': 141, '95': 280 } },
                    { age: 52.5, range: [50, 54], percentiles: { '10': 0, '25': 0, '50': 11, '75': 92, '90': 291, '95': 586 } },
                    { age: 57.5, range: [55, 59], percentiles: { '10': 0, '25': 2, '50': 38, '75': 198, '90': 538, '95': 966 } },
                    { age: 62.5, range: [60, 64], percentiles: { '10': 0, '25': 9, '50': 94, '75': 381, '90': 851, '95': 1341 } },
                    { age: 67.5, range: [65, 69], percentiles: { '10': 0, '25': 24, '50': 163, '75': 569, '90': 1139, '95': 1794 } },
                    { age: 72.5, range: [70, 74], percentiles: { '10': 0, '25': 48, '50': 254, '75': 781, '90': 1493, '95': 2428 } },
                    { age: 77.5, range: [75, 79], percentiles: { '10': 2, '25': 109, '50': 434, '75': 1123, '90': 1934, '95': 2799 } },
                ],
                asian: [
                    { age: 37.5, range: [35, 39], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 1, '95': 5 } },
                    { age: 42.5, range: [40, 44], percentiles: { '10': 0, '25': 0, '50': 0, '75': 0, '90': 17, '95': 59 } },
                    { age: 47.5, range: [45, 49], percentiles: { '10': 0, '25': 0, '50': 0, '75': 3, '90': 49, '95': 117 } },
                    { age: 52.5, range: [50, 54], percentiles: { '10': 0, '25': 0, '50': 23, '75': 121, '90': 228, '95': 410 } },
                    { age: 57.5, range: [55, 59], percentiles: { '10': 0, '25': 0, '50': 5, '75': 63, '90': 221, '95': 410 } },
                    { age: 62.5, range: [60, 64], percentiles: { '10': 0, '25': 0, '50': 25, '75': 124, '90': 352, '95': 586 } },
                    { age: 67.5, range: [65, 69], percentiles: { '10': 0, '25': 2, '50': 50, '75': 215, '90': 537, '95': 796 } },
                    { age: 72.5, range: [70, 74], percentiles: { '10': 0, '25': 16, '50': 100, '75': 321, '90': 681, '95': 936 } },
                    { age: 77.5, range: [75, 79], percentiles: { '10': 0, '25': 1, '50': 104, '75': 464, '90': 807, '95': 1195 } },
                ],
            },
        },
        mcclelland: {
            female: {
                white: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 0, '90': 8, '95': 31 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 0, '75': 16, '90': 102, '95': 209 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 0, '50': 13, '75': 119, '90': 391, '95': 674 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 20, '50': 106, '75': 370, '90': 921, '95': 1535 } },
                ],
                chinese: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 0, '90': 12, '95': 44 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 0, '75': 18, '90': 105, '95': 213 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 0, '50': 5, '75': 70, '90': 246, '95': 436 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 0, '50': 32, '75': 146, '90': 398, '95': 656 } },
                ],
                black: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 0, '90': 9, '95': 38 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 0, '75': 5, '90': 74, '95': 173 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 0, '50': 0, '75': 77, '90': 310, '95': 561 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 0, '50': 47, '75': 214, '90': 582, '95': 953 } },
                ],
                hispanic: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 0, '90': 2, '95': 18 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 0, '75': 2, '90': 50, '95': 118 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 0, '50': 1, '75': 51, '90': 203, '95': 361 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 0, '50': 45, '75': 205, '90': 557, '95': 917 } },
                ],
            },
            male: {
                white: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 22, '90': 110, '95': 207 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 28, '75': 155, '90': 452, '95': 743 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 21, '50': 145, '75': 540, '90': 1345, '95': 2271 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 103, '50': 385, '75': 1200, '90': 2933, '95': 4619 } },
                ],
                chinese: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 14, '90': 89, '95': 184 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 5, '75': 67, '90': 242, '95': 429 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 0, '50': 34, '75': 174, '90': 487, '95': 803 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 11, '50': 81, '75': 305, '90': 769, '95': 1299 } },
                ],
                black: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 2, '90': 45, '95': 105 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 0, '50': 0, '75': 40, '90': 173, '95': 318 } },
                    { age: 69.5, range: [65, 74], percentiles: { '25': 0, '50': 32, '75': 191, '90': 575, '95': 945 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 23, '50': 141, '75': 516, '90': 1281, '95': 2176 } },
                ],
                hispanic: [
                    { age: 49.5, range: [45, 54], percentiles: { '25': 0, '50': 0, '75': 9, '90': 88, '95': 195 } },
                    { age: 59.5, range: [55, 64], percentiles: { '25': 3, '50': 75, '75': 291, '90': 512, '95': 746.6 } }, // CORRIGIDO
                    { age: 69.5, range: [65, 74], percentiles: { '25': 56, '50': 247, '75': 666, '90': 1091, '95': 1943 } },
                    { age: 79.5, range: [75, 84], percentiles: { '25': 153, '50': 494, '75': 1221, '90': 1943, '95': 2198.8 } }, // CORRIGIDO
                ],
            },
        },
        javaid: {
            female: {
                white: [
                    { age: 30, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 4 } },
                    { age: 31, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 5 } },
                    { age: 32, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 7 } },
                    { age: 33, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 7 } },
                    { age: 34, percentiles: { '75': 0, '90': 0, '95': 1, '97.5': 8 } },
                    { age: 35, percentiles: { '75': 0, '90': 0, '95': 1, '97.5': 10 } },
                    { age: 36, percentiles: { '75': 0, '90': 0, '95': 2, '97.5': 10 } },
                    { age: 37, percentiles: { '75': 0, '90': 0, '95': 2, '97.5': 11 } },
                    { age: 38, percentiles: { '75': 0, '90': 0, '95': 2, '97.5': 12 } },
                    { age: 39, percentiles: { '75': 0, '90': 0, '95': 3, '97.5': 15 } },
                    { age: 40, percentiles: { '75': 0, '90': 0, '95': 4, '97.5': 21 } },
                    { age: 41, percentiles: { '75': 0, '90': 0, '95': 5, '97.5': 27 } },
                    { age: 42, percentiles: { '75': 0, '90': 0, '95': 8, '97.5': 37 } },
                    { age: 43, percentiles: { '75': 0, '90': 0, '95': 10, '97.5': 47 } },
                    { age: 44, percentiles: { '75': 0, '90': 0, '95': 12, '97.5': 64 } },
                    { age: 45, percentiles: { '75': 0, '90': 0, '95': 12, '97.5': 76 } },
                ],
                black: [
                    { age: 30, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 0 } },
                    { age: 31, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 0 } },
                    { age: 32, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 0 } },
                    { age: 33, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 0 } },
                    { age: 34, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 1 } },
                    { age: 35, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 2 } },
                    { age: 36, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 3 } },
                    { age: 37, percentiles: { '75': 0, '90': 0, '95': 1, '97.5': 7 } },
                    { age: 38, percentiles: { '75': 0, '90': 0, '95': 1, '97.5': 10 } },
                    { age: 39, percentiles: { '75': 0, '90': 0, '95': 2, '97.5': 16 } },
                    { age: 40, percentiles: { '75': 0, '90': 0, '95': 5, '97.5': 23 } },
                    { age: 41, percentiles: { '75': 0, '90': 0, '95': 8, '97.5': 30 } },
                    { age: 42, percentiles: { '75': 0, '90': 0, '95': 9, '97.5': 36 } },
                    { age: 43, percentiles: { '75': 0, '90': 0, '95': 11, '97.5': 41 } },
                    { age: 44, percentiles: { '75': 0, '90': 0, '95': 13, '97.5': 40 } },
                    { age: 45, percentiles: { '75': 0, '90': 0, '95': 12, '97.5': 37 } },
                ],
            },
            male: {
                white: [
                    { age: 30, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 2 } },
                    { age: 31, percentiles: { '75': 0, '90': 0, '95': 1, '97.5': 9 } },
                    { age: 32, percentiles: { '75': 0, '90': 0, '95': 4, '97.5': 18 } },
                    { age: 33, percentiles: { '75': 0, '90': 0, '95': 9, '97.5': 29 } },
                    { age: 34, percentiles: { '75': 0, '90': 1, '95': 15, '97.5': 40 } },
                    { age: 35, percentiles: { '75': 0, '90': 3, '95': 21, '97.5': 55 } },
                    { age: 36, percentiles: { '75': 0, '90': 5, '95': 29, '97.5': 68 } },
                    { age: 37, percentiles: { '75': 0, '90': 8, '95': 35, '97.5': 80 } },
                    { age: 38, percentiles: { '75': 0, '90': 11, '95': 41, '97.5': 96 } },
                    { age: 39, percentiles: { '75': 0, '90': 15, '95': 47, '97.5': 100 } },
                    { age: 40, percentiles: { '75': 0, '90': 18, '95': 53, '97.5': 111 } },
                    { age: 41, percentiles: { '75': 0, '90': 21, '95': 59, '97.5': 125 } },
                    { age: 42, percentiles: { '75': 0, '90': 26, '95': 72, '97.5': 146 } },
                    { age: 43, percentiles: { '75': 1, '90': 32, '95': 83, '97.5': 166 } },
                    { age: 44, percentiles: { '75': 3, '90': 43, '95': 105, '97.5': 190 } },
                    { age: 45, percentiles: { '75': 5, '90': 55, '95': 131, '97.5': 249 } },
                ],
                black: [
                    { age: 30, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 5 } },
                    { age: 31, percentiles: { '75': 0, '90': 0, '95': 0, '97.5': 9 } },
                    { age: 32, percentiles: { '75': 0, '90': 0, '95': 1, '97.5': 5 } },
                    { age: 33, percentiles: { '75': 0, '90': 0, '95': 2, '97.5': 8 } },
                    { age: 34, percentiles: { '75': 0, '90': 0, '95': 3, '97.5': 12 } },
                    { age: 35, percentiles: { '75': 0, '90': 0, '95': 4, '97.5': 16 } },
                    { age: 36, percentiles: { '75': 0, '90': 0, '95': 6, '97.5': 24 } },
                    { age: 37, percentiles: { '75': 0, '90': 1, '95': 10, '97.5': 35 } },
                    { age: 38, percentiles: { '75': 0, '90': 2, '95': 14, '97.5': 42 } },
                    { age: 39, percentiles: { '75': 0, '90': 3, '95': 17, '97.5': 47 } },
                    { age: 40, percentiles: { '75': 0, '90': 5, '95': 26, '97.5': 64 } },
                    { age: 41, percentiles: { '75': 0, '90': 7, '95': 33, '97.5': 82 } },
                    { age: 42, percentiles: { '75': 0, '90': 9, '95': 42, '97.5': 96 } },
                    { age: 43, percentiles: { '75': 0, '90': 12, '95': 54, '97.5': 119 } },
                    { age: 44, percentiles: { '75': 0, '90': 22, '95': 85, '97.5': 175 } },
                    { age: 45, percentiles: { '75': 0, '90': 36, '95': 138, '97.5': 277 } },
                ],
            },
        },
    };

    // --- Dados Ajustados (para interpolação e gráfico) ---
    // Este objeto será preenchido após aplicar as regras de ajuste aos dados brutos.
    let adjustedStudyData = {};

    // --- 2. Disclaimers e Referências MLA ---
    const disclaimers = {
        deRonde: {
            text: "Os percentis apresentados neste calculador são baseados em uma análise agrupada de múltiplos estudos, visando maior generalização em comparação com estudos únicos. Eles fornecem uma medida de risco mais aplicável a uma população mais ampla, especialmente para indivíduos sub-representados em estudos anteriores (mulheres, jovens e idosos, e indivíduos asiáticos). <strong>População:</strong> Análise agrupada de dados de 134.336 ocidentais (provenientes dos EUA, Brasil, Alemanha e Islândia) e 33.488 asiáticos (principalmente da Coreia e Japão), todos assintomáticos e sem histórico de doença cardiovascular.",
            citation: "De Ronde, M. W. J., et al. (2020). A pooled-analysis of age and sex based coronary artery calcium scores percentiles. *Journal of Cardiovascular Computed Tomography*, 14(5), 414-420. doi:10.1016/j.jcct.2020.01.006"
        },
        mcclelland: {
            text: "Os percentis apresentados são derivados do Multi-Ethnic Study of Atherosclerosis (MESA), um estudo longitudinal de grande escala. Eles permitem examinar se um paciente possui um escore de cálcio elevado em relação a outros da mesma idade, sexo e etnia que não apresentam doença cardiovascular clínica ou diabetes tratado. É importante notar que as diferenças étnicas na distribuição do CAC são significativas. <strong>População:</strong> 6.110 adultos multiétnicos (brancos, negros, hispânicos e chineses-americanos) recrutados de seis comunidades nos EUA, com idades entre 45 e 84 anos, livres de doença cardiovascular clínica e diabetes tratado.",
            citation: "McClelland, R. L., Chung, H., Detrano, R., Post, W., & Kronmal, R. A. (2006). Distribution of Coronary Artery Calcium by Race, Gender, and Age: Results from the Multi-Ethnic Study of Atherosclerosis (MESA). *Circulation*, 113(1), 30-37. doi:10.1161/circulationaha.105.580696"
        },
        javaid: {
            text: "Este calculador fornece os primeiros percentis de escore de cálcio coronariano baseados em idade, sexo e raça para jovens adultos (30-45 anos), preenchendo uma lacuna crítica na prática clínica. Embora qualquer escore de cálcio em jovens seja anormal, os percentis ajudam a interpretar o quão alto é o escore de um indivíduo em relação aos seus pares correspondentes por idade, sexo e raça. <strong>População:</strong> 19.725 indivíduos assintomáticos, majoritariamente negros e brancos dos EUA, com idades entre 30 e 45 anos, provenientes de três grandes conjuntos de dados (CARDIA, CAC Consortium e Walter Reed Cohort), sem doença cardiovascular aterosclerótica conhecida.",
            citation: "Javaid, A., Dardari, Z. A., Mitchell, J. D., Whelton, S. P., Dzaye, O., Lima, J. A. C., ... & Blaha, M. J. (2022). Distribution of Coronary Artery Calcium by Age, Sex, and Race Among Patients 30-45 Years Old. *Journal of the American College of Cardiology*, 79(19), 1873-1886. doi:10.1016/j.jacc.2022.02.051"
        }
    };

    // --- 3. Mapeamentos e Referências UI ---
    const elements = {
        studySelect: document.getElementById('studySelect'),
        calculatorForm: document.getElementById('calculatorForm'),
        calciumScoreInput: document.getElementById('calciumScore'),
        ageLabel: document.getElementById('ageLabel'), 
        ageSelect: document.getElementById('age'),     
        genderSelect: document.getElementById('gender'),
        ethnicityGroup: document.getElementById('ethnicityGroup'),
        ethnicitySelect: document.getElementById('ethnicity'),
        calculateButton: document.getElementById('calculateButton'),
        percentileResult: document.getElementById('percentileResult'),
        chartDiv: document.getElementById('chart'),
        chartLegendDiv: document.getElementById('chartLegend'),
        disclaimerText: document.getElementById('disclaimerText'),
        tableContainer: document.getElementById('tableContainer'),
        tableTitle: document.getElementById('tableTitle'),
        tableExplanation: document.getElementById('tableExplanation'),
        tableBody: document.getElementById('tableBody'),
    };

    const ethnicityOptions = {
        deRonde: {
            male: [
                { value: 'western', text: 'Ocidental' },
                { value: 'asian', text: 'Asiática' },
            ],
            female: [
                { value: 'western', text: 'Ocidental' },
                { value: 'asian', text: 'Asiática' },
            ],
        },
        mcclelland: {
            male: [
                { value: 'white', text: 'Branca' },
                { value: 'chinese', text: 'Chinesa' },
                { value: 'black', text: 'Negra' },
                { value: 'hispanic', text: 'Hispânica' },
            ],
            female: [
                { value: 'white', text: 'Branca' },
                { value: 'chinese', text: 'Chinesa' },
                { value: 'black', text: 'Negra' },
                { value: 'hispanic', text: 'Hispânica' },
            ],
        },
        javaid: {
            male: [
                { value: 'white', text: 'Branca' },
                { value: 'black', text: 'Negra' },
            ],
            female: [
                { value: 'white', text: 'Branca' },
                { value: 'black', text: 'Negra' },
            ],
        },
    };

    // Paleta de cores para as curvas de percentil (inspiradas nas cores padrão do Plotly)
    const percentileColors = [
        '#1f77b4', // Azul
        '#ff7f0e', // Laranja
        '#2ca02c', // Verde
        '#d62728', // Vermelho
        '#9467bd', // Roxo
        '#8c564b', // Marrom
        '#e377c2', // Rosa
        '#7f7f7f', // Cinza
        '#bcbd22', // Oliva
        '#17becf'  // Ciano
    ];


    // --- 4. Funções de Ajuste de Dados ---

    /**
     * Aplica as regras de ajuste aos dados de percentil para garantir consistência.
     * - Percentis não decrescentes com a idade.
     * - Curvas de percentil não se cruzam.
     * - Lida com diminuições locais (adotando o menor valor na sequência de queda).
     * - Garantia que o último ponto da curva se estenda.
     * @param {Array<Object>} data O array de objetos de idade/percentil para uma etnia/gênero.
     * @param {Array<string>} percentilesToProcess Lista dos percentis a serem processados (e.g., ['50', '75', '90']).
     * @returns {Array<Object>} Os dados ajustados.
     */
    function applyDataAdjustments(data, percentilesToProcess) {
        // Cria uma cópia profunda para não modificar os dados brutos originais
        const adjustedData = JSON.parse(JSON.stringify(data));

        if (!adjustedData || adjustedData.length === 0) {
            return [];
        }

        // Rule 1 & 3: Non-decreasing percentiles with age & handling local decreases
        // Apply for each percentile individually
        for (const p of percentilesToProcess) {
            let lastValue = -Infinity;
            for (let i = 0; i < adjustedData.length; i++) {
                if (adjustedData[i].percentiles[p] !== undefined) {
                    // Ensure current value is not less than the previous age's value for the same percentile
                    adjustedData[i].percentiles[p] = Math.max(adjustedData[i].percentiles[p], lastValue);
                    lastValue = adjustedData[i].percentiles[p];
                } else {
                    // If a percentile value is missing, consider it as the previous value for this rule
                    // This assumes missing values should follow the non-decreasing trend
                    if (i > 0 && adjustedData[i-1].percentiles[p] !== undefined) {
                        adjustedData[i].percentiles[p] = adjustedData[i-1].percentiles[p];
                    } else {
                        adjustedData[i].percentiles[p] = 0; // Default for first missing value
                    }
                    lastValue = adjustedData[i].percentiles[p]; // Update lastValue even for imputed ones
                }
            }
        }

        // Rule 2: Non-crossing percentile curves
        // Iterate from highest percentile to lowest (e.g., 95, 90, 75, ...)
        for (let i = percentilesToProcess.length - 1; i > 0; i--) {
            const currentP = percentilesToProcess[i];
            const lowerP = percentilesToProcess[i - 1];

            for (let j = 0; j < adjustedData.length; j++) {
                const currentVal = adjustedData[j].percentiles[currentP];
                const lowerVal = adjustedData[j].percentiles[lowerP];

                if (currentVal !== undefined && lowerVal !== undefined) {
                    // Ensure current (higher) percentile is not less than lower percentile
                    // If it is, set the current percentile to be equal to the lower one
                    if (currentVal < lowerVal) {
                        adjustedData[j].percentiles[currentP] = lowerVal;
                    }
                }
            }
        }

        // Rule 4: Oldest Age Group (>74) - Ensure non-decreasing rigorously, especially for the last point
        // This is largely covered by Rule 1 & 3, but explicitly re-check the very last point
        for (const p of percentilesToProcess) {
            if (adjustedData.length > 1 && adjustedData[adjustedData.length - 1].percentiles[p] !== undefined) {
                const lastAgeValue = adjustedData[adjustedData.length - 1].percentiles[p];
                const secondLastAgeValue = adjustedData[adjustedData.length - 2].percentiles[p];
                if (lastAgeValue < secondLastAgeValue) {
                    adjustedData[adjustedData.length - 1].percentiles[p] = secondLastAgeValue;
                }
            }
        }

        return adjustedData;
    }

    /**
     * Processa todos os dados brutos aplicando as regras de ajuste e armazena em adjustedStudyData.
     * Esta função é chamada uma única vez no início do script.
     */
    function processAllStudyData() {
        for (const studyName in studyData) {
            adjustedStudyData[studyName] = {}; // Inicializa a estrutura para adjustedStudyData
            for (const gender in studyData[studyName]) {
                adjustedStudyData[studyName][gender] = {}; // Inicializa a estrutura para adjustedStudyData
                for (const ethnicity in studyData[studyName][gender]) {
                    const rawData = studyData[studyName][gender][ethnicity];
                    // Criar uma cópia profunda dos dados brutos para processamento
                    let processedDataForAdjustment = JSON.parse(JSON.stringify(rawData));

                    // Regra específica para o estudo Javaid: garantir que o 50º percentil seja 0 se não for definido
                    // Isso é feito para preencher lacunas e permitir a interpolação para escores zero corretamente.
                    if (studyName === 'javaid') {
                        processedDataForAdjustment.forEach(entry => {
                            if (entry.percentiles['50'] === undefined) { 
                                entry.percentiles['50'] = 0; 
                            }
                        });
                    }
                    
                    // Determinar quais percentis existem para este conjunto de dados após a potencial adição
                    let availablePercentiles = new Set();
                    processedDataForAdjustment.forEach(d => {
                        for (const p in d.percentiles) {
                            availablePercentiles.add(p);
                        }
                    });
                    const percentilesToProcess = Array.from(availablePercentiles).sort((a, b) => parseInt(a) - parseInt(b));

                    // Aplica ajustes e armazena no novo objeto
                    adjustedStudyData[studyName][gender][ethnicity] = applyDataAdjustments(processedDataForAdjustment, percentilesToProcess);
                }
            }
        }
    }

    // Chamar a função de processamento de dados uma vez para ajustar os dados brutos
    processAllStudyData();


    // --- 5. Funções de Interpolação e Extrapolação ---

    /**
     * Interpola linearmente um valor Y para um dado X dentro de um conjunto de pontos (X, Y).
     * Pode opcionalmente extrapolar linearmente além dos limites dos dados.
     * @param {number} x O valor de X para o qual se deseja interpolar Y.
     * @param {Array<number>} xCoords Array dos valores de X dos pontos conhecidos.
     * @param {Array<number>} yCoords Array dos valores de Y dos pontos conhecidos.
     * @param {boolean} [extrapolate=false] Se verdadeiro, realiza extrapolação linear além dos limites dos dados.
     * @returns {number} O valor Y interpolado ou extrapolado.
     */
    function linearInterpolate(x, xCoords, yCoords, extrapolate = false) {
        if (xCoords.length === 0 || yCoords.length === 0 || xCoords.length !== yCoords.length) {
            return NaN;
        }

        // Caso x seja menor ou igual ao primeiro ponto, retorna o primeiro valor Y (clamp)
        if (x <= xCoords[0]) {
            return yCoords[0];
        }

        // Interpolação padrão dentro do intervalo conhecido
        for (let i = 0; i < xCoords.length - 1; i++) {
            const x1 = xCoords[i];
            const x2 = xCoords[i + 1];
            const y1 = yCoords[i];
            const y2 = yCoords[i + 1];

            if (x1 <= x && x <= x2) {
                // Fórmula de interpolação linear
                return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
            }
        }

        // Extrapolação para valores além do último ponto
        if (x > xCoords[xCoords.length - 1]) {
            if (extrapolate && xCoords.length >= 2) {
                const lastX = xCoords[xCoords.length - 1];
                const lastY = yCoords[yCoords.length - 1];
                const secondLastX = xCoords[xCoords.length - 2];
                const secondLastY = yCoords[yCoords.length - 2];

                // Evita divisão por zero se os dois últimos X forem iguais
                if (lastX === secondLastX) {
                    return lastY; // Não é possível calcular inclinação, retorna o último Y
                }

                const slope = (lastY - secondLastY) / (lastX - secondLastX);
                const extrapolatedValue = lastY + slope * (x - lastX);
                // Garantir que a extrapolação não retorne valores negativos para CAC Score
                return Math.max(0, extrapolatedValue);
            } else {
                // Se não for para extrapolar ou não houver pontos suficientes, retorna o último valor conhecido (clamp)
                return yCoords[yCoords.length - 1];
            }
        }

        return NaN; // Não deve ser alcançado
    }


    /**
     * Função para ajustar um polinômio quadrático (P = aS^2 + bS + c)
     * e retornar o valor de 'c' (que é P(0)).
     *
     * @param {number} s1 Escore do primeiro ponto.
     * @param {number} p1 Percentil do primeiro ponto.
     * @param {number} s2 Escore do segundo ponto.
     * @param {number} p2 Percentil do segundo ponto.
     * @param {number} s3 Escore do terceiro ponto.
     * @param {number} p3 Percentil do terceiro ponto.
     * @returns {number} O valor de 'c' (o percentil extrapolado para escore 0).
     */
    function quadraticExtrapolatePforSZero(s1, p1, s2, p2, s3, p3) {
        // Denominadores para as fórmulas de Lagrange (simplificadas para P(0)=c)
        const den1 = (s1 - s2) * (s1 - s3);
        const den2 = (s2 - s1) * (s2 - s3);
        const den3 = (s3 - s1) * (s3 - s2);

        // Verifica se há divisões por zero ou pontos coincidentes que impediriam o cálculo
        if (den1 === 0 || den2 === 0 || den3 === 0) {
            // Se os pontos não são distintos, tenta linear (se possível) ou retorna um fallback
            if (s1 !== s2) { // Tenta linear entre os dois primeiros
                const m = (p2 - p1) / (s2 - s1);
                return p1 - m * s1; // Extrapolação linear para S=0
            }
            return p1; // Se todos os pontos se sobrepõem, retorna o percentil do primeiro ponto
        }

        // Calcula 'c' (que é P(0)) usando a fórmula de interpolação polinomial de Lagrange
        // avaliada em S=0. Termos com 'S' se anulam.
        const c = (p1 * s2 * s3 / den1) + (p2 * s1 * s3 / den2) + (p3 * s1 * s2 / den3);
        
        return c;
    }


    /**
     * Encontra o percentil para um dado escore de cálcio e idade.
     * Usa interpolação linear para determinar o percentil entre os percentis conhecidos.
     * Aplica extrapolação polinomial para escores de cálcio zero quando necessário.
     *
     * @param {number} calciumScore Escore de cálcio do paciente.
     * @param {number} age Idade do paciente.
     * @param {Array<Object>} data Dados do estudo ajustados para a etnia/gênero específica.
     * @returns {number} O percentil interpolado (0-100).
     */
    function getPercentileForScore(calciumScore, age, data) {
        if (!data || data.length === 0) {
            return NaN;
        }

        // Encontrar os dois pontos de idade mais próximos no dataset para interpolação
        // Nota: A idade já foi validada estritamente antes de chamar esta função.
        let lowerAgeData = null;
        let upperAgeData = null;

        for (let i = 0; i < data.length; i++) {
            if (age === data[i].age) {
                lowerAgeData = data[i];
                upperAgeData = data[i];
                break;
            }
            if (i < data.length - 1 && age > data[i].age && age < data[i + 1].age) {
                lowerAgeData = data[i];
                upperAgeData = data[i + 1];
                break;
            }
        }
        if (age < data[0].age) {
            lowerAgeData = data[0];
            upperAgeData = data[0];
        } 
        else if (age > data[data.length - 1].age) {
            lowerAgeData = data[data.length - 1];
            upperAgeData = data[data.length - 1];
        }

        if (!lowerAgeData || !upperAgeData) {
            console.error("Could not find age data points for interpolation. This indicates an issue with age validation or data structure.");
            return NaN;
        }

        // Calcula os percentis interpolados para o score em cada uma das idades conhecidas
        const percentileAtLowerAge = getPercentileAtScore(calciumScore, lowerAgeData.percentiles);
        const percentileAtUpperAge = getPercentileAtScore(calciumScore, upperAgeData.percentiles);
        
        // Interpola o percentil final entre as duas idades, SEM EXTRAPOLAÇÃO
        let interpolatedPercentile = linearInterpolate(age,
            [lowerAgeData.age, upperAgeData.age],
            [percentileAtLowerAge, percentileAtUpperAge],
            false // Explicitamente false para não extrapolar no cálculo do percentil do usuário
        );

        // Ajusta os limites para 0-100%
        interpolatedPercentile = Math.max(0, Math.min(100, interpolatedPercentile));

        // Arredonda para o número inteiro mais próximo, mas mantém casas decimais se for < 1
        if (interpolatedPercentile < 1 && interpolatedPercentile > 0) {
            return parseFloat(interpolatedPercentile.toFixed(2)); // Duas casas decimais para valores pequenos
        } else {
            return Math.round(interpolatedPercentile);
        }
    }


    /**
     * Auxiliar: Interpola o percentil para um dado escore de cálcio em uma única faixa de idade.
     *
     * Regra Principal para Escore Zero:
     * 1. Se o escore for 0, primeiro verifica se há um percentil existente na tabela que corresponde a 0.
     *    Retorna o maior desses percentis (ex: P75=0).
     * 2. Se nenhum percentil tiver escore 0 (o menor percentil conhecido tem escore > 0),
     *    realiza uma extrapolação polinomial quadrática para estimar o percentil para escore 0.
     *    O resultado é clampado a um mínimo de 0.01.
     *
     * @param {number} score O escore de cálcio.
     * @param {Object} agePercentiles O objeto de percentis para uma idade específica (e.g., { '50': 20, '75': 50 }).
     * @returns {number} O percentil calculado.
     */
    function getPercentileAtScore(score, agePercentiles) {
        const knownPercentiles = Object.keys(agePercentiles).map(Number).sort((a, b) => a - b);
        const knownScores = knownPercentiles.map(p => agePercentiles[p]);

        // Tratamento especial para escore 0
        if (score === 0) {
            // 1. Procurar o maior percentil existente com escore 0
            for (let i = knownScores.length - 1; i >= 0; i--) {
                if (knownScores[i] === 0) {
                    return knownPercentiles[i]; // Retorna o maior percentil com escore 0 encontrado
                }
            }

            // 2. Se nenhum percentil existente tem escore 0, tentamos extrapolar
            if (knownScores.length >= 3) {
                // Usamos os três primeiros pontos para extrapolação quadrática
                const s1 = knownScores[0];
                const p1 = knownPercentiles[0];
                const s2 = knownScores[1];
                const p2 = knownPercentiles[1];
                const s3 = knownScores[2];
                const p3 = knownPercentiles[2];

                let extrapolatedP = quadraticExtrapolatePforSZero(s1, p1, s2, p2, s3, p3);

                // Clamp o resultado da extrapolação para um mínimo razoável (0.01)
                // para evitar percentis negativos ou irrealistamente baixos.
                extrapolatedP = Math.max(0.01, extrapolatedP); 
                
                return extrapolatedP;

            } else if (knownScores.length === 2) {
                // Fallback para extrapolação linear se apenas 2 pontos > 0 disponíveis
                const s1 = knownScores[0];
                const p1 = knownPercentiles[0];
                const s2 = knownScores[1];
                const p2 = knownPercentiles[1];

                if (s2 - s1 === 0) return p1; // Evita divisão por zero
                const m = (p2 - p1) / (s2 - s1);
                let extrapolatedP = p1 - m * s1;
                extrapolatedP = Math.max(0.01, extrapolatedP); // Clampa também aqui
                return extrapolatedP;
            } else if (knownScores.length === 1) {
                // Se apenas um ponto for disponível e seu escore for > 0, assume um percentil mínimo.
                return 0.01;
            }
            // Fallback final se nenhuma condição for atendida (não deve ocorrer com dados válidos)
            return 0; 
        }

        // Tratamento para escores não-zero fora do range conhecido (clamp)
        if (score <= knownScores[0]) {
            return knownPercentiles[0];
        }
        if (score >= knownScores[knownScores.length - 1]) {
            return knownPercentiles[knownScores.length - 1];
        }

        // Interpolação padrão para escores não-zero dentro do intervalo conhecido
        for (let i = 0; i < knownScores.length - 1; i++) {
            const score1 = knownScores[i];
            const score2 = knownScores[i + 1];
            const p1 = knownPercentiles[i];
            const p2 = knownPercentiles[i + 1];

            if (score1 <= score && score <= score2) {
                // Fórmula de interpolação linear
                return p1 + ((score - score1) * (p2 - p1)) / (score2 - score1);
            }
        }
        return NaN; // Não deve ser alcançado
    }

    // --- 6. Lógica da UI e Eventos ---

    // Função para preencher dinamicamente as opções de etnia com base no estudo e sexo selecionados
    function populateEthnicityOptions() {
        const selectedStudy = elements.studySelect.value;
        const selectedGender = elements.genderSelect.value;
        const ethnicitySelect = elements.ethnicitySelect;

        // Limpa as opções existentes
        ethnicitySelect.innerHTML = '';
        
        // Adiciona uma opção padrão desabilitada
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Selecione uma Etnia --';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        ethnicitySelect.appendChild(defaultOption);

        if (selectedStudy && selectedGender && ethnicityOptions[selectedStudy] && ethnicityOptions[selectedStudy][selectedGender]) {
            const options = ethnicityOptions[selectedStudy][selectedGender];
            options.forEach(option => {
                const optElem = document.createElement('option');
                optElem.value = option.value;
                optElem.textContent = option.text;
                ethnicitySelect.appendChild(optElem);
            });
            elements.ethnicityGroup.classList.remove('hidden'); // Mostra o campo de etnia
        } else {
            elements.ethnicityGroup.classList.add('hidden'); // Oculta se não houver estudo/sexo válido
        }
    }

    // Função para exibir o formulário da calculadora e o disclaimer
    function showCalculatorForm() {
        const selectedStudy = elements.studySelect.value;
        if (selectedStudy) {
            elements.calculatorForm.classList.remove('hidden');
            populateEthnicityOptions(); // Popula etnias ao mostrar o formulário

            // Obter e exibir a faixa etária para o label da idade
            let minAge = 0;
            let maxAge = 0;
            const currentGender = elements.genderSelect.value; // Pega o gênero atual
            // A etnia inicial não importa muito aqui, pegamos o primeiro conjunto de dados para ter acesso à faixa
            const firstEthnicityData = Object.values(studyData[selectedStudy]?.[currentGender] || {})[0];

            if (firstEthnicityData && firstEthnicityData.length > 0) {
                if (firstEthnicityData[0].range && firstEthnicityData[firstEthnicityData.length - 1].range) {
                    minAge = firstEthnicityData[0].range[0];
                    maxAge = firstEthnicityData[firstEthnicityData.length - 1].range[1];
                } else {
                    minAge = firstEthnicityData[0].age;
                    maxAge = firstEthnicityData[firstEthnicityData.length - 1].age;
                }
            }

            elements.ageLabel.textContent = `Idade (${minAge}-${maxAge} anos):`;
            
            // Preencher o dropdown de idade
            elements.ageSelect.innerHTML = ''; // Limpa opções anteriores
            for (let i = minAge; i <= maxAge; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                elements.ageSelect.appendChild(option);
            }
            // Seleciona a primeira opção como padrão, ou 40 se estiver na faixa
            elements.ageSelect.value = (40 >= minAge && 40 <= maxAge) ? 40 : minAge;


            // Exibe o disclaimer correto
            const disclaimerInfo = disclaimers[selectedStudy];
            if (disclaimerInfo) {
                elements.disclaimerText.innerHTML = `<strong>Aviso:</strong> ${disclaimerInfo.text}<br><br><strong>Referência:</strong> ${disclaimerInfo.citation}`;
            }

            // Oculta a tabela ao mudar de estudo/sexo
            elements.tableContainer.classList.add('hidden');

        } else {
            elements.calculatorForm.classList.add('hidden');
            elements.disclaimerText.innerHTML = ''; // Limpa o disclaimer
            elements.percentileResult.textContent = ''; // Limpa resultados anteriores
            elements.chartDiv.innerHTML = ''; // Limpa o gráfico
            elements.chartLegendDiv.innerHTML = ''; // Limpa a legenda
            elements.ageLabel.textContent = 'Idade (anos):'; // Reseta o label da idade
            elements.ageSelect.innerHTML = ''; // Limpa opções do dropdown de idade
            elements.tableContainer.classList.add('hidden'); // Oculta a tabela
        }
    }

    // Event Listeners
    elements.studySelect.addEventListener('change', showCalculatorForm);
    elements.genderSelect.addEventListener('change', showCalculatorForm);


    elements.calculateButton.addEventListener('click', () => {
        const studyName = elements.studySelect.value;
        const calciumScore = parseFloat(elements.calciumScoreInput.value);
        const age = parseInt(elements.ageSelect.value); // Obtém idade do SELECT
        const gender = elements.genderSelect.value;
        const ethnicity = elements.ethnicitySelect.value;

        if (!studyName || isNaN(calciumScore) || isNaN(age) || !gender || !ethnicity) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const currentAdjustedStudyData = adjustedStudyData[studyName][gender][ethnicity];
        const currentRawStudyData = studyData[studyName][gender][ethnicity];

        if (!currentAdjustedStudyData || !currentRawStudyData) {
            alert('Dados não encontrados para a seleção atual. Por favor, verifique a combinação de estudo, sexo e etnia.');
            return;
        }

        // --- Validação de Idade ---
        let minStudyAgeStrict;
        let maxStudyAgeStrict;

        if (currentAdjustedStudyData[0].range && currentAdjustedStudyData[currentAdjustedStudyData.length - 1].range) {
            minStudyAgeStrict = currentAdjustedStudyData[0].range[0];
            maxStudyAgeStrict = currentAdjustedStudyData[currentAdjustedStudyData.length - 1].range[1];
        } else {
            minStudyAgeStrict = currentAdjustedStudyData[0].age;
            maxStudyAgeStrict = currentAdjustedStudyData[currentAdjustedStudyData.length - 1].age;
        }

        if (age < minStudyAgeStrict || age > maxStudyAgeStrict) {
            alert(`Erro interno: A idade (${age} anos) está fora da faixa esperada (${minStudyAgeStrict} - ${maxStudyAgeStrict} anos). Por favor, recarregue a página.`);
            return; 
        }
        // --- Fim da Validação de Idade ---

        // Calcular o percentil
        const percentile = getPercentileForScore(calciumScore, age, currentAdjustedStudyData); 
        
        // Formatar o resultado para exibição
        let displayPercentile;
        if (percentile < 1 && percentile > 0) {
            displayPercentile = '< 1';
        } else if (percentile === 0) {
            displayPercentile = '0'; // Se o cálculo resultar em 0 exato
        } else {
            displayPercentile = Math.round(percentile).toString();
        }

        elements.percentileResult.textContent = `Seu escore de cálcio (${calciumScore}) está no percentil ${displayPercentile} para sua idade, sexo e etnia.`;

        // Gerar o gráfico
        // Importante: plotCalciumPercentiles usa extrapolação para uma visualização mais fluida
        plotCalciumPercentiles(studyName, gender, ethnicity, calciumScore, age, currentAdjustedStudyData);

        // Gerar a tabela de referência
        displayReferenceTable(studyName, gender, ethnicity, age, currentRawStudyData);
    });


    // --- 7. Geração do Gráfico ---

    /**
     * Plota as curvas de percentil para o escore de cálcio.
     * @param {string} studyName Nome do estudo selecionado.
     * @param {string} gender Sexo selecionado.
     * @param {string} ethnicity Etnia selecionada.
     * @param {number} currentCalciumScore Escore de cálcio do usuário.
     * @param {number} currentAge Idade do usuário.
     * @param {Array<Object>} data Dados do estudo ajustados para a etnia/gênero específica.
     */
    function plotCalciumPercentiles(studyName, gender, ethnicity, currentCalciumScore, currentAge, data) {
        const traces = [];
        // Define os limites do eixo X do gráfico com base na faixa etária real do estudo
        let plotMinAge;
        let plotMaxAge;

        // Usa a propriedade 'range' se definida, senão usa os valores 'age' (primeiro e último)
        if (data[0].range && data[data.length - 1].range) {
            plotMinAge = data[0].range[0];
            plotMaxAge = data[data.length - 1].range[1];
        } else {
            plotMinAge = data[0].age; 
            plotMaxAge = data[data.length - 1].age;
        }
        
        // Gera idades inteiras para plotagem, para cobrir o intervalo sem saltos
        const agesForPlot = Array.from({ length: Math.floor(plotMaxAge) - Math.ceil(plotMinAge) + 1 }, (_, i) => Math.ceil(plotMinAge) + i);


        // Filter available percentiles for this specific dataset
        let availablePercentiles = new Set();
        data.forEach(d => {
            for (const p in d.percentiles) {
                availablePercentiles.add(p);
            }
        });
        // Convert to array and sort numerically
        const studySpecificPercentiles = Array.from(availablePercentiles).map(Number).sort((a, b) => a - b);

        // Prepare traces for each percentile curve
        for (let i = 0; i < studySpecificPercentiles.length; i++) {
            const p = studySpecificPercentiles[i];
            const yValues = agesForPlot.map(age => {
                // Interpolate calcium score for each age for the current percentile
                const scoresAtKnownAges = data.map(d => d.percentiles[p.toString()]);
                const agesOfKnownScores = data.map(d => d.age);
                
                // Passa 'true' para extrapolar no gráfico, criando a projeção desejada
                // Nota: A extrapolação para o gráfico usa linear, mesmo que o cálculo para 0 use quadrática,
                // para evitar artefatos visuais de uma spline cúbica/quadrática em Plotly que não está 
                // otimizada para essa extrapolação de cauda. O foco do gráfico é a visualização da tendência.
                return linearInterpolate(age, agesOfKnownScores, scoresAtKnownAges, true);
            });

            traces.push({
                x: agesForPlot,
                y: yValues,
                mode: 'lines',
                name: `${p}th Percentile`,
                line: {
                    shape: 'spline', // Suaviza a linha para simular interpolação cúbica
                    width: 2,
                    color: percentileColors[i % percentileColors.length] // Atribui cor da paleta
                },
            });
        }

        // Add user's specific point
        traces.push({
            x: [currentAge],
            y: [currentCalciumScore],
            mode: 'markers',
            type: 'scatter',
            name: 'Seu Escore',
            marker: {
                size: 10,
                color: 'red',
                symbol: 'star',
                line: {
                    color: 'darkred',
                    width: 1
                }
            },
            hovertemplate: `Idade: %{x}<br>Escore de Cálcio: %{y}<extra>Seu Escore</extra>`
        });

        // Determine Y-axis range dynamically based on max value in current data
        let maxY = 0;
        traces.forEach(trace => {
            if (trace.y && trace.y.length > 0) {
                maxY = Math.max(maxY, ...trace.y.filter(val => typeof val === 'number' && !isNaN(val)));
            }
        });
        const padding = maxY * 0.1; // Adiciona 10% de padding no topo
        let yAxisMax = Math.ceil((maxY + padding) / 100) * 100; // Arredonda para a centena mais próxima
        if (yAxisMax < 100 && maxY > 0) { // Garante que o limite superior não seja muito baixo para dados pequenos mas não zero
            yAxisMax = Math.ceil((maxY + padding) / 50) * 50; // Arredonda para 50 mais próximo
            if (yAxisMax === 0) yAxisMax = 50; // mínimo
        } else if (yAxisMax === 0 && maxY === 0) { // Se todos os scores forem 0, define um limite mínimo visível
            yAxisMax = 10;
        } else if (yAxisMax === 0 && maxY > 0) { // Se o cálculo resultar em 0 mas houver dados maiores
            yAxisMax = Math.ceil(maxY * 1.2 / 10) * 10;
            if (yAxisMax < 10) yAxisMax = 10;
        }


        const layout = {
            title: {
                text: `Escore de Cálcio Coronariano por Idade (${ethnicityOptions[studyName][gender].find(opt => opt.value === ethnicity).text})`,
                font: {
                    size: 20
                }
            },
            xaxis: {
                title: 'Idade (anos)',
                range: [plotMinAge - 0.5, plotMaxAge + 0.5], // Usa os limites reais do estudo para o gráfico
                dtick: 5 // Ticks a cada 5 anos
            },
            yaxis: {
                title: 'Escore de Cálcio (Agatston)',
                range: [-5, yAxisMax], // Permite valores próximos de zero serem visíveis
                zeroline: true,
                zerolinecolor: '#ccc',
                zerolinewidth: 1
            },
            showlegend: false, // Oculta a legenda interna do gráfico
            hovermode: 'closest',
            responsive: true, // Torna o gráfico responsivo
            margin: {
                l: 60, // left margin
                r: 30, // right margin
                b: 80, // bottom margin for custom legend
                t: 80, // top margin for title
                pad: 4 // padding between plot area and the margin
            },
            height: elements.chartDiv.clientWidth * (3/4) // Proporção 4:3
        };

        // Renderiza o gráfico
        Plotly.newPlot(elements.chartDiv, traces, layout).then(gd => {
            // Atualiza a altura do gráfico para ser responsiva após a renderização
            const update = {
                height: gd.clientWidth * (3/4)
            };
            Plotly.relayout(gd, update);
        });

        // Cria a legenda personalizada abaixo do gráfico
        elements.chartLegendDiv.innerHTML = ''; // Limpa legendas anteriores
        let legendItems = traces.filter(t => t.name !== 'Seu Escore').map(trace => { // <-- MUDANÇA AQUI: de const para let
            const color = trace.line.color || (trace.marker && trace.marker.color); // Obter cor do trace
            const symbol = (trace.marker && trace.marker.symbol) || 'line'; // Obter símbolo se for o caso
            let legendHtml = `<span style="display:inline-block; margin-right: 10px; margin-bottom: 5px; font-size: 0.9em;">`;
            if (symbol === 'star') {
                legendHtml += `<span style="color: ${color}; font-size: 1.2em; vertical-align: middle;">★</span> `; // Símbolo para o ponto do usuário
            } else {
                legendHtml += `<span style="display:inline-block; width: 20px; height: 3px; background-color: ${color}; vertical-align: middle;"></span> `;
            }
            legendHtml += `${trace.name}</span>`;
            return legendHtml;
        }).join('');

// Adiciona o item para o escore do usuário
        const userScoreTrace = traces.find(t => t.name === 'Seu Escore');
        if (userScoreTrace) {
            const userColor = userScoreTrace.marker.color;
            legendItems += `<span style="display:inline-block; margin-left: 20px; margin-bottom: 5px; font-size: 0.9em;">`;
            legendItems += `<span style="color: ${userColor}; font-size: 1.2em; vertical-align: middle;">★</span> Seu Escore</span>`;
        }

        elements.chartLegendDiv.innerHTML = legendItems;
    }


    // --- 8. Geração da Tabela de Referência ---
    /**
     * Exibe a tabela de referência do estudo para a faixa etária selecionada.
     * @param {string} studyName Nome do estudo selecionado.
     * @param {string} gender Sexo selecionado.
     * @param {string} ethnicity Etnia selecionada.
     * @param {number} userAge Idade do usuário.
     * @param {Array<Object>} data Dados ORIGINAIS do estudo (RAW) para a etnia/gênero específica.
     */
    function displayReferenceTable(studyName, gender, ethnicity, userAge, data) {
        const tableContainer = elements.tableContainer;
        const tableTitle = elements.tableTitle;
        const tableExplanation = elements.tableExplanation;
        const tableBody = elements.tableBody;

        // Encontrar os dados da faixa etária relevante
        let relevantAgeGroupData = null;
        let ageRangeDisplay = '';

        // Determinar o grupo de idade em que a idade do usuário se enquadra
        for (const group of data) {
            if (group.range) { // Para McClelland e De Ronde (que têm faixas etárias definidas)
                if (userAge >= group.range[0] && userAge <= group.range[1]) {
                    relevantAgeGroupData = group;
                    ageRangeDisplay = `${group.range[0]}-${group.range[1]} anos`;
                    break;
                }
            } else { // Para Javaid (que usa idades exatas)
                if (userAge === group.age) {
                    relevantAgeGroupData = group;
                    ageRangeDisplay = `${group.age} anos`;
                    break;
                }
            }
        }

        if (!relevantAgeGroupData) {
            console.warn("Não foi possível encontrar dados de grupo de idade relevante para exibição da tabela.");
            tableContainer.classList.add('hidden');
            return;
        }

        // Criar uma cópia profunda dos percentis para incluir o 50% inferido na tabela, se aplicável
        let percentilesDataForTable = JSON.parse(JSON.stringify(relevantAgeGroupData.percentiles));
        if (studyName === 'javaid' && percentilesDataForTable['50'] === undefined) {
             percentilesDataForTable['50'] = 0;
        }

        const sortedPercentiles = Object.keys(percentilesDataForTable).map(Number).sort((a, b) => a - b);


        // Preencher o título da tabela
        const genderText = ethnicityOptions[studyName][gender].find(opt => opt.value === ethnicity).text;
        const ethnicityText = ethnicityOptions[studyName][gender].find(opt => opt.value === ethnicity).text;
        tableTitle.innerHTML = `Tabela de Referência da Distribuição de Escore de Cálcio<br>Para o grupo: ${genderText}, ${ethnicityText}, ${ageRangeDisplay}`;

        // Preencher o corpo da tabela
        tableBody.innerHTML = '';
        sortedPercentiles.forEach(p => {
            const score = percentilesDataForTable[p.toString()];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${p}%</td><td>${score}</td>`;
            tableBody.appendChild(row);
        });

        // Explicação sobre os percentis de escore zero
        tableExplanation.innerHTML = `
            <p>Esta tabela detalha os escores de cálcio correspondentes a vários percentis para o seu grupo demográfico e faixa etária específicos.</p>
            <p><strong>Por que um escore de cálcio zero pode ter um percentil acima de 0?</strong></p>
            <p>Um percentil representa a porcentagem de pessoas em um grupo de referência que têm um escore igual ou menor que o seu. Se, por exemplo, 25% das pessoas no seu grupo demográfico e faixa etária têm um escore de cálcio de zero, então um escore de cálcio zero será o 25º percentil. Isso significa que você tem menos cálcio do que 75% das pessoas nesse grupo, mas igual ou menos do que 25% delas (incluindo aqueles que também têm zero).</p>
        `;

        tableContainer.classList.remove('hidden');
    }


    // Chamada inicial para popular opções e esconder o formulário ao carregar a página
    showCalculatorForm();

}); // Fim do DOMContentLoaded
