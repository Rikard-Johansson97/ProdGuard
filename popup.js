const domainInput = document.getElementById("domain");
const addDomainButton = document.getElementById("addDomain");
const domainList = document.getElementById("domainList");

function updateDomainList() {
  chrome.storage.sync.get(["prodDomains"], ({ prodDomains = [] }) => {
    domainList.innerHTML = "";
    prodDomains.forEach((domain, index) => {
      const li = document.createElement("li");
      li.textContent = domain;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        prodDomains.splice(index, 1);
        chrome.storage.sync.set({ prodDomains });
        updateDomainList();
      });
      li.appendChild(removeButton);
      domainList.appendChild(li);
    });
  });
}

addDomainButton.addEventListener("click", () => {
  const domain = domainInput.value.trim();
  if (domain) {
    chrome.storage.sync.get(["prodDomains"], ({ prodDomains = [] }) => {
      if (!prodDomains.includes(domain)) {
        prodDomains.push(domain);
        chrome.storage.sync.set({ prodDomains }, updateDomainList);
      }
    });
    domainInput.value = "";
  }
});

document.addEventListener("DOMContentLoaded", updateDomainList);
