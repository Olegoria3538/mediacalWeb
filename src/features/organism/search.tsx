import React from "react"
import styled from "styled-components"
import { FormSearch } from "../molecules/form"
import { TableBuild } from "../molecules/table"

export const Search = () => {
  return (
    <Wrapper>
      <FormSearch />
      <TableBuild />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 25px;
  height: 100vh;
  overflow: auto;
  flex-grow: 1;
`
