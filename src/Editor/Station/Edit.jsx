import React from "react"
import { graphql } from "react-apollo"
import { apolloClient } from "../../apollo"
import { SmartButton, SmartInput, DropDownMenu } from "../../UiHelpers"
import { stationTypes } from "../helpers"
import { LOADER, UPDATESTATION } from "./graphql"
import { OuterEdit as Outer, AreaLeft, AreaCenter, AreaRight } from "./styles"

// TODO/4 DELETE STATION
class Edit extends React.Component {
  timer = null

  state = {
    // id is only to mark if state is loaded or not
    id: null,
    title: null,
    description: null,
    url: null,
    optEntryDescriptions: null,
    optStationEditors: null,
    optStationTypes: null
  }

  static getDerivedStateFromProps = ({ data: { loading, editStation, allUsers } }, prevState) => {
    if (prevState.id !== null || loading) return null
    const { id, title, description, url, type, editors, entryDescriptions } = editStation
    return {
      id,
      title,
      description,
      url,
      optEntryDescriptions: allEntryDescriptions.map(sed => ({
        ...sed,
        isSet: sed.id === entryDescriptions
      })),
      optStationEditors: allUsers.map(au => ({
        id: au.id,
        label: au.name,
        isSet: editors.map(ed => ed.id).includes(au.id)
      })),
      optStationTypes: stationTypes.map(dt => ({
        ...dt,
        isSet: type === dt.id
      }))
    }
  }

  handleUpdate = (key, value) => {
    const {
      data: { allUsers }
    } = this.props
    clearTimeout(this.timer)
    this.setState(pS => ({
      ...pS,
      [key]: value,
      ...(key === "entryDescriptions" && {
        optEntryDescriptions: allEntryDescriptions.map(sed => ({
          ...sed,
          isSet: value === sed.id
        }))
      }),
      ...(key === "stationEditors" && {
        optStationEditors: allUsers.map(au => ({
          id: au.id,
          label: au.name,
          isSet: value.includes(au.id)
        }))
      }),
      ...(key === "stationTypes" && {
        optStationTypes: stationTypes.map(dt => ({
          ...dt,
          isSet: value === dt.id
        }))
      })
    }))
    this.timer = setTimeout(this.persistState, 1000)
  }

  persistState = () => {
    const {
      id: stationId,
      title,
      description,
      url,
      optStationTypes,
      optEntryDescriptions,
      optStationEditors
    } = this.state
    apolloClient.mutate({
      mutation: UPDATESTATION,
      variables: {
        stationId,
        title,
        description,
        url,
        type: optStationTypes.find(st => st.isSet).id,
        entryDescriptions: optEntryDescriptions.find(sed => sed.isSet).id,
        editors: optStationEditors.reduce((tot, ose) => tot.concat(ose.isSet ? ose.id : []), [])
      }
    })
  }

  render() {
    const { userIsEditorForStation, userAdminLevel, stationId } = this.props
    const { id, title, description, url, optEntryDescriptions, optStationEditors, optStationTypes } = this.state
    if (id === null) return <Outer loading="2em" />

    return (
      <Outer
        hasAdminEditAccess={!userIsEditorForStation && userAdminLevel >= 1}
        userIsEditorForStation={userIsEditorForStation}
        userAdminLevel={userAdminLevel}
      >
        <AreaLeft>
          <SmartInput
            type={{ kind: "TEXT" }}
            innerStyle={{ fontWeight: "bold", fontSize: "1.1em" }}
            value={title}
            fnHandle={v => this.handleUpdate("title", v)}
          />
          <div>
            <DropDownMenu
              style={{ width: "8em" }}
              options={optStationEditors}
              label={{ text: "ritstjórar" }}
              multiple
              fnHandle={v => this.handleUpdate("stationEditors", v)}
            />
            <DropDownMenu
              style={{ width: "auto" }}
              options={optStationTypes}
              label={{ text: "tegund" }}
              fnHandle={v => this.handleUpdate("stationTypes", v)}
            />
          </div>
        </AreaLeft>

        <AreaCenter>
          <SmartInput
            type={{ kind: "TEXTAREA", nullDimension: { height: "1.2em" } }}
            label={{ text: "lýsing í haus" }}
            value={description}
            fnHandle={v => this.handleUpdate("description", v)}
          />
          {description && (
            <SmartInput
              type={{ kind: "TEXT" }}
              value={url}
              label={{ text: "...sjá nánar" }}
              placeholder="url (vefslóð)"
              fnHandle={v => this.handleUpdate("url", v)}
            />
          )}
        </AreaCenter>

        <AreaRight>
          <DropDownMenu
            style={{ width: "10em" }}
            options={optEntryDescriptions}
            label={{ text: "lýsingar" }}
            fnHandle={v => this.handleUpdate("entryDescriptions", v)}
          />

          <SmartButton
            disabled={optStationTypes.find(st => st.isSet).id === "collector"}
            type={{ kind: "1", impression: "actionable" }}
            fnHandle={() => window.open(`http://infopage-viewer.zonofthor.co/station/${stationId}`, "_blank").focus()}
          >
            forprófa
          </SmartButton>
        </AreaRight>
      </Outer>
    )
  }
}

export default graphql(LOADER, {
  options: op => ({
    variables: {
      stationId: op.stationId
    }
  })
})(Edit)

const allEntryDescriptions = [
  { id: "HIDDEN", label: "Fela" },
  { id: "SHOWFULL", label: "Birta allt" },
  { id: "SHOWHALF", label: "Birta hluta" }
]
