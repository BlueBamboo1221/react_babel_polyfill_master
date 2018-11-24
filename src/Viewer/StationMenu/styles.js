import styled, { css } from "styled-components"
import { isIE11 } from "../../helpersGlobal"

export const Outer = styled.div`
  min-width: 24em;
`

export const Buttons = styled.div``

// export const ButtonLSH = styled.span`
//   display: inline-block;
//   max-width: 12%;
//   line-height: 1em;
//   color: MEDIUMSEAGREEN;
//   font-size: 2em;
//   cursor: pointer;
//   opacity: ${op => (op.isMaster ? 0.5 : 1)};
//   text-shadow: 2px 2px 3px GREEN;
// `

export const ButtonStation = styled.div`
  overflow: hidden;
  cursor: pointer;
  background: DEEPSKYBLUE;
  color: IVORY;
  padding: 0.1em 0.4em;
  font-weight: bold;
  font-size: 1.3em;
  box-shadow: 1px 1px 1px 0px GRAY;
  border-radius: 5px;
`

export const Stations = styled.div`
  ${!isIE11
    ? css`
        display: grid;
        grid-template-columns: 300px 300px;
        grid-column-gap: 12px;
        grid-row-gap: 1px;
      `
    : css`
        display: -ms-flexbox;
        -ms-flex-wrap: wrap;
        -ms-flex-direction: column;
        height: 460px;
      `};
`

export const StationTitle = styled.span`
  padding: 3px 2px;
  cursor: pointer;
  ${isIE11 &&
    css`
      margin: 0 12px;
    `};
  &:hover {
    background: DEEPSKYBLUE;
    color: IVORY;
  }
`

// ### MENU
export const Menu = styled.div`
  display: none;
  z-index: 99999;
  position: fixed;
  left: 2.5em;
  background: WHITE;
  border: 1px solid GRAY;
  box-shadow: 11px 8px 8px 1px GRAY;
  padding: 4px 8px;
  ${op =>
    op.isOpen &&
    css`
      display: block;
    `};
`
