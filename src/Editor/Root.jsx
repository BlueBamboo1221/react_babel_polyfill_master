import { hot } from "react-hot-loader"
import { Switch, Route } from "react-router-dom"
import React from "react"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"
import decode from "jwt-decode"
import { history } from "../history"
import Login from "./Login"
import Departments from "./Departments"
import Users from "./Users"
import Stations from "./Stations"
import Station from "./Station"
import { SmartButton } from "../UiHelpers"
import { RootHeader, Navigation, Right, User, RootMain, RootFooter, SmartLink } from "./styles"

export const app = {}

// TODO/4 login logic could be better
@DragDropContext(HTML5Backend)
class Root extends React.Component {
  fnLogOut = () => {
    localStorage.removeItem("authToken")
    history.go("/login")
  }

  render() {
    const authToken = localStorage.getItem("authToken")
    if (authToken === null) {
      return <Login />
    }
    const authTokenDecoded = decode(authToken)
    const date = new Date(0)
    if (!authTokenDecoded.exp) {
      return <Login />
    }
    date.setUTCSeconds(authTokenDecoded.exp)
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    if (!(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000)) {
      return <Login />
    }
    const { userId, name, adminLevel: userAdminLevel } = authTokenDecoded
    app.userAdminLevel = userAdminLevel
    app.userId = userId
    const userIsAdmin = userAdminLevel >= 1

    return (
      <React.Fragment>
        <RootHeader>
          <Navigation>
            <SmartLink router={{ to: "/stations", indicateActive: true }}>Starfsstöðvar</SmartLink>

            <SmartLink disabled={!userIsAdmin} router={{ to: "/departments", indicateActive: true }}>
              Innskráningardeildir
            </SmartLink>

            <SmartLink
              disabled={!userIsAdmin}
              router={{ to: "/users", indicateActive: true }}
              style={{ marginRight: "2em" }}
            >
              Notendur
            </SmartLink>

            <SmartLink href="https://docs.google.com/document/d/126x3aNXnXDT6wZJzzLSNBbFW8m6FtdMUCZULmdfND7w/edit#">
              Leiðbeiningar
            </SmartLink>
          </Navigation>

          <Right>
            <User title={userAdminLevel} userAdminLevel={userAdminLevel}>
              {name}
            </User>
            <SmartButton type={{ kind: "1", impression: "warning" }} fnHandle={() => this.fnLogOut()}>
              útskrá
            </SmartButton>
          </Right>
        </RootHeader>

        <RootMain>
          <Switch>
            <Route path="/station/:stationId" component={Station} />
            <Route path="/departments/:departmentId?" component={Departments} />
            <Route path="/users/:userId?" component={Users} />
            <Route path="/stations/:stationId?" component={Stations} />
            <Route path="/" component={Stations} />
          </Switch>
        </RootMain>

        <RootFooter id="footer" />
      </React.Fragment>
    )
  }
}

// export default Root
export default hot(module)(Root)
