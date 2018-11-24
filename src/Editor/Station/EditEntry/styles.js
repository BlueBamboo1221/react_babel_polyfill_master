import styled, { css } from "styled-components"
import { theme, Outer as GlobalOuter } from "../../../stylesGlobal"
import { SmartLink } from "../../../UiHelpers"

export const Outer = styled(GlobalOuter)`
  position: sticky;
  z-index: 50;
  top: 5em;
  box-shadow: 2px 2px grey;
  background: ${op => (op.userCanEditEntry ? "POWDERBLUE" : "LIGHTGRAY")};
  ${op =>
    !op.hasAdminEditAccess
      ? css`
          border-left: 12px solid ${theme.admin};
        `
      : css`
          padding-left: 12px;
        `};
`

export const AreaTop = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.2em 0.2em;
  height: 8em;
`

export const AreaTopLeft = styled.div`
  width: 23em;
  padding: 0 0.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const AreaTopCenter = styled.div`
  flex: 1 0 0;
  padding: 0 0.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const AreaTopRight = styled.div`
  width: 14em;
  padding: 0 0.2em;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const AreaBottom = styled.div`
  padding: 0.3em 0;
  text-align: right;
`

export const StationTitle = styled(SmartLink)`
  display: block;
  padding: 0.2em 0.3em;
  &:not(:last-child):after {
    content: ",";
    margin-right: 0.3em;
  }
`
