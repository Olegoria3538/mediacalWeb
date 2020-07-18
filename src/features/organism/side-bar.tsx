import { useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { $colName } from "../model/data-exel"
import { SelectItems } from "../molecules/select-items"
import Logo from "../static/img/logo.svg"
import { Nav } from "../molecules/navigation"

export const SideBar = () => {
  const colName = useStore($colName)

  return (
    <Wrapper>
      <Header>
        <img src={Logo} />
        <HeaderTitle>МПС</HeaderTitle>
      </Header>
      <NavWrapper>
        <Nav />
      </NavWrapper>
      <TitleMetrics>Критерии поиска</TitleMetrics>
      <MetricsList>
        {colName.map((x, i) => (
          <SelectItems data={x} key={i} />
        ))}
      </MetricsList>
    </Wrapper>
  )
}

const HeaderTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: 100%;
  font-size: 32px;
`
const NavWrapper = styled.div`
  margin-bottom: 20px;
`
const MetricsList = styled.div`
  width: 240px;
  height: calc(100vh - 215px);
  overflow-y: overlay;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  & > img {
    margin-right: 20px;
  }
`

const Wrapper = styled.div`
  padding: 30px;
  background: #eef1f6;
  flex: 0 0 auto;
`

const TitleMetrics = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 100%;
  margin-bottom: 25px;
`
