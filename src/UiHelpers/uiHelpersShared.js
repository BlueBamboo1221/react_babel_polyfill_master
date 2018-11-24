import styled, { css } from "styled-components"

// TODO/4
// I would like to use most basic create...Attributes fn for SmartButton & SmartLink
// width & label logic would then be added where needed

// handler functions for components are named "fnHandle" wether change of data or event trigger

export const createOuterAttributes = (style, className = null, label, title = null, keepTogether = false) => ({
  style: { ...style },
  className,
  title,
  keepTogether,
  labelType: label ? label.kind : null
})

export const createInnerAttributes = (innerStyle, style, disabled) => ({
  style: {
    ...innerStyle,
    width: "100%"
  },
  ...(disabled && { disabled })
})

export const keepTogether = op =>
  !op.keepTogether
    ? css`
        margin: 0 0.2em;
      `
    : null

export const OuterWithLabel = styled.div`
  ${keepTogether} ${op =>
    op.style && op.style.width
      ? css`
          display: inline-flex;
        `
      : css`
          display: flex;
        `};
  flex-direction: ${op => (op.label && op.label.kind === "LEFT" ? "column" : "row")};
`

export const Label = styled.span`
  color: GRAY;
  font-size: 0.9em;
  margin-right: 0.3em;
  white-space: nowrap;
`
