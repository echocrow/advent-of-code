import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  ..@@.@@@@.
  @@@.@.@.@@
  @@@@@.@.@@
  @.@@@@..@.
  @@.@@@@.@@
  .@@@@@@@.@
  .@.@.@.@@@
  @.@@@.@@@@
  .@@@@@@@@.
  @.@.@@@.@.
`

await testPart(import('./1.js?url'), [input, 13])
await testPart(import('./2.js?url'), [input, 43])
