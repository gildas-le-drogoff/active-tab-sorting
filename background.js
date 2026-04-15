"use strict";

let timeoutID = 0;
let dragging  = false;

chrome.tabs.onMoved.addListener(() => {
  dragging = true;
});

chrome.tabs.onDetached.addListener(() => {
  dragging = true;
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  dragging = false;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(async () => {
    if (dragging) return;

    try {
      const tab = await chrome.tabs.get(tabId);
      if (tab.pinned) return;

      const pinnedTabs = await chrome.tabs.query({
        pinned: true,
        windowId: tab.windowId,
      });

      const targetIndex = pinnedTabs.length;
      if (tab.index > targetIndex) {
        await chrome.tabs.move(tabId, { index: targetIndex });
      }
    } catch (error) {
      if (!error?.message?.includes("cannot be edited")) {
        console.error("Tab move failed:", error);
      }
    }
  }, 100);
});
