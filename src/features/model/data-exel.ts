import { createStore, createEvent, combine } from "effector"
import { AnyObject } from "../type"

const $dataExel = createStore<{
  complete: boolean
  data: { [key: string]: React.ReactText }[]
}>({
  complete: false,
  data: [],
})
const setDataExel = createEvent<AnyObject[]>()
$dataExel.on(setDataExel, (_, data) => ({ complete: !!data.length, data }))

const $colName = $dataExel.map(({ data }) => Object.keys(data[0] || {}))

const $groupExel = combine({
  data: $dataExel.map((x) => x.data),
  colName: $colName,
}).map(({ data, colName }) =>
  colName.map((x) => ({
    type: typeof data[0][x],
    name: x,
    data:
      typeof data[0][x] === "string"
        ? data.map((q) => q[x]).filter((x, i, array) => array.indexOf(x) === i)
        : undefined,
  }))
)

const $valueExel = $dataExel.map(
  ({ data }) => data?.map((x) => Object.values(x)) || []
)

export { $dataExel, setDataExel, $colName, $groupExel, $valueExel }
