// handle the range start text input
let csrRangeStartInput = document.getElementById('csrRangeStartInput')
csrRangeStartInput.addEventListener('keypress', e => {
	if (e.keyCode == 13) {
		csrRangeStart = Number(csrRangeStartInput.value)
		csrRangeStartInput.blur()
	}
})

let csrH = document.getElementById('memory').clientHeight
let csrW = document.getElementById('memory').clientWidth

let csrSVG = d3
	.select('#csr')
	.append('svg:svg')
	.attr('width', csrW)
	.attr('height', csrH)

if (rows * columns !== 32) {
	console.error("Columns and rows don't multiply to 32")
}

let mcsrW = (csrW - spacing * columns) / columns
let mcsrH = (csrH - spacing * rows) / rows

let csrRangeStart = 0x0000

// initialize the 32 memory pages in range
for (let row = 0; row < rows; row++) {
	for (let col = 0; col < columns; col++) {
		csrSVG
			.append('svg:rect')
			.attr('id', `csr${row * columns + col}-rect`)
			.attr('fill', '#00000000')
			.attr('x', col * (mcsrW + spacing) + strokeWidth)
			.attr('y', row * (mcsrH + spacing) + strokeWidth)
			.attr('stroke', 'black')
			.attr('stroke-width', strokeWidth)
			.attr('height', mcsrH)
			.attr('width', mcsrW)
		// .attr('rx', spacing / 2)
		// .attr('ry', spacing / 2)
	}
}

for (let row = 0; row < rows; row++) {
	for (let col = 0; col < columns; col++) {
		csrSVG
			.append('svg:text')
			.attr('id', `csr${row * columns + col}-text`)
			.attr('fill', '#000000')
			.attr('x', col * (mcsrW + spacing) + strokeWidth + mcsrW / 2)
			.attr('y', row * (mcsrH + spacing) + strokeWidth + mcsrH / 2 + 6)
			.attr('font-size', 18)
			.attr('text-anchor', 'middle')
			.text(() => 'empty')
		// .attr('rx', spacing / 2)
		// .attr('ry', spacing / 2)
	}
}

let invPCR = {
	0x001: 'FFLAGS',
	0x002: 'FRM',
	0x003: 'FCSR',

	0x500: 'SUP0',
	0x501: 'SUP1',
	0x502: 'EPC',
	0x503: 'BADVADDR',
	0x504: 'PTBR',
	0x505: 'ASID',
	0x506: 'COUNT',
	0x507: 'COMPARE',
	0x508: 'EVEC',
	0x509: 'CAUSE',
	0x50a: 'STATUS',
	0x50b: 'HARTID',
	0x50c: 'IMPL',
	0x50d: 'FATC',
	0x50e: 'SEND_IPI',
	0x50f: 'CLEAR_IPI',

	0x51c: 'STATS',
	0x51d: 'RESET',

	0x51e: 'TOHOST',
	0x51f: 'FROMHOST',

	0xc00: 'CYCLE',
	0xc01: 'TIME',
	0xc02: 'INSTRET'
}

let updateCSR = csr => {
	if (csrRangeStart >= csr.length - 32) {
		return
	}

	for (let i = csrRangeStart; i < csrRangeStart + 32; i++) {
		let newText
		if (csr[i] === undefined || csr[i] === null) {
			newText = 'empty'
		} else {
			csr[i].high_ = (csr[i].high_ + twoP64) % twoP64
			csr[i].low_ = (csr[i].low_ + twoP64) % twoP64
			let long = new goog.math.Long(csr[i].low_, csr[i].high_)

			newText = long.toString(16)

			if (invPCR[i]) {
				newText = invPCR[i] + ': ' + newText
			}
		}

		let textSelector = `[id="csr${i - csrRangeStart}-text"]`
		let rectSelector = `[id="csr${i - csrRangeStart}-rect"]`

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
