chrome.runtime.onInstalled.addListener(() => {
  console.log("ProdGuard installed and ready!");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    injectContentScript(tabId, tab.url);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    injectContentScript(activeInfo.tabId, tab.url);
  }
});

function injectContentScript(tabId, url) {
  chrome.storage.sync.get("prodDomains", ({ prodDomains = [] }) => {
    const domain = new URL(url).hostname;
    const isProduction = prodDomains.some((d) => domain.includes(d));
    if (isProduction) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });
    }
  });
}
