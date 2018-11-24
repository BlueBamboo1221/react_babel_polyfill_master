import React from "react"
import { render } from "react-dom"
import { Router } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import { createGlobalStyle } from "styled-components"
import { apolloClient } from "../apollo"
import { history } from "../history"
import { globalCss } from "../stylesGlobal"
import Root from "./Root"

// TODO/3 only 1x can edit Station at a time
// TODO/3 disallow "PROFA" for stations not published
const GlobalStyle = createGlobalStyle`${globalCss}`
const root = document.createElement("div")
root.setAttribute("id", "root")
document.body.appendChild(root)
render(
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <Root />
      <GlobalStyle />
    </Router>
  </ApolloProvider>,
  root
)
