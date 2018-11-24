import styled, { css } from "styled-components"
import { theme } from "../../stylesGlobal"

export const ButtonToggle = styled.span`
  padding: 0.2em 0.3em;
  ${op =>
    op.disabled
      ? css`
          background: LIGHTGRAY;
          border: 1px solid GRAY;
        `
      : css`
          background: ${theme.selectable};
          box-shadow: 1px 1px 3px 0 GRAY;
          cursor: pointer;
        `};
`

export const Options = styled.span`
  position: absolute;
  margin-top: 0.3em;
  font-size: 0.95em;
  background: WHITE;
  border: 1px solid GRAY;
  max-height: 400px;
  overflow-y: auto;
  z-index: 999;
  cursor: pointer;
`

export const Option = styled.div`
  padding: 0.1em 0.5em;
  ${op =>
    op.isSet &&
    css`
      font-weight: bold;
      background: ${theme.selected};
    `};
  &:hover {
    background: SLATEGRAY;
    color: WHITE;
  }
`
