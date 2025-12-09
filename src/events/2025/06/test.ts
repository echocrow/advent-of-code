import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  123 328  51 64
   45 64  387 23
    6 98  215 314
  *   +   *   +
`

await testPart(import('./1.js?url'), [input, 4277556])
await testPart(import('./2.js?url'), [input, 3263827])
