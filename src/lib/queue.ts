/**
 * A basic first-in-last-out queue.
 */
export class FILOQueue<T> {
  #queue: T[]
  constructor(...initial: T[]) {
    this.#queue = initial
  }

  *[Symbol.iterator](): Generator<T, void, undefined> {
    let item: T | undefined
    while ((item = this.#queue.pop())) yield item
  }

  push(...items: T[]) {
    this.#queue.push(...items)
  }
}

class PriorityQueueItem<V, C extends number | bigint = number> {
  constructor(
    public cost: C,
    public item: V,
  ) {}
}

export class PriorityQueue<T> {
  #queue: PriorityQueueItem<T>[] = []

  enqueue(cost: number, ...items: T[]) {
    for (const item of items)
      enqueue(
        this.#queue,
        PriorityQueue.#findNext,
        new PriorityQueueItem(cost, item),
      )
    return this
  }

  dequeue(): PriorityQueueItem<T> | undefined {
    return this.#queue.shift()
  }

  *[Symbol.iterator]() {
    while (this.#queue.length) yield this.#queue.shift()!
  }

  static #findNext<T>(q: PriorityQueueItem<T>, qi: PriorityQueueItem<T>) {
    return q.cost > qi.cost
  }
}

export class MemoQueue<T> extends PriorityQueue<T> {
  #memo = new Map<T, number>()
  enqueue(cost: number, ...items: T[]) {
    items = items.filter((item) => !this.#memo.has(item))
    for (const item of items) this.#memo.set(item, cost)
    return super.enqueue(cost, ...items)
  }
  getCost(item: T): number | undefined {
    return this.#memo.get(item)
  }
  hasCost(item: T): boolean {
    return this.#memo.has(item)
  }
}

export function enqueue<V>(
  queue: V[],
  findNext: (queueItem: V, newItem: V) => boolean,
  item: V,
): V[] {
  // Check for first item or new max.
  if (!queue.length || !findNext(queue.at(-1)!, item)) queue.push(item)
  // Check for new min.
  else if (findNext(queue[0]!, item)) queue.unshift(item)
  // Binary-search insert point.
  else {
    let l = 1
    let r = queue.length - 2
    while (l <= r) {
      const q = Math.floor((l + r) / 2)
      if (findNext(queue[q]!, item)) r = q - 1
      else l = q + 1
    }
    queue.splice(l, 0, item)
  }
  return queue
}
