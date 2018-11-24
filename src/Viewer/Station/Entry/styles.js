import styled, { css } from "styled-components"

export const Outer = styled.div`
  padding: 0.1em 0.2em;
  margin: 0.4em 0;
  overflow: hidden;
  ${op =>
    !op.isInactive
      ? op.isClickable &&
        css`
          color: MIDNIGHTBLUE;
          cursor: pointer;
        `
      : css`
          color: GRAY;
        `};
  &:nth-child(even) {
    background: #fafafa;
  }
  ${op =>
    !op.showEntryDescriptions &&
    op.hasDescription &&
    css`
      &:hover {
        & > p {
          opacity: 0.9;
          z-index: 999;
        }
      }
    `};
`
// display: flex;
// flex-direction: row;
export const Upper = styled.div``

export const Prefix = styled.span`
  color: SLATEGRAY;
  margin-right: 0.2em;
`
export const Suffix = styled.span`
  color: GRAY;
  margin-left: 0.2em;
`

// flex: 1 0 0;
export const Title = styled.div`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${op =>
    !op.showEntryDescriptions &&
    op.hasDescription &&
    css`
      border-left: 0.2em solid ORANGE;
      padding-left: 0.1em;
    `};
`

// flex: 0 0 4.5em;
// text-align: right;
export const Details = styled.div`
  float: right;
  display: inline-block;
`

export const PartLshFixed = styled.div`
  color: GREEN;
  &::before {
    content: "543";
    font-size: 0.9em;
  }
`
export const PartMobile = styled.span``
export const PartPager = styled.span``
export const PartUrl = styled.span`
  padding: 0 0.2em;
  min-width: 0.6em;
  color: WHITE;
  background: STEELBLUE;
  box-shadow: 2px 1px silver;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
`

export const Description = styled.p`
  font-family: monospace;
  font-size: 0.92em;
  white-space: pre-wrap;
  color: SLATEGRAY;
  ${op =>
    op.showEntryDescriptions
      ? css`
          padding: 0.2em 0.2em;
          margin: 0;
        `
      : css`
          transition: all 220ms ease 200ms;
          margin: 0 0;
          background: BEIGE;
          width: 26em;
          position: absolute;
          opacity: 0;
          box-shadow: 2px 2px 5px GRAY;
          padding: 0.5em 0.5em;
        `};
`
