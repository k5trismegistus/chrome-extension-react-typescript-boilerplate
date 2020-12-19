import { Bookmark } from '../types'

const fetchBookmarkDomain = async (): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('domains', (result) => {
      const domains = result ? result : []
      resolve(domains.map((r) => (r.value)))
    })
  })
}

const fetchBookmarkByDomain = async (domain: string): Promise<Array<Bookmark>> => {
  const key = keyByDomain(domain)
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (result) => {
      const bms = result[key] ? result[key] : []
      resolve(bms.map((r) => ({ title: r.title, url: (new URL(r.url)) })))
    })
  })
}

const addBookmark = async (title: string, url: URL): Promise<Array<Bookmark>> => {
  const domain = url.host
  const key = keyByDomain(domain)

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      const bookmarks = result[key] ? result[key] : []
      bookmarks.push({title: title, url: url.toString()})

      chrome.storage.sync.set({[key]: bookmarks }, () => {
        resolve(bookmarks)
      })
    })
  })
}

const editBookmark = async (title: string, url: URL): Promise<Array<Bookmark>> => {
  const domain = url.host
  const key = keyByDomain(domain)

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      const bookmarks = result[key] ? result[key] : []
      const newBookmarks = bookmarks.map((bm) => {
        if (bm.url !== url.toString()) {
          return bm
        }
        return Object.assign({}, bm, { title })
      })

      chrome.storage.sync.set({[key]: newBookmarks }, () => {
        resolve(newBookmarks)
      })
    })
  })
}

const removeBookmark = async (url: URL): Promise<Array<Bookmark>> => {
  const domain = url.host
  const key = keyByDomain(domain)

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      const bookmarks = result[key] ? result[key] : []
      const newBookmarks = bookmarks.filter((bm) => (bm.url !== url.toString()))

      chrome.storage.sync.set({[key]: newBookmarks }, () => {
        resolve(newBookmarks)
      })
    })
  })
}

const isBookmarked = async (url: URL): Promise<boolean> => {
  const domain = url.host
  const key = keyByDomain(domain)

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      const bookmarks = result[key] ? result[key] : []
      const found = !!bookmarks.find((bm) => (bm.url === url.toString()))
      console.log(found)

      resolve(found)
    })
  })
}

const keyByDomain = (domain: string) => {
  return `bm_${domain}`
}

export {
  fetchBookmarkDomain,
  fetchBookmarkByDomain,
  addBookmark,
  isBookmarked,
  editBookmark,
  removeBookmark,
}