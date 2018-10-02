function search() {
  var input, filter, words, buttons, i;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  words = document.getElementById("words");
  buttons = words.getElementsByTagName("button");
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      buttons[i].style.display = "";
    } else {
      buttons[i].style.display = "none";
    }
  }
}
