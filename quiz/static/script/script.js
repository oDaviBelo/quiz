const perguntas = [];

async function atualizarPerguntas() {
    try {
        const response = await fetch('../static/question.json');
        if (!response.ok) {
            throw new Error('');
        }
        const data = await response.json();
        perguntas.length = 0;
        perguntas.push(...data);
        quiz();
    } catch (error) {
    }
}

const question = document.querySelector('.question');
const image_question = document.querySelector('.image_question');
const options = [
    document.querySelector('.button1'),
    document.querySelector('.button2'),
    document.querySelector('.button3')
];

let currentQuestion = 0;
let x = 0;
let db_size = 0;

function def(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function quiz() {
    db_size = perguntas.length;
    if (currentQuestion < db_size) {
        document.querySelector('.current_question').innerHTML = `${currentQuestion + 1} de ${db_size}`;

        const i = currentQuestion;
        question.innerHTML = perguntas[i][1];
        image_question.src = perguntas[i][6] || '';

        let answerOptions = [perguntas[i][3], perguntas[i][4], perguntas[i][5]];
        answerOptions = def(answerOptions);

        options.forEach((option, index) => {
            option.innerHTML = answerOptions[index];
            option.onclick = () => handleAnswer(option, perguntas[i][3]);
        });
    }
}

function handleAnswer(option, correctAnswer) {
    if (option.innerHTML === correctAnswer) {
        x += 1;
    }
    currentQuestion += 1;
    quiz();
}

window.addEventListener('click', function verify() {
    if (currentQuestion >= db_size) {
        document.querySelector('body').style.pointerEvents = 'none';
        document.querySelector('.final_result').style.display = 'flex';
        document.querySelector('.final_result').innerHTML = `Você acertou ${x} ${x === 1 ? 'questão' : 'questões'}`;
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
});

atualizarPerguntas();
