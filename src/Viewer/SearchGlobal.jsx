import React from "react"
import styled from "styled-components"
import { parseEntry } from "./helpers"
import Entry from "./Station/Entry"

const Outer = styled.div`
  max-height: 25vh;
  background: MOCCASIN;
  padding: 0 0.5em;
  column-width: 26em;
  column-gap: 1em;
  column-fill: balance;
  overflow: auto;
  border-bottom: 2px solid SILVER;
  padding: 0.5em 0.5em;
`

const Result = styled.div`
  padding: 0.2em 0.2em;
  margin: 0.2em 0.3em;
  background: BEIGE;
  color: MIDNIGHTBLUE;
  box-shadow: 2px 2px 0 SILVER;
  break-inside: avoid-column;
`

const StationTitle = styled.div`
  font-weight: bold;
`

const Entries = styled.div`
  background: WHITE;
`

// NOTE/later! we're not searching altTitle
const SearchGlobal = ({ db, stationId: excludeStationId, search: { type, text }, fnHandleEntryClick }) => {
  if (type !== "DEFAULT" || text.length < 4) return null
  const { entries: jsEntries, stations: jsStations } = db

  // filter down entries matching search
  const rxText = new RegExp(text, "i")
  const fjsEntries = jsEntries.reduce(
    (tot, jsE) =>
      tot.concat(
        rxText.test(jsE.title) ? parseEntry(jsE, { score: 1 }, null, null) : jsE.indexWords.some(iw => rxText.test(iw))
      ),
    []
  )
  const fjsEntries_Ids = fjsEntries.map(jsfE => jsfE.id)

  // filter stations having these entries categorized
  const fjsStations = jsStations.filter(
    jsS =>
      jsS.id !== excludeStationId &&
      jsS.categories.some(jsSC => jsSC.entries.some(jsSCE => fjsEntries_Ids.includes(jsSCE.id)))
  )

  const globalResults = fjsStations.map(fjsS => ({
    stationId: fjsS.id,
    title: fjsS.title,
    // get ids of Station:categorized Entries which are included in filtered Entries
    pEntries: fjsS.categories
      .reduce((tot, fjsSC) => {
        const fjsSCEs_id = fjsSC.entries.filter(fjsSCE => fjsEntries_Ids.includes(fjsSCE.id)).map(e => e.id)
        return tot.concat(
          fjsEntries.map(fjsE => ({ ...fjsE, prefix: fjsSC.title })).filter(fjsE => fjsSCEs_id.includes(fjsE.id))
        )
      }, [])
      .sort((e1, e2) => e1.score - e2.score)
  }))

  return (
    <Outer>
      {globalResults.map(({ stationId, title, pEntries }) => (
        <Result key={stationId}>
          <StationTitle>{title}</StationTitle>
          <Entries>
            {pEntries.map(pEntry => (
              <Entry key={pEntry.id} pEntry={pEntry} fnHandleEntryClick={fnHandleEntryClick} />
            ))}
          </Entries>
        </Result>
      ))}
    </Outer>
  )
}

export default SearchGlobal
