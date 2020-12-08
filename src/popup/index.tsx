import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Popup from './Popup'

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const currentTab = tabs[0]

    ReactDOM.render(<Popup currentTab={currentTab} />, document.getElementById('popup'))
})
