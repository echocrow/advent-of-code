import io from '#lib/io.js'
import {filo} from '#lib/iterable.js'

const START = 'start'
const END = 'end'
const isSmall = (cave: string) => cave !== cave.toUpperCase()

const caves = new Map<string, Set<string>>()
for await (const line of io.readLines()) {
  const [a = '', b = ''] = line.split('-')
  if (b !== START) caves.set(a, (caves.get(a) ?? new Set()).add(b))
  if (a !== START) caves.set(b, (caves.get(b) ?? new Set()).add(a))
}

let result = 0
type Option = {
  cave: string
  checked: Set<string>
  seenSmall: boolean
}
const queue: Option[] = [{cave: START, checked: new Set(), seenSmall: false}]
for (const curr of filo(queue)) {
  const checked = new Set(curr.checked)
  if (isSmall(curr.cave)) checked.add(curr.cave)
  for (const cave of caves.get(curr.cave) ?? []) {
    if (cave === END) result++
    else if (!(checked.has(cave) && curr.seenSmall)) {
      const seenSmall = curr.seenSmall || checked.has(cave)
      queue.push({cave, checked, seenSmall})
    }
  }
}

io.write(result)
