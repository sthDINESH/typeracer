// Typing test sample texts by difficulty
const sampleTexts = {
	easy: [
		"The cat sat on the mat.",
		"Dogs bark at night.",
		"I like to read books."
	],
	medium: [
		"Typing quickly takes practice and patience.",
		"The weather today is sunny with a gentle breeze.",
		"Learning new skills can be both fun and challenging."
	],
	hard: [
		"Amazingly, the quick brown fox jumps over the lazy dog every single day.",
		"She sells seashells by the seashore, but the shells she sells are surely seashells.",
		"Complex algorithms require careful planning and precise implementation."
	]
};

// Function to select and display a random sample text based on difficulty
function displayRandomSampleText(level) {
	const texts = sampleTexts[level];
	const randomIndex = Math.floor(Math.random() * texts.length);
	document.getElementById('sample-text').textContent = texts[randomIndex];
}

// Named function to handle difficulty change
function handleDifficultyChange(event) {
	const selectedLevel = event.target.value;
	displayRandomSampleText(selectedLevel);
	// Optionally, reset user input and results here if needed
}

let startTime = null;
let endTime = null;
let timerInterval = null;

// Function to start the typing test
function startTest() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');

    startBtn.disabled = true;
    stopBtn.disabled = false;
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();

    startTime = Date.now();
    timeDisplay.textContent = '0.00';

    // Update timer every 10ms for better precision
    timerInterval = setInterval(function () {
        const elapsed = (Date.now() - startTime) / 1000;
        timeDisplay.textContent = elapsed.toFixed(2);
    }, 10);
}

// Function to count correctly typed words
function countCorrectWords(sample, userInput) {
    const sampleWords = sample.trim().split(/\s+/);
    const userWords = userInput.trim().split(/\s+/);
    let correct = 0;
    for (let i = 0; i < Math.min(sampleWords.length, userWords.length); i++) {
        if (sampleWords[i] === userWords[i]) {
            correct++;
        }
    }
    return correct;
}

// Function to update results area
function updateResultsArea(level, time, wpm) {
    document.getElementById('level').textContent = level.charAt(0).toUpperCase() + level.slice(1);
    document.getElementById('time').textContent = time;
    document.getElementById('wpm').textContent = wpm;
}

// Function to stop the typing test
function stopTest() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');
    const difficultySelect = document.getElementById('difficulty');
    const sampleText = document.getElementById('sample-text').textContent;

    if (timerInterval) {
        clearInterval(timerInterval);
    }
    endTime = Date.now();
    const elapsed = ((endTime - startTime) / 1000).toFixed(2);
    timeDisplay.textContent = elapsed;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    userInput.disabled = true;

    // Calculate correct words and WPM
    const correctWords = countCorrectWords(sampleText, userInput.value);
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;

    updateResultsArea(difficultySelect.value, elapsed, wpm);
}

// Function to initialize button states
function initializeButtons() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const userInput = document.getElementById('user-input');

    startBtn.disabled = false;
    stopBtn.disabled = true;
    userInput.disabled = true;
}

// Event listener for difficulty selection
document.addEventListener('DOMContentLoaded', function () {
    const difficultySelect = document.getElementById('difficulty');
    displayRandomSampleText(difficultySelect.value);
    difficultySelect.addEventListener('change', handleDifficultyChange);

    // Timer and button logic
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');

    initializeButtons();

    startBtn.addEventListener('click', startTest);
    stopBtn.addEventListener('click', stopTest);
});
