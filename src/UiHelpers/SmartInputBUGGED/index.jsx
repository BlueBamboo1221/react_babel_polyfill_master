import React from "react"
import { createOuterAttributes, createInnerAttributes, OuterWithLabel, Label } from "../uiHelpersShared"

export default class SmartInputBUGGED extends React.PureComponent {
  handleChange = value => {
    const { fnHandle } = this.props
    fnHandle(value)
  }

  componentDidMount = () => {
    console.log("smartInputBUGGED/cDM")
  }

  componentWillUnmount = () => {
    console.log("smartInputBUGGED/cWU")
  }

  render() {
    // console.log("R/smartInput")
    const {
      style = {}, // on Outer
      className, // on Outer
      innerStyle = {}, // remember, width is set on outer (includes label)
      type: inputType = { kind: "TEXT" }, // {kind: TEXT|TEXTAREA|NUMBER|FLOAT}
      // for TEXTAREA: {nullDimension}
      placeholder,
      value,
      validation,
      label, // {text, kind (LEFT|TOP)}, default:LEFT
      disabled = false,
      title // hover
    } = this.props

    if (inputType.kind === "TEXTAREA") {
      const { nullDimension } = inputType
      // value => use default(max) if not set by innerStyle
      // no value => use default(min) if not set by innerStyle
      innerStyle.height = value ? innerStyle.height || "4em" : nullDimension ? nullDimension.height : "1em"
      style.width = value ? style.width || "100%" : nullDimension ? nullDimension.width : "8em"
      innerStyle.fontFamily = "inherit"
      innerStyle.transition = "width 200ms, height 200ms"
      innerStyle.resize = ""
    }

    const outerAttributes = {
      ...createOuterAttributes(style, className, label, title)
    }

    const innerAttributes = {
      ...createInnerAttributes(innerStyle, style, disabled),
      ...(inputType.kind !== "TEXTAREA" && { type: inputType.kind.toLowerCase() }),
      ...(placeholder && { placeholder }),
      onChange: e => this.handleChange(e.target.value),
      onClick: e => e.stopPropagation(), // !!
      value: value || ""
    }

    return (
      <OuterWithLabel {...outerAttributes}>
        {label && <Label>{label.text}</Label>}
        {inputType.kind === "TEXTAREA" ? <textarea {...innerAttributes} /> : <input {...innerAttributes} />}
      </OuterWithLabel>
    )
  }
}
