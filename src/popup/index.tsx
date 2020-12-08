import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Popup from './Popup'

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const currentTab = tabs[0]

    const url = new URL(currentTab.url)
    const title = currentTab.title

    ReactDOM.render(
        <Popup
            currentUrl={url}
            currentTitle={title}
        />
    , document.getElementById('popup'))
})
