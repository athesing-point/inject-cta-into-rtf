document.addEventListener("DOMContentLoaded", function () {
  // Access the rich text field by its class
  var rtf = document.querySelector(".blog-rich-text");
  if (!rtf) {
    console.error("Failed to find the rich text field with class '.blog-rich-text'");
  }

  // Find the element by its ID
  var myElement = document.getElementById("injected-cta");
  if (!myElement) {
    console.error("Failed to find the element with ID 'injected-cta'");
  }

  // Ensure the element and the RTF exist
  if (myElement && rtf) {
    if (rtf.children.length > 15) {
      // Move the element after the 15th child of the RTF
      rtf.children[14].insertAdjacentElement("afterend", myElement);
    } else {
      // If less than 15 elements, append it at the end
      rtf.appendChild(myElement);
      console.log("Appended 'injected-cta' at the end of the rich text field as it has less than 15 children.");
    }
  } else {
    console.error("Either the rich text field or the element to be injected is missing.");
  }
});
// document.addEventListener("DOMContentLoaded", function () {
//   // Access the rich text field by its class
//   var rtf = document.querySelector(".blog-rich-text");

//   // Find the element by its ID
//   var myElement = document.getElementById("injected-cta");

//   // Ensure the element and the RTF exist
//   if (myElement && rtf && rtf.children.length > 15) {
//     // Move the element after the 15th child of the RTF
//     rtf.children[14].insertAdjacentElement("afterend", myElement);
//   } else if (rtf) {
//     // If less than 15 elements, append it at the end
//     rtf.appendChild(myElement);
//   }
// });
