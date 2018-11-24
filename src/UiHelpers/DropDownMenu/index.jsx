import React from "react"
import { createOuterAttributes, OuterWithLabel, Label } from "../uiHelpersShared"
import { ButtonToggle, Options, Option } from "./styles"

export default class DropDownMenu extends React.Component {
  state = { isVisible: false }

  fnToggleVisibility = () => {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }

  handleClick = id => {
    const { options, multiple = false, fnHandle } = this.props
    if (multiple) {
      fnHandle(
        options.reduce(
          (tot, opt) => tot.concat(opt.id === id ? (opt.isSet ? [] : opt.id) : opt.isSet ? opt.id : []),
          []
        )
      )
    } else {
      fnHandle(id)
    }
  }

  render() {
    const {
      multiple = false,
      style, // on Outer
      className, // on Outer
      options, // array of {id,label,isSet}
      label, // {text, kind (LEFT|ABOVE)},
      disabled = false,
      title // multi: replaces count, single: displayed if no option selected
    } = this.props
    const { isVisible } = this.state
    const selected = options.filter(o => o.isSet)
    const displayTitle = multiple ? `${selected.length}` : selected.length === 1 ? selected[0].label : `${title}`

    const outerAttributes = {
      ...createOuterAttributes(style, className, label, title)
    }

    const buttonToggleAttributes = {
      disabled,
      ...(!disabled && { onClick: () => this.fnToggleVisibility() })
    }

    return (
      <OuterWithLabel {...outerAttributes}>
        {label && <Label>{label.text}</Label>}
        <ButtonToggle {...buttonToggleAttributes}>{displayTitle}</ButtonToggle>

        {isVisible && (
          <Options onMouseLeave={() => this.fnToggleVisibility()}>
            {options.map(({ id: o_id, label: o_label, isSet: o_isSet }) => (
              <Option key={o_id} isSet={o_isSet} onClick={() => this.handleClick(o_id)}>
                {o_label}
              </Option>
            ))}
          </Options>
        )}
      </OuterWithLabel>
    )
  }
}
