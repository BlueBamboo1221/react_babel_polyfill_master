import React from "react"
import { render } from "react-dom"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { ApolloProvider } from "react-apollo"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import Editor from "./Editor"

const cache = new InMemoryCache()
const httpLink = new HttpLink({ uri: "https://eu1.prisma.sh/zandkassi/test3/dev" })
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([httpLink])
})

export const AppControl = React.createContext()

const root = document.createElement("div")
root.setAttribute("id", "root")
document.body.appendChild(root)
render(
  <ApolloProvider client={client}>
    <Editor />
  </ApolloProvider>,
  root
)
