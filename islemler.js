
content_check();

function content_check() {
  var queryString = window.location.search;
  console.log(queryString);
  var urlParams = new URLSearchParams(queryString);
  console.log(urlParams.length);
  if (queryString.length == 0) {
    includeHTML();
    posts();
  } else {
    var path = urlParams.get("q");
    console.log(path);
    var icerik = content(path);
    console.log(icerik);
    document.getElementById("posts").innerHTML += md_convert(icerik);
    includeHTML();
  }
}

function md_convert(icerik) {
    return marked(icerik);
}

function content(path) {
  var request = new XMLHttpRequest();
  request.open("GET", "../../blog-posts/file-data.json", false);
  request.send(null);
  var x = JSON.parse(request.responseText);
  var c = "";
  for (var i = 0; i < x.length; i++) {
    console.log(x[i].baslik);
    console.log(slug(x[i].baslik));
    if (slug(x[i].baslik) === path) {
      c = x[i].file_path;
      break;
    }
  }
  request.open("GET", "../../blog-posts/"+c, false);
  request.send(null);
  return request.responseText;
}

function posts() {
  var request = new XMLHttpRequest();
  request.open("GET", "../../blog-posts/file-data.json", false);
  request.send(null);
  var x = JSON.parse(request.responseText);
  for (var i = 0; i < x.length; i++) {
    document.getElementById("posts").innerHTML +=
      ' <ul class="list-group" >' +
      "<li class='item-list pb-2'>" +
      "<a href='index.html?q=" +
      slug(x[i].baslik) +
      "'>" +
      x[i].baslik +
      "</a>" +
      "</li>" +
      "</ul>";
  }
}

// HTML INCLUDE FONKSIYONU  kaynak = https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("html-include");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("html-include");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

// Kaynak https://www.youtube.com/watch?v=bL390wUGqes
function slug(str) {
  return str
    .toUpperCase()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}
