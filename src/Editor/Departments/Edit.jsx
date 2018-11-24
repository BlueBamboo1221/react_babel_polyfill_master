import React from "react"
import { apolloClient } from "../../apollo"
import { DropDownMenu, SmartInput } from "../../UiHelpers"
import { UPDATE } from "./graphql"
import { LshId, Title, House, Station } from "./styles"

export default class Edit extends React.Component {
  timer = null

  constructor(props) {
    super(props)
    const {
      departmentData: { id: departmentId, title, lshId, mapsToHouse, mapsToStation },
      allHouses,
      allStations
    } = props
    this.state = {
      departmentId,
      title,
      lshId,
      optHouses: allHousesToOptions(allHouses, mapsToHouse ? mapsToHouse.id : null),
      optStations: allStationsToOptions(allStations, mapsToStation ? mapsToStation.id : null)
    }
  }

  handleUpdate = (key, value) => {
    const { allHouses, allStations } = this.props

    clearTimeout(this.timer)
    this.setState({
      [key]: value,
      ...(key === "mapsToHouse" && { optHouses: allHousesToOptions(allHouses, value) }),
      ...(key === "mapsToStation" && { optStations: allStationsToOptions(allStations, value) })
    })
    this.timer = setTimeout(this.persistState, 300)
  }

  persistState = () => {
    const { departmentId, title, lshId, optHouses, optStations } = this.state
    const mapsToHouse = (optHouses.find(oh => oh.isSet) || {}).id || null
    const mapsToStation = (optStations.find(oh => oh.isSet) || {}).id || null
    // const mapsToStation = optStations.reduce((tot, os) => tot.concat(os.isSet ? os.id : []), [])
    apolloClient.mutate({
      mutation: UPDATE,
      variables: { departmentId, title, lshId, mapsToHouse, mapsToStation }
    })
  }

  render() {
    const { departmentId, title, lshId, optHouses, optStations } = this.state
    if (departmentId === null) return null

    return (
      <React.Fragment>
        <LshId>
          <SmartInput
            innerStyle={{ color: "RED" }}
            type={{ kind: "NUMBER" }}
            value={lshId}
            fnHandle={v => this.handleUpdate("lshId", v)}
          />
        </LshId>

        <Title>
          <SmartInput type={{ kind: "TEXT" }} value={title} fnHandle={v => this.handleUpdate("title", v)} />
        </Title>

        <House>
          <DropDownMenu
            options={optHouses}
            title="..."
            fnHandle={houseId => this.handleUpdate("mapsToHouse", houseId)}
          />
        </House>

        <Station>
          <DropDownMenu options={optStations} fnHandle={stationId => this.handleUpdate("mapsToStation", stationId)} />
        </Station>
      </React.Fragment>
    )
  }
}

const allHousesToOptions = (allHouses, mapsToHouse) =>
  allHouses.map(ah => ({
    id: ah.id,
    label: ah.title,
    isSet: mapsToHouse ? ah.id === mapsToHouse : false
  }))

const allStationsToOptions = (allStations, mapsToStation) =>
  allStations.map(as => ({
    id: as.id,
    label: as.title,
    isSet: as.id === mapsToStation
  }))
