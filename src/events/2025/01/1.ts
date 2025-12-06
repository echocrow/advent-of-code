import io from '#lib/io.js'

const DIAL_LEN = 100

let result = 0
let pos = 50
for await (const line of io.readLines()) {
  const step = line[0] === 'R' ? 1 : -1
  const steps = Number(line.substring(1))
  pos = (pos + steps * step) % DIAL_LEN
  if (!pos) result++
}

io.write(result)
