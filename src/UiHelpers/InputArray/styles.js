import styled, { css } from "styled-components"

export const InputField = styled.input.attrs({ type: "text" })`
  ${op =>
    op.value === ""
      ? css`
          width: 1.5em;
          background: LIGHTYELLOW;
        `
      : css`
          width: ${op.inputWidth};
        `};
`
