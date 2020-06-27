import { combine } from "effector"
import { $params } from "./params-search"
import { $dataExel } from "./data-exel"

const $datumExel = $dataExel.map((x) => (x?.data ? x.data : []))

const $tableData = combine({ datumExel: $datumExel, params: $params }).map(
  ({ datumExel, params }) => {
    const paramsName = params.map((x) => x.name)
    const datumFilter = datumExel.filter((x) => {
      const metrics = Object.entries(x)
      const metricsFilter = metrics.filter(([key, value]) => {
        if (!paramsName.includes(key)) return true

        if (typeof value === "string") {
          const parameter = params.find((x) => x.name === key)
          if (Array.isArray(parameter?.value)) {
            return parameter?.value.includes(value)
          } else {
            return parameter?.value === value
          }
        }

        if (typeof value === "number") {
          const parameter = params.find((x) => x.name === key)
          if (parameter?.value) {
            const down =
              Number(parameter?.value) - Number(parameter?.range?.down || 0)
            console.log(down)
            const up =
              Number(parameter?.value) + Number(parameter?.range?.up || 0)
            return value >= down && value <= up
          }
          return true
        }
        return true
      })

      return metrics.length === metricsFilter.length
    })
    return datumFilter
  }
)

const $tableDataValue = $tableData.map(
  (x) => x.map((x) => Object.values(x)) || []
)

export { $tableDataValue }
