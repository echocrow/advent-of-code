import io from '#lib/io.js'
import {posMod} from '#lib/math.js'

const DIAL_LEN = 100

let result = 0
let pos = 50
for await (const line of io.readLines()) {
  const isLeft = line[0] === 'L'
  const steps = Number(line.slice(1))

  // Easier to mirror the world than to come up with a formula for right _and_
  // left turns.
  if (isLeft && pos) pos = DIAL_LEN - pos

  const nextPos = pos + steps
  result += Math.floor(nextPos / DIAL_LEN)

  pos = posMod(nextPos, DIAL_LEN)

  if (isLeft && pos) pos = DIAL_LEN - pos
}

io.write(result)
