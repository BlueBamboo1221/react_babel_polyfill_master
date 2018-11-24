import React from "react"
import { graphql } from "react-apollo"
import { LOGIN } from "./graphql"
import { Outer, Title, Message, Error, InputHandle, WrapperLogin } from "./styles"

class Login extends React.Component {
  state = {
    ssn: "",
    error: ""
  }

  // mutation in component for direct access to returned error text
  doLogin = async () => {
    const { ssn } = this.state
    const { gfnLogin } = this.props
    try {
      const result = await gfnLogin({
        variables: { ssn }
      })
      const { authToken } = result.data.loginResult
      if (authToken !== null) {
        localStorage.setItem("authToken", authToken)
        // history.go("/")
        window.location.assign("/")
      }
    } catch (error) {
      this.setState({ error: error.graphQLErrors.map(err => err.message) })
    }
  }

  render() {
    const { ssn, error } = this.state
    const message = "" // `${new Date().toLocaleString("is-IS")}: `
    return (
      <Outer>
        <Title>Upplýsingasíða LSH</Title>
        {message && <Message>{message}</Message>}
        <WrapperLogin>
          <InputHandle
            type="text"
            autoFocus
            placeholder="notendanafn..."
            value={ssn}
            onChange={e => this.setState({ ssn: e.target.value })}
            onKeyPress={e => {
              if (e.key === "Enter") this.doLogin()
            }}
          />
          <button type="button" onClick={() => this.doLogin()}>
            inn
          </button>
          {error && <Error>{error}</Error>}
        </WrapperLogin>
      </Outer>
    )
  }
}

export default graphql(LOGIN, {
  name: "gfnLogin"
})(Login)
