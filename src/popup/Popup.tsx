import React, { useEffect, useState } from "react"
import "./Popup.scss"

const Popup = ({currentTab}) => {
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true })
  }, [])

  return <div className="popupContainer">
    <p>
      {currentTab.title}
    </p>
    <p>
      {currentTab.url}
    </p>
  </div>
}

export default Popup