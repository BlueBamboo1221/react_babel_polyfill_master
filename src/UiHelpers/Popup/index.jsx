import React from "react"
import styled, { css } from "styled-components"
import { theme } from "../../stylesGlobal"

const Outer = styled.div`
  display: inline-block;
  background: ${theme.informative};
  border: 1px solid GRAY;
  padding: 0.2em 0.3em;
`

// const Label = styled.span``

const PopupWindow = styled.div`
  position: fixed;
  margin-top: -1.2em;
  margin-left: 0.5em;
  padding: 0.3em 0.5em;
  height: fit-content;
  width: fit-content;
  transition: opacity 200ms;
  transition: z-index 0 500ms;
  background: white;
  box-shadow: 1px 1px 3px 0 GRAY;
  ${op =>
    op.isVisible
      ? css`
          opacity: 1;
          z-index: 999;
        `
      : css`
          opacity: 0;
          z-index: -999;
        `};
`

export default class Popup extends React.Component {
  state = {
    isVisible: false
  }

  render() {
    const {
      children,
      style,
      innerStyle,
      className,
      idle: { text = "." }
    } = this.props
    const { isVisible } = this.state
    const attributes = {
      isVisible,
      ...(style && { style }),
      ...(className && { className })
    }
    const innerAttributes = {
      isVisible,
      onMouseLeave: () => this.setState({ isVisible: false }),
      ...(innerStyle && { style: innerStyle })
    }

    return (
      <Outer {...attributes}>
        <span onMouseEnter={() => this.setState({ isVisible: !isVisible })}>{text}</span>
        <PopupWindow {...innerAttributes}>{children}</PopupWindow>
      </Outer>
    )
  }
}
