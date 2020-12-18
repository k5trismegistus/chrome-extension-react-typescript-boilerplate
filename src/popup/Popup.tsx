import { Bookmark } from '../types'

import React, { useEffect, useState, FC } from "react"
import "./Popup.scss"

import { BookmarkList } from '../components/BookmarkList'

import {
  fetchBookmarkDomain,
  fetchBookmarkByDomain,
  addBookmark,
} from '../utils/bookmarkUtils'

interface IPopup {
  currentTabUrl: URL,
  currentTabTitle: String,
}

const Popup: FC<IPopup> = ({currentTabUrl, currentTabTitle}) => {
  const [formTitle, setFormTitle] = useState(currentTabTitle)
  const [formUrl, setFormUrl] = useState(currentTabUrl)

  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    (async () => {
      const currentDomainBookmarks = await fetchBookmarkByDomain(currentTabUrl.host)
      setBookmarks(currentDomainBookmarks)
    })()

    chrome.runtime.sendMessage({ popupMounted: true })
  }, [])

  const addCurrentPage = async () => {
    const currentDomainBookmarks = await addBookmark(formTitle, formUrl)
    setBookmarks(currentDomainBookmarks)
  }

  return <div className="popupContainer">
    <BookmarkList
      bookmarks={bookmarks}
    />

    <button onClick={addCurrentPage}>Add current page</button>
  </div>
}

export { Popup }