async function addLog(url, title) {
  const result = await chrome.storage.local.get(["idx"]);
  const idx = (result.idx == null) ? 1 : ((result.idx) + 1);
  await chrome.storage.local.set({idx});
  return chrome.storage.local.set({["h-" + idx]: JSON.stringify({url, title})});
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.title) {
    if (tab.url) {
      addLog(tab.url, changeInfo.title);
    }
  }
});
