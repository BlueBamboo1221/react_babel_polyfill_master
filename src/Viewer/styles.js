import styled, { css } from "styled-components"
import { isIE11 } from "../helpersGlobal"

export const Outer = styled.div``

export const Header = styled.div`
  background: STEELBLUE;
  border-bottom: 1px solid NAVY;
  padding: 0.3em 0.2em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${!isIE11 &&
    css`
      position: sticky;
      top: 0;
    `};
`

export const Main = styled.div`
  margin-top: 0.3em;
  padding: 0.5em 0.5em;
`
