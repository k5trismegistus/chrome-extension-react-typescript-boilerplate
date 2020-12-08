import React, { useEffect, useState } from "react"
import "./Popup.scss"

const Popup = ({currentUrl, currentTitle}) => {
  const [bookmarksCurrentHost, setBookmarksCurrentHost] = useState([])
  useEffect(() => {
    chrome.storage.sync.get([currentUrl.host], (result) => {
      setBookmarksCurrentHost(result[currentUrl.host])
    })

    chrome.runtime.sendMessage({ popupMounted: true })
  }, [])

  const addCurrentPage = () => {
    chrome.storage.sync.get([currentUrl.host], (result) => {
      const currentBookmark = result[currentUrl.host] ? result[currentUrl.host] : []
      currentBookmark.push({title: currentTitle, url: currentUrl.toString()})
      chrome.storage.sync.set({[currentUrl.host]: currentBookmark })
    })
  }

  return <div className="popupContainer">
    {bookmarksCurrentHost.map((bm) => (
      <div>
        <p>
          {bm.title}
        </p>
        <p>
          {bm.url}
        </p>
      </div>
    ))}

    <button onClick={() => addCurrentPage()}>Add current page</button>
  </div>
}

export default Popup