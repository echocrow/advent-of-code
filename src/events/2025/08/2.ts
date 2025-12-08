import {Heap} from '#lib/heap.js'
import io from '#lib/io.js'
import {unionInto} from '#lib/set.js'
import vec3, {type Vec3} from '#lib/vec3.js'

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

let pair: Pair | undefined
while ((boxes[0]?.circuit?.size ?? 0) < boxes.length) {
  pair = pairs.pop()
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
}

const result = (pair?.a.vec[0] ?? 0) * (pair?.b.vec[0] ?? 0)
io.write(result)
