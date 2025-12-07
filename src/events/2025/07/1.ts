import io from '#lib/io.js'

const beams = new Uint8Array(await io.peekLineLen())

const startCol = (await io.readLine())?.indexOf('S') ?? 0
beams[startCol] = 1

let result = 0
for await (const line of io.readLines()) {
  for (let col = 1; col < beams.length - 1; col++) {
    if (line[col] === '^' && beams[col]) {
      beams[col] = 0
      beams[col - 1] = beams[col + 1] = 1
      result++
    }
  }
}

io.write(result)
