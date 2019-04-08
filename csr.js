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
      .text(() => '')
    // .attr('rx', spacing / 2)
    // .attr('ry', spacing / 2)
  }
}

let PCRs = [
  { num: 0, name: 'USTATUS' },
  { num: 4, name: 'UIE' },
  { num: 5, name: 'UTVEC' },
  { num: 64, name: 'USCRATCH' },
  { num: 65, name: 'UEPC' },
  { num: 66, name: 'UCAUSE' },
  { num: 67, name: 'UTVAL' },
  { num: 68, name: 'UIP' },
  { num: 1, name: 'FFLAGS' },
  { num: 2, name: 'FRM' },
  { num: 3, name: 'FCSR' },
  { num: 3072, name: 'CYCLE' },
  { num: 3073, name: 'TIME' },
  { num: 3074, name: 'INSTRET' },
  { num: 3075, name: 'HPMCOUNTER3' },
  { num: 3076, name: 'HPMCOUNTER4' },
  { num: 3077, name: 'HPMCOUNTER5' },
  { num: 3078, name: 'HPMCOUNTER6' },
  { num: 3079, name: 'HPMCOUNTER7' },
  { num: 3080, name: 'HPMCOUNTER8' },
  { num: 3081, name: 'HPMCOUNTER9' },
  { num: 3082, name: 'HPMCOUNTER10' },
  { num: 3083, name: 'HPMCOUNTER11' },
  { num: 3084, name: 'HPMCOUNTER12' },
  { num: 3085, name: 'HPMCOUNTER13' },
  { num: 3086, name: 'HPMCOUNTER14' },
  { num: 3087, name: 'HPMCOUNTER15' },
  { num: 3088, name: 'HPMCOUNTER16' },
  { num: 3089, name: 'HPMCOUNTER17' },
  { num: 3090, name: 'HPMCOUNTER18' },
  { num: 3091, name: 'HPMCOUNTER19' },
  { num: 3092, name: 'HPMCOUNTER20' },
  { num: 3093, name: 'HPMCOUNTER21' },
  { num: 3094, name: 'HPMCOUNTER22' },
  { num: 3095, name: 'HPMCOUNTER23' },
  { num: 3096, name: 'HPMCOUNTER24' },
  { num: 3097, name: 'HPMCOUNTER25' },
  { num: 3098, name: 'HPMCOUNTER26' },
  { num: 3099, name: 'HPMCOUNTER27' },
  { num: 3100, name: 'HPMCOUNTER28' },
  { num: 3101, name: 'HPMCOUNTER29' },
  { num: 3102, name: 'HPMCOUNTER30' },
  { num: 3103, name: 'HPMCOUNTER31' },
  { num: 3200, name: 'CYCLEH' },
  { num: 3201, name: 'TIMEH' },
  { num: 3202, name: 'INSTRETH' },
  { num: 3203, name: 'HPMCOUNTER3H' },
  { num: 3204, name: 'HPMCOUNTER4H' },
  { num: 3205, name: 'HPMCOUNTER5H' },
  { num: 3206, name: 'HPMCOUNTER6H' },
  { num: 3207, name: 'HPMCOUNTER7H' },
  { num: 3208, name: 'HPMCOUNTER8H' },
  { num: 3209, name: 'HPMCOUNTER9H' },
  { num: 3210, name: 'HPMCOUNTER10H' },
  { num: 3211, name: 'HPMCOUNTER11H' },
  { num: 3212, name: 'HPMCOUNTER12H' },
  { num: 3213, name: 'HPMCOUNTER13H' },
  { num: 3214, name: 'HPMCOUNTER14H' },
  { num: 3215, name: 'HPMCOUNTER15H' },
  { num: 3216, name: 'HPMCOUNTER16H' },
  { num: 3217, name: 'HPMCOUNTER17H' },
  { num: 3218, name: 'HPMCOUNTER18H' },
  { num: 3219, name: 'HPMCOUNTER19H' },
  { num: 3220, name: 'HPMCOUNTER20H' },
  { num: 3221, name: 'HPMCOUNTER21H' },
  { num: 3222, name: 'HPMCOUNTER22H' },
  { num: 3223, name: 'HPMCOUNTER23H' },
  { num: 3224, name: 'HPMCOUNTER24H' },
  { num: 3225, name: 'HPMCOUNTER25H' },
  { num: 3226, name: 'HPMCOUNTER26H' },
  { num: 3227, name: 'HPMCOUNTER27H' },
  { num: 3228, name: 'HPMCOUNTER28H' },
  { num: 3229, name: 'HPMCOUNTER29H' },
  { num: 3230, name: 'HPMCOUNTER30H' },
  { num: 3231, name: 'HPMCOUNTER31H' },
  { num: 256, name: 'SSTATUS' },
  { num: 258, name: 'SEDELEG' },
  { num: 259, name: 'SIDELEG' },
  { num: 260, name: 'SIE' },
  { num: 261, name: 'STVEC' },
  { num: 262, name: 'SCOUNTEREN' },
  { num: 320, name: 'SSCRATCH' },
  { num: 321, name: 'SEPC' },
  { num: 322, name: 'SCAUSE' },
  { num: 323, name: 'STVAL' },
  { num: 324, name: 'SIP' },
  { num: 384, name: 'SATP' },
  { num: 3857, name: 'MVENDORID' },
  { num: 3858, name: 'MARCHID' },
  { num: 3859, name: 'MIMPID' },
  { num: 3860, name: 'MHARTID' },
  { num: 768, name: 'MSTATUS' },
  { num: 769, name: 'MISA' },
  { num: 770, name: 'MEDELEG' },
  { num: 771, name: 'MIDELEG' },
  { num: 772, name: 'MIE' },
  { num: 773, name: 'MTVEC' },
  { num: 774, name: 'MCOUNTEREN' },
  { num: 832, name: 'MSCRATCH' },
  { num: 833, name: 'MEPC' },
  { num: 834, name: 'MCAUSE' },
  { num: 835, name: 'MTVAL' },
  { num: 836, name: 'MIP' },
  { num: 928, name: 'PMPCFG0' },
  { num: 929, name: 'PMPCFG1' },
  { num: 930, name: 'PMPCFG2' },
  { num: 931, name: 'PMPCFG3' },
  { num: 944, name: 'PMPADDR0' },
  { num: 945, name: 'PMPADDR1' },
  { num: 946, name: 'PMPADDR2' },
  { num: 947, name: 'PMPADDR3' },
  { num: 948, name: 'PMPADDR4' },
  { num: 949, name: 'PMPADDR5' },
  { num: 950, name: 'PMPADDR6' },
  { num: 951, name: 'PMPADDR7' },
  { num: 952, name: 'PMPADDR8' },
  { num: 953, name: 'PMPADDR9' },
  { num: 954, name: 'PMPADDR10' },
  { num: 955, name: 'PMPADDR11' },
  { num: 956, name: 'PMPADDR12' },
  { num: 957, name: 'PMPADDR13' },
  { num: 958, name: 'PMPADDR14' },
  { num: 959, name: 'PMPADDR15' },
  { num: 2816, name: 'MCYCLE' },
  { num: 2818, name: 'MINSTRET' },
  { num: 2819, name: 'MHPMCOUNTER3' },
  { num: 2820, name: 'MHPMCOUNTER4' },
  { num: 2821, name: 'MHPMCOUNTER5' },
  { num: 2822, name: 'MHPMCOUNTER6' },
  { num: 2823, name: 'MHPMCOUNTER7' },
  { num: 2824, name: 'MHPMCOUNTER8' },
  { num: 2825, name: 'MHPMCOUNTER9' },
  { num: 2826, name: 'MHPMCOUNTER10' },
  { num: 2827, name: 'MHPMCOUNTER11' },
  { num: 2828, name: 'MHPMCOUNTER12' },
  { num: 2829, name: 'MHPMCOUNTER13' },
  { num: 2830, name: 'MHPMCOUNTER14' },
  { num: 2831, name: 'MHPMCOUNTER15' },
  { num: 2832, name: 'MHPMCOUNTER16' },
  { num: 2833, name: 'MHPMCOUNTER17' },
  { num: 2834, name: 'MHPMCOUNTER18' },
  { num: 2835, name: 'MHPMCOUNTER19' },
  { num: 2836, name: 'MHPMCOUNTER20' },
  { num: 2837, name: 'MHPMCOUNTER21' },
  { num: 2838, name: 'MHPMCOUNTER22' },
  { num: 2839, name: 'MHPMCOUNTER23' },
  { num: 2840, name: 'MHPMCOUNTER24' },
  { num: 2841, name: 'MHPMCOUNTER25' },
  { num: 2842, name: 'MHPMCOUNTER26' },
  { num: 2843, name: 'MHPMCOUNTER27' },
  { num: 2844, name: 'MHPMCOUNTER28' },
  { num: 2845, name: 'MHPMCOUNTER29' },
  { num: 2846, name: 'MHPMCOUNTER30' },
  { num: 2847, name: 'MHPMCOUNTER31' },
  { num: 2944, name: 'MCYCLEH' },
  { num: 2946, name: 'MINSTRETH' },
  { num: 2947, name: 'MHPMCOUNTER3H' },
  { num: 2948, name: 'MHPMCOUNTER4H' },
  { num: 2949, name: 'MHPMCOUNTER5H' },
  { num: 2950, name: 'MHPMCOUNTER6H' },
  { num: 2951, name: 'MHPMCOUNTER7H' },
  { num: 2952, name: 'MHPMCOUNTER8H' },
  { num: 2953, name: 'MHPMCOUNTER9H' },
  { num: 2954, name: 'MHPMCOUNTER10H' },
  { num: 2955, name: 'MHPMCOUNTER11H' },
  { num: 2956, name: 'MHPMCOUNTER12H' },
  { num: 2957, name: 'MHPMCOUNTER13H' },
  { num: 2958, name: 'MHPMCOUNTER14H' },
  { num: 2959, name: 'MHPMCOUNTER15H' },
  { num: 2960, name: 'MHPMCOUNTER16H' },
  { num: 2961, name: 'MHPMCOUNTER17H' },
  { num: 2962, name: 'MHPMCOUNTER18H' },
  { num: 2963, name: 'MHPMCOUNTER19H' },
  { num: 2964, name: 'MHPMCOUNTER20H' },
  { num: 2965, name: 'MHPMCOUNTER21H' },
  { num: 2966, name: 'MHPMCOUNTER22H' },
  { num: 2967, name: 'MHPMCOUNTER23H' },
  { num: 2968, name: 'MHPMCOUNTER24H' },
  { num: 2969, name: 'MHPMCOUNTER25H' },
  { num: 2970, name: 'MHPMCOUNTER26H' },
  { num: 2971, name: 'MHPMCOUNTER27H' },
  { num: 2972, name: 'MHPMCOUNTER28H' },
  { num: 2973, name: 'MHPMCOUNTER29H' },
  { num: 2974, name: 'MHPMCOUNTER30H' },
  { num: 2975, name: 'MHPMCOUNTER31H' },
  { num: 803, name: 'MHPEVENTM3' },
  { num: 804, name: 'MHPEVENTM4' },
  { num: 805, name: 'MHPEVENTM5' },
  { num: 806, name: 'MHPEVENTM6' },
  { num: 807, name: 'MHPEVENTM7' },
  { num: 808, name: 'MHPEVENTM8' },
  { num: 809, name: 'MHPEVENTM9' },
  { num: 810, name: 'MHPEVENTM10' },
  { num: 811, name: 'MHPEVENTM11' },
  { num: 812, name: 'MHPEVENTM12' },
  { num: 813, name: 'MHPEVENTM13' },
  { num: 814, name: 'MHPEVENTM14' },
  { num: 815, name: 'MHPEVENTM15' },
  { num: 816, name: 'MHPEVENTM16' },
  { num: 817, name: 'MHPEVENTM17' },
  { num: 818, name: 'MHPEVENTM18' },
  { num: 819, name: 'MHPEVENTM19' },
  { num: 820, name: 'MHPEVENTM20' },
  { num: 821, name: 'MHPEVENTM21' },
  { num: 822, name: 'MHPEVENTM22' },
  { num: 823, name: 'MHPEVENTM23' },
  { num: 824, name: 'MHPEVENTM24' },
  { num: 825, name: 'MHPEVENTM25' },
  { num: 826, name: 'MHPEVENTM26' },
  { num: 827, name: 'MHPEVENTM27' },
  { num: 828, name: 'MHPEVENTM28' },
  { num: 829, name: 'MHPEVENTM29' },
  { num: 830, name: 'MHPEVENTM30' },
  { num: 831, name: 'MHPEVENTM31' },
  { num: 1952, name: 'TSELECT' },
  { num: 1953, name: 'TDATA1' },
  { num: 1954, name: 'TDATA2' },
  { num: 1955, name: 'TDATA3' },
  { num: 1968, name: 'DCSR' },
  { num: 1969, name: 'DPC' },
  { num: 1970, name: 'DSCRATCH' }
]

let updateCSR = csr => {
  for (let i = 0; i < 32; i++) {
    let newText
    if (i >= PCRs.length) {
      newText = ''
    } else {
      let val = csr[PCRs[i].num]
      val.high_ = (val.high_ + twoP64) % twoP64
      val.low_ = (val.low_ + twoP64) % twoP64
      let long = new goog.math.Long(val.low_, val.high_)

      newText = long.toString(16)
      newText = PCRs[i].name + ': ' + newText
    }

    let textSelector = `[id="csr${i}-text"]`
    let rectSelector = `[id="csr${i}-rect"]`

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
