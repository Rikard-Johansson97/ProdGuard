chrome.storage.sync.get(
  ["prodDomains", "warningCorner"],
  ({ prodDomains = [], warningCorner = "top-right" }) => {
    const currentDomain = window.location.hostname;

    if (prodDomains.some((domain) => currentDomain.includes(domain))) {
      // Check if the warning box already exists to prevent duplicates
      if (!document.querySelector("#prodguard-warning-box")) {
        // Create the warning box
        const warningBox = document.createElement("div");
        warningBox.id = "prodguard-warning-box";
        warningBox.textContent = "⚠️ Production Website ⚠️";

        // Add styles to the warning box
        Object.assign(warningBox.style, {
          position: "fixed",
          zIndex: "999999", // Ensure it's always on top
          backgroundColor: "rgba(255, 0, 0, 0.9)", // Red background with slight transparency
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          cursor: "default",
          userSelect: "none",
          whiteSpace: "nowrap",
        });

        // Position the box based on the user's selected corner
        const cornerStyles = {
          "top-left": { top: "10px", left: "10px" },
          "top-right": { top: "10px", right: "10px" },
          "bottom-left": { bottom: "10px", left: "10px" },
          "bottom-right": { bottom: "10px", right: "10px" },
        };
        Object.assign(warningBox.style, cornerStyles[warningCorner]);

        // Add the warning box to the page
        document.body.appendChild(warningBox);
      }
    }
  }
);
