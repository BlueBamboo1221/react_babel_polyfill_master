import React from "react"
import { render } from "react-dom"
import { createGlobalStyle } from "styled-components"
import fetchedData from "./fetchedData.json"
import { requestData } from "./helpers"
import { globalCss } from "../stylesGlobal"
import Root from "./Root"

const data = {}
const GlobalStyle = createGlobalStyle`${globalCss}`

const startReact = () => {
  const root = document.createElement("div")
  root.setAttribute("id", "root")
  document.body.appendChild(root)

  render(
    <React.Fragment>
      <Root db={data} />
      <GlobalStyle />
    </React.Fragment>,
    root
  )
}

// if from editor, fetch data via GraphQL
if (new RegExp("infopage-editor.zonofthor.co").test(window.document.referrer)) {
  requestData().then(({ data: { getStationsData, getEntriesData, getDepartmentsData } }) => {
    data.stations = getStationsData
    data.entries = getEntriesData
    data.departments = getDepartmentsData
    startReact()
  })
  // otherwise use imported JSON
} else {
  const {
    data: { getStationsData, getEntriesData, getDepartmentsData }
  } = fetchedData
  data.stations = getStationsData
  data.entries = getEntriesData
  data.departments = getDepartmentsData
  startReact()
}
