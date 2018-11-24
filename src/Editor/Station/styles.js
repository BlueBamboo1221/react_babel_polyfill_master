import styled, { css } from "styled-components"
import { theme, Outer as GlobalOuter } from "../../stylesGlobal"

export const OuterEdit = styled(GlobalOuter)`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 2px 2px grey;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  padding: 0 0;
  background: POWDERBLUE;
  ${op =>
    !op.hasAdminEditAccess
      ? css`
          border-left: 12px solid ${theme.admin};
        `
      : css`
          padding-left: 12px;
        `};
`

export const AreaLeft = styled.div`
  padding: 0 0.2em;
  width: 22em;
`
export const AreaCenter = styled.div`
  padding: 0 0.2em;
  flex: 1 0 0;
`
export const AreaRight = styled.div`
  padding: 0 0.2em;
  width: 16em;
  text-align: right;
`
