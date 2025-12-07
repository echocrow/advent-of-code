import io from '#lib/io.js'
import {countDigits} from '#lib/math.js'

let result = 0
for await (const range of io.readRegExp(/(\d+)-(\d+)/)) {
  const from = Number(range[1])
  const to = Number(range[2])

  for (let num = from; num <= to; num++) {
    const halfPow = 10 ** (countDigits(num) / 2)
    const left = Math.floor(num / halfPow)
    const right = num % halfPow
    if (left === right) result += num
  }
}

io.write(result)
