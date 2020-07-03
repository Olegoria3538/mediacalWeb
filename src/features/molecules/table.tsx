import React, { useState, useMemo } from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useStore } from "effector-react"
import TablePagination from "@material-ui/core/TablePagination"
import { chunk, sortTable } from "../utils/"
import { TableSortLabel } from "@material-ui/core"
import { findIndex, compose } from "ramda"
import styled from "styled-components"
import { $tableDataValue } from "../model"
import { $colName } from "../model/data-exel"

export const TableBuild = () => {
  const colName = useStore($colName)
  const tableData = useStore($tableDataValue)
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [sortMetric, setSortMetric] = useState<{
    name: string
    direction: "asc" | "desc"
  }>({ name: "", direction: "asc" })

  const sliceResult = useMemo(() => {
    if (tableData.length) {
      const sortIndex = findIndex((x) => x === sortMetric.name)(colName)
      const res = (array: React.ReactText[][]) =>
        rowsPerPage === -1
          ? array
          : chunk<React.ReactText[]>(rowsPerPage)(array)[page]
      if (sortIndex !== -1) {
        const sortFunc = sortTable(sortMetric.direction, sortIndex)
        return compose(res, sortFunc)(tableData)
      }
      return res(tableData)
    } else {
      return []
    }
  }, [page, tableData, rowsPerPage, colName, sortMetric])

  const clickSort = (name: string) => {
    if (sortMetric.name === name) {
      const met: ["asc", "desc"] = ["asc", "desc"]
      setSortMetric({
        ...sortMetric,
        direction: met.filter((x) => x !== sortMetric.direction)[0],
      })
    } else {
      setSortMetric({
        ...sortMetric,
        name,
      })
    }
  }

  return (
    <Wrapper>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                {colName.map((x, i) => (
                  <TableCell key={i}>
                    <TableSortLabel
                      active={sortMetric.name === x}
                      direction={sortMetric.direction}
                      onClick={() => clickSort(x)}
                    >
                      {x}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sliceResult.map((x, i) => (
                <TableRow key={i}>
                  {x.map((x, i) => (
                    <TableCell key={i}>{x}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "Все", value: -1 }]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(_, p) => setPage(p)}
          onChangeRowsPerPage={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
        />
      </Paper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .MuiTableCell-sizeSmall {
    padding: 6px 0px 6px 10px;
  }
  .MuiTableCell-root {
    font-size: 12px;
  }
`
