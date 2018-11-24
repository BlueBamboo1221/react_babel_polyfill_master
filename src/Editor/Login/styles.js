import styled from "styled-components"

export const Outer = styled.div`
  margin: 0.5em auto;
  padding: 4px 2px;
  height: -webkit-fill-available;
  background-color: LIGHTGRAY;
`

export const Message = styled.div`
  background: ORANGE;
  color: white;
  font-size: 1.4em;
  font-weight: bold;
`

export const Title = styled.div`
  font-size: 4em;
  color: STEELBLUE;
`

export const WrapperLogin = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: center;
  font-size: 1.6em;
`

export const InputHandle = styled.input.attrs({ type: "text" })`
  font-size: inherit;
  color: DIMGRAY;
`

export const Error = styled.div`
  color: red;
  margin: 8px 0;
`
