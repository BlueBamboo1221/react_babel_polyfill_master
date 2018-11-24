import React from "react"
import { graphql } from "react-apollo"
import { apolloClient } from "../../../apollo"
import { LOADER, CREATECATEGORYINSTATION, DELETECATEGORYINSTATION } from "./graphql"
import { SmartButton } from "../../../UiHelpers"
import Category from "./Category"
import { Outer } from "../../../stylesGlobal"
import { ListedCategories } from "./styles"

class Categories extends React.Component {
  state = {
    editCategoryId: null
  }

  fnCrdCategory = (action, categoryId = null) => {
    const { stationId } = this.props
    if (action === "CREATE") {
      apolloClient.mutate({
        mutation: CREATECATEGORYINSTATION,
        variables: { stationId, categoryId }
      })
    } else {
      apolloClient.mutate({
        mutation: DELETECATEGORYINSTATION,
        variables: { stationId, categoryId }
      })
    }
  }

  render() {
    // console.log("categories-index/RENDER")
    const {
      stationId,
      editEntryId,
      fnCategorizeEntry,
      fnSetStationState,
      data: { loading, editStation }
    } = this.props
    if (loading) return <Outer loading />

    const { editCategoryId } = this.state
    const { categories, sortedCategories = categories.sort((a, b) => a.index - b.index) } = editStation

    return (
      <Outer style={{ marginTop: "2em" }}>
        <div style={{ textAlign: "right" }}>
          <SmartButton type={{ kind: "2", impression: "actionable" }} fnHandle={() => this.fnCrdCategory("CREATE")}>
            +efnislokkur
          </SmartButton>
        </div>

        <ListedCategories>
          {sortedCategories.map(category => (
            <Category
              key={category.id}
              editEntryId={editEntryId}
              editCategoryId={editCategoryId}
              stationId={stationId}
              category={category}
              fnSetStationState={fnSetStationState}
              fnSetCategoriesState={state => this.setState(state)}
              fnCategorizeEntry={fnCategorizeEntry}
              fnCrdCategory={this.fnCrdCategory}
            />
          ))}
        </ListedCategories>
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
})(Categories)
