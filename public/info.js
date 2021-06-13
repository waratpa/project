let price   = document.getElementById("price"),
    num = document.getElementById("seatnum"),
    num2 = document.getElementById("seatnum2"),
    total = document.getElementById("total"),
    point = document.getElementById("point");
    rpoint = document.getElementById("rpoint");

var book  = document.getElementById("book"),
    box    = document.getElementById("bookbox");

function show() {
    document.getElementById("bookbox").classList.toggle("show");
}

function totalprice() {
    total.textContent = price.textContent * num.value;
    num2.textContent =  num.value;
    point.textContent = total.textContent / 10;
    rpoint.value = total.textContent / 10;
}