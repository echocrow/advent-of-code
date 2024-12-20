export function posMod(num: number, mod: number): number {
  return ((num % mod) + mod) % mod
}
export function posModBig(num: bigint, mod: bigint): bigint {
  return ((num % mod) + mod) % mod
}

export function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b)
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

export function cmp(a: number, b: number): number {
  return (
    a < b ? -1
    : a > b ? 1
    : 0
  )
}

export function countDigits(num: number): number {
  return Math.ceil(Math.log10(num + 1))
}

export function concatDigits(a: number, b: number): number {
  return a * 10 ** countDigits(b) + b
}

export function sumIntSeries(start: number, end: number) {
  return ((start + end) * (end - start + 1)) / 2
}
