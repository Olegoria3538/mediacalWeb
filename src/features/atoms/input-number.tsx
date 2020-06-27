import React from "react"
import styled from "styled-components"
import { TextField } from "mui-rff"
import { AnyObject } from "final-form"

export const InputNumber: React.FC<{
  name: string
  setActive: (arg0: string) => void
  active: string
  range: React.RefObject<HTMLDivElement>
}> = ({ name, setActive, active, range }) => {
  return (
    <>
      <TextField label={name} name={name} type="number" />
      <RangeTitle onClick={() => setActive(name)}>Диапозон</RangeTitle>

      <WrapperRange show={active === name} ref={active === name ? range : null}>
        <Title>Диапозон</Title>
        <TextField label={"+"} name={`${name}UpRange`} type="number" />
        <TextField label={"-"} name={`${name}DownRange`} type="number" />
      </WrapperRange>
    </>
  )
}

const WrapperRange = styled.div<{ show: boolean }>`
  margin-bottom: 50px;
  position: absolute;
  padding: 10px;
  background: white;
  border-radius: 5px;
  z-index: 10;
  top: -15px;
  left: 0;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

  & > div {
    margin-bottom: 5px;
  }

  display: none;
  ${({ show }) => show && "display: block;"}
`

const Title = styled.div`
  font-size: 12px;
`

const RangeTitle = styled.div`
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`
