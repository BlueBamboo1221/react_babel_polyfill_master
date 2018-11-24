import React from "react"
import styled from "styled-components"

const Outer = styled.div`
  break-inside: avoid;
`

const Result = styled.div`
  display: inline-block;
  width: 24em;
  padding: 0.1em 0.2em;
  margin: 0.1em 0.1em;
  background: BEIGE;
  color: MIDNIGHTBLUE;
`
// TODO/3 CORS
// TODO code is trying to load async data with different props, based on https://gist.github.com/bvaughn/982ab689a41097237f6e9860db7ca8d6
export default class SearchGaedahandbok extends React.Component {
  _currentText = null

  state = { results: null }

  static getDerivedStateFromProps(
    {
      search: { type: nP_type, text: nP_text }
    },
    { text: pS_Text }
  ) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (nP_text !== pS_Text) {
      return {
        results: null,
        prevText: nP_text
      }
    }
    return null
  }

  componentDidMount() {
    const { search } = this.props
    this._loadAsyncData(search)
  }

  componentDidUpdate(prevProps, { results: pS_results }) {
    const { search } = this.props
    if (pS_results === null) {
      this._loadAsyncData(search)
    }
  }

  componentWillUnmount() {
    // Prevent potential setState calls after unmount,
    // (Since these trigger DEV warnigs)
    this._currentText = null
  }

  async _loadAsyncData({ type, text }) {
    if (text === this._currentText) {
      // Data for this id is already loading
      return
    }
    if (type !== "GAEDAHANDBOK") return
    this._currentText = text
    const results =
      text >= 5
        ? await fetch(
            `http://heitur/focal/search/search.nsf/search?OpenAgent&q=${text}&max=20&fuzzy=true&sortby=score_i&sortby_desc=true&sources=C539479A26307DD10025828A00380C2B,082B8C9A372EEB6F0025828A00381531,55EE88578F3A11E20025828A00381532,EF3EEE2DE79D0FCB0025828A00381533,92EA48ED07D634C10025828A00381534,66850BCC4A97380F0025828A00381535,3932855B65AE790B0025828A00381536,7E46743FC229D1930025828A00381537,A87B956BE704DDDF0025828A00381538&_=1538321702018`,
            { mode: "no-cors" }
          )
        : []
    if (text === this._currentText && results.ok) {
      this.setState({ results })
    }
  }

  render() {
    const { results } = this.state
    if (results === null) return null
    return (
      <Outer>
        {results.map(res => (
          <Result key={res.id}>...</Result>
        ))}
      </Outer>
    )
  }
}
