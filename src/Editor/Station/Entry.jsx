import React from "react"
import styled, { css } from "styled-components"
import { findDOMNode } from "react-dom"
import { DragSource } from "react-dnd"

const Outer = styled.div`
  padding: 0.1em 0;
  min-height: 1em;
  ${op =>
    op.isCategorized
      ? css`
          flex: 0 0 26em;
        `
      : css`
          display: inline-block;
          width: 22em;
          margin: 0.1em 0.4em;
          padding: 0.1em 0.2em;
          border: 1px solid LIGHTGRAY;
        `};
  cursor: pointer;
  ${op =>
    op.isEditingEntry &&
    css`
      background: ORANGE;
    `};
  &:hover {
    background: YELLOW;
  }
`
const Title = styled.div`
  text-overflow: ellipsis;
  ${op =>
    op.isOwnedByStation
      ? css`
          color: NAVY;
        `
      : css`
          color: CADETBLUE;
        `};
`

const Description = styled.div`
  padding-left: 0.3em;
  color: SLATEGRAY;
  font-size: 0.92em;
  max-height: 4em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.15em 0;
`

@DragSource(
  "entry",
  {
    beginDrag({ categoryId, entry: { id } }) {
      return { id, categoryId }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    entryIsDragging: monitor.isDragging()
  })
)
class Entry extends React.Component {
  render() {
    const {
      editEntryId,
      editStationId,
      categoryId, // categoryId set/missing differs between categorized/unpublished entry
      entry: { id, title, description, stationOwner },
      // can only differ for catgorized entries, default is true
      isOwnedByStation = stationOwner ? stationOwner.id === editStationId : true,
      fnSetStationState,
      connectDragSource,
      entryIsDragging
    } = this.props
    if (title === "ISDELETED") return null

    return (
      <Outer
        ref={instance => connectDragSource(findDOMNode(instance))}
        isEditingEntry={editEntryId === id}
        isCategorized={categoryId !== undefined}
        isDragging={entryIsDragging}
        title={description}
        onClick={() => {
          fnSetStationState({ editEntryId: id })
        }}
      >
        <Title isOwnedByStation={isOwnedByStation}>{title}</Title>
        {description && <Description>{description}</Description>}
      </Outer>
    )
  }
}

export default Entry
