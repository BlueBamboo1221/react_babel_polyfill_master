import styled from "styled-components"

export const Ssn = styled.div`
  width: 8em;
`
export const AdminLevel = styled.div`
  width: 8em;
`
export const NameAndLogin = styled.div`
  width: 22em;
`

export const LastLogin = styled.span`
  margin-left: 0.5em;
  color: ${op => (op.latestLoginHours < 24 ? "ORANGE" : op.latestLoginHours < 3 * 24 ? "SLATEGRAY" : "LIGHTGRAY")};
`

export const EditorForStations = styled.div`
  flex: 0.9 0 0;
`

export const StationTitle = styled.span`
  &:not(:last-child):after {
    content: ",";
    margin-right: 0.3em;
  }
`
