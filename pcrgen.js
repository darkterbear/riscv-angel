var PCRNames = [
  'ustatus',
  'uie',
  'utvec',
  'uscratch',
  'uepc',
  'ucause',
  'utval',
  'uip',
  'fflags',
  'frm',
  'fcsr',
  'cycle',
  'time',
  'instret'
]

var PCRNums = [
  0x000,
  0x004,
  0x005,
  0x040,
  0x041,
  0x042,
  0x043,
  0x044,
  0x001,
  0x002,
  0x003,
  0xc00,
  0xc01,
  0xc02
]

for (let i = 0xc03; i <= 0xc1f; i++) {
  PCRNames.push('hpmcounter' + (i - 0xc00).toString(10))
  PCRNums.push(i)
}

PCRNames.push('cycleh', 'timeh', 'instreth')
PCRNums.push(0xc80, 0xc81, 0xc82)

for (let i = 0xc83; i <= 0xc9f; i++) {
  PCRNames.push('hpmcounter' + (i - 0xc80).toString(10) + 'h')
  PCRNums.push(i)
}

PCRNames.push(
  'sstatus',
  'sedeleg',
  'sideleg',
  'sie',
  'stvec',
  'scounteren',
  'sscratch',
  'sepc',
  'scause',
  'stval',
  'sip',
  'satp',
  'mvendorid',
  'marchid',
  'mimpid',
  'mhartid',
  'mstatus',
  'misa',
  'medeleg',
  'mideleg',
  'mie',
  'mtvec',
  'mcounteren',
  'mscratch',
  'mepc',
  'mcause',
  'mtval',
  'mip',
  'pmpcfg0',
  'pmpcfg1',
  'pmpcfg2',
  'pmpcfg3'
)

PCRNums.push(
  0x100,
  0x102,
  0x103,
  0x104,
  0x105,
  0x106,
  0x140,
  0x141,
  0x142,
  0x143,
  0x144,
  0x180,
  0xf11,
  0xf12,
  0xf13,
  0xf14,
  0x300,
  0x301,
  0x302,
  0x303,
  0x304,
  0x305,
  0x306,
  0x340,
  0x341,
  0x342,
  0x343,
  0x344,
  0x3a0,
  0x3a1,
  0x3a2,
  0x3a3
)

for (let i = 0x3b0; i <= 0x3bf; i++) {
  PCRNames.push('pmpaddr' + (i - 0x3b0).toString(10))
  PCRNums.push(i)
}

PCRNames.push('mcycle', 'minstret')
PCRNums.push(0xb00, 0xb02)

for (let i = 0xb03; i <= 0xb1f; i++) {
  PCRNames.push('mhpmcounter' + (i - 0xb00).toString(10))
  PCRNums.push(i)
}

PCRNames.push('mcycleh', 'minstreth')
PCRNums.push(0xb80, 0xb82)

for (let i = 0xb83; i <= 0xb9f; i++) {
  PCRNames.push('mhpmcounter' + (i - 0xb80).toString(10) + 'h')
  PCRNums.push(i)
}

for (let i = 0x323; i <= 0x33f; i++) {
  PCRNames.push('mhpeventm' + (i - 0x320).toString(10))
  PCRNums.push(i)
}

PCRNames.push(
  'tselect',
  'tdata1',
  'tdata2',
  'tdata3',
  'dcsr',
  'dpc',
  'dscratch'
)

PCRNums.push(0x7a0, 0x7a1, 0x7a2, 0x7a3, 0x7b0, 0x7b1, 0x7b2)

// Print PCR obj
// var PCR = {}
// for (let i = 0; i < PCRNames.length; i++) {
//   PCR[`CSR_${PCRNames[i].toUpperCase()}`] = {
//     num: PCRNums[i],
//     width: 64
//   }
// }

// console.log(PCR)

// Print invPCR obj
var PCRs = []
for (let i = 0; i < PCRNames.length; i++) {
  PCRs.push({ num: PCRNums[i], name: PCRNames[i].toUpperCase() })
}

PCRs.forEach(pcr => {
  console.log(JSON.stringify(pcr) + ', ')
})
