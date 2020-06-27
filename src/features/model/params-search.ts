import { createStore, createEvent } from "effector"
import { AnyObject } from "final-form"
import { ParamsType } from "../type"

const $params = createStore<ParamsType[]>([])
const setParams = createEvent<AnyObject>()
$params.on(setParams, (_, data) => {
  const arFilter = Object.entries(data)
    .filter(([_, value]) => (Array.isArray(value) ? !!value.length : true))
    .map(([key, value]) => [key, isNaN(Number(value)) ? value : Number(value)])

  const arFormat = arFilter
    .filter(([key]) => !key.includes("UpRange") && !key.includes("DownRange"))
    .map(([key, value]) => ({
      name: key,
      value,
      range:
        typeof value === "number"
          ? {
              up: arFilter.find(([k]) => k === `${key}UpRange`)?.[1],
              down: arFilter.find(([k]) => k === `${key}DownRange`)?.[1],
            }
          : null,
    }))

  return arFormat
})

const resetParams = createEvent()
$params.reset(resetParams)

export { $params, setParams, resetParams }
