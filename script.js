document.addEventListener('DOMContentLoaded', () => {
    const calciumScoreInput = document.getElementById('calciumScore');
    const ageInput = document.getElementById('age');
    const sexSelect = document.getElementById('sex');
    const ethnicitySelect = document.getElementById('ethnicity');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Novos elementos de resultado
    const percentilPrincipalP = document.getElementById('percentilPrincipal');
    const percentilExplicacaoP = document.getElementById('percentilExplicacao');
    
    const chartWrapperDiv = document.getElementById('chartWrapper');
    const disclaimerText = document.getElementById('disclaimer-text');

    // --- DADOS DO NOMOGRAMA ---
    const AGE_POINTS = [37, 42, 47, 52, 57, 62, 67, 72, 77];
    const PLOT_AGES = Array.from({length: 85 - 35 + 1}, (v, i) => 35 + i);
    const NOMOGRAM_DATA = {
        western: {
            male: {
                10: [0, 0, 0, 0, 0, 0, 0, 0, 2],
                25: [0, 0, 0, 0, 2, 9, 24, 48, 109],
                50: [1, 0, 2, 11, 38, 94, 163, 254, 434],
                75: [2, 8, 32, 92, 198, 381, 569, 781, 1123],
                90: [14, 51, 141, 291, 538, 851, 1139, 1493, 1934],
                95: [42, 114, 280, 586, 966, 1341, 1794, 2428, 2799]
            },
            female: {
                10: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                25: [0, 0, 0, 0, 0, 0, 0, 0, 13],
                50: [0, 0, 0, 0, 0, 2, 15, 42, 121],
                75: [0, 0, 0, 4, 20, 57, 123, 210, 419],
                90: [2, 5, 20, 51, 126, 199, 352, 544, 911],
                95: [6, 17, 55, 98, 236, 448, 598, 952, 1633]
            }
        },
        asian: {
            male: {
                10: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                25: [0, 0, 0, 0, 0, 0, 2, 16, 104],
                50: [0, 0, 0, 3, 23, 63, 124, 215, 464],
                75: [0, 0, 3, 49, 121, 221, 352, 537, 807],
                90: [1, 17, 49, 117, 228, 410, 586, 796, 1195],
                95: [5, 59, 117, 228, 410, 586, 796, 936, 1195] 
            },
            female: {
                10: [0, 0, 0, 0, 0, 0, 0, 0, 11],
                25: [0, 0, 0, 0, 0, 0, 0, 0, 52],
                50: [0, 0, 0, 0, 0, 0, 6, 41, 80],
                75: [0, 0, 0, 0, 3, 23, 98, 146, 150],
                90: [0, 3, 1, 12, 50, 96, 311, 409, 236],
                95: [0, 4, 6, 42, 112, 183, 514, 476, 150]
            }
        }
    };
    const KNOWN_PERCENTILES = [10, 25, 50, 75, 90, 95];

    class CubicSpline {
        constructor(x, y) { const n = x.length; if (n !== y.length) { throw new Error("Arrays x and y must have the same length."); } if (n < 2) { throw new Error("At least two points are required for interpolation."); } for (let i = 0; i < n - 1; i++) { if (x[i] >= x[i+1]) { throw new Error("x values must be strictly increasing."); } } this.x = x; this.y = y; this.a = y; const h = new Array(n - 1); for (let i = 0; i < n - 1; i++) { h[i] = x[i + 1] - x[i]; } const alpha = new Array(n - 1); for (let i = 1; i < n - 1; i++) { alpha[i] = (3 / h[i]) * (y[i + 1] - y[i]) - (3 / h[i - 1]) * (y[i] - y[i - 1]); } const L = new Array(n); const Mu = new Array(n); const Z = new Array(n); const C = new Array(n); L[0] = 1; Mu[0] = 0; Z[0] = 0; for (let i = 1; i < n - 1; i++) { L[i] = 2 * (x[i + 1] - x[i - 1]) - Mu[i - 1] * h[i - 1]; Mu[i] = h[i] / L[i]; Z[i] = (alpha[i] - h[i - 1] * Z[i - 1]) / L[i]; } L[n - 1] = 1; Z[n - 1] = 0; C[n - 1] = 0; for (let j = n - 2; j >= 0; j--) { C[j] = Z[j] - Mu[j] * C[j + 1]; } this.c = C; this.b = new Array(n - 1); this.d = new Array(n - 1); for (let i = 0; i < n - 1; i++) { this.b[i] = (y[i + 1] - y[i]) / h[i] - (h[i] * (C[i + 1] + 2 * C[i])) / 3; this.d[i] = (C[i + 1] - C[i]) / (3 * h[i]); } }
        interpolate(xi) { const n = this.x.length; let i = 0; if (xi <= this.x[0]) { i = 0; } else if (xi >= this.x[n - 1]) { i = n - 2; } else { for (let j = 0; j < n - 1; j++) { if (xi >= this.x[j] && xi < this.x[j + 1]) { i = j; break; } } } if (i >= n - 1) i = n - 2; const dx = xi - this.x[i]; return this.a[i] + this.b[i] * dx + this.c[i] * Math.pow(dx, 2) + this.d[i] * Math.pow(dx, 3); }
    }

    if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/service-worker.js').then(reg => console.log('ServiceWorker registrado:', reg.scope)).catch(err => console.log('Falha no registro do SW:', err)); }); }

    calculateBtn.addEventListener('click', () => {
        const calciumScore = parseInt(calciumScoreInput.value);
        const age = parseInt(ageInput.value);
        const sex = sexSelect.value;
        const ethnicity = ethnicitySelect.value;
        
        // Limpa resultados anteriores
        percentilExplicacaoP.textContent = '';

        if (isNaN(calciumScore) || calciumScore < 0 || !Number.isInteger(calciumScore)) { percentilPrincipalP.textContent = 'Erro: Escore inválido.'; chartWrapperDiv.style.display = 'none'; disclaimerText.textContent = ''; return; }
        if (isNaN(age) || age < 35 || age > 85) { percentilPrincipalP.textContent = 'Erro: Idade inválida.'; chartWrapperDiv.style.display = 'none'; disclaimerText.textContent = ''; return; }
        if (!sex) { percentilPrincipalP.textContent = 'Erro: Selecione o sexo.'; chartWrapperDiv.style.display = 'none'; disclaimerText.textContent = ''; return; }
        if (!ethnicity) { percentilPrincipalP.textContent = 'Erro: Selecione a etnia.'; chartWrapperDiv.style.display = 'none'; disclaimerText.textContent = ''; return; }
        
        try {
            // --- MODIFICAÇÃO PRINCIPAL: Receber objeto e construir as frases ---
            const result = calculatePercentile(calciumScore, age, sex, ethnicity);

            if (result.value !== null) {
                // Monta a primeira linha
                percentilPrincipalP.textContent = `Percentil ${result.prefix}${result.value}.`;

                // Monta a segunda linha (frase de explicação)
                percentilExplicacaoP.textContent = `Percentil de ${result.value} significa que, em uma população de mesma idade, sexo e etnia, ${result.value}% das pessoas apresentam resultados iguais ou abaixo desse valor.`;
            } else {
                // Caso não seja possível determinar
                percentilPrincipalP.textContent = result.prefix;
                percentilExplicacaoP.textContent = '';
            }

            displayChart(calciumScore, age, sex, ethnicity);
            chartWrapperDiv.style.display = 'block';
            disclaimerText.innerHTML = `Os dados para esta calculadora foram extraídos do estudo "A pooled-analysis of age and sex based coronary artery calcium scores percentiles" por M.W.J. de Ronde et al., J Cardiovasc Comput Tomogr 14 (2020) 414–420. A interpolação das curvas de percentis é realizada utilizando Spline Cúbica Natural.`;

        } catch (error) {
            percentilPrincipalP.textContent = `Erro: ${error.message}`;
            chartWrapperDiv.style.display = 'none';
            disclaimerText.textContent = '';
        }
    });

    /**
     * Calcula o percentil e retorna um objeto com valor e prefixo.
     * @returns {{value: number|null, prefix: string}} Objeto com o valor numérico e o prefixo textual.
     */
    function calculatePercentile(score, age, sex, ethnicity) {
        const dataSet = NOMOGRAM_DATA[ethnicity][sex];
        if (!dataSet) { throw new Error("Dados de nomograma não encontrados."); }

        const interpolatedScores = [];
        for (const p of KNOWN_PERCENTILES) {
            const y_values = dataSet[p];
            try { const spline = new CubicSpline(AGE_POINTS, y_values); let interpolatedValue = spline.interpolate(age); if (interpolatedValue < 0) interpolatedValue = 0; interpolatedScores.push({ percentile: p, score: Math.round(interpolatedValue) }); }
            catch (e) { interpolatedScores.push({ percentile: p, score: y_values[0] }); }
        }

        if (score === 0) {
            if (interpolatedScores[0].score > 0) { return { value: KNOWN_PERCENTILES[0], prefix: '< ' }; }
            let resultPercentile = KNOWN_PERCENTILES[0];
            for (let i = 0; i < interpolatedScores.length; i++) {
                if (interpolatedScores[i].score <= 0) { resultPercentile = interpolatedScores[i].percentile; } else { break; }
            }
            return { value: resultPercentile, prefix: '≤ ' };
        }

        if (score >= interpolatedScores[interpolatedScores.length - 1].score) { return { value: KNOWN_PERCENTILES[KNOWN_PERCENTILES.length - 1], prefix: '> ' }; }
        if (score < interpolatedScores[0].score && score > 0) { return { value: KNOWN_PERCENTILES[0], prefix: '< ' }; }

        for (let i = 0; i < interpolatedScores.length - 1; i++) {
            const p1 = interpolatedScores[i].percentile;
            const s1 = interpolatedScores[i].score;
            const p2 = interpolatedScores[i + 1].percentile;
            const s2 = interpolatedScores[i + 1].score;

            if (score === s1) return { value: p1, prefix: '' };
            if (score === s2) return { value: p2, prefix: '' };
            if (score > s1 && score < s2) {
                if (s2 === s1) { return { value: p1, prefix: '' }; }
                const calculatedP = p1 + ((score - s1) / (s2 - s1)) * (p2 - p1);
                return { value: Math.round(calculatedP), prefix: '' };
            }
        }
        
        return { value: null, prefix: "Não foi possível determinar." };
    }

    function displayChart(patientScore, patientAge, sex, ethnicity) {
        const dataSet = NOMOGRAM_DATA[ethnicity][sex];
        if (!dataSet) return;

        const plotData = [];
        const colors = ['#63b3ed', '#4fd1c5', '#f6ad55', '#fc8181', '#b794f4', '#d69e2e'];

        KNOWN_PERCENTILES.forEach((p, index) => {
            const y_values = dataSet[p];
            let interpolatedY = [];
            try { const spline = new CubicSpline(AGE_POINTS, y_values); interpolatedY = PLOT_AGES.map(age => Math.max(0, Math.round(spline.interpolate(age)))); }
            catch (e) { interpolatedY = Array(PLOT_AGES.length).fill(Math.round(y_values[0] || 0)); }
            plotData.push({ x: PLOT_AGES, y: interpolatedY, mode: 'lines', name: `${p}º Percentil`, line: { shape: 'spline', color: colors[index % colors.length], width: 2.5 }, hoverinfo: 'name' });
        });

        plotData.push({ x: [patientAge], y: [patientScore], mode: 'markers', name: 'Paciente', marker: { size: 12, color: '#2d3748', symbol: 'star' }, hoverinfo: 'name' });

        const layout = {
            title: `Curvas de Percentil para ${sex === 'male' ? 'Homens' : 'Mulheres'} ${ethnicity === 'western' ? 'Ocidentais' : 'Asiáticos'}`,
            xaxis: { title: 'Idade (anos)', range: [35, 85], dtick: 5, gridcolor: '#e2e8f0', zeroline: false },
            yaxis: { title: 'Escore de Cálcio', rangemode: 'tozero', gridcolor: '#e2e8f0', zeroline: false },
            hovermode: 'x unified',
            showlegend: true,
            legend: { x: 0.5, y: 1.1, xanchor: 'center', orientation: 'h' },
            autosize: true,
            paper_bgcolor: '#FFFFFF',
            plot_bgcolor: '#FFFFFF',
            font: { family: 'Inter, sans-serif', color: '#4a5568' },
            margin: { t: 80, b: 50, l: 60, r: 40 }
        };

        Plotly.newPlot('cacChartPlotly', plotData, layout, {responsive: true, displaylogo: false});
    }
});