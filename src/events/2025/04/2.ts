import io from '#lib/io.js'
import {squareNeighbors, Uint8Matrix} from '#lib/matrix.js'

const MAX_NEIGHBORS = 4

const map = new Uint8Matrix()
for await (const line of io.readLines()) {
  map.pushRow(line.split('').map((char) => Number(char === '@')))
}

let result = 0
while (true) {
  let removed = 0
  scan: for (let i = 0; i < map.length; i++) {
    const isRoll = map.$[i]!
    if (!isRoll) continue
    let neighbors = 0
    for (const n of squareNeighbors(map, i)) {
      if (!map.$[n]) continue
      neighbors++
      if (neighbors >= MAX_NEIGHBORS) continue scan
    }
    map.$[i] = 0
    removed++
  }
  result += removed
  if (!removed) break
}

io.write(result)
