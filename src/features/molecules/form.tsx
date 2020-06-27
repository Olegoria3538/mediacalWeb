import React, { useState, useRef } from "react"
import { Form } from "react-final-form"
import styled from "styled-components"
import { useStore } from "effector-react"
import { TextField, Select } from "mui-rff"
import { MenuItem, Checkbox, ListItemText, Button } from "@material-ui/core"
import { useOutsideAlerter } from "../utils/click-outside"
import { AnyObject } from "final-form"
import { setParams, resetParams } from "../model/params-search"
import { $selectExelData } from "../model/select-metrics"

const onSubmit = async (values: AnyObject) => {
  setParams(values)
}

export const FormSearch = () => {
  const [active, setActive] = useState<string>("")
  const range = useRef<HTMLDivElement>(null)
  useOutsideAlerter({ ref: range, callBack: () => setActive("") })
  const groupExel = useStore($selectExelData)
  if (!groupExel?.length)
    return (
      <Wrapper>
        <h1>Поиск</h1>
        <div>Выберите параметры для поиска</div>
      </Wrapper>
    )
  return (
    <Wrapper>
      <h1>Поиск</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <WrapperMetrics>
              {groupExel.map((x, i) => (
                <WrapperItem key={i}>
                  {x.type === "number" && (
                    <>
                      <TextField label={x.name} name={x.name} type="number" />
                      <RangeTitle onClick={() => setActive(x.name)}>
                        Диапозон
                      </RangeTitle>

                      <WrapperRange
                        show={active === x.name}
                        ref={active === x.name ? range : null}
                      >
                        <Title>Диапозон</Title>
                        <TextField
                          label={"+"}
                          name={`${x.name}UpRange`}
                          type="number"
                        />
                        <TextField
                          label={"-"}
                          name={`${x.name}DownRange`}
                          type="number"
                        />
                      </WrapperRange>
                    </>
                  )}
                  {x.type === "string" && (
                    <Select
                      name={x.name}
                      label={x.name}
                      multiple
                      renderValue={(selected: any) => selected.join(", ")}
                    >
                      {x?.data?.map((q, i) => (
                        <MenuItem key={i} value={q}>
                          <Checkbox checked={values[x.name]?.indexOf(q) > -1} />
                          <ListItemText primary={q} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </WrapperItem>
              ))}
            </WrapperMetrics>

            <WrapperBtn className="buttons">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={submitting || pristine}
                style={{ marginRight: "20px" }}
              >
                Поиск
              </Button>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => {
                  form.reset()
                  resetParams()
                }}
                disabled={submitting || pristine}
              >
                Сбросить
              </Button>
            </WrapperBtn>
          </form>
        )}
      />
    </Wrapper>
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

const RangeTitle = styled.div`
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`
