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

  // Check if the blog category contains "homeowner stories"
  var blogCategoryElement = document.querySelector(".blog-category-text");
  if (blogCategoryElement && blogCategoryElement.textContent.toLowerCase().includes("homeowner stories")) {
    myElement.style.display = "none";
    console.log("CTA hidden due to 'homeowner stories' category");
    return;
  }

  // Ensure the element and the RTF exist
  if (myElement && rtf) {
    var children = Array.from(rtf.children);

    // Find all pairs of adjacent H2 elements with content between them
    var h2Pairs = [];
    for (var i = 0; i < children.length - 1; i++) {
      if (children[i].tagName === "H2") {
        for (var j = i + 1; j < children.length; j++) {
          if (children[j].tagName === "H2") {
            // Check if there's substantial content between the H2s
            if (j - i > 2) {
              h2Pairs.push({ start: i, end: j });
            }
            break;
          }
        }
      }
    }

    var insertIndex = -1;
    var targetIndex = Math.floor(children.length * 0.33);

    // Find the H2 pair closest to 33% of the content, excluding the last pair
    if (h2Pairs.length > 1) {
      insertIndex = h2Pairs.slice(0, -1).reduce((closest, current) => {
        var currentMidpoint = (current.start + current.end) / 2;
        var closestMidpoint = (closest.start + closest.end) / 2;
        return Math.abs(currentMidpoint - targetIndex) < Math.abs(closestMidpoint - targetIndex) ? current : closest;
      }).end;
    }

    // If no suitable H2 pairs found, fall back to the 33% mark
    if (insertIndex === -1) {
      insertIndex = targetIndex;
    }

    // Create a wrapper for the CTA that resets styles
    var ctaWrapper = document.createElement("div");
    ctaWrapper.style.cssText = `
      all: initial;
      display: block;
      margin-top: 2em;
      margin-bottom: 2em;
    `;

    // Move the CTA into the wrapper
    ctaWrapper.appendChild(myElement);

    // Apply styles to the submit button
    var submitButton = myElement.querySelector('input[type="submit"]');
    if (submitButton) {
      submitButton.style.cssText = `
        font-family: Circular;
        font-size: inherit;
      `;
    }

    // Insert the wrapped CTA at the determined position
    children[insertIndex].insertAdjacentElement("beforebegin", ctaWrapper);

    console.log("Inserted 'injected-cta' between H2 elements with content or at 33% mark.");
  } else {
    console.error("Either the rich text field or the element to be injected is missing.");
  }
});
