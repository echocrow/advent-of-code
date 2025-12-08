import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  3-5
  10-14
  16-20
  12-18

  1
  5
  8
  11
  17
  32
`

await testPart(import('./1.js?url'), [input, 3])
await testPart(import('./2.js?url'), [input, 14])
