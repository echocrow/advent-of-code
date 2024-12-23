import io from '#lib/io.js'
import {Uint8Matrix} from '#lib/matrix.js'

const minSave = Number((await io.readCfgLine('__min')) ?? 100)

// Parse map.
let start = 0
let end = 0
const map = new Uint8Matrix()
for await (const line of io.readLines()) {
  const s = line.indexOf('S')
  if (s >= 0) start = map.length + s
  const e = line.indexOf('E')
  if (e >= 0) end = map.length + e
  map.pushRow([...line].map((c) => +(c === '#')))
}
const dirs = [1, map.width, -1, -map.width]

// Determine path.
const eToSDist = new Uint32Array(map.length)
{
  eToSDist[end] = 1
  let pos = end
  while (pos !== start) {
    const dist = eToSDist[pos]! + 1
    for (const dir of dirs) {
      const next = pos + dir
      if (map.$[next]) continue
      if (eToSDist[next]) continue
      eToSDist[next] = dist
      pos = next
      break
    }
  }
}

// Determine shortcuts.
let shortcuts = 0
for (let pos = 0; pos < eToSDist.length; pos++) {
  const dist = eToSDist[pos]!
  if (!dist) continue
  for (const dir of dirs) {
    const alt = pos + dir * 2
    const altDist = eToSDist[alt]!
    if (!altDist) continue
    const cut = dist - altDist - 2
    if (cut < minSave) continue
    shortcuts++
  }
}

io.write(shortcuts)
