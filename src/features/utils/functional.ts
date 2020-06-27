import { sort as sortR } from "ramda"

export const chunk = function <T>(len: number) {
  return (data: T[]) =>
    Array.from({ length: Math.ceil(data.length / len) }, (_, i) =>
      data.slice(i * len, (i + 1) * len)
    )
}

export const sort = function <T>(fun: (a: T, b: T) => number) {
  return (data: T[]) => sortR(fun, data)
}
