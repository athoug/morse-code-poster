const morseMap = {
	a: ".-",
	b: "-...",
	c: "-.-.",
	d: "-..",
	e: ".",
	f: "..-.",
	g: "--.",
	h: "....",
	i: "..",
	j: ".---",
	k: "-.-",
	l: ".-..",
	m: "--",
	n: "-.",
	o: "---",
	p: ".--.",
	q: "--.-",
	r: ".-.",
	s: "...",
	t: "-",
	u: "..-",
	v: "...-",
	w: ".--",
	x: "-..-",
	y: "-.--",
	z: "--..",
	" ": "   ",
	1: ".----",
	2: "..---",
	3: "...--",
	4: "....-",
	5: ".....",
	6: "-....",
	7: "--...",
	8: "---..",
	9: "----.",
	0: "-----",
};
const margin = 20;
const spacing = 10;
let cumulativeX = 0;
let previousLetter = "";
let xAxis = 0;
let yAxis = 0;
let code = "";
let textPhrase = "";
let codePhrase = "";
let author = "";

function setup() {
	createCanvas(800, 600);

	generateRandomQuote();

	console.log("text", textPhrase);
	console.log("code", codePhrase);
}

function draw() {
	background(30);

	displayText(textPhrase, 0, 0, 300);

	for (let i = 0; i < code.length; i++) {
		displayCode(code[i], xAxis * spacing + margin, 0 + margin);

		if (code[i] !== "   ") {
			xAxis += 1;
		}
	}

	displayAuthor(0, yAxis);

	reset();
}

function mouseClicked() {
	generateRandomQuote();
}

function morseCode(phrase) {
	const letters = phrase.split("");

	let morse = [];

	letters.forEach((letter) => {
		morse.push(morseMap[letter]);
	});

	return morse;
}

function displayCode(word, x, y) {
	if (word === "   ") {
		yAxis += 42;
		cumulativeX = 0;
		previousLetter = "";
		xAxis = 0;

		return;
	}

	cumulativeX += previousLetter.length * 10 + xAxis * 5;
	previousLetter = word || "";

	textAlign(LEFT, TOP);
	textSize(32);
	fill(255);
	text(word, x + cumulativeX, y + yAxis);

	const letter = getKeyByValue(morseMap, word);
	textSize(10);
	fill(90);
	text(letter, x + cumulativeX + word.length * 4, y + yAxis);
}

function displayText(word, x, y, size) {
	textAlign(LEFT, TOP);
	textSize(32);
	textLeading(50);
	fill(255);
	text(word, x + margin, y + margin, size);

	yAxis = getTextHeight(textPhrase, size) + 50;
}

function displayAuthor(x, y) {
	const lastY = getTextHeight(codePhrase, 10) + 250;
	textAlign(LEFT, TOP);
	textSize(22);
	fill(60);
	text(`- ${author}`, width / 1.4, height / 1.2);
}

function getTextHeight(txt, maxWidth) {
	let words = txt.split(" ");
	let line = "";
	let lines = 0;

	for (let i = 0; i < words.length; i++) {
		let testLine = line + words[i] + " ";

		if (textWidth(testLine) > maxWidth && i > 0) {
			lines += 1;
			line = words[i] + " ";
		} else {
			line = testLine;
		}
	}

	lines++;

	let lineHeight = textAscent() + textDescent();

	return lines * lineHeight;
}

function generateRandomQuote() {
	const randomQuote = Math.round(Math.random() * inspirationalQuotes.length);

	const dirtyString = inspirationalQuotes[randomQuote].quote.toLowerCase();
	const phrase = cleanText(dirtyString);

	const wordList = phrase.split(" ");
	const halfList = Math.round(wordList.length / 2);

	textPhrase = wordList.slice(0, halfList).join(" ");
	codePhrase = wordList.slice(halfList).join(" ");
	author = inspirationalQuotes[randomQuote].author;

	code = morseCode(codePhrase);
}

function getKeyByValue(obj, value) {
	return Object.keys(obj).find((key) => obj[key] === value);
}

function cleanText(txt) {
	return txt.replace(/[^a-zA-Z0-9\s]/g, "");
}

function reset() {
	yAxis = 0;
	cumulativeX = 0;
	previousLetter = "";
	xAxis = 0;
}
