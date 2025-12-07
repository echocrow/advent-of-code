import io from '#lib/io.js'

const BATTERIES = 12

let result = 0
for await (const line of io.readLines()) {
  const batteries = line.split('').map(Number)

  let bankMax = 0
  let prevIdx = -1
  for (let b = 0; b < BATTERIES; b++) {
    const remaining = BATTERIES - b - 1
    let max = 0
    for (let i = prevIdx + 1; i < batteries.length - remaining; i++) {
      const n = batteries[i]!
      if (n > max) (max = n), (prevIdx = i)
    }
    bankMax = bankMax * 10 + max
  }

  result += bankMax
}

io.write(result)
