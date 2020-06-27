import { createStore, createEvent, combine } from "effector"
import { $groupExel } from "./data-exel"

const $selectMetrics = createStore<string[]>([])
const setSelectMetrics = createEvent<string>()
$selectMetrics.on(setSelectMetrics, (state, data) =>
  state.includes(data) ? state.filter((x) => x !== data) : state.concat(data)
)

const $selectExelData = combine({
  groupExel: $groupExel,
  selectMetrics: $selectMetrics,
}).map(({ groupExel, selectMetrics }) =>
  groupExel.filter((x) => selectMetrics.includes(x.name))
)

export { $selectMetrics, setSelectMetrics, $selectExelData }
