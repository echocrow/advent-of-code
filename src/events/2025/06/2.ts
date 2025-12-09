import io from '#lib/io.js'

type OpFn = (a: number, b: number) => number

const OPS: Record<string, OpFn> = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
}

const nums: (number | undefined)[] = []
const ops: OpFn[] = []
for await (const line of io.readLines()) {
  if (line[0] !== '*' && line[0] !== '+') {
    // Parse digits to numbers,
    for (let col = 0; col < line.length; col++) {
      const char = line[col]
      if (char === ' ') continue
      const digit = Number(line[col])
      nums[col] = (nums[col] ?? 0) * 10 + digit
    }
  } else {
    // Parse operators.
    ops.push(
      ...line
        .trim()
        .split(/\s+/)
        .map((op) => OPS[op]!),
    )
  }
}

let result = 0
let colRes: number | undefined
let opFn: OpFn | undefined
for (const num of nums.concat([undefined])) {
  opFn ??= ops.shift()!
  if (num === undefined) {
    result += colRes ?? 0
    colRes = opFn = undefined
  } else {
    colRes = colRes === undefined ? num : opFn(colRes, num)
  }
}

io.write(result)
