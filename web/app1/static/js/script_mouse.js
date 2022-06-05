document.onclick = hideMenu;
    
$(".content").mouseout(function(){
    document.oncontextmenu = null;
})

$(".content").mouseover(function(){
    document.oncontextmenu = rightClick;
})
    
function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

var coordinates;
function rightClick(e) {
    e.preventDefault();

    if (document.getElementById("contextMenu").style.display == "block")
        hideMenu();
    else{
        coordinates = map.getCoordinateFromPixel([e.pageX, e.pageY-70]);
        var menu = document.getElementById("contextMenu")
        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY - 70 + "px";
    }
}
