import { createForm } from "final-form"
import { AnyObject } from "../type"
import { setParams } from "."

const form = createForm<AnyObject>({
  onSubmit: (v) => setParams(v),
})

export { form }
