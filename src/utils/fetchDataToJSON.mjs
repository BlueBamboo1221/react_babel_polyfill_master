import axios from "axios"
import fs from "fs"
import FETCHJSONDATA from "../Viewer/fetchData.graphql.mjs"

axios({
  url: "http://104.248.200.255:5000",
  method: "post",
  data: {
    query: FETCHJSONDATA
  }
}).then(result => {
  fs.writeFile("../Viewer/fetchedData.json", JSON.stringify(result.data), err => {
    console.log("err", err)
  })
})
