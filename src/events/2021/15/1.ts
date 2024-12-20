import io from '#lib/io.js'
import {neighbors, Uint8Matrix} from '#lib/matrix.js'
import {MemoQueue} from '#lib/queue.js'

// Parse.
const map = new Uint8Matrix()
for await (let line of io.readLines()) {
  map.pushRow([...line].map(Number))
}
let start = 0
let end = map.length - 1

// Dijkstra search.
const queue = new MemoQueue(0, start)
for (const {cost, item: i} of queue) {
  for (const n of neighbors(map, i)) {
    queue.enqueue(cost + map.$[n]!, n)
  }
}

io.write(queue.getCost(end) ?? -1)
