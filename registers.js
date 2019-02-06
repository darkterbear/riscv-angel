let registersH = document.getElementById('registers').clientHeight
let registersW = document.getElementById('registers').clientWidth

let registersSVG = d3
	.select('#registers')
	.append('svg:svg')
	.attr('width', registersW)
	.attr('height', registersH)

let spacing = 16
let strokeWidth = 4
let rows = 4
let columns = 8

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

let updateRegisters = registers => {
	registers.forEach((r, i) => {
		let long = new goog.math.Long(r.high_, r.low_)
		console.log(long.toString(32))
		d3.select(`[id="x${i}-text"]`).text(() => long.toString())
	})
}
