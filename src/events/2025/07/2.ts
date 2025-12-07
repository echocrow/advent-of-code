import io from '#lib/io.js'
import {sum} from '#lib/iterable.js'

const beams = new Float32Array(await io.peekLineLen())

const startCol = (await io.readLine())?.indexOf('S') ?? 0
beams[startCol] = 1

for await (const line of io.readLines()) {
  for (let col = 1; col < beams.length - 1; col++) {
    if (line[col] === '^' && beams[col]) {
      const dims = beams[col]!
      beams[col] = 0
      beams[col - 1]! += dims
      beams[col + 1]! += dims
    }
  }
}

io.write(sum(beams))
