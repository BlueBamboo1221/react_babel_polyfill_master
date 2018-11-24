import styled from "styled-components"
import { SmartLink as _SmartLink } from "../UiHelpers"

export const RootHeader = styled.header`
  background: DARKSLATEGRAY;
  height: 2.2em;
  border-bottom: 1px solid BLACK;
  padding: 0.1em 0em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  color: WHITE;
  z-index: 999;
`

export const Navigation = styled.div`
  text-decoration: none;
  font-weight: bold;
`

export const SmartLink = styled(_SmartLink)`
  margin-right: 1em;
  color: YELLOW;
`

export const Right = styled.div`
  flex: 0 0 25%;
  text-align: right;
`

export const User = styled.span`
  margin-right: 0.2em;
  font-size: 0.9em;
  color: ${op => (op.userAdminLevel >= 1 ? "ORANGE" : "default")};
`

export const RootMain = styled.main`
  flex: 1;
  overflow: auto;
  padding: 0 1.5em;
  background: WHITE;
  min-height: 400px;
`

export const RootFooter = styled.footer`
  &&:not(:empty) {
    border-top: 1px solid GRAY;
  }
`
