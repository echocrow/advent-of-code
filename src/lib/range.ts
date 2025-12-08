// biome-ignore-all lint/suspicious/noUnsafeDeclarationMerging: need to narrow inherited property

// biome-ignore lint/correctness/noUnusedVariables: false positive
interface Range {
  0: number
  1: number
  length: 2
}
class Range extends Array {
  // Patch default string format.
  static name = 'Range'

  constructor(min = 0, max = 0) {
    // @ts-expect-error TS does not support the overloaded ArrayConstructor with multiple arguments for the array items.
    super(min, max)
  }

  hasInclusive(val: number) {
    return this[0] <= val && val <= this[1]
  }

  intersects(r: Range) {
    return this.hasInclusive(r[0]) || r.hasInclusive(this[0])
  }

  merge(r: Range) {
    return new Range(Math.min(this[0], r[0]), Math.max(this[1], r[1]))
  }

  mergeInto(r: Range) {
    this[0] = Math.min(this[0], r[0])
    this[1] = Math.max(this[1], r[1])
    return this
  }

  get len(): number {
    return this[1] - this[0]
  }

  fmt() {
    return `${this[0]}-${this[1]}`
  }

  static parse(s: string): Range {
    const [x = '', y = ''] = s.split('-', 2)
    return new Range(Number(x), Number(y))
  }
}

export default Range
