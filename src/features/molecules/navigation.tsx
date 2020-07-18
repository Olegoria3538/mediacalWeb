import React from "react"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import styled from "styled-components"
import { setRout, $rout } from "../model"
import { useStore } from "effector-react"

const routes = [
  {
    name: "Главная",
    to: "/",
  },
  {
    name: "Документация",
    to: "/documentation",
  },
]

export const Nav = () => {
  const rout = useStore($rout)
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="-">
      {routes.map((r, i) => (
        <LinkElem key={i} onClick={() => setRout(r.to)} active={rout === r.to}>
          {r.name}
        </LinkElem>
      ))}
    </Breadcrumbs>
  )
}

const LinkElem = styled.span<{ active: boolean }>`
  outline: none;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  ${({ active }) => active && "color: #f50057;"}
`
