import FETCHJSONDATA from "./fetchData.graphql"

// type of entries: 1. jsEntry from JSON data 2. pEntry; parsed entry by fn below
export const parseEntry = (
  { id, title, altData, lastUpdatedAt, description, lshFixed, lshPager, mobile, inactivatesAt, smartLinks, house },
  insert = null,
  rxFilter = null,
  flagNew = null
) => {
  // 2 weeks = 336hours
  const isNew = new Date() - new Date(lastUpdatedAt) < 336 * 60000 * 60
  return {
    id,
    title: altData ? altData.title : title,
    lastUpdatedAt,
    description,
    lshFixed,
    lshPager,
    mobile,
    isNew,
    smartLink: smartLinks.length > 0 ? smartLinks[0] : null,
    isInactive: inactivatesAt ? new Date() - new Date(inactivatesAt) > 0 : false,
    isClickable: lshPager || mobile || smartLinks.length > 0,
    bcColor: rxFilter ? (rxFilter.test(title) ? "YELLOW" : null) : flagNew ? (isNew ? "LIGHTGREEN" : null) : null,
    ...(house && { suffix: house.shortcut }),
    ...(insert && { ...insert })
  }
}

export const requestData = async () => {
  // eslint-disable-next-line
  const fetchedData = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: FETCHJSONDATA })
  })
  return fetchedData.json()
}
