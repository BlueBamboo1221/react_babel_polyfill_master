import React from "react"
import { graphql } from "react-apollo"
import { getShortDateTimeString, getInitials } from "../../../helpersGlobal"
import { apolloClient } from "../../../apollo"
import { SmartInput, DropDownMenu, SmartButton, Popup } from "../../../UiHelpers"
import InputArray from "../../../UiHelpers/InputArray"
import { LOADER, UPDATE } from "./graphql"
import { Outer, AreaTop, AreaTopLeft, AreaTopCenter, AreaTopRight, AreaBottom, StationTitle } from "./styles"

// TODO/1 validation and unique check on numbers+url
// TODO/1 disable DnD (change category) while editing Entry
class EditEntry extends React.Component {
  state = {
    entryId: null,
    inactivatesAt: null,
    expiresAt: null,
    starredIndex: null,
    title: null,
    description: null,
    indexWords: null,
    smartLinks: null,
    mobile: null,
    lshFixed: null,
    lshPager: null,
    altTitle: null,
    optionsStationOwner: null
  }

  static getDerivedStateFromProps = (
    { editEntryId, data: { loading, editEntry, allStations } },
    { entryId: ps_EntryId }
  ) => {
    if (ps_EntryId === editEntryId || loading) return null
    const {
      id: entryId,
      stationOwner: { id: stationOwnerId },
      inactivatesAt,
      expiresAt,
      starredIndex,
      title,
      description,
      indexWords = [],
      mobile,
      lshFixed,
      lshPager,
      altData
    } = editEntry
    const smartLinks =
      editEntry.smartLinks.length === 0
        ? [
            {
              id: `${Math.random() // notice length=5 to indicate frontend created id
                .toString(36)
                .substr(2, 5)}`,
              type: "URL",
              link: "",
              label: ""
            }
          ]
        : editEntry.smartLinks

    return {
      entryId,
      inactivatesAt,
      expiresAt,
      starredIndex,
      title,
      description,
      indexWords,
      smartLinks: smartLinks.map(sl => ({
        id: sl.id,
        optTypes: optSmartLinkTypes(sl.type),
        link: sl.link,
        optLabels: optSmartLinkLabels(sl.label)
      })),
      mobile,
      lshFixed,
      lshPager,
      altTitle: altData ? altData.title : null,
      optionsStationOwner: allStations.map(as => ({
        id: as.id,
        label: as.title,
        isSet: stationOwnerId === as.id
      }))
    }
  }

  handleUpdate = (key, value) => {
    const {
      data: { allStations }
    } = this.props
    this.setState({
      [key]: value,
      ...(key === "stationOwner" && {
        optionsStationOwner: allStations.map(as => ({ id: as.id, label: as.title, isSet: value === as.id }))
      })
    })
  }

  // key: type/link/label
  handleUpdateSmartLink = (smartLinkId, key, value) => {
    const { smartLinks } = this.state
    // parse smLink for known content in url to set appropriate label
    const syncLabel =
      key === "link" ? smartLinkLabels.map(sll => (sll.rx.test(value) ? sll.id : null)).find(iD => iD) : null
    this.setState({
      smartLinks: smartLinks.map(
        sl =>
          sl.id === smartLinkId
            ? {
                ...sl,
                ...(key === "link" && {
                  link: value,
                  ...(syncLabel !== undefined && { optLabels: optSmartLinkLabels(syncLabel) })
                }),
                ...(key === "type" && { ...sl, optTypes: optSmartLinkTypes(value) }),
                ...(key === "label" && { ...sl, optLabels: optSmartLinkLabels(value) })
              }
            : sl
      )
    })
  }

  persistState = () => {
    const {
      editStationId,
      fnSetStationState,
      data: {
        editEntry: { inCategories }
      }
    } = this.props

    const {
      entryId,
      starredIndex,
      inactivatesAt,
      expiresAt,
      title,
      indexWords,
      description,
      smartLinks,
      mobile,
      lshFixed,
      lshPager,
      altTitle,
      optionsStationOwner
    } = this.state

    fnSetStationState({ editEntryId: null })
    apolloClient.mutate({
      mutation: UPDATE,
      variables: {
        entryId,
        starredIndex,
        // dates are ISO formatted
        inactivatesAt,
        expiresAt,
        title,
        description,
        indexWords,
        smartLinks: smartLinks.reduce(
          (tot, sl) =>
            tot.concat(
              sl.link.length > 0
                ? {
                    id: sl.id,
                    link: sl.link,
                    type: sl.optTypes.find(ot => ot.isSet).id,
                    label: sl.optLabels.find(ol => ol.isSet).id
                  }
                : []
            ),
          []
        ), // [] if link is empty
        mobile,
        lshFixed,
        lshPager,
        stationOwnerId: optionsStationOwner.find(so => so.isSet).id,
        altTitle,
        stationCategoryId: getStationCategoryIdForEntry(inCategories, editStationId) || null
      }
    })
  }

  render() {
    const {
      entryId,
      inactivatesAt,
      expiresAt,
      starredIndex,
      title,
      description,
      indexWords,
      smartLinks,
      mobile,
      lshFixed,
      lshPager,
      altTitle,
      optionsStationOwner
    } = this.state
    if (entryId === null) return <Outer loading />

    const {
      editStationId,
      userAdminLevel,
      userIsEditorForStation,
      fnDeleteEntry,
      fnSetStationState,
      data: {
        editEntry: {
          inCategories,
          createdAt,
          lastUpdatedAt,
          lastUpdatedHours = Math.floor((new Date() - new Date(lastUpdatedAt || createdAt)) / 60 / 60e3),
          lastUpdatedBy
        }
      }
    } = this.props
    const isEntryOwnedByStation = optionsStationOwner.find(so => so.isSet).id === editStationId
    const userCanEditEntry = userIsEditorForStation && isEntryOwnedByStation
    const usedInStations = inCategories.reduce(
      (tot, category) => tot.concat(category.stations.map(station => ({ st_Id: station.id, st_Title: station.title }))),
      []
    )

    return (
      <Outer userCanEditEntry={userCanEditEntry} hasAdminEditAccess={!userIsEditorForStation && userAdminLevel >= 1}>
        <AreaTop>
          <AreaTopLeft>
            <SmartInput
              type={{ kind: "TEXT" }}
              label={{ text: "titill" }}
              innerStyle={{ fontWeight: "bold" }}
              value={title}
              fnHandle={v => this.handleUpdate("title", v)}
            />

            <SmartInput
              type={{ kind: "TEXTAREA", nullDimension: { height: "1.2em" } }}
              label={{ kind: "TOP", text: "lýsing" }}
              value={description}
              fnHandle={v => this.handleUpdate("description", v)}
            />

            {getStationCategoryIdForEntry(inCategories, editStationId) && (
              <SmartInput
                type={{ kind: "TEXT" }}
                label={{ text: "titill #2" }}
                value={altTitle}
                fnHandle={v => this.handleUpdate("altTitle", v)}
              />
            )}
          </AreaTopLeft>

          <AreaTopCenter>
            <DropDownMenu
              disabled={!userAdminLevel >= 1}
              options={optionsStationOwner}
              label={{ text: "eigandi" }}
              fnHandle={v => this.handleUpdate("stationOwner", v)}
            />

            <div>
              <SmartInput
                type={{ kind: "TEXT" }}
                style={{ width: "8em" }}
                label={{ text: "farsími" }}
                value={mobile}
                fnHandle={v => this.handleUpdate("mobile", v)}
              />
              <SmartInput
                type={{ kind: "TEXT" }}
                style={{ width: "7em" }}
                label={{ text: "borðsími" }}
                value={lshFixed}
                fnHandle={v => this.handleUpdate("lshFixed", v)}
              />
              <SmartInput
                type={{ kind: "TEXT" }}
                style={{ width: "7em" }}
                label={{ text: "boðtæki" }}
                value={lshPager}
                fnHandle={v => this.handleUpdate("lshPager", v)}
              />
            </div>

            {smartLinks.map(({ id, optTypes, link, optLabels }) => (
              <div key={id}>
                <span>smellivirkni</span>
                <DropDownMenu
                  style={{ width: "auto" }}
                  options={optTypes}
                  fnHandle={v => this.handleUpdateSmartLink(id, "type", v)}
                />
                <SmartInput
                  type={{ kind: "TEXT" }}
                  style={{ width: "30em" }}
                  value={link}
                  fnHandle={v => this.handleUpdateSmartLink(id, "link", v)}
                />
                <SmartButton
                  key={entryId}
                  style={{ width: "1em" }}
                  type={{ kind: "2", impression: "selectable" }}
                  fnHandle={() => window.open(link, "_blank")}
                >
                  P
                </SmartButton>
                <DropDownMenu
                  disabled={link.length === 0}
                  style={{ width: "10em" }}
                  options={optLabels}
                  fnHandle={v => this.handleUpdateSmartLink(id, "label", v)}
                />
              </div>
            ))}

            <div>
              <InputArray
                key={entryId}
                label={{ text: "leitarorð" }}
                dataValues={indexWords}
                fnHandle={v => this.handleUpdate("indexWords", v)}
              />
            </div>
          </AreaTopCenter>

          <AreaTopRight>
            <div>
              <Popup
                idle={{
                  text: `${getInitials(lastUpdatedBy ? lastUpdatedBy.name : null)}:${getShortDateTimeString(
                    lastUpdatedHours
                  )}`
                }}
              >
                {`stofnaður: ${createdAt.substr(0, 10)}, uppfærður ${
                  lastUpdatedAt ? lastUpdatedAt.substr(0, 10) : "?"
                }, af ${lastUpdatedBy ? lastUpdatedBy.name : "?"}`}
              </Popup>

              <Popup
                innerStyle={{ right: 0, marginLeft: "auto" }}
                idle={{ text: `${usedInStations.length} birtingar` }}
              >
                {usedInStations.map(({ st_Id, st_Title }) => (
                  <StationTitle key={st_Id} router={{ to: `/station/${st_Id}` }}>
                    {st_Title}
                  </StationTitle>
                ))}
              </Popup>
              {userAdminLevel === 2 && (
                <SmartInput
                  type={{ kind: "NUMBER" }}
                  style={{ width: "2em" }}
                  placeholder="*"
                  value={starredIndex}
                  fnHandle={v => this.handleUpdate("starredIndex", v)}
                />
              )}
            </div>
            <div>
              <SmartInput
                type={{ kind: "DATE" }}
                label={{ text: "óvirkur" }}
                value={convertISOtoInputFormat(inactivatesAt)}
                fnHandle={v => this.handleUpdate("inactivatesAt", convertInputFormatToISO(v))}
              />
              <SmartInput
                type={{ kind: "DATE" }}
                label={{ text: "falinn" }}
                value={convertISOtoInputFormat(expiresAt)}
                fnHandle={v => this.handleUpdate("expiresAt", convertInputFormatToISO(v))}
              />
            </div>
          </AreaTopRight>
        </AreaTop>

        <AreaBottom>
          <SmartButton
            key={entryId}
            type={{ kind: "2", impression: "actionable" }}
            confirmImpression="alert"
            disabled={!userCanEditEntry || usedInStations.length > 0}
            fnHandle={() => fnDeleteEntry()}
          >
            eyða
          </SmartButton>

          <SmartButton type={{ kind: "2", impression: "actionable" }} fnHandle={() => this.persistState()}>
            vista
          </SmartButton>

          <SmartButton
            type={{ kind: "2", impression: "actionable" }}
            fnHandle={() => fnSetStationState({ editEntryId: null })}
          >
            hætta við
          </SmartButton>
        </AreaBottom>
      </Outer>
    )
  }
}

export default graphql(LOADER, {
  options: op => ({
    variables: {
      entryId: op.editEntryId
    }
  })
})(EditEntry)

const convertISOtoInputFormat = isoDate => {
  const split = (isoDate || "").split("T")[0].split("-") // 2018-09-03T00:00:00.000Z
  return isoDate !== null ? `${split[0]}-${split[1]}-${split[2]}` : ""
}

const convertInputFormatToISO = inputDate => (inputDate ? new Date(inputDate).toISOString() : null)

// is categoryId if entry is categorized in station, else undefined
// NOTE assumes Entry is in 1x Category only within Station (UI/DnD prevents)
const getStationCategoryIdForEntry = (inCategories, editStationId) =>
  (inCategories.find(category => category.stations.some(station => station.id === editStationId)) || {}).id

// !id is used as label on viewer
const smartLinkLabels = [
  { id: "", label: "", rx: /^$/ }, // empty string
  { id: "N", label: "N(etwise)", rx: /160.210.225.10/ },
  { id: "G", label: "G(æðahandbók)", rx: /(gaedahandbaekur|brunnur)/i },
  { id: "U", label: "U(pplýsingar)", rx: /(drive.google|docs.google|\.pdf)/ },
  { id: "V", label: "V(ideo)", rx: /(youtube|vimeo)/ },
  { id: "...", label: "... (annað)", rx: /[^\s]*/ } // all else, except empty string
]
const optSmartLinkLabels = id => smartLinkLabels.map(sll => ({ ...sll, isSet: sll.id === id }))

const smartLinkTypes = [
  { id: "URL", label: "Url" },
  { id: "HGCHAT", label: "Spjall" },
  { id: "STATION", label: "Starfsstöð" }
]
const optSmartLinkTypes = id => smartLinkTypes.map(slt => ({ ...slt, isSet: slt.id === id }))
