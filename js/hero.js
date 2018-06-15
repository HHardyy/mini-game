window.onload = function () {
    init();
}

function init() {
    barActive();
}

function barActive() {
    var ifRuning = false;
    var timer = null;
    var addNumber = 0;
    var step = 0;
    var cont=0;
    var onoff = true;
    var oBar = document.querySelectorAll('.bar')[0];
    var leftBox = document.querySelectorAll('.leftBox')[0];
    var oRightBox = document.querySelectorAll('.rightBox')[0];
    var oRightBox1 = document.querySelectorAll('.rightBox1')[0];
    var oHero = document.querySelectorAll('.hero')[0];
    var oContent = document.querySelectorAll('.content')[0];
    var contCount = document.querySelectorAll('.contCount')[0];
    var oF = null;
    var nextNew = [];
    oRightBox.style.left=creatNum(40, 260)+'px';
    oRightBox.style.width=creatNum(20, 40)+'px';
    oContent.addEventListener('mousedown', function () {
        if (ifRuning) {
            return 0;
        }
        clearInterval(timer);
        timer = setInterval(function () {
            addNumber += 2;
            oBar.style.width = addNumber + 'px';
        }, 20)
    });
    oContent.addEventListener('mouseup', function () {
        if (ifRuning) {
            return 0;
        }
        ifRuning=true;
        oF = oRightBox.offsetLeft;
        clearInterval(timer);
        oBar.style.transform = "rotate(0deg)";
        nextNew = nextDom();
        oRightBox1.style.width = nextNew[0] + 'px';
        oRightBox1.style.left = nextNew[1] + 'px';
        oBar.style.transition = "0.35s";
        if (addNumber < (oRightBox.offsetLeft - 20) || addNumber > (oRightBox.offsetLeft + oRightBox.offsetWidth - 20)) {
            onoff = false;
        } else {
            onoff = true;
        }
    });
    oBar.addEventListener('transitionend', function () {
        if (onoff) {
            oHero.style.transition = "0.35s";
            oHero.style.left = oRightBox.offsetLeft + "px";
        }else{
            oHero.style.left=oBar.offsetWidth+'px';
            setTimeout(function(){
                oHero.style.bottom=0;
            },1000);
            gameOver(cont);
        }
    })
    oHero.addEventListener('transitionend', function (ev) {
        oContent.style.transition = "1s";
        oContent.style.left = -oRightBox.offsetLeft + "px";
        step = 1;
        ev.stopPropagation();
    })
    oContent.addEventListener('transitionend', function () {
        if (step == 1) {
            oContent.style.left = 0;
            oContent.style.transition = "none";
            oHero.style.transition = "none";
            oHero.style.left = 0;
            oBar.style.transition = "none";
            oBar.style.transform = "rotate(-90deg)";
            oBar.style.width = "0px";

            leftBox.style.width = oRightBox.offsetWidth + 'px'
            oRightBox.style.width = nextNew[0] + 'px';
            oRightBox.style.left = (nextNew[1] - oF) + 'px';

            addNumber = 0;
            step = 0;
            ifRuning=false;
            cont+=1;
            contCount.innerHTML="当前分数："+cont;
        }
    })

    function nextDom() {
        var iWid = creatNum(20, 40);
        var iLef = creatNum(300, 260 + oF);
        return [iWid, iLef];
    }
}

//封装一个随机生成start-stop范围的数
function creatNum(start, end) {
    return parseInt(Math.random() * (end - start) + start);
}

function gameOver(num){
setTimeout(function(){
    var gameInfo = document.querySelectorAll('.gameInfo')[0];
    gameInfo.style.top=0;
    gameInfo.style.transition="0.35s";
    var oCont = document.querySelectorAll('.cont')[0];
    var aGain = document.querySelectorAll('.again')[0];
    oCont.innerHTML= "总分："+num;
    aGain.addEventListener('click',function(){
        window.location.reload()
    })
},1500)
}
