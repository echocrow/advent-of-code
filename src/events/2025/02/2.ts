import io from '#lib/io.js'

const REG = /^(\d+)\1+$/

let result = 0
for await (const range of io.readRegExp(/(\d+)-(\d+)/)) {
  const from = Number(range[1])
  const to = Number(range[2])

  for (let num = from; num <= to; num++)
    if (REG.test(num.toString())) result += num
}

io.write(result)
