let registersH = document.getElementById('registers').clientHeight
let registersW = document.getElementById('registers').clientWidth

let registersSVG = d3
	.select('#registers')
	.append('svg:svg')
	.attr('width', registersW)
	.attr('height', registersH)

let spacing = 16
let strokeWidth = 4
let rows = 8
let columns = 4

if (rows * columns !== 32) {
	console.error('')
}

let regW = (registersW - spacing * columns) / columns
let regH = (registersH - spacing * rows) / rows

// initialize the 32 GP registers
for (let row = 0; row < rows; row++) {
	for (let col = 0; col < columns; col++) {
		registersSVG
			.append('svg:rect')
			.attr('id', `x${row * columns + col}-rect`)
			.attr('fill', '#00000000')
			.attr('x', col * (regW + spacing) + strokeWidth)
			.attr('y', row * (regH + spacing) + strokeWidth)
			.attr('stroke', 'black')
			.attr('stroke-width', strokeWidth)
			.attr('height', regH)
			.attr('width', regW)
		// .attr('rx', spacing / 2)
		// .attr('ry', spacing / 2)
	}
}

for (let row = 0; row < rows; row++) {
	for (let col = 0; col < columns; col++) {
		registersSVG
			.append('svg:text')
			.attr('id', `x${row * columns + col}-text`)
			.attr('fill', '#000000')
			.attr('x', col * (regW + spacing) + strokeWidth + regW / 2)
			.attr('y', row * (regH + spacing) + strokeWidth + regH / 2 + 6)
			.attr('font-size', 18)
			.attr('text-anchor', 'middle')
			.text(() => 0)
		// .attr('rx', spacing / 2)
		// .attr('ry', spacing / 2)
	}
}

const twoP64 = 2 ** 64

let updateRegisters = registers => {
	registers.forEach((r, i) => {
		r.high_ = (r.high_ + twoP64) % twoP64
		r.low_ = (r.low_ + twoP64) % twoP64

		let long = new goog.math.Long(r.low_, r.high_)
		let newText = long.toString(16)
		let textSelector = `[id="x${i}-text"]`
		let rectSelector = `[id="x${i}-rect"]`

		console.log(newText, d3.select(textSelector).text)
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
	})
}
