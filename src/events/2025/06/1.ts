import io from '#lib/io.js'
import {sum} from '#lib/iterable.js'

type OpFn = (a: number, b: number) => number

const OPS: Record<string, OpFn> = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
}

const rows: number[][] = []
const ops: OpFn[] = []
for await (const line of io.readLines()) {
  const entries = line.trim().split(/\s+/)
  if (entries[0] !== '*' && entries[0] !== '+') {
    rows.push(entries.map(Number))
  } else {
    ops.push(...entries.map((op) => OPS[op]!))
  }
}

const results = ops.map((op, c) =>
  rows.slice(1).reduce((acc, row) => op(acc, row[c]!), rows[0]![c]!),
)
const result = sum(results)

io.write(result)
