function search(input) {
  var filter, words, buttons, i;
  filter = input.value.toUpperCase();
  words = document.getElementById("words");
  buttons = words.getElementsByTagName("button");
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      buttons[i].style.display = "";
    } else {
      buttons[i].style.display = "none";
      var content = buttons[i].nextElementSibling;
      if (content.style.maxHeight) {
        buttons[i].classList.toggle("active");
        content.style.maxHeight = null;
      }
    }
  }
}
