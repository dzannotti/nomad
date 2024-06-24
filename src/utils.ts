type PeekPredicate<T> = (input: T) => boolean

function peek_while<T>(predicate: PeekPredicate<T>, source: ArrayLike<T>): number {
  let count = 0
  while (predicate(source[count])) {
    if (source[count] == null) {
      break
    }
    count++
  }
  return count
}

function peek_until<T>(predicate: PeekPredicate<T>, source: ArrayLike<T>): number {
  let count = 0
  while (!predicate(source[count])) {
    if (source[count] == null) {
      break
    }
    count++
  }
  return count
}

function slice(source: string, start: number, end?: number): string
function slice<T>(source: T[], start: number, end?: number): T[]
function slice<T>(source: T[] | string, start: number, end?: number): T[] | string {
  return source.slice(start, end)
}

function is_not_null<T>(value: T | null): value is T {
  return value !== null
}

function peek<T>(array: ArrayLike<T>): T | null {
  return array[1]
}

export { peek_while, peek_until, slice, is_not_null, peek }

export type { PeekPredicate }
