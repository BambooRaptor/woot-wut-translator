const translationMatrix = [
	[" ", " / "],
	[".", ".-.-.- "],
	["a", ".- "],
	["b", "-... "],
	["c", "-.-. "],
	["d", "-.. "],
	["e", ". "],
	["f", "..-. "],
	["g", "--. "],
	["h", ".... "],
	["i", ".. "],
	["j", ".--- "],
	["k", "-.- "],
	["l", ".-.. "],
	["m", "-- "],
	["n", "-. "],
	["o", "--- "],
	["p", ".--. "],
	["q", "--.- "],
	["r", ".-. "],
	["s", "... "],
	["t", "- "],
	["u", "..- "],
	["v", "...- "],
	["w", ".-- "],
	["x", "-..- "],
	["y", "-.-- "],
	["z", "--.. "],
	["0", "----- "],
	["1", ".---- "],
	["2", "..--- "],
	["3", "...-- "],
	["4", "....- "],
	["5", "..... "],
	["6", "-.... "],
	["7", "--... "],
	["8", "---.. "],
	["9", "----. "],
]

const wootMatrix = [
	[" ", "wooot"],
	["a", "wuut"],
	["b", "wuuT"],
	["c", "Wuut"],
	["d", "WuuT"],
	["e", "wut"],
	["f", "wuT"],
	["g", "wUt"],
	["h", "wUT"],
	["i", "Wut"],
	["j", "WuT"],
	["k", "WUt"],
	["l", "WUT"],
	["m", "wot"],
	["n", "woT"],
	["o", "wOt"],
	["p", "wOT"],
	["q", "Wot"],
	["r", "WoT"],
	["s", "WOt"],
	["t", "WOT"],
	["u", "woot"],
	["v", "wooT"],
	["w", "woOt"],
	["x", "woOT"],
	["y", "wOot"],
	["z", "wOoT"],
	["0", "wOOt"],
	["1", "wOOT"],
	["2", "Woot"],
	["3", "WooT"],
	["4", "WoOt"],
	["5", "WoOT"],
	["6", "WOot"],
	["7", "WOoT"],
	["8", "WOOt"],
	["9", "WOOT"],
]

const codeA = 'a'.charCodeAt(0)

const labelHeading = document.getElementById("label-heading")

const textInput = document.getElementById("text-input");
const tranlationDisplay = document.getElementById("translation-display")

const translateBtn = document.getElementById("translate-btn")
const switchBtn = document.getElementById("switch-btn")

let isTextToWoot = true;
let textToWootText = "Text To Woot";
let wootToTextText = "Woot To Text";

translateBtn.addEventListener('click', (e) => {
	if (isTextToWoot) {
		// tranlationDisplay.innerText = toWoot(textInput.value)
		tranlationDisplay.innerText = toWootCode(textInput.value)
	} else {
		try {
			tranlationDisplay.innerText = toTextCode(textInput.value)
		} catch (err) {
			tranlationDisplay.innerText = "ERROR: Invalid Woot"
		}
	}
})

const copyArea = document.getElementById('display')
const displayCopy = document.getElementById('copied')
let fadetimeout;
copyArea.addEventListener('click', (e) => {
	// let ta = document.createElement('textarea')
	// ta.value = tranlationDisplay.innerText
	// ta.select();
	navigator.clipboard.writeText(tranlationDisplay.innerText);
	if (fadetimeout) {
		clearTimeout(fadetimeout)
		displayCopy.classList.remove('fadeinout')
		fadetimeout = setTimeout(() => {
			displayCopy.classList.add('fadeinout')
			fadetimeout = setTimeout(() => {
				displayCopy.classList.remove('fadeinout');
			}, 2000)
		}, 100)
	} else {
		displayCopy.classList.add('fadeinout')
		fadetimeout = setTimeout(() => {
			displayCopy.classList.remove('fadeinout');
		}, 2000)
	}
})

switchBtn.addEventListener('click', (e) => {
	isTextToWoot = !isTextToWoot;
	updateUI(isTextToWoot);
})

function updateUI(directionTextToWoot) {
	if (directionTextToWoot) {
		labelHeading.innerText = textToWootText
	} else {
		labelHeading.innerText = wootToTextText
	}
}

function toWoot(text) {
	let morse = text
	morse = morse.toLowerCase();
	console.log(morse);
	for (let index = 0; index < translationMatrix.length; index++) {
		const matrixRow = translationMatrix[index];
		morse = morse.replaceAll(matrixRow[0], matrixRow[1]);
		console.log(morse);
	}
	console.log(morse);
	return morse
		.replaceAll('.', 'wu ')
		.replaceAll('-', 'woo ')
		.replaceAll('/', 'w ')
		.replaceAll(' ', 't ');
}


function getNormalizedCharCode(char) {
	let code = char.charCodeAt(0)
	return code - codeA
}

const trinaryMatrix = {
	'0': 'o',
	'1': 'O',
	'2': 'u'
}

const inverseTrinaryMatrix = {
	'o': '0',
	'O': '1',
	'u': '2',
}

function padLeft(number, length, character) {
	if (character == null) {
		character = '0';
	}
	var result = number;
	for (var i = result.length; i < length; ++i) {
		result = character + result;
	}
	return result;
}

function toWootCode(text) {
	console.log(text);
	text = text.split(" ")

	let wootWords = text.map(word => {
		word = word.toLowerCase()
		word = word.split("")
		wootWord = 'w'
		word.forEach(char => {
			if (isAlphaNumeric(char)) {
				let code = getNormalizedCharCode(char)
				code = padLeft(code.toString(3), 3);
				console.log(code)
				code.split("").forEach(c => {
					wootWord += trinaryMatrix[c]
				})
			} else {
				wootWord += char
			}
		})
		wootWord += 't'
		return wootWord
	})

	return wootWords.join(" ")
}

function toTextCode(text) {
	console.log(text);
	text = text.split(" ")

	let wootWords = text.map(word => {
		console.log(word)
		// word = word.split("")
		console.log(word)
		wootWord = ''


		if (word[0] == 'w' && word[word.length - 1] == 't') {
			console.log("TRUE")
			let actualWord = word.split("").slice(1, word.length - 1).join("")

			let compiledCode = ''
			let codeCounter = 0
			
			actualWord.split("").forEach(char => {
				if (codeCounter % 3 == 0) {
					if (compiledCode != '') {
						wootWord += String.fromCharCode(parseInt(compiledCode, 3) + codeA)
					}
					compiledCode = ''
				}

				if (isAlphaNumeric(char)) {
					codeCounter += 1
					compiledCode += inverseTrinaryMatrix[char]
				} else {
					wootWord += char
				}

			})
			if (compiledCode != '') {
				wootWord += String.fromCharCode(parseInt(compiledCode, 3) + codeA)
			}


			// actualWord.match(/.{1,3}/g).forEach(wootCode => {
			// 	let compiledCode = ''
			// 	let containsExtraChar = false
			// 	wootCode.split("").forEach(wc => {
			// 		if (containsExtraChar) return wc

			// 		if (inverseTrinaryMatrix[wc]) {
			// 			compiledCode += inverseTrinaryMatrix[wc]
			// 		} else {
			// 			containsExtraChar = true;
			// 			return wc
			// 		}
			// 	})

			// 	wootWord += containsExtraChar ? wootCode : String.fromCharCode(parseInt(compiledCode, 3) + codeA)
			// })

		} else {
			return word.join("")
		}

		return wootWord
	})

	return wootWords.join(" ")
}

function convertToTrinary(x) {
	let bin = 0;
	let rem, i = 1, step = 1;
	while (x != 0) {
		rem = x % 3;
		console.log(
			`Step ${step++}: ${x}/3, Remainder = ${rem}, Quotient = ${parseInt(x / 3)}`
		);
		x = parseInt(x / 3);
		bin = bin + rem * i;
		i = i * 10;
	}
	return bin
}

function isAlphaNumeric(str) {
	var code, i, len;

	for (i = 0, len = str.length; i < len; i++) {
		code = (str.toLowerCase()).charCodeAt(i);
		if (!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 96 && code < 123)) { // lower alpha (a-z)
			return false;
		}
	}
	return true;
};

function toWootWoot(text) {
	let woot = text
	console.log(text);
	woot = woot.split("");
	let woots = {}
	wootMatrix.forEach(wootRow => {
		woots[wootRow[0]] = wootRow[1]
	})

	console.log(wootMatrix);

	woot = woot.map(w => woots[w] ? woots[w] : w).join(" ")
	console.log(woot)
	return woot
}

function fromWoot(text) {
	let morse = (text.trimEnd() + " ")
		.replaceAll('t ', ' ')
		.replaceAll('wu ', '.')
		.replaceAll('woo ', '-')
		.replaceAll('w ', ' / ');

	console.log(morse);
	morse = morse.split(" ")
	let matrix = translationMatrix
	matrix.reverse();

	for (let index = 0; index < translationMatrix.length; index++) {
		console.log(morse);
		const matrixRow = matrix[index];
		morse = morse.map(word => (word == matrixRow[1].trim()) ? matrixRow[0] : word);
	}
	console.log(morse)
	return morse.join("");
}