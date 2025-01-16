chrome.storage.sync.get(["prodDomains"], ({ prodDomains = [] }) => {
  const currentDomain = window.location.hostname;
  if (prodDomains.some((domain) => currentDomain.includes(domain))) {
    document.body.style.border = "10px solid red";
    const warning = document.createElement("div");
    warning.textContent = "⚠️ You are on a production website. Be careful! ⚠️";
    warning.style.position = "fixed";
    warning.style.top = "0";
    warning.style.left = "0";
    warning.style.width = "100%";
    warning.style.backgroundColor = "red";
    warning.style.color = "white";
    warning.style.fontSize = "20px";
    warning.style.fontWeight = "bold";
    warning.style.textAlign = "center";
    warning.style.zIndex = "9999";
    document.body.prepend(warning);
  }
});
