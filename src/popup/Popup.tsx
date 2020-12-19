import { Bookmark } from '../types'

import React, { useEffect, useState, FC } from "react"
import "./Popup.scss"

import { BookmarkList } from '../components/BookmarkList'

import {
  fetchBookmarkDomain,
  fetchBookmarkByDomain,
  addBookmark,
  editBookmark,
  removeBookmark,
  isBookmarked,
} from '../utils/bookmarkUtils'

interface IPopup {
  currentTabUrl: URL,
  currentTabTitle: string,
}

const Popup: FC<IPopup> = ({currentTabUrl, currentTabTitle}) => {
  const [formTitle, setFormTitle] = useState(currentTabTitle)
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    (async () => {
      const currentDomainBookmarks = await fetchBookmarkByDomain(currentTabUrl.host)
      setBookmarks(currentDomainBookmarks)
    })()

    chrome.runtime.sendMessage({ popupMounted: true })
  }, [])
  const [isCurrentPageBookmarked, setIsCurrentPageBookmarked] = useState(false)
  useEffect(() => {
    (async () => {
      const bookmarked = await isBookmarked(currentTabUrl)
      console.log(bookmarked)
      setIsCurrentPageBookmarked(bookmarked)
    })
  })


  const addCurrentPage = async () => {
    const currentDomainBookmarks = await addBookmark(formTitle, currentTabUrl)
    setBookmarks(currentDomainBookmarks)
    setIsCurrentPageBookmarked(true)
  }

  const editCurrentPageBookmark = async () => {
    const currentDomainBookmarks = await editBookmark(formTitle, currentTabUrl)
    setBookmarks(currentDomainBookmarks)
  }

  const removeCurrentPageBookmark = async () => {
    const currentDomainBookmarks = await removeBookmark(currentTabUrl)
    setBookmarks(currentDomainBookmarks)
    setIsCurrentPageBookmarked(false)
  }

  const handleTitleEdit = (event) => (setFormTitle(event.target.value))

  return <div className="popupContainer">
    <BookmarkList
      bookmarks={bookmarks}
    />
    <input
      type="text"
      value={formTitle}
      onChange={handleTitleEdit}
    ></input>
    {
      isCurrentPageBookmarked
        ? <div>
            <button onClick={editCurrentPageBookmark}>Edit Bookmark title</button>
            <button onClick={removeCurrentPageBookmark}>Remove Bookmark</button>
          </div>
        : <div>
            <button onClick={addCurrentPage}>Add current page</button>
          </div>
    }

  </div>
}

export { Popup }