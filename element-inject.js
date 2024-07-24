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
    var midpoint = Math.floor(children.length / 2);

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

    // Insert the wrapped CTA after the midpoint element
    children[midpoint - 1].insertAdjacentElement("afterend", ctaWrapper);

    // Check if the element before the CTA is a heading
    var elementBeforeCTA = children[midpoint - 1];
    if (elementBeforeCTA.tagName.match(/^H[1-6]$/)) {
      // Move the heading below the CTA
      ctaWrapper.insertAdjacentElement("afterend", elementBeforeCTA);
      console.log("Moved heading below the CTA");

      // Find the last padding-small div inside the inline-cta-wrapper
      var paddingDivs = myElement.querySelectorAll(".inline-cta-wrapper .padding-small");
      if (paddingDivs.length > 0) {
        var lastPaddingDiv = paddingDivs[paddingDivs.length - 1];
        lastPaddingDiv.classList.add("hide");
        console.log("Added 'hide' class to the last padding-small div");
      }
    }

    console.log("Inserted 'injected-cta' in the middle of the rich text content.");
  } else {
    console.error("Either the rich text field or the element to be injected is missing.");
  }
});
