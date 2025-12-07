import io from '#lib/io.js'

let result = 0
for await (const line of io.readLines()) {
  let d1 = 0
  let d2 = 0
  for (let i = 0; i < line.length; i++) {
    const n = Number(line[i])
    if (n > d1 && i < line.length - 1) (d1 = n), (d2 = 0)
    else if (n > d2) d2 = n
  }
  result += d1 * 10 + d2
}

io.write(result)
