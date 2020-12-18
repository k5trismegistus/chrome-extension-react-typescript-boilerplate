import { Bookmark } from '../types'

import React, { FC } from "react"
import "./BookmarkList.scss"

interface IBookmarkList {
  bookmarks: Array<Bookmark>
}

const BookmarkList: FC<IBookmarkList> = ({bookmarks}) => {

  return <div>
    {bookmarks.map((bm) => (
      <div key={bm.url.toString()}>
        <p>
          {bm.title}
        </p>
        <p>
          {bm.url.toString()}
        </p>
      </div>
    ))}
  </div>
}

export { BookmarkList }