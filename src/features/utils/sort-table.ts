import { sort } from "./functional"

export const sortTable = (direction: "asc" | "desc", sortIndex: number) =>
  sort<React.ReactText[]>((a, b) => {
    if (direction === "desc") {
      return a[sortIndex] > b[sortIndex]
        ? 1
        : b[sortIndex] > a[sortIndex]
        ? -1
        : 0
    } else {
      return b[sortIndex] > a[sortIndex]
        ? 1
        : a[sortIndex] > b[sortIndex]
        ? -1
        : 0
    }
  })
