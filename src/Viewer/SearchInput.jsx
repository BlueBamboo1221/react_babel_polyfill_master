import React from "react"
import styled from "styled-components"

const InputSearch = styled.input.attrs({ type: "search" })`
  width: 6em;
`

export default class SearchInput extends React.Component {
  timer = null

  // load initial from querystring
  constructor() {
    super()
    const { search: locationSearch } = window.location
    const searches = locationSearch[0] === "?" ? locationSearch.substr(1).split("&") : null
    this.state = { text: searches ? searches.find(s => s.indexOf("text") === 0).split("=")[1] || "" : "" }
  }

  fnUpdate = async text => {
    clearTimeout(this.timer)
    await this.setState({ text })
    this.timer = setTimeout(this.triggerSearch, 500)
  }

  triggerSearch = () => {
    const { fnSetRootState } = this.props
    const { text } = this.state
    fnSetRootState({ search: { type: "DEFAULT", text } })
  }

  componentDidMount = () => {
    const { text } = this.state
    if (text.length > 0) this.triggerSearch()
  }

  render() {
    const { text } = this.state
    return (
      <div style={{ width: "8em", margin: "0 0.4em" }}>
        <InputSearch
          autoFocus
          tabIndex="-1"
          placeholder="leit"
          value={text}
          onChange={e => this.fnUpdate(e.target.value)}
        />
      </div>
    )
  }
}
