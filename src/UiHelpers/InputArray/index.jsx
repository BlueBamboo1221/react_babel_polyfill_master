import React from "react"
import { createOuterAttributes, OuterWithLabel, Label } from "../uiHelpersShared"
import { InputField } from "./styles"

export default class InputArray extends React.Component {
  constructor(props) {
    super(props)
    const { dataValues } = this.props
    this.state = {
      values: dataValues.length === 0 ? [""] : [...dataValues, ""]
    }
  }

  fnReturnData = () => {
    const { values } = this.state
    const { fnHandle } = this.props
    fnHandle(values.slice(0, -1))
  }

  fnHandleChange = (targetIndex, newValue) => {
    const { values: cValues } = this.state
    const nValues = cValues.reduce(
      // 1. replace new value, immutable style
      // 2. if new value is empty, erase it
      (tot, value, index) => tot.concat(index === targetIndex ? (newValue === "" ? [] : newValue) : value),
      []
    )
    // last value in array is always empty
    const values = nValues.concat(nValues[nValues.length - 1].length > 0 ? "" : [])
    this.setState({ values })
  }

  render() {
    const {
      disabled = false,
      // maxValues = 99,
      style,
      className,
      title,
      label,
      inputWidth = "4em"
    } = this.props
    const { values } = this.state

    const outerAttributes = {
      ...createOuterAttributes(style, className, label, title)
    }

    return (
      <OuterWithLabel {...outerAttributes}>
        {label && <Label>{label.text}</Label>}
        {values.map((value, i) => (
          <InputField
            inputWidth={inputWidth}
            key={i}
            disabled={disabled}
            onChange={e => {
              this.fnHandleChange(i, e.target.value)
            }}
            onBlur={() => this.fnReturnData()}
            value={value}
          />
        ))}
      </OuterWithLabel>
    )
  }
}
