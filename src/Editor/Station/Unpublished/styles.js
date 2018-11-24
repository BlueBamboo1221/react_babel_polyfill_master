import styled from "styled-components"
import { Outer as GlobalOuter } from "../../../stylesGlobal"

export const Outer = styled(GlobalOuter)`
  min-height: 18vh;
  max-height: 28vh;
  overflow-y: auto;
  background: ALICEBLUE;
`
export const Header = styled.div`
  position: sticky;
  top: 0;
  padding: 0.3em 0;
  background: POWDERBLUE;
`

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`

export const Category = styled.div`
  flex: 0 0 26em;
  border: 1px solid GRAY;
  margin: 0.5em 0.2em;
`

export const CategoryHeader = styled.div`
  background: SILVER;
  padding: 2px 4px;
  font-weight: bold;
`

export const Entries = styled.div`
  padding: 0.2em 0.1em;
  font-size: 0.9em;
`
