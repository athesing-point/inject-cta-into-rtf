document.addEventListener("DOMContentLoaded", function () {
  // Access the rich text field by its class
  var rtf = document.querySelector(".blog-rich-text");
  if (!rtf) {
    console.error("Failed to find the rich text field with class '.blog-rich-text'");
    return;
  }

  // Find the element by its ID
  var myElement = document.getElementById("injected-cta");
  if (!myElement) {
    console.error("Failed to find the element with ID 'injected-cta'");
    return;
  }

  // Ensure the element and the RTF exist
  if (myElement && rtf) {
    var totalChildren = rtf.children.length;
    var targetIndex = Math.floor(totalChildren * 0.33); // Calculate 33% index

    // Adjust targetIndex to avoid heading tags and ensure it's not in the middle of a section
    var currentSectionStart = -1;
    for (var i = 0; i < totalChildren; i++) {
      if (rtf.children[i].tagName === "H2") {
        if (i > targetIndex) {
          break;
        }
        currentSectionStart = i;
      }
    }

    // If targetIndex is within a section, move it to the end of the section
    if (currentSectionStart !== -1) {
      targetIndex = currentSectionStart;
      while (targetIndex < totalChildren && rtf.children[targetIndex].tagName !== "H2") {
        targetIndex++;
      }
    }

    if (totalChildren > 0 && targetIndex < totalChildren) {
      // Insert after calculated index
      rtf.children[targetIndex].insertAdjacentElement("afterend", myElement);
    } else {
      // If no children or targetIndex is out of bounds, append at the end
      rtf.appendChild(myElement);
    }
    console.log(`Appended 'injected-cta' after ${targetIndex} elements.`);
  } else {
    console.error("Either the rich text field or the element to be injected is missing.");
  }
});
