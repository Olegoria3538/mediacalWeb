import React from "react"
import styled from "styled-components"
import { setSelectMetrics, $selectMetrics } from "../model/select-metrics"
import { useStore } from "effector-react"
import { Checkbox } from "@material-ui/core"

export const SelectItems: React.FC<{ data: string }> = ({ data }) => {
  const selectMetrics = useStore($selectMetrics)
  const checked = selectMetrics.includes(data)
  return (
    <ItemMetrics onClick={() => setSelectMetrics(data)}>
      <Checkbox
        checked={checked}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {data}
    </ItemMetrics>
  )
}

const ItemMetrics = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  & > span {
    padding: 0;
    margin-right: 10px;
  }
  cursor: pointer;
`
