import React from "react"
import { useStore } from "effector-react"
import { DropZone } from "../organism/drop-zone"
import { SideBar } from "../organism/side-bar"
import styled from "styled-components"
import { Search } from "../organism/search"
import { $dataExel } from "../model/data-exel"

export const Build = () => {
  const { complete } = useStore($dataExel)
  if (!complete) return <DropZone />
  return <Main />
}

const Main = () => {
  return (
    <Wrapper>
      <SideBar />
      <Search />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-flow: row nowrap;
`
