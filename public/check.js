function show() {
    var Check = document.getElementById('check')
    var Date = document.getElementById('date')
    if (Check.checked == true) {
        Date.style.display = "block";
    } else {
        Date.style.display = "none";
    }  
}