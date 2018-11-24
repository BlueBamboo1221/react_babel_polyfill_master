import styled from "styled-components"

export const Outer = styled.div``

export const StationInfo = styled.div`
  background-color: MINTCREAM;
  padding: 0.1em 8px;
  font-size: 1.1em;
`

export const StationInfoSection = styled.div`
  display: inline-block;
  margin: 0 0.3em;
`

export const DescriptionUrl = styled.a`
  cursor: pointer;
  margin-left: 1em;
`

export const UserName = styled.span`
  margin: 0 0.5em;
  &:not(:last-child):after {
    content: ",";
  }
`

export const Categories = styled.div`
  column-width: 22em;
  column-gap: 1.2em;
  margin-top: 1em;
`

export const Category = styled.div`
  margin-bottom: 1.2em;
  box-shadow: 2px 1px 0 SLATEGRAY;
  break-inside: avoid-column;
`

export const CategoryHeader = styled.div`
  background: ${op => (op.bcolor ? op.bcolor : "LIGHTSTEELBLUE")};
  color: ${op => (op.fcolor ? op.fcolor : "inherit")};
  font-size: 1.15em;
  font-weight: bold;
  padding: 2px 2px 2px 4px;
  letter-spacing: 0.1em;
  border-bottom: 1px solid LIGHTGRAY;
`

export const Entries = styled.div`
  padding: 0.1em 0.1em;
  background: WHITE;
`
