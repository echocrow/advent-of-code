import {BigCounter} from 'lib/counter.js'
import IO from 'lib/io.js'
import range from 'lib/range.js'
import {max, min} from 'lib/sort.js'

const io = new IO()

const startingPoly = (await io.readLine()) ?? ''
const firstLetter = startingPoly[0] ?? ''
let pairs = BigCounter.fromValues(
  [...range(0, startingPoly.length - 1)].map((i) =>
    startingPoly.slice(i, i + 2),
  ),
)

const insertions: Record<string, string> = {}
for await (const line of io.readLines()) {
  if (line) {
    const [from = '', to = ''] = line.split(' -> ')
    insertions[from] = to
  }
}

for (let i = 0; i < 40; i++) {
  pairs = BigCounter.fromEntries(
    [...pairs.entries()].flatMap(([pair, count]) => [
      [pair[0] + insertions[pair]!, count],
      [insertions[pair]! + pair[1], count],
    ]),
  )
}

const counts = BigCounter.fromEntries(
  [...pairs.entries()].map(([pair, count]) => [pair[1], count]),
).inc(firstLetter)
const [leastCommon] = min(counts.values())
const [mostCommon] = max(counts.values())

io.write((mostCommon - leastCommon).toString())
