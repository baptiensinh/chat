function changeImage() {
    element = document.getElementById('love');
    if (element.src.match("out")) {
        element.src = "../images/like.png";
        //element.src = "../images/hearts.png";
    }
    else {
        element.src = "../images/hearts.png";
        //element.src = "../images/like.png";
    }
}
