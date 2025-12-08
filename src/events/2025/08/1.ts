import {sortNums} from '#lib/array.js'
import {Heap} from '#lib/heap.js'
import io from '#lib/io.js'
import {product} from '#lib/iterable.js'
import {unionInto} from '#lib/set.js'
import vec3, {type Vec3} from '#lib/vec3.js'

const PAIRS = Number((await io.readCfgLine('__pairs')) ?? 1000)
const TOP_CIRCUITS = 3

class Box {
  circuit: Set<Box> | undefined
  constructor(readonly vec: Vec3) {}
}

const boxes: Box[] = []
for await (const line of io.readLines()) boxes.push(new Box(vec3.parse(line)))

class Pair {
  readonly dist: number
  constructor(
    readonly a: Box,
    readonly b: Box,
  ) {
    this.dist = a.vec.subtract(b.vec).len2
  }
}

const pairs = new Heap<Pair>((a, b) => a.dist - b.dist)
for (let i = 0; i < boxes.length; i++) {
  for (let j = i + 1; j < boxes.length; j++) {
    pairs.push(new Pair(boxes[i]!, boxes[j]!))
  }
}

let remainingPairs = PAIRS
while (remainingPairs > 0) {
  const pair = pairs.pop()
  if (!pair) break
  const {a, b} = pair
  if (!a.circuit || !b.circuit) {
    const circuit = a.circuit ?? b.circuit ?? new Set()
    circuit.add(a)
    circuit.add(b)
    a.circuit = b.circuit = circuit
  } else if (a.circuit !== b.circuit) {
    unionInto(a.circuit, b.circuit)
    for (const box of b.circuit) box.circuit = a.circuit
    b.circuit = a.circuit
  }
  remainingPairs--
}

const circuits = new Set(boxes.map((b) => b.circuit).filter((c) => !!c))

const circuitLens = sortNums(
  circuits
    .values()
    .map((c) => c.size)
    .toArray(),
  true,
)

const result = product(circuitLens.slice(0, TOP_CIRCUITS))
io.write(result)
