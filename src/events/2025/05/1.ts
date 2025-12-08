import io from '#lib/io.js'

const ranges: (readonly [min: number, max: number])[] = []
for await (const line of io.readLines()) {
  if (!line) break
  const [min = 0, max = 0] = line.split('-').map(Number)
  ranges.push([min, max])
}

let result = 0
for await (const line of io.readLines()) {
  const id = Number(line)
  const isFresh = ranges.some(([min, max]) => min <= id && id <= max)
  if (isFresh) result++
}

io.write(result)
