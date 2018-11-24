import React from "react"
import { apolloClient } from "../../../apollo"
import { Outer } from "../../../stylesGlobal"
import { SmartButton, SmartInput, SmartInputBUGGED } from "../../../UiHelpers"
import { UPDATECATEGORY } from "./graphql"

export default class CategoryEdit extends React.Component {
  timer = null

  constructor(props) {
    super(props)
    const {
      data: { id: editCategoryId, index, title, bcolor, fcolor }
    } = props
    this.state = {
      editCategoryId,
      index,
      title,
      bcolor,
      fcolor
    }
  }

  componentDidMount = () => {
    console.log("categoriesEdit/cDM")
  }

  componentWillUnmount = () => {
    console.log("categoriesEdit/cWU")
  }

  handleUpdate = (key, value) => {
    clearTimeout(this.timer)
    this.setState(pS => ({
      ...pS,
      [key]: value
    }))
    this.timer = setTimeout(this.persistState, key === "fcolor" ? 800 : key === "bcolor" ? 800 : 300)
  }

  persistState = () => {
    const { editCategoryId: categoryId, index, title, bcolor, fcolor } = this.state
    apolloClient.mutate({
      mutation: UPDATECATEGORY,
      variables: { categoryId, index, title, bcolor, fcolor }
    })
  }

  render() {
    console.log("categoriesEdit/RENDER")
    const { fnCrdCategory } = this.props
    const { editCategoryId, index, title, bcolor, fcolor } = this.state

    return (
      <Outer>
        <SmartInput
          type={{ kind: "NUMBER" }}
          style={{ width: "2.6em" }}
          title="röðun"
          value={index}
          fnHandle={v => this.handleUpdate("index", v)}
        />

        <SmartInput
          type={{ kind: "TEXT" }}
          style={{ width: "2em" }}
          placeholder="bg"
          title="bakgrunnslitur"
          value={bcolor}
          fnHandle={v => this.handleUpdate("bcolor", v)}
        />

        <SmartInputBUGGED
          type={{ kind: "TEXT" }}
          style={{ width: "2em" }}
          placeholder="fg"
          title="forgrunnslitur"
          value={fcolor}
          fnHandle={v => this.handleUpdate("fcolor", v)}
        />

        <SmartInput
          type={{ kind: "TEXT" }}
          value={title}
          style={{ width: "6em" }}
          fnHandle={v => this.handleUpdate("title", v)}
        />

        <SmartButton
          type={{ kind: "3", impression: "warning" }}
          confirmImpression="alert"
          title="eyða efnisflokk (tenglar haldast en eru óflokkaðir)"
          fnHandle={() => fnCrdCategory("DELETE", editCategoryId)}
        >
          eyða
        </SmartButton>
      </Outer>
    )
  }
}
