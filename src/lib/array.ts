export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

export type AnyArray = TypedArray | Array<any>

type ArrayGetConstructor<T extends AnyArray> =
  T extends Int8Array ? Int8ArrayConstructor
  : T extends Uint8Array ? Uint8ArrayConstructor
  : T extends Uint8ClampedArray ? Uint8ClampedArrayConstructor
  : T extends Int16Array ? Int16ArrayConstructor
  : T extends Uint16Array ? Uint16ArrayConstructor
  : T extends Int32Array ? Int32ArrayConstructor
  : T extends Uint32Array ? Uint32ArrayConstructor
  : T extends Float32Array ? Float32ArrayConstructor
  : T extends Float64Array ? Float64ArrayConstructor
  : T extends BigInt64Array ? BigInt64ArrayConstructor
  : T extends BigUint64Array ? BigUint64ArrayConstructor
  : T extends Array<unknown> ? ArrayConstructor
  : never

/**
 * Ensure array `arr` is at least `minLen` long.
 *
 * When `arr` is insufficiently long, a new, larger array will be returned. The
 * new array will contain a copy of the original values, and its new length may
 * exceed `minLen`.
 */
export function allocArrLen<T extends AnyArray & {constructor: Function}>(
  arr: T,
  minLen: number,
): T {
  if (arr.length >= minLen) return arr
  const newLen = Math.max(arr.length * 2, minLen)
  // Handle regular array.
  if (arr instanceof Array)
    return arr.concat(copyEmptyArr(arr, newLen - arr.length)) as T
  // Handle typed array.
  const Constructor = arr.constructor as new (
    len: number,
  ) => Exclude<T, Array<any>>
  const newArr = new Constructor(newLen)
  newArr.set(arr as any)
  return newArr
}

export function copyArr<T extends AnyArray & {constructor: Function}>(
  arr: T,
): T {
  const Constructor = arr.constructor as ArrayGetConstructor<T> & {
    from: (arr: T) => T
  }
  return Constructor.from(arr as any)
}
export function copyEmptyArr<T extends AnyArray & {constructor: Function}>(
  arr: T,
  length: number,
): T {
  const Constructor = arr.constructor as ArrayGetConstructor<T>
  return new Constructor(length) as T
}
export function setArr<T extends AnyArray>(
  arr: T,
  vals: ArrayLike<T[number]>,
  offset = 0,
): T {
  if (arr instanceof Array)
    for (let i = 0; i < vals.length; i++) arr[i + offset] = vals[i]
  else arr.set(vals, offset)
  return arr
}

export function sortNums<N extends number | bigint>(nums: N[], desc = false) {
  return nums.sort((a, b) => (desc ? b - a : a - b))
}

export function* pairs<T>(arr: readonly T[]): Iterable<readonly [T, T]> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      yield [arr[i]!, arr[j]!]
    }
  }
}

export function pushIfNew<T>(arr: T[], val: T) {
  if (arr.includes(val)) return
  arr.push(val)
}

export function binSearch(
  min: number,
  max: number,
  checkHigh: (i: number) => number,
): number {
  while (min <= max) {
    const q = Math.floor((min + max) / 2)
    const res = checkHigh(q)
    if (res === 0) return q
    else if (res > 0) max = q - 1
    else min = q + 1
  }
  return min
}

export function filledArr<T>(item: T, length: number): T[] {
  return Array(length).fill(item)
}
