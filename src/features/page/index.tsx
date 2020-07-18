import React from "react"
import { useStore } from "effector-react"
import { DropZone } from "../organism/drop-zone"
import { SideBar } from "../organism/side-bar"
import styled from "styled-components"
import { Search } from "../organism/search"
import { $dataExel } from "../model/data-exel"
import { DocPage } from "../organism/doc"
import { Template } from "./template"
import { $rout } from "../model/route"

export const Build = () => {
  const { complete } = useStore($dataExel)
  if (!complete) return <DropZone />
  return <Main />
}

const Main = () => {
  const rout = useStore($rout)
  return (
    <Wrapper>
      <SideBar />
      <Template>
        {rout === "/documentation" ? <DocPage /> : null}
        {rout === "/" ? <Search /> : null}
      </Template>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-flow: row nowrap;
`
