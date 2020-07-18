import React from "react"
import styled from "styled-components"

export const Template: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  padding: 25px;
  height: 100vh;
  overflow: auto;
  flex-grow: 1;
`
