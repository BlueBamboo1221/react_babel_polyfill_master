import React from "react"
import { Outer, Buttons, Menu, Stations, StationTitle, ButtonStation } from "./styles"

export default class StationMenu extends React.Component {
  constructor(props) {
    super(props)
    const { db, stationId } = props
    const { stations: jsStations } = db
    this.allStations = jsStations.map(({ id, title, type }) => ({
      id,
      title,
      isMaster: type === "master",
      isCurrent: id === stationId
    }))
    this.state = { isOpen: false }
  }

  handleClick = newStationId => {
    const { fnSetRootState } = this.props
    this.setState({ isOpen: false })
    fnSetRootState({ stationId: newStationId })
  }

  render() {
    const { allStations } = this
    const { isOpen } = this.state
    const { title: currentTitle } = allStations.find(as => as.isCurrent) || {}
    return (
      <Outer>
        <Buttons>
          <ButtonStation onClick={() => this.setState({ isOpen: true })}>
            {currentTitle || "-veldu starfsstöð-"}
          </ButtonStation>
          <div id="counter" />
        </Buttons>

        <Menu isOpen={isOpen} onMouseLeave={() => this.setState({ isOpen: false })}>
          <Stations>
            {allStations.map(({ id, title }) => (
              <StationTitle key={id} onClick={() => this.handleClick(id)}>
                {title}
              </StationTitle>
            ))}
          </Stations>
        </Menu>
      </Outer>
    )
  }
}
