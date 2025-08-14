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

// Event listener for difficulty selection
document.addEventListener('DOMContentLoaded', function () {
	const difficultySelect = document.getElementById('difficulty');
	// Display a random text for the initial value
	displayRandomSampleText(difficultySelect.value);

	difficultySelect.addEventListener('change', handleDifficultyChange);
});
