import styled, { css, keyframes } from "styled-components"

export const theme = {
  link: "NAVY",
  selected: "LIGHTCYAN", // eg DropDownMenu
  informative: "IVORY",
  selectable: "ALICEBLUE",
  actionable: "#2196F3",
  success: "#4CAF50",
  warning: "#FF9800",
  alert: "ORANGERED",
  admin: "LIGHTCORAL"
}

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1.6em;
  background: ${op => (op.isActive ? "PALEGREEN" : "default")};
  &:nth-child(odd) {
    background: WHITESMOKE;
  }
`
// export const Column = styled.div`
//   flex: 0 0 ${op => (op.width ? op.width : "auto")};
// `

//
//
// LOADER
const backgroundLoading = keyframes`
    0%{
        background-position: -486px 0
    }
    100%{
        background-position: 486px 0
    }`

const activateLoadingAnimation = css`
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  position: relative;
  animation: ${backgroundLoading} 2000ms forwards infinite linear;
`

export const Outer = styled.div`
  height: ${op => (op.loading && typeof loading === "string" ? op.loading : "auto")};
  ${op =>
    op.loading &&
    css`
      border: 1px solid BLUE;
    `};
`

//
//
// GLOBAL CSS
export const globalCss = css`
  html {
    font-size: 14px;
    font-family: "Roboto", Arial;
    background: GAINSBORO;
    user-select: none;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`
