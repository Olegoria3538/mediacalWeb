import { createStore, createEvent, combine, guard } from "effector"

type AnyDataExel = { [key: string]: React.ReactText }

const $dataExel = createStore<{
  complete: boolean
  data: AnyDataExel[]
}>({
  complete: false,
  data: [],
})

const setDataExel = createEvent<AnyDataExel[]>()
const setDataExelGuard = createEvent<AnyDataExel[]>()
guard({
  source: setDataExel,
  filter: (data) => {
    if (!data?.length) {
      alert("Документ пуст")
      return false
    }
    const colName = Object.keys(data[0] || {})
    if (colName.includes("__EMPTY")) {
      alert("Должны быть заполнены все заголовки колонок")
      return false
    }
    return !!data
  },
  target: setDataExelGuard,
})

$dataExel.on(setDataExelGuard, (_, data) => ({ complete: !!data.length, data }))

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
