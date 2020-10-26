const BASE_URL = "http://localhost:3000";
const CHARACTERS_URL = `${BASE_URL}/characters`;
const body = document.querySelector("body")
const modal = document.querySelector("#myModal")
const app = document.querySelector(".app")

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal.querySelector("form").remove()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("form").remove()
  }
}