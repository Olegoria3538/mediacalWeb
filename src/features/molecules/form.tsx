import React, { useState, useRef, useEffect } from "react"
import { Form, FormRenderProps } from "react-final-form"
import styled from "styled-components"
import { useStore } from "effector-react"
import { Button } from "@material-ui/core"
import { useOutsideClick } from "../utils/"
import { AnyObject } from "final-form"
import { setParams, resetParams } from "../model/params-search"
import { $selectExelData } from "../model/select-metrics"
import { InputNumber } from "../atoms/input-number"
import { InputSelect } from "../atoms/input-select"
import { form } from "../model"

export const FormSearch = () => {
  return (
    <Wrapper>
      <h1>Поиск</h1>
      <Form
        form={form}
        onSubmit={() =>
          console.log("The program was made by Olegoria and Nikita")
        }
        initialValues={{}}
        render={(props) => <ContentForm data={props} />}
      />
    </Wrapper>
  )
}

const ContentForm: React.FC<{ data: FormRenderProps<AnyObject> }> = ({
  data,
}) => {
  const groupExel = useStore($selectExelData)
  const [active, setActive] = useState<string>("")
  const range = useRef<HTMLDivElement>(null)
  useOutsideClick({ ref: range, callBack: () => setActive("") })
  const { handleSubmit, values, submitting, pristine, form } = data
  const [lengthMetric, setLengthMetric] = useState<number>(groupExel.length)

  useEffect(() => {
    if (groupExel.length < lengthMetric) {
      const names = groupExel.map((x) => x.name)
      Object.keys(form.getState().values).forEach((x) => {
        if (!names.includes(x)) form.change(x, undefined)
      })
      setParams(form.getState().values)
    }
    setLengthMetric(groupExel.length)
  }, [groupExel.length])

  if (!groupExel?.length) return <div>Выберите параметры для поиска</div>
  return (
    <form onSubmit={handleSubmit}>
      <WrapperMetrics>
        {groupExel.map((x, i) => (
          <WrapperItem key={i}>
            {x.type === "number" ? (
              <InputNumber
                range={range}
                name={x.name}
                active={active}
                setActive={setActive}
              />
            ) : null}
            {x.type === "string" ? (
              <InputSelect name={x.name} values={values} data={x} />
            ) : null}
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
