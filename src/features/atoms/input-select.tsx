import React from "react"
import styled from "styled-components"
import { Select } from "mui-rff"
import { MenuItem, Checkbox, ListItemText } from "@material-ui/core"
import { AnyObject } from "final-form"

export const InputSelect: React.FC<{
  name: string
  data: {
    type:
      | "string"
      | "number"
      | "bigint"
      | "boolean"
      | "symbol"
      | "undefined"
      | "object"
      | "function"
    name: string
    data: React.ReactText[] | undefined
  }
  values: AnyObject
}> = ({ name, data, values }) => {
  return (
    <Select
      name={name}
      label={name}
      multiple
      renderValue={(selected: any) => selected.join(", ")}
    >
      {data?.data?.map((q, i) => (
        <MenuItem key={i} value={q}>
          <Checkbox checked={values[name]?.indexOf(q) > -1} />
          <ListItemText primary={q} />
        </MenuItem>
      ))}
    </Select>
  )
}

const WrapperBtn = styled.div`
  display: flex;
`

const WrapperItem = styled.div`
  margin-bottom: 15px;
  margin-right: 30px;
  position: relative;
`

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const WrapperMetrics = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`
