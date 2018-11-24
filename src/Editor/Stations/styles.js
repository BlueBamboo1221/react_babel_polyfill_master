import styled from "styled-components"
import { Outer as GlobalOuter, Row as GlobalRow } from "../../stylesGlobal"

export const Outer = styled(GlobalOuter)``

export const Row = styled(GlobalRow)`
  line-height: 2em;
`

export const Type = styled.div`
  width: 8em;
`

export const TitleAndLogin = styled.div`
  width: 28em;
`

export const Login = styled.div`
  display: inline-block;
  width: 5em;
  color: ${op => (op.lastUpdatedHours < 24 ? "ORANGE" : op.lastUpdatedHours < 3 * 24 ? "SLATEGRAY" : "LIGHTGRAY")};
`

export const Editors = styled.div`
  width: auto;
  font-size: 0.9em;
`

export const Editor = styled.span`
  &:not(:last-child):after {
    content: ",";
    margin-right: 0.3em;
  }
`
