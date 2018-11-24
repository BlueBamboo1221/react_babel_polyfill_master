import React from "react"
import { createOuterAttributes, createInnerAttributes, OuterWithLabel, Label } from "../uiHelpersShared"

const SmartInput = ({
  style = {}, // on Outer
  className, // on Outer
  innerStyle = {}, // remember, width is set on outer (includes label)
  type: inputType, // {kind: TEXT|TEXTAREA|NUMBER|FLOAT}
  // for TEXTAREA: {nullDimension}
  placeholder,
  value,
  validation,
  label, // {text, kind (LEFT|TOP)}, default:LEFT
  disabled = false,
  title, // hover
  fnHandle
}) => {
  // console.log("smartInput/RENDER")
  const handleChange = v => {
    fnHandle(v)
  }

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
    onChange: e => handleChange(e.target.value),
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

export default SmartInput
