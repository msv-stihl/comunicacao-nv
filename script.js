const situations = [
    {
        id: 1,
        title: "Situação 1",
        options: [
            {
                text: "Você esqueceu de religar o disjuntor. Acontece, mas vamos redobrar a atenção nesses detalhes pra evitar retrabalho, combinado?",
                correct: true
            },
            {
                text: "De novo esse tipo de erro? Isso é falta de atenção total! Agora todo mundo acha que a gente não sabe trabalhar!",
                correct: false
            }
        ]
    },
    {
        id: 2,
        title: "Situação 2",
        options: [
            {
                text: "Você quer que alguém caia e se machuque? Isso é falta de responsabilidade!",
                correct: false
            },
            {
                text: "Faltou colocar a placa de aviso. Vamos ficar atentos com isso, porque pode evitar acidentes graves, tudo bem?",
                correct: true
            }
        ]
    },
    {
        id: 3,
        title: "Situação 3",
        options: [
            {
                text: "Você esqueceu os óculos. É melhor colocar antes de continuar, só assim a gente trabalha com segurança.",
                correct: true
            },
            {
                text: "Você tá doido? Vai perder o olho assim! Vai trabalhar com consciência, pô! Diga que não sabia.",
                correct: false
            }
        ]
    },
    {
        id: 4,
        title: "Situação 4",
        options: [
            {
                text: "Você não pensa? Vai esperar cair pra aprender a usar a escada direito?",
                correct: false
            },
            {
                text: "A escada não estava travada. Vamos garantir que esteja firme antes de subir, é um cuidado simples que evita acidentes.",
                correct: true
            }
        ]
    },
    {
        id: 5,
        title: "Situação 5",
        options: [
            {
                text: "Mesmo sendo rápido, sem a luva você se coloca em risco. Vamos manter o padrão de segurança, é pra te proteger.",
                correct: true
            },
            {
                text: "Você quer morrer? Não tem noção do perigo? Vai fazer coisa errada sozinho, mas depois não vem reclamar!",
                correct: false
            }
        ]
    },
    {
        id: 6,
        title: "Situação 6",
        options: [
            {
                text: "Você atrapalhou todo mundo! Esse tipo de erro não dá mais pra aceitar. É falta de compromisso!",
                correct: false
            },
            {
                text: "O relatório teve erros que impactaram o pagamento. Vamos revisar com mais atenção juntos para resolver o quanto antes e evitar que aconteça de novo, tudo bem?",
                correct: true
            }
        ]
    },
    {
        id: 7,
        title: "Situação 7",
        options: [
            {
                text: "Faltou isolar o espaço e isso gerou sujeira desnecessária. Vamos reforçar esse cuidado nas próximas vezes pra evitar retrabalho, beleza?",
                correct: true
            },
            {
                text: "Você fez um serviço porco! Tá achando que isso aqui é zona? Agora todo mundo tem que limpar por sua causa!",
                correct: false
            }
        ]
    },
    {
        id: 8,
        title: "Situação 8",
        options: [
            {
                text: "Você não fez nem o básico! Como quer trabalhar com prevenção se nem registra o que faz?",
                correct: false
            },
            {
                text: "O registro da inspeção ficou faltando. É uma etapa simples, mas essencial. Vamos completar agora pra garantir que esteja tudo em dia, tranquilo?",
                correct: true
            }
        ]
    }
];
let currentSituation = 0;
let score = 0;
let totalAnswered = 0;
let selectedOption = null;

const titleScreen = document.getElementById('title-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const currentQuestionSpan = document.getElementById('current-question');
const situationTitle = document.getElementById('situation-title');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const endBtn = document.getElementById('end-btn');
const restartBtn = document.getElementById('restart-btn');
const infographBtn = document.getElementById('infograph-btn');
const progress = document.getElementById('progress');
const scoreText = document.getElementById('score-text');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextSituation);
endBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', restartQuiz);
infographBtn.addEventListener('click', () => {
    window.location.href = 'infograph.html';
});
function startQuiz() {
    titleScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentSituation = 0;
    score = 0;
    totalAnswered = 0;
    loadSituation();
}

function loadSituation() {
    const situation = situations[currentSituation];
    currentQuestionSpan.textContent = currentSituation + 1;
    situationTitle.textContent = situation.title;
    const progressPercent = ((currentSituation) / situations.length) * 100;
    progress.style.width = progressPercent + '%';
    optionsContainer.innerHTML = '';

    situation.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.dataset.correct = option.correct;
        button.addEventListener('click', () => selectOption(button, option.correct));
        optionsContainer.appendChild(button);
    });

    feedback.classList.add('hidden');
    selectedOption = null;
}

function selectOption(button, isCorrect) {
    if (selectedOption) return;
    selectedOption = button;
    totalAnswered++;
    
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }
    });
    

    button.classList.add('selected');
    if (isCorrect) {
        score++;
        feedbackText.textContent = 'Você escolheu uma forma de comunicação não violenta.';
    } else {
        feedbackText.textContent = 'Você escolheu uma forma de comunicação agressiva.';
    }
    feedback.classList.remove('hidden');  
    if (currentSituation === situations.length - 1) {
        nextBtn.style.display = 'none';
        endBtn.textContent = 'Ver Resultados';
    } else {
        nextBtn.style.display = 'inline-block';
        endBtn.textContent = 'Encerrar';
    }
}

function nextSituation() {
    currentSituation++;
    if (currentSituation < situations.length) {
        loadSituation();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    scoreText.textContent = `Vocês escolheram ${score} de ${totalAnswered} respostas não violentas (${percentage}%)`;
    createChart(percentage);
}

function createChart(percentage) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    const correctPercentage = percentage;
    const incorrectPercentage = 100 - percentage;
    
    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [correctPercentage, incorrectPercentage],
                backgroundColor: [
                    '#FF460A',
                    '#CEA2FD'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '50%'
        }
    });
}

function restartQuiz() {
    resultsScreen.classList.remove('active');
    titleScreen.classList.add('active');
    currentSituation = 0;
    score = 0;
    totalAnswered = 0;
    selectedOption = null;
    progress.style.width = '0%';
}