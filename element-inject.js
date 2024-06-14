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
    var children = Array.from(rtf.children);
    var sections = [];
    var currentSection = [];

    // Group elements into sections based on H2 tags
    children.forEach((child) => {
      if (child.tagName === "H2") {
        if (currentSection.length > 0) {
          sections.push(currentSection);
        }
        currentSection = [child];
      } else {
        currentSection.push(child);
      }
    });

    if (currentSection.length > 0) {
      sections.push(currentSection);
    }

    // Calculate the target section index (33% of the total sections)
    var targetSectionIndex = Math.floor(sections.length * 0.33);

    // Insert the element at the end of the target section
    var targetSection = sections[targetSectionIndex];
    var lastElementInSection = targetSection[targetSection.length - 1];

    // Find the last non-figure element in the section
    while (lastElementInSection && (lastElementInSection.tagName === "H2" || lastElementInSection.tagName === "FIGURE")) {
      targetSection.pop();
      lastElementInSection = targetSection[targetSection.length - 1];
    }

    // Insert the element after the last non-figure element
    if (lastElementInSection) {
      lastElementInSection.insertAdjacentElement("afterend", myElement);
    } else {
      // If all elements are H2 or FIGURE, insert at the beginning of the next section
      var nextSection = sections[targetSectionIndex + 1];
      if (nextSection) {
        // Find the first non-figure element in the next section
        var firstNonFigureElement = nextSection.find((el) => el.tagName !== "FIGURE");
        if (firstNonFigureElement) {
          firstNonFigureElement.insertAdjacentElement("beforebegin", myElement);
        } else {
          // If all elements in the next section are figures, append to the end of the RTF
          rtf.appendChild(myElement);
        }
      } else {
        // If there is no next section, append to the end of the RTF
        rtf.appendChild(myElement);
      }
    }

    // Hide any adjacent figure elements
    if (myElement.previousElementSibling && myElement.previousElementSibling.tagName === "FIGURE") {
      myElement.previousElementSibling.style.display = "none";
    }
    if (myElement.nextElementSibling && myElement.nextElementSibling.tagName === "FIGURE") {
      myElement.nextElementSibling.style.display = "none";
    }

    console.log(`Appended 'injected-cta' after section ${targetSectionIndex + 1}.`);
  } else {
    console.error("Either the rich text field or the element to be injected is missing.");
  }
});
