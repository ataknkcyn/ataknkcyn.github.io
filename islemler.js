var request = new XMLHttpRequest();
request.open("GET", "../../deneme.json",false)
request.send(null)

var x = JSON.parse(request.responseText)
mapping(x)


function mapping(array){
    for(var i=0; i<array.length; i++){
        document.getElementById("root").innerHTML +=
          "<h3>"+array[i].baslik+"</h3>" +
          "<div>"+ array[i].icerik+"</div>"
    }
}