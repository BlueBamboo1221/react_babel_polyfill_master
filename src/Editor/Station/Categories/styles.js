import styled, { css } from "styled-components"

export const Outer = styled.div`
  flex: 0 0 auto;
  min-width: 8em;
  max-width: 24em;
  border: 1px solid LIGHTSTEELBLUE;
  margin: 0.5em 0.2em;
  overflow: hidden;
  ${op =>
    op.canDrop &&
    css`
      background: LAVENDERBLUSH;
    `};
  background: ${op => (op.targetIsOver ? (op.targetDropAction === "ADD" ? "AZURE" : "ORANGE") : "inherit")};
`

export const OuterEdit = styled.div`
  padding: 0.5em 0.1em;
  display: flex;
  flex-direction: row;
`

export const ListedCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

export const Header = styled.div`
  box-shadow: 1px 1px 1px grey;
  background: ${op => (op.bcolor ? op.bcolor : "LIGHTSTEELBLUE")};
  color: ${op => (op.fcolor ? op.fcolor : "inherit")};
  padding: 0.1em 0.1em;
  font-weight: bold;
  cursor: pointer;
`

export const Entries = styled.div`
  padding: 0.3em 0.5em;
  font-size: 0.95em;
  min-height: 2em;
`
