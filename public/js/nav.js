document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
      }
      // Muat daftar tautan menu
      document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
        elm.innerHTML = xhttp.responseText;
      });

      document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
        elm.addEventListener("click", function(event) {
          //   Tutup sidenav
          let sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  //   Load Page Content
  let page = window.location.hash.substr(1);
  let path = window.location.pathname.substr(1);

  // Load page content
  // var page = window.location.hash.substr(1);
  if ((page === "" && path === "") || (page === "#" && path === "")) page = "home";
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      let content = document.querySelector("#body-content");
      if (this.readyState === 4) {
        if (page === "home") {
          getKlasemen();
        }
        else if (page === "match") {
          getMatch();
        }
        else if (page === "favourite") {
          getData();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    if (path === "") {
      xhttp.open("GET", "pages/" + page + ".html", true);
      xhttp.send();
    }
  }
});