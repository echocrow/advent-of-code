import {swap} from './array.js'

export class Heap<T> {
  private heap: T[] = []

  constructor(private compare: (a: T, b: T) => number) {}

  push(value: T): void {
    this.heap.push(value)
    this.bubbleUp(this.heap.length - 1)
  }

  pop(): T | undefined {
    const popped = this.heap.pop()
    if (!this.heap.length) return popped

    const min = this.heap[0]
    this.heap[0] = popped!
    this.bubbleDown(0)
    return min
  }

  size(): number {
    return this.heap.length
  }

  private parent(i: number): number | null {
    const parent = Math.floor((i - 1) / 2)
    return parent >= 0 ? parent : null
  }

  private left(i: number): number | null {
    const left = 2 * i + 1
    return left < this.heap.length ? left : null
  }

  private right(i: number): number | null {
    const right = 2 * i + 2
    return right < this.heap.length ? right : null
  }

  private bubbleUp(i: number): void {
    let parent: number | null
    while (
      i &&
      (parent = this.parent(i)) !== null &&
      this.compare(this.heap[parent]!, this.heap[i]!) > 0
    ) {
      swap(this.heap, i, parent)
      i = parent
    }
  }

  private bubbleDown(i: number): void {
    let min = i
    do {
      i = min
      const left = this.left(i)
      const right = this.right(i)

      if (left && this.compare(this.heap[left]!, this.heap[min]!) < 0) {
        min = left
      }
      if (right && this.compare(this.heap[right]!, this.heap[min]!) < 0) {
        min = right
      }

      swap(this.heap, i, min)
    } while (min !== i)
  }
}
