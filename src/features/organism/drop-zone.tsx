import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import XLSX from "xlsx"
import { setDataExel } from "../model/data-exel"

export const DropZone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = (e) => {
        if (e.target) {
          const data = e.target.result

          const workbook = XLSX.read(data, {
            type: "binary",
          })

          workbook.SheetNames.forEach((sheet) => {
            //@ts-ignore
            const datum = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            )
            setDataExel(datum)
          })
        }
      }


      const types = [
        ".csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ]

      if (!types.includes(file?.type)) {
        alert("Не верный формат файла")
        return
      }

      reader.readAsBinaryString(file)
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Wrapper>
      {
        //@ts-ignore
        <DropZoneWrapper {...getRootProps()}>
          {
            //@ts-ignore
            <input {...getInputProps()} />
          }
          <p>Затяни в меня Excel документ</p>
        </DropZoneWrapper>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
`

const DropZoneWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`
