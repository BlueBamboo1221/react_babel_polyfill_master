import React from "react"
import ReactDOM from "react-dom"
import { compose, graphql } from "react-apollo"
import { DropDownMenu, SmartButton } from "../../../UiHelpers"
import Entry from "../Entry"
import { ALLSTATIONS, OWNSTATION, OTHERSTATION } from "./graphql"
import { Outer, Header, Categories, Category, CategoryHeader, Entries } from "./styles"

// props: editStationId: the station being edited ("own station")
// props: stationId: either same as editStationId or "other" station to view Entries from
class Unpublished extends React.Component {
  render() {
    const {
      editStationId,
      stationId,
      editEntryId,
      fnCreateEntry,
      fnSetStationState,
      dataAllStations,
      dataOwnStation = {},
      dataOtherStation = {},
      isUsingOtherStation = stationId !== editStationId
    } = this.props

    // NOTE we're composing queries thus props comlexity
    if (dataAllStations.loading || dataOwnStation.loading || dataOtherStation.loading) return <Outer loading />

    const { allStations } = dataAllStations
    const ddmAllStations = [
      { id: editStationId, label: `óbirtir/óflokkaðir tenglar`, isSet: !isUsingOtherStation },
      ...allStations.map(as => ({
        id: as.id,
        label: as.title,
        isSet: as.id === stationId
      }))
    ]

    const Component = (
      <Outer>
        <Header>
          <DropDownMenu
            options={ddmAllStations}
            style={{ width: "auto" }}
            label={{ text: "Starfsstöð" }}
            fnHandle={selectedStationId => fnSetStationState({ otherStationId: selectedStationId })}
          />

          {!isUsingOtherStation && (
            <SmartButton type={{ kind: "2", impression: "actionable" }} fnHandle={() => fnCreateEntry()}>
              +tengill
            </SmartButton>
          )}
        </Header>

        {!isUsingOtherStation ? (
          <Entries>
            {dataOwnStation.unpublishedEntries.ownedEntries.map(entry => (
              <Entry
                key={entry.id}
                entry={entry}
                isOwnedByStation
                editEntryId={editEntryId}
                fnSetStationState={fnSetStationState}
              />
            ))}
          </Entries>
        ) : (
          <Categories>
            {dataOtherStation.categorizedEntries.categories.map(
              ({ id: ct_Id, title: ct_Title, entries: ct_Entries }) => (
                <Category key={ct_Id}>
                  <CategoryHeader>{ct_Title}</CategoryHeader>
                  <Entries>
                    {ct_Entries.map(entry => (
                      <Entry
                        key={entry.id}
                        entry={entry}
                        isOwnedByStation={false}
                        editEntryId={editEntryId}
                        fnSetStationState={fnSetStationState}
                      />
                    ))}
                  </Entries>
                </Category>
              )
            )}
          </Categories>
        )}
      </Outer>
    )
    return ReactDOM.createPortal(Component, document.querySelector("#footer"))
  }
}

export default compose(
  graphql(ALLSTATIONS, {
    name: "dataAllStations",
    options: op => ({
      variables: {
        stationId: [op.editStationId]
      }
    })
  }),
  graphql(OWNSTATION, {
    name: "dataOwnStation",
    skip: op => op.editStationId !== op.stationId,
    options: op => ({
      variables: {
        stationId: op.editStationId
      }
    })
  }),
  graphql(OTHERSTATION, {
    name: "dataOtherStation",
    skip: op => op.editStationId === op.stationId,
    options: op => ({
      variables: {
        stationId: op.stationId
      }
    })
  })
)(Unpublished)
