const domainInput = document.getElementById("domain");
const addDomainButton = document.getElementById("addDomain");
const domainList = document.getElementById("domainList");
const warningCornerSelect = document.getElementById("warningCorner");
const saveSettingsButton = document.getElementById("saveSettings");

// Utility function to validate domains
function isValidDomain(domain) {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

// Update the domain list in the popup
async function updateDomainList() {
  const { prodDomains = [] } = await chrome.storage.sync.get("prodDomains");
  domainList.innerHTML = "";
  prodDomains.forEach((domain, index) => {
    const li = document.createElement("li");
    li.textContent = domain;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", async () => {
      prodDomains.splice(index, 1);
      await chrome.storage.sync.set({ prodDomains });
      updateDomainList();
    });

    li.appendChild(removeButton);
    domainList.appendChild(li);
  });
}

// Save the user's corner selection
saveSettingsButton.addEventListener("click", async () => {
  const warningCorner = warningCornerSelect.value;
  await chrome.storage.sync.set({ warningCorner });
  alert("Settings saved!");
});

// Add a new domain if valid
addDomainButton.addEventListener("click", async () => {
  const domain = domainInput.value.trim();
  if (domain && isValidDomain(domain)) {
    const { prodDomains = [] } = await chrome.storage.sync.get("prodDomains");
    if (!prodDomains.includes(domain)) {
      prodDomains.push(domain);
      await chrome.storage.sync.set({ prodDomains });
      updateDomainList();
    }
    domainInput.value = "";
  } else {
    alert("Please enter a valid domain.");
  }
});

// Load settings on popup load
document.addEventListener("DOMContentLoaded", async () => {
  updateDomainList();

  // Restore the warning corner selection
  const { warningCorner = "bottom-right" } = await chrome.storage.sync.get(
    "warningCorner"
  );
  warningCornerSelect.value = warningCorner;
});
