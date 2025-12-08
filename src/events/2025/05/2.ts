import {extract} from '#lib/array.js'
import io from '#lib/io.js'
import {sum} from '#lib/iterable.js'
import Range from '#lib/range.js'

const ranges: Range[] = []
for await (const line of io.readLines()) {
  if (!line) break
  const range = Range.parse(line)

  let match: Range | undefined
  while ((match = extract(ranges, (r) => range.intersects(r))))
    range.mergeInto(match)

  ranges.push(range)
}

const result = sum(ranges.map((r) => r.len + 1))
io.write(result)
