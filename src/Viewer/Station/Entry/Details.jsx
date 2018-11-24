import React from "react"
import styled from "styled-components"

export default function Details(props) {
  const { entry, handleEntryClick } = props
  if (entry === null) return null
  return (
    <Outer>
      {entry.lshFixed && <PartLshFixed> {entry.lshFixed} </PartLshFixed>}
      {entry.other && <PartOther> {entry.other} </PartOther>}
      {entry.mobile && (
        <PartMobile onClick={event => handleEntryClick(event, entry.id, "mobile")}> {entry.mobile} </PartMobile>
      )}
      {entry.pager && (
        <PartPager
          title={entry.pager}
          onClick={event => {
            handleEntryClick(event, entry.id, "pager")
          }}
        >
          boð
        </PartPager>
      )}
      {entry.url && <PartUrl>...</PartUrl>}
    </Outer>
  )
}

const Details = styled.div`
  float: right;
  padding-right: 4px;
`

const PartLshFixed = styled.div`
  color: green;
  &::before {
    content: "543";
    color: rgba(110, 187, 110, 0.63);
  }
`
const PartOther = styled.span``
const PartMobile = styled.span``
const PartPager = styled.span``

const PartUrl = styled.span`
  color: white;
  background: rgba(99, 99, 152, 0.44);
  display: block;
  width: 18px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`
