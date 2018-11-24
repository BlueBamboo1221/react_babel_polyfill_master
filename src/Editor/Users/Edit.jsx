import React from "react"
import { apolloClient } from "../../apollo"
import { DropDownMenu, SmartButton, SmartInput } from "../../UiHelpers"
import { adminLevels } from "../../helpersGlobal"
import { Outer } from "../../stylesGlobal"
import { UPDATE } from "./graphql"
import { Ssn, AdminLevel, NameAndLogin, EditorForStations } from "./styles"

export default class Edit extends React.Component {
  timer = null

  constructor(props) {
    super(props)
    const {
      userData: { id: userId, ssn, name, adminLevel, editorForStations },
      allStations
    } = props

    this.state = {
      userId,
      ssn,
      name,
      optAdminLevels: adminLevelsToOptions(adminLevel),
      optEditorForStations: allStationsToOptions(allStations, editorForStations.map(efs => efs.id))
    }
  }

  handleUpdate = (key, value) => {
    const { allStations } = this.props

    clearTimeout(this.timer)
    this.setState({
      [key]: value,
      ...(key === "adminLevel" && { optAdminLevels: adminLevelsToOptions(value) }),
      // !value is array
      ...(key === "editorForStations" && { optEditorForStations: allStationsToOptions(allStations, value) })
    })
    this.timer = setTimeout(this.persistState, 300)
  }

  persistState = () => {
    const { userId, ssn, name, optAdminLevels, optEditorForStations } = this.state
    const adminLevel = optAdminLevels.find(oal => oal.isSet).id
    const editorForStations = optEditorForStations.reduce((tot, oes) => tot.concat(oes.isSet ? oes.id : []), [])
    apolloClient.mutate({
      mutation: UPDATE,
      variables: { userId, ssn, name, adminLevel, editorForStations }
    })
  }

  render() {
    const { fnDelete } = this.props
    const { userId, ssn, name, optAdminLevels, optEditorForStations } = this.state
    if (userId === null) return <Outer loading />

    return (
      <React.Fragment>
        <Ssn>
          <SmartInput type={{ kind: "TEXT" }} value={ssn} fnHandle={v => this.handleUpdate("ssn", v)} />
        </Ssn>

        <AdminLevel>
          <DropDownMenu
            options={optAdminLevels}
            fnHandle={adminLevelId => this.handleUpdate("adminLevel", adminLevelId)}
          />
        </AdminLevel>

        <NameAndLogin>
          <SmartInput type={{ kind: "TEXT" }} value={name} autoFocus fnHandle={v => this.handleUpdate("name", v)} />
        </NameAndLogin>

        <EditorForStations>
          <DropDownMenu
            options={optEditorForStations}
            label={{ text: "ritstjórar" }}
            multiple
            fnHandle={ids => this.handleUpdate("editorForStations", ids)}
          />
        </EditorForStations>

        <SmartButton
          type={{ kind: "2", impression: "warning" }}
          confirmImpression="alert"
          fnHandle={() => fnDelete(userId)}
        >
          eyða
        </SmartButton>
      </React.Fragment>
    )
  }
}

const allStationsToOptions = (allStations, editorForStations) =>
  allStations.map(as => ({
    id: as.id,
    label: as.title,
    isSet: editorForStations.includes(as.id)
  }))

const adminLevelsToOptions = id =>
  adminLevels.map(ul => ({
    ...ul,
    isSet: ul.id === id
  }))
