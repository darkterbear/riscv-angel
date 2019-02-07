// handle the range start text input
let rangeStartInput = document.getElementById('rangeStartInput')
rangeStartInput.addEventListener('keypress', e => {
	if (e.keyCode == 13) {
		rangeStart = Number(rangeStartInput.value)
		rangeStartInput.blur()
	}
})

let memoryH = document.getElementById('memory').clientHeight
let memoryW = document.getElementById('memory').clientWidth

let memorySVG = d3
	.select('#memory')
	.append('svg:svg')
	.attr('width', memoryW)
	.attr('height', memoryH)

if (rows * columns !== 32) {
	console.error("Columns and rows don't multiply to 32")
}

let memW = (memoryW - spacing * columns) / columns
let memH = (memoryH - spacing * rows) / rows

let rangeStart = 0x0000

// initialize the 32 memory pages in range
for (let row = 0; row < rows; row++) {
	for (let col = 0; col < columns; col++) {
		memorySVG
			.append('svg:rect')
			.attr('id', `mem${row * columns + col}-rect`)
			.attr('fill', '#00000000')
			.attr('x', col * (memW + spacing) + strokeWidth)
			.attr('y', row * (memH + spacing) + strokeWidth)
			.attr('stroke', 'black')
			.attr('stroke-width', strokeWidth)
			.attr('height', memH)
			.attr('width', memW)
		// .attr('rx', spacing / 2)
		// .attr('ry', spacing / 2)
	}
}

for (let row = 0; row < rows; row++) {
	for (let col = 0; col < columns; col++) {
		memorySVG
			.append('svg:text')
			.attr('id', `mem${row * columns + col}-text`)
			.attr('fill', '#000000')
			.attr('x', col * (memW + spacing) + strokeWidth + memW / 2)
			.attr('y', row * (memH + spacing) + strokeWidth + memH / 2 + 6)
			.attr('font-size', 18)
			.attr('text-anchor', 'middle')
			.text(() => 0)
		// .attr('rx', spacing / 2)
		// .attr('ry', spacing / 2)
	}
}

let updateMemory = memory => {
	if (rangeStart >= memory.length - 32) {
		return
	}

	for (let i = rangeStart; i < rangeStart + 0x20; i++) {
		let newText = '0x' + memory[i].toString(16)
		console.log(newText)

		let textSelector = `[id="mem${i - rangeStart}-text"]`
		let rectSelector = `[id="mem${i - rangeStart}-rect"]`

		if (newText != d3.select(textSelector).text()) {
			// set new text
			d3.select(textSelector).text(() => newText)

			// transition
			d3.select(rectSelector).attr('stroke', 'blue')
			d3.select(rectSelector)
				.transition()
				.attr('stroke', 'black')
				.duration(500)
		}
	}
}
