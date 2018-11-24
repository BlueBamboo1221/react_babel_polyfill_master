import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { withClientState } from "apollo-link-state"

const cache = new InMemoryCache({
  cacheRedirects: {
    // I'm really confused here, what mappings are really needed?
    Query: {
      station: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: "Station", id })
      // category: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: "Category", id }),
      // entry: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: "Entry", id })
      // user: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: "User", id })
    }
  }
})

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {}
})

const httpLink = new HttpLink({
  // eslint-disable-next-line
  uri: API
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("authToken")
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  })
  return forward(operation)
})

// === CREATE CLIENT
export const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, authLink, httpLink])
})
