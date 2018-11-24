import React from "react"
import styled from "styled-components"

// margin-left to fake right-align
const Outer = styled.div`
  margin-left: auto;
  break-inside: avoid;
  flex-wrap: nowrap;
  overflow: hidden;
`

const SearchOuterTarget = styled.span`
  font-size: 1.1em;
  background: AZURE;
  border: 1px solid SILVER;
  padding: 1px 6px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 2px;
  transition: opacity 200ms;
  opacity: ${op => (op.searchIsActive ? 1 : 0.2)};
  &:hover {
    background: CYAN;
    opacity: 1;
  }
`
const SearchOuter = ({ search: { type, text }, fnSetRootState }) => {
  const searchIsActive = type === "DEFAULT" && text.length >= 3

  return (
    <Outer>
      {searchTargets.map(st => {
        const onClick = st.type ? () => fnSetRootState({ type: st.type, text }) : () => fnOpenSearchTarget(st, text)
        return (
          <SearchOuterTarget searchIsActive={searchIsActive} key={st.index} onClick={onClick}>
            {st.title}
          </SearchOuterTarget>
        )
      })}
    </Outer>
  )
}

export default SearchOuter

const fnOpenSearchTarget = ({ baseUrl, searchUrl, append = "", encode }, text) => {
  const rpUrl = text.length >= 3 ? searchUrl.replace("[Q]", encode ? escape(text) : text) : baseUrl
  window.open(`${rpUrl + append}`, "_blank").focus()
}

const searchTargets = [
  {
    index: 2,
    title: "LSH símaskrá",
    baseUrl: "http://160.210.225.10/cmgoffice/welcome.asp",
    searchUrl:
      "http://160.210.225.10/cmgoffice/common/newframes.asp?callingButton=FirstSearch&oldsearch=lname,[Q]|subject,|orgname,|",
    encode: true
  },
  {
    index: 4,
    title: "LSH vaktaskrá",
    baseUrl: "http://160.210.225.10/cmgoffice/common/newframes.asp?callingButton=IQ",
    searchUrl: "http://160.210.225.10/cmgoffice/IQ/searchres.asp?action=search&regid=9&searchtext=[Q]",
    encode: true
  },
  // {
  //   index: 6,
  //   title: "Gæðahandbók",
  //   baseUrl: null,
  //   type: "GAEDAHANDBOK"
  // },
  {
    index: 8,
    title: "ja.is",
    baseUrl: null,
    searchUrl: "https://ja.is/?q=[Q]",
    encode: true
  },
  {
    index: 10,
    title: "Sérlyfjaskrá",
    baseUrl: "https://www.serlyfjaskra.is",
    searchUrl: "https://serlyfjaskra.is/ShowResult.aspx?d=1&p=1&n=0&i=1&t=0&a=0&at=0&m=0&q=[Q]",
    encode: false,
    append: "*"
  },
  {
    index: 50,
    title: "Micromedex",
    baseUrl: null,
    searchUrl:
      "https://www.micromedexsolutions.com/micromedex2/librarian/CS/14D2CC/ND_PR/evidencexpert/ND_P/evidencexpert/DUPLICATIONSHIELDSYNC/58B88C/ND_PG/evidencexpert/ND_B/evidencexpert/ND_AppProduct/evidencexpert/ND_T/evidencexpert/PFActionId/evidencexpert.DoIntegratedSearch?SearchTerm=[Q]&UserSearchTerm=[Q]&SearchFilter=filterNone&navitem=searchGlobal",
    encode: false,
    append: ""
  },
  // {
  //   index: 12,
  //   title: "ICD (is)",
  //   baseUrl: null,
  //   searchUrl: "http://skafl.is/Main.htm?Search=[Q]",
  //   encode: false
  // },
  // {
  //   index: 14,
  //   title: "ICD (en)",
  //   baseUrl: null,
  //   searchUrl: "http://www.icd10data.com/search?s=[Q]",
  //   encode: false
  // },
  {
    index: 16,
    title: "Medscape",
    baseUrl: null,
    searchUrl: "http://search.medscape.com/search/?q=[Q]",
    encode: false,
    append: "*"
  },
  {
    index: 18,
    title: "Uptodate",
    baseUrl: "https://www.uptodate.com",
    searchUrl: "https://www.uptodate.com/contents/search?search=[Q]",
    encode: false,
    append: "*"
  },
  {
    index: 20,
    title: "FpNotebook",
    baseUrl: "https://fpnotebook.com/",
    searchUrl: "https://www.fpnotebook.com/fpnmvc/note/searchBs2013?qu=[Q]",
    encode: false
  }
]
