import {basename} from 'node:path'
import {describe, expect, test} from 'vitest'
import io from '#lib/io.js'

export function dedent(str: string | readonly string[]): string {
  if (typeof str !== 'string') str = str.join('')

  // Trim single trailing newline.
  str = str.replace(/^\n/, '')
  str = str.replace(/\n[^\S\n]*$/, '')

  // Remove indents based on min indent.
  let indents: number | undefined
  for (const m of str.matchAll(/^[^\S\n]+/gm)) {
    const mLen = m[0].length
    if (mLen < (indents ?? str.length)) indents = mLen
    if (!indents) break
  }
  if (indents) {
    str = str.replaceAll(new RegExp(`^[^\S\n]{${indents}}`, 'gm'), '')
  }

  return str
}

type PartSpec = readonly [input: string, expect: string | number | bigint]

function isPartSpec(spec: PartSpec | readonly PartSpec[]): spec is PartSpec {
  return typeof spec[0] === 'string'
}

async function expectPart(
  filePath: string,
  input: PartSpec[0],
  want: PartSpec[1],
  idx?: number,
) {
  const ioOut = io.mock(input)

  // Note: By default, vite-note does not import or execute the same file
  // more than once. However, sometimes we want to test the same day+part
  // multiple times with different inputs/outputs. Therefore, we append
  // an arbitrary file parameter (unique per day+part) to treat this as a
  // new file import.
  if (idx !== undefined) filePath += `?idx=${idx}`
  await import(filePath)

  expect(ioOut.out).toEqual(String(want))
}

/**
 * Test an AoC day part with a pair (or pairs of) input and desired output.
 */
export async function testPart(
  partPath$: string | Promise<{default: string}>,
  spec: PartSpec | readonly PartSpec[],
) {
  const partPath =
    typeof partPath$ === 'string' ? partPath$ : (await partPath$).default
  const partName = basename(partPath)
    .replace(/\.\w+$/, '')
    .replace(/(?<=^\d+)(.+)/, ' ($1)')
  const testName = `Part ${partName}`
  if (isPartSpec(spec)) {
    test(testName, async () => {
      await expectPart(partPath, ...spec)
    })
  } else {
    describe(testName, async () => {
      test.each(spec.map(([input, expect], i) => [i + 1, input, expect]))(
        '#%d',
        async (idx, input, want) => {
          await expectPart(partPath, input, want, idx)
        },
        {sequential: true},
      )
    })
  }
}
