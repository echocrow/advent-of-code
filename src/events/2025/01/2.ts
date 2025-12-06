import io from '#lib/io.js'
import {posMod} from '#lib/math.js'

const DIAL_LEN = 100

let result = 0
let pos = 50
for await (const line of io.readLines()) {
  const step = line[0] === 'L' ? -1 : 1
  const steps = Number(line.slice(1))

  const nextPos = pos + steps * step
  const nextPos2 = posMod(nextPos, DIAL_LEN)

  let crossed = 0
  if (step > 0) {
    crossed = Math.floor(nextPos / DIAL_LEN)
  } else if (nextPos <= 0) {
    crossed = Math.ceil(Math.abs(nextPos / DIAL_LEN))
    if (!pos) crossed--
    if (!nextPos2) crossed++
  }

  pos = nextPos2
  result += crossed
}

io.write(result)
