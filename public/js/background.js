// background.js

chrome.action.onClicked.addListener(async (tab) => {
  const indexPageUrl = chrome.runtime.getURL("index.html");

  // 检查是否已经打开 index.html
  const tabs = await chrome.tabs.query({ url: indexPageUrl });
  if (tabs.length > 0) {
    // 如果已经打开，定位到该标签
    chrome.tabs.update(tabs[0].id, { active: true });
  } else {
    // 如果没有打开，打开 index.html 页面
    chrome.tabs.create({ url: indexPageUrl });
  }
});
