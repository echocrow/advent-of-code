import {dedent, testPart} from '#lib/testing.js'

const input = dedent`
  2413432311323
  3215453535623
  3255245654254
  3446585845452
  4546657867536
  1438598798454
  4457876987766
  3637877979653
  4654967986887
  4564679986453
  1224686865563
  2546548887735
  4322674655533
`

await testPart(import('./1.js?url'), [
  [
    dedent`
      11119
      99919
      99919
      99919
      99911
    `,
    16,
  ],
  [
    dedent`
      12999
      11111
      11991
      11991
    `,
    8,
  ],
  [input, 102],
])

await testPart(import('./2.js?url'), [
  [input, 94],
  [
    dedent`
      111111111111
      999999999991
      999999999991
      999999999991
      999999999991
    `,
    71,
  ],
  [
    dedent`
      11111111111199999999
      99999999999199999999
      99999999999199999999
      99999999999111111111
      99999999999199999999
    `,
    119,
  ],
  [
    dedent`
      111111111111999999999
      999999999991999999999
      999999999991999999999
      999999999991111111111
      999999999991999999991
    `,
    120,
  ],
  [
    dedent`
      1111111111119999999119
      9999999999919999999119
      9999999999919999999119
      9999999999911111111111
      9999999999919999999911
    `,
    169,
  ],
  [
    dedent`
      22222222222111111111118
      91119599991919999999118
      91119599991919999999118
      91119599991911111111118
      91119555555119999999911
    `,
    103,
  ],
  [
    dedent`
      12345
      12345
      12345
      12345
      12345
    `,
    18,
  ],
  [
    dedent`
      11111
      22222
      33333
      44444
      55555
    `,
    18,
  ],
  [
    dedent`
      6786888566656128613599352648681349764898
      9663926889754539718772735272336238676321
      7935414587521114573924332376446386636486
      4837761948741823364216444582961963812519
      8216347365997917127994268142374819147419
    `,
    270,
  ],
])
