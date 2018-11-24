import { hot } from "react-hot-loader"
import React from "react"
import Station from "./Station"
import StationMenu from "./StationMenu"
import SearchInput from "./SearchInput"
import SearchGlobal from "./SearchGlobal"
import SearchOuter from "./SearchOuter"
// import SearchGaedahandbok from "./SearchGaedahandbok"
import { Outer, Header, Main } from "./styles"

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      stationId: initStationId(props.db)
    }
  }

  fnSetRootState = state => {
    this.setState(state)
  }

  // in Root b/c 2x child components need fn and it can change root state
  fnHandleEntryClick = (e, pEntry) => {
    e.stopPropagation()
    const part = createDefaultPart(pEntry)
    const { lshPager, mobile, smartLink } = pEntry

    if (part === "lshMobile") {
      window.open(`http://gsm.lsh.is/?user=global&simi=${mobile}`, "_blank").focus()
      return
    }

    if (part === "lshPager") {
      window.open(`http://160.210.16.252?msg=&bp=2&no=${lshPager}`, "_blank").focus()
      return
    }

    // escape is deprecated but UTF8 which we need, encodeURIComponent() is UTF16
    if (smartLink.type === "URL") {
      const rxMatch = smartLink.link.match(/(.*)(regid=9&searchtext=)(.*)/)
      const url = rxMatch !== null ? rxMatch[1] + rxMatch[2] + escape(rxMatch[3]) : smartLink.link
      window.open(url, "_blank").focus()
      return
    }

    if (smartLink.type === "HGCHAT") {
      const params = smartLink.link.split("|")
      if (params[1]) {
        // channel name - or SSN
        window.sendChat(params[0], params[1], "TEXT", true, false, false)
      }
      window.openChatChannel(params[0])
      return
    }

    if (smartLink.type === "STATION") {
      this.setState({ stationId: smartLink.link })
    }
  }

  render() {
    // if (localStorage.getItem("authToken") === null) return "ekki innskráður"
    const { db } = this.props
    const { stationId, search } = this.state
    // console.log("stationId,search", stationId, search)

    return (
      <Outer>
        <Header>
          <StationMenu key={stationId} stationId={stationId} fnSetRootState={this.fnSetRootState} db={db} />
          <SearchInput fnSetRootState={this.fnSetRootState} />
          <SearchOuter search={search} fnSetRootState={this.fnSetRootState} />
        </Header>

        {/* <SearchGaedahandbok search={search} /> */}
        <SearchGlobal stationId={stationId} search={search} fnHandleEntryClick={this.fnHandleEntryClick} db={db} />

        <Main>
          {stationId && (
            <Station search={search} stationId={stationId} fnHandleEntryClick={this.fnHandleEntryClick} db={db} />
          )}
        </Main>
      </Outer>
    )
  }
}

export default hot(module)(Root)

//
//
const initStationId = db => {
  const { departments: jsDepartments } = db
  const { href } = window.location
  const urlDepartment = /department=(\d*)/.exec(href)
  if (urlDepartment !== null) {
    const jsDepartment = jsDepartments.find(d => d.lshId === urlDepartment[1])
    if (jsDepartment) {
      return jsDepartment.mapsToStation.id
    }
  }
  // department not set (not found, not requested); parse station from url
  const pathSplitted = window.location.pathname.split("/")
  return pathSplitted[1] === "station" ? pathSplitted[2] : null
}

const createDefaultPart = pEntry => (pEntry.mobile ? "lshMobile" : pEntry.lshPager ? "lshPager" : "smartLink")
