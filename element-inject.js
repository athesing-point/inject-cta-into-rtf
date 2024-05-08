document.addEventListener("DOMContentLoaded", function () {
  // Access the rich text field by its class
  var rtf = document.querySelector(".blog-rich-text");

  // Find the element by its ID
  var myElement = document.getElementById("injected-cta");

  // Ensure the element and the RTF exist
  if (myElement && rtf && rtf.children.length > 15) {
    // Move the element after the 15th child of the RTF
    rtf.children[14].insertAdjacentElement("afterend", myElement);
  } else if (rtf) {
    // If less than 15 elements, append it at the end
    rtf.appendChild(myElement);
  }
});
