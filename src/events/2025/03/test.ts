import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  987654321111111
  811111111111119
  234234234234278
  818181911112111
`

await testPart(import('./1.js?url'), [input, 357])
await testPart(import('./2.js?url'), [input, 3121910778619])
