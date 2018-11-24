import styled, { css } from "styled-components"
import { theme } from "../../stylesGlobal"
import { keepTogether } from "../uiHelpersShared"

export const Outer = styled.span`
  display:inline;
  cursor: pointer;
  font-weight: bold;
  transition: transform:400ms;
  ${keepTogether}
  ${op =>
    op.confirming &&
    css`
      transform: scale(1.2, 1.2);
    `};
  ${op =>
    op.disabled &&
    css`
      color: GRAY !important;
      pointer-events: none;
    `};
  ${op =>
    op.kind === "1"
      ? css`
          background: ${theme[op.impression]};
          color: WHITE;
          font-size: 1.1rem;
          padding: 0.3em 0.5em;
          box-shadow: 1px 1px 3px 0 GRAY;
        `
      : op.kind === "2"
        ? css`
            background: ${theme.selectable};
            color: ${theme[op.impression]};
            padding: 0.2em 0.3em;
            box-shadow: 1px 1px 3px 0 GRAY;
            text-shadow: 1px 1px DARKGRAY;
          `
        : op.kind === "3"
          ? css`
              color: ${theme[op.impression]};
              text-shadow: 1px 1px DARKGRAY;
              padding: 0.1em 0.2em;
            `
          : null}
`
