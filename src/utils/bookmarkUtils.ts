import { Bookmark } from '../types'

const fetchBookmarkDomain = async (): Promise<Array<String>> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('domains', (result) => {
      const domains = result.map((r) => (r.value))
      resolve(domains)
    })
  })
}

const fetchBookmarkByDomain = async (domain: String): Promise<Array<Bookmark>> => {
  const key = keyByDomain(domain)
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (result) => {
      console.log(result)
      const bms = result[key].map((r) => ({ title: r.title, url: (new URL(r.url)) }))
      resolve(bms)
    })
  })
}

const addBookmark = async (title: String, url: URL): Promise<Array<Bookmark>> => {
  const domain = url.host
  const key = keyByDomain(domain)

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([domain], (result) => {
      const bookmarks = result[domain] ? result[domain] : []
      bookmarks.push({title: title, url: url.toString()})

      chrome.storage.sync.set({[key]: bookmarks }, () => {
        resolve(bookmarks)
      })
    })
  })
}

const keyByDomain = (domain: String) => {
  return `bm_${domain}`
}

export {
  fetchBookmarkDomain,
  fetchBookmarkByDomain,
  addBookmark,
}