import React from "react"
import { Provider } from "react-redux"

import createStore from "./createStore"

export default ({ element }) => {
  const store = createStore()
  return <Provider store={store}>{element}</Provider>
}