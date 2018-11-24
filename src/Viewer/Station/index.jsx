import React from "react"
import ReactDOM from "react-dom"
import Entry from "./Entry"
import { parseEntry } from "../helpers"
import {
  Outer,
  Categories,
  Category,
  CategoryHeader,
  Entries,
  StationInfo,
  StationInfoSection,
  UserName,
  DescriptionUrl
} from "./styles"

export default class Station extends React.Component {
  state = { stationData: null, countedNew: null, flagNew: false }

  // design: use re-render of data not mount/remount; possibly better performance
  // any update in parent will cause re-render but that is ok here since all root state changes affect station render
  // stationId & search create new derived state => no conditional check

  static getDerivedStateFromProps = ({ db, stationId, search }, { flagNew }) => {
    const { stationData, countedNew } = parseJson(db, stationId, search, flagNew)
    return { stationData, countedNew }
  }

  // TODO/3 Kit: span doesn't show if I add onClick?
  componentDidUpdate = () => {
    const { flagNew, countedNew } = this.state
    const Counter = () => <span onClick={() => this.setState({ flagNew: !flagNew })}>{countedNew}</span>
    ReactDOM.createPortal(<Counter />, document.querySelector("#counter"))
  }

  render() {
    const { fnHandleEntryClick } = this.props
    const { stationData } = this.state
    if (stationData === null) return null
    const { editors, lastUpdatedAt, entryDescriptions, description, url, categories } = stationData

    return (
      <Outer>
        {description && (
          <StationInfo>
            <StationInfoSection>
              <u>Seinast uppfært:</u> {lastUpdatedAt ? lastUpdatedAt.substr(0, 10) : "---"}
            </StationInfoSection>

            <StationInfoSection style={{ color: "SLATEGRAY", fontSize: "0.8em" }}>
              <u>Ritstjórar:</u>
              {editors.map(editor => (
                <UserName key={editor.ssn} onClick={() => top.openUserChatWindow(editor.ssn)}>
                  {editor.name}
                </UserName>
              ))}
            </StationInfoSection>

            <StationInfoSection>
              {description}
              {url && (
                <DescriptionUrl href={url} target="_blank" rel="noopener noreferrer">
                  sjá nánar
                </DescriptionUrl>
              )}
            </StationInfoSection>
          </StationInfo>
        )}

        <Categories>
          {categories.map(({ id: ct_Id, title: ct_Title, bcolor, fcolor, pEntries }) => (
            <Category key={ct_Id}>
              <CategoryHeader bcolor={bcolor} fcolor={fcolor}>
                {ct_Title}
              </CategoryHeader>
              <Entries>
                {pEntries.map(pEntry => (
                  <Entry
                    key={pEntry.id}
                    pEntry={pEntry}
                    fnHandleEntryClick={fnHandleEntryClick}
                    showEntryDescriptions={entryDescriptions === "FULL"}
                  />
                ))}
              </Entries>
            </Category>
          ))}
        </Categories>
      </Outer>
    )
  }
}

const parseJson = (db, stationId, { type: stType, text: stText }, flagNew) => {
  const { entries: jsEntries, stations: jsStations } = db
  const jsStation = jsStations.find(jsSt => jsSt.id === stationId)
  const rxFilter = stType === "DEFAULT" && stText.length >= 3 ? new RegExp(stText, "i") : null
  const starredCategory = {
    id: "starred",
    index: -1,
    bcolor: "YELLOW",
    fcolor: null,
    title: "Stjörnumerkt",
    pEntries: jsEntries.filter(jsE => jsE.starredIndex)
  }

  const stationData = {
    ...jsStation,
    categories: [].concat(
      starredCategory.pEntries.length > 0 ? starredCategory : [],
      jsStation.categories.map(jsCat => ({
        ...jsCat,
        pEntries: jsCat.entries
          .map(jsCE => parseEntry(jsEntries.find(jsE => jsE.id === jsCE.id), null, rxFilter, flagNew))
          .sort(({ title: t1 }, { title: t2 }) => t1.localeCompare(t2, "is", { ignorePunctuation: true }))
        // .sort((e1, e2) => (e1.title < e2.title ? -1 : e1.title > e2.title ? 1 : 0))
      }))
    )
  }
  return {
    stationData,
    countedNew: stationData.categories.reduce((tot, sdC) => {
      const countedCE = sdC.pEntries.filter(sdCpE => sdCpE.isNew).length
      return tot + countedCE
    }, 0)
  }
}
