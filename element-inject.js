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

    // Find all pairs of adjacent H2 elements
    var h2Pairs = [];
    for (var i = 0; i < children.length - 1; i++) {
      if (children[i].tagName === "H2" && children[i + 1].tagName === "H2") {
        h2Pairs.push(i);
      }
    }

    var insertIndex = -1;
    var targetIndex = Math.floor(children.length * 0.33);

    // Find the H2 pair closest to 33% of the content
    if (h2Pairs.length > 0) {
      insertIndex = h2Pairs.reduce((closest, current) => {
        return Math.abs(current - targetIndex) < Math.abs(closest - targetIndex) ? current : closest;
      });
    }

    // If no H2 pairs found, fall back to the 33% mark
    if (insertIndex === -1) {
      insertIndex = targetIndex;
    } else {
      // Adjust insertIndex to be right before the second H2 of the pair
      insertIndex++;
    }

    // Create a wrapper for the CTA that resets styles
    var ctaWrapper = document.createElement("div");
    ctaWrapper.style.cssText = `
      all: initial;
      display: block;
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

    console.log("Inserted 'injected-cta' between H2 elements or at 33% mark.");
  } else {
    console.error("Either the rich text field or the element to be injected is missing.");
  }
});
