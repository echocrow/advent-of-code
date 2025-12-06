import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  L68
  L30
  R48
  L5
  R60
  L55
  L1
  L99
  R14
  L82
`

await testPart(import('./1.js?url'), [input, 3])
await testPart(import('./2.js?url'), [input, 6])
