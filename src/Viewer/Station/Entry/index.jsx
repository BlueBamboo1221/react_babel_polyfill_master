import React from "react"
import {
  Outer,
  Upper,
  Prefix,
  Title,
  Suffix,
  Details,
  PartLshFixed,
  PartMobile,
  PartPager,
  PartUrl,
  Description
} from "./styles"

/* eslint-disable no-restricted-globals */
const Entry = ({ pEntry, entryDescriptions, fnHandleEntryClick }) => {
  const {
    prefix,
    suffix,
    lshFixed,
    mobile,
    lshPager,
    smartLink,
    description,
    title,
    isInactive,
    bcColor,
    isClickable
  } = pEntry

  return (
    <Outer
      style={{ ...(bcColor && { backgroundColor: bcColor }) }}
      onClick={e => fnHandleEntryClick(e, pEntry)}
      isClickable={isClickable}
      entryDescriptions={entryDescriptions}
      hasDescription={description !== null}
    >
      <Upper>
        {prefix && <Prefix>{prefix}</Prefix>}
        <Title hasDescription={description !== null} entryDescriptions={entryDescriptions} isInactive={isInactive}>
          {title}
          {suffix && <Suffix>{suffix}</Suffix>}
        </Title>

        {!isInactive && (
          <Details>
            {lshFixed && <PartLshFixed>{lshFixed}</PartLshFixed>}
            {mobile && <PartMobile onClick={e => fnHandleEntryClick(e, pEntry, "mobile")}>{mobile}</PartMobile>}
            {lshPager && (
              <PartPager
                title={lshPager}
                onClick={e => {
                  fnHandleEntryClick(e, pEntry, "lshPager")
                }}
              >
                boð
              </PartPager>
            )}
            {smartLink && <PartUrl>{smartLink.label}</PartUrl>}
          </Details>
        )}
      </Upper>
      {description && <Description entryDescriptions={entryDescriptions}>{description}</Description>}
    </Outer>
  )
}
export default Entry
