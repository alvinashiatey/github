(function mouseCircle(){
    const mouse = document.querySelector("#cursor")
    window.addEventListener('mousemove', cursorM);

    function cursorM(e){
        mouse.style.top = e.pageY + 'px';
        mouse.style.left = e.pageX + 'px';
    };  
})();