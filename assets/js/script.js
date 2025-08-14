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
let testStarted = false;

// Function to start the typing test
function startTestOnInput() {
    if (testStarted) return;
    testStarted = true;

    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');

    userInput.disabled = false;
    userInput.focus();

    startTime = Date.now();
    timeDisplay.textContent = '0.00';

    resetSampleTextHighlight();

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
function stopTestOnEnter() {
    if (!testStarted) return;

    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');
    const difficultySelect = document.getElementById('difficulty');
    // Use textContent to get the sample text without HTML tags
    const sampleText = document.getElementById('sample-text').textContent;

    if (timerInterval) {
        clearInterval(timerInterval);
    }
    endTime = Date.now();
    const elapsed = ((endTime - startTime) / 1000).toFixed(2);
    timeDisplay.textContent = elapsed;

    userInput.disabled = true;
    removeUserInputListener();

    // Calculate correct words and WPM
    const correctWords = countCorrectWords(sampleText, userInput.value);
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;

    updateResultsArea(difficultySelect.value, elapsed, wpm);

    testStarted = false;
}

// Function to initialize button states
function initializeTestArea() {
    const userInput = document.getElementById('user-input');
    userInput.value = '';
    userInput.disabled = false;
    testStarted = false;
    resetSampleTextHighlight();
    addUserInputListener();
}

// Function to highlight sample text based on user input
function highlightSampleText() {
    const sampleTextDiv = document.getElementById('sample-text');
    const userInput = document.getElementById('user-input').value;
    const originalSample = sampleTextDiv.textContent;

    const sampleWords = originalSample.trim().split(/\s+/);
    const userWords = userInput.trim().split(/\s+/);

    let highlightedHTML = '';
    for (let i = 0; i < sampleWords.length; i++) {
        let colorClass = '';
        if (userWords[i] !== undefined) {
            if (sampleWords[i] === userWords[i]) {
                colorClass = 'word-correct';
            } else {
                colorClass = 'word-incorrect';
            }
        }
        highlightedHTML += `<span class="${colorClass}">${sampleWords[i]}</span> `;
    }
    sampleTextDiv.innerHTML = highlightedHTML.trim();
}

// Function to reset sample text highlighting to default
function resetSampleTextHighlight() {
    const sampleTextDiv = document.getElementById('sample-text');
    sampleTextDiv.innerHTML = sampleTextDiv.textContent;
}

// Add event listener for real-time feedback and test start/stop
function addUserInputListener() {
    const userInput = document.getElementById('user-input');
    userInput.addEventListener('input', highlightSampleText);
    userInput.addEventListener('input', startTestOnInput, { once: true });
    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            stopTestOnEnter();
        }
    });
}

// Remove event listener when test ends
function removeUserInputListener() {
    const userInput = document.getElementById('user-input');
    userInput.removeEventListener('input', highlightSampleText);
    // No need to remove startTestOnInput since it's { once: true }
    // Remove keydown event by cloning node (quickest way)
    const newInput = userInput.cloneNode(true);
    userInput.parentNode.replaceChild(newInput, userInput);
}

// Event listener for difficulty selection
document.addEventListener('DOMContentLoaded', function () {
    const difficultySelect = document.getElementById('difficulty');
    displayRandomSampleText(difficultySelect.value);
    difficultySelect.addEventListener('change', function (event) {
        handleDifficultyChange(event);
        initializeTestArea();
    });

    initializeTestArea();

    // Remove Start and Stop buttons from UI
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('stop-btn').style.display = 'none';
});
