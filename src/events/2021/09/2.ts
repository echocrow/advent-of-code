import io from '#lib/io.js'
import {product} from '#lib/iterable.js'
import {neighbors, Uint8Matrix} from '#lib/matrix.js'
import sort from '#lib/sort.js'

const cave = new Uint8Matrix()
for await (const line of io.readLines()) {
  cave.pushRow([...line].map(Number))
}

const TOP = 9

const basins = []
let i, j
while ((i = cave.$.findIndex((h) => h !== TOP)) >= 0) {
  let basin = 0
  const next = [i]
  while ((j = next.pop()) !== undefined) {
    if (cave.$[j] !== TOP) {
      basin++
      cave.$[j] = TOP
      next.push(...neighbors(cave, j))
    }
  }
  basins.push(basin)
}

const topBasins = sort(basins, true).slice(0, 3)

io.write(product(topBasins))
