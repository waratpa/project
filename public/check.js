var n = document.getElementById("sortn"),
    t = document.getElementById("sortt"),
    p = document.getElementById("sortp");

function show() {
    var Check = document.getElementById('check')
    var Date = document.getElementById('date')
    if (Check.checked == true) {
        Date.style.display = "block";
    } else {
        Date.style.display = "none";
    }  
}

function sortnone() {
    n.style.display = "block";
    t.style.display = "none";
    p.style.display = "none";
}

function sorttime() {
    n.style.display = "none";
    t.style.display = "block";
    p.style.display = "none";
}

function sortprice() {
    n.style.display = "none";
    t.style.display = "none";
    p.style.display = "block";
}