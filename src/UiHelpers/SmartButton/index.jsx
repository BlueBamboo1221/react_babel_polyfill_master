import React from "react"
import { Outer } from "./styles"

export default class SmartButton extends React.Component {
  constructor(props) {
    super(props)
    // confirmImpression: if set, clicking button will set new impression
    const { confirmImpression } = this.props
    this.state = {
      // `confirming` is truish, contains string for impression/kind
      confirming: confirmImpression ? false : null,
      disabled: props.disabled || false
    }
  }

  handleClick = (e, confirming) => {
    e.preventDefault()
    const { fnHandle, confirmImpression } = this.props

    // false means in stage 1/2 of confirm process
    if (confirming === false) {
      this.setState({ confirming: confirmImpression })
    } else {
      fnHandle()
      this.setState({ confirming: confirmImpression ? false : null })
    }
  }

  render() {
    const {
      children,
      style,
      className,
      title,
      keepTogether = false,
      type: { kind, impression = "selectable" }
    } = this.props
    const { confirming, disabled } = this.state

    // no Label, custom fn
    // NOTE title doesn't work if disabled (css:pointer-events)
    const outerAttributes = {
      ...style,
      ...className,
      ...title,
      keepTogether,
      disabled,
      impression: confirming || impression,
      kind,
      ...(!disabled && { onClick: e => this.handleClick(e, confirming) })
    }

    return <Outer {...outerAttributes}>{children}</Outer>
  }
}
