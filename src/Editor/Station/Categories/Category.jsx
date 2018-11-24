import React from "react"
import { findDOMNode } from "react-dom"
import { DropTarget } from "react-dnd"
import Edit from "./Edit"
import Entry from "../Entry"
import { Outer, Header, Entries } from "./styles"

@DropTarget(
  ["entry"],
  {
    drop(
      {
        category: { id: targetCategoryId },
        fnCategorizeEntry
      },
      monitor
    ) {
      const entryItem = monitor.getItem()
      const entryItemType = monitor.getItemType()

      if (entryItemType === "entry") {
        const {
          id: entryId,
          // categoryId will be undefined for unpublished/uncategorized entries
          categoryId: currentCategoryId,
          actionType = currentCategoryId === undefined
            ? "ADD"
            : targetCategoryId === currentCategoryId
              ? "REMOVE"
              : "MOVE"
        } = entryItem
        fnCategorizeEntry(actionType, targetCategoryId, currentCategoryId, entryId)
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    targetIsOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    targetCategoryId: monitor.canDrop() ? monitor.getItem().categoryId : null
  })
)
class Category extends React.Component {
  render() {
    console.log("categories-Category/RENDER")
    const {
      category,
      category: { id: categoryId, index, bcolor, fcolor, title, entries },
      stationId,
      editCategoryId,
      editEntryId,
      targetCategoryId,
      targetDropAction = targetCategoryId === categoryId ? "REMOVE" : "ADD",
      connectDropTarget,
      canDrop,
      targetIsOver,
      fnSetStationState,
      fnSetCategoriesState,
      fnCrdCategory
    } = this.props

    return (
      <Outer
        ref={instance => connectDropTarget(findDOMNode(instance))}
        canDrop={canDrop}
        targetIsOver={targetIsOver}
        targetDropAction={targetDropAction}
      >
        {/* onClick={() => fnSetCategoriesState({ editCategoryId: categoryId })} */}
        <Header
          bcolor={bcolor}
          fcolor={fcolor}
          onClick={() => {
            if (categoryId !== editCategoryId) {
              fnSetCategoriesState({ editCategoryId: categoryId })
            }
          }}
        >
          {categoryId === editCategoryId ? (
            <Edit key={category.id} data={category} fnCrdCategory={fnCrdCategory} />
          ) : (
            <span>
              {index}. {title}
            </span>
          )}
        </Header>
        {/* <button onClick={() => fnSetCategoriesState({ editCategoryId: categoryId })}>edit me</button> */}

        <Entries>
          {entries.map(entry => (
            <Entry
              key={entry.id}
              entry={entry}
              categoryId={categoryId}
              editEntryId={editEntryId}
              editStationId={stationId}
              fnSetStationState={fnSetStationState}
            />
          ))}
        </Entries>
      </Outer>
    )
  }
}
export default Category
