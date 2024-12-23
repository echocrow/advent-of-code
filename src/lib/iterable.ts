type IteratorValueOf<TIter extends Iterable<any>> =
  TIter extends Iterable<infer T> ? T : never
export type ReadGenerator<T> = Generator<T, void, undefined>

export function range(to: number): ReadGenerator<number>
export function range(
  from: number,
  to: number,
  inclusive?: boolean,
): ReadGenerator<number>
export function* range(
  from: number,
  to?: number,
  inclusive = false,
): ReadGenerator<number> {
  if (to === undefined) {
    to = from
    from = 0
  }
  const d = from <= to ? 1 : -1
  const steps = (to - from) * d
  let val = from
  for (let i = 0; i < steps; i++) yield val, (val += d)
  if (inclusive) yield to
}

export function* rangeStep(
  from: number,
  to: number,
  steps: number,
): ReadGenerator<number> {
  let val = from
  const d = (to - from) / steps
  for (let i = 0; i < steps; i++) yield (val += d)
}

export function* combine<T extends readonly Iterable<any>[]>(
  ...iterables: T
): ReadGenerator<IteratorValueOf<T[number]>> {
  for (const it of iterables) yield* it
}

export function* map<T, U>(
  iterable: Iterable<T>,
  fn: (value: T) => U,
): ReadGenerator<U> {
  for (const val of iterable) yield fn(val)
}

export function mapFind<T, U>(
  items: Iterable<T>,
  fn: (val: T) => U | undefined,
): U | undefined {
  for (const val of items) {
    const mapped = fn(val)
    if (mapped !== undefined) return mapped
  }
  return undefined
}

export function reduce<T>(
  values: Iterable<T>,
  fn: (acc: T, value: T) => T,
): T | undefined
export function reduce<T, U>(
  values: Iterable<T>,
  fn: (acc: U, value: T) => U,
  initial: U,
): U
export function reduce<T, U>(
  values: Iterable<T>,
  fn: (acc: U, value: T) => U,
  initial?: U,
): U | undefined {
  let acc = initial
  let accSet = arguments.length > 2
  for (const val of values) {
    if (accSet) acc = fn(acc!, val)
    else (acc = val as unknown as U), (accSet = true)
  }
  return acc
}

export function* entries<T>(values: Iterable<T>) {
  let i = 0
  for (const val of values) yield [i++, val] as const
}

export function sum(nums: Iterable<number>): number {
  return reduce(nums, (a, v) => a + v, 0)
}
export function product(nums: Iterable<number>): number {
  return reduce(nums, (a, v) => a * v) ?? 0
}

export function bigSum(nums: Iterable<bigint>): bigint {
  return reduce(nums, (a, v) => a + v, 0n)
}
export function bigProduct(nums: Iterable<bigint>): bigint {
  return reduce(nums, (a, v) => a * v) ?? 0n
}

export function count<T>(
  values: Iterable<T>,
  fn: (val: T) => boolean = (v) => !!v,
): number {
  let res = 0
  for (const val of values) if (fn(val)) res++
  return res
}

export function min<T extends number | bigint>(
  nums: Iterable<T>,
): T | undefined {
  return reduce(nums, (acc, num) => (num < acc ? num : acc))
}
export function max<T extends number | bigint>(
  nums: Iterable<T>,
): T | undefined {
  return reduce(nums, (acc, num) => (num > acc ? num : acc))
}

export function* filter<T>(
  values: Iterable<T>,
  fn: (val: T) => boolean = (v) => !!v,
): ReadGenerator<T> {
  for (const val of values) if (fn(val)) yield val
}

export function every<T>(
  values: Iterable<T>,
  fn: (val: T) => boolean = (v) => !!v,
): boolean {
  for (const val of values) if (!fn(val)) return false
  return true
}

export function* fifo<T>(queue: T[]): ReadGenerator<T> {
  while (queue.length) yield queue.shift()!
}
export function* filo<T>(queue: T[]): ReadGenerator<T> {
  while (queue.length) yield queue.pop()!
}

export function first<T>(values: Iterable<T>): T | undefined {
  for (const val of values) return val
  return undefined
}

export function find<T>(
  items: Iterable<T>,
  fn: (val: T) => boolean,
): T | undefined {
  for (const val of items) if (fn(val)) return val
  return undefined
}

export function* reversed<T>(arr: readonly T[]): Iterable<T> {
  for (let i = arr.length - 1; i >= 0; i--) yield arr[i]!
}

export function* repeat<T>(
  item: T,
  times: number,
): Generator<T, void, undefined> {
  for (let i = 0; i < times; i++) yield item
}
