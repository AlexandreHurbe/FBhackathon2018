function toggleDp() {
  document.getElementById("line-icon").classList.toggle("rolling");
  document.getElementById("Dropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('#line-icon')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        document.getElementById("line-icon").classList.remove("rolling")
      }
    }
  }
}
