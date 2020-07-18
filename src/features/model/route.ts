import { createStore, createEvent } from "effector"

const $rout = createStore<string>("/")

const setRout = createEvent<string>()

$rout.on(setRout, (_, x) => x)

export { $rout, setRout }
