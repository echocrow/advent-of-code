import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  ???.### 1,1,3
  .??..??...?##. 1,1,3
  ?#?#?#?#?#?#?#? 1,3,1,6
  ????.#...#... 4,1,1
  ????.######..#####. 1,6,5
  ?###???????? 3,2,1
`

await testPart(import('./1.js?url'), [
  ['???.### 1,1,3', 1],
  ['.??..??...?##. 1,1,3', 4],
  ['?#?#?#?#?#?#?#? 1,3,1,6', 1],
  ['????.#...#... 4,1,1', 1],
  ['????.######..#####. 1,6,5', 4],
  ['?###???????? 3,2,1', 10],
  [input, 21],
  ['???? 1', 4],
  ['?????.#...#... 4,1,1', 2],
  ['#?????.?...#... 4,1,1', 2],
  ['?.???.???##?#??#? 2,9', 4],
])

await testPart(import('./2.js?url'), [
  ['???.### 1,1,3', 1],
  ['.??..??...?##. 1,1,3', 16384],
  ['?#?#?#?#?#?#?#? 1,3,1,6', 1],
  ['????.#...#... 4,1,1', 16],
  ['????.######..#####. 1,6,5', 2500],
  ['?###???????? 3,2,1', 506250],
  [input, 525152],
  ['??? 1,1', 1],
  ['???. 1,1', 81],
  ['????. 1,1', 16182],
  ['?????. 1,1', 462304],
  ['??????. 1,1', 5854916],
  ['???????. 1,1', 45000413],
])
