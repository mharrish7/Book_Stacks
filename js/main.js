var a1;
var a2;
var dx = 3;
var block;
var ground;
var blocklist = [];
var Col = ['red', 'green', 'blue', 'orange', 'brown', 'white', 'wheat', 'goldenrod', 'yellow', 'greenyellow', 'grey']
var score = 0;
var name;



const poup = new Audio('sounds/pop.wav')
const nlevl = new Audio('sounds/correct.wav');
const lost = new Audio('sounds/wrong.wav');
const newhigh = new Audio('sounds/next.wav');

document.querySelector('.but').addEventListener('click', function () {
    

    name = document.querySelector('#name').value;
    this.style.display = 'none';
    this.disabled = true;

    document.querySelector('#name').style.display = 'none';
    document.querySelector('#nameh').innerHTML = "Welcome " + name;
    spawn();


})

function setplat() {
    ground = document.createElement('div');
    ground.style.position = 'absolute';
    ground.style.backgroundColor = 'brown';
    ground.style.bottom = ""
}


function spawn() {
    block = document.createElement('div');
    block.style.height = "2rem";
    block.style.width = "10rem";
    block.style.position = "absolute";
    block.style.top = "15rem";
    block.style.left = Math.floor(Math.random()*40) + 1 + "rem";
    var ran = Math.floor(Math.random() * (Col.length));
    block.style.backgroundColor = Col[ran];
    document.querySelector('body').appendChild(block);
    a1 = setInterval(move, 10);
}

function move() {
    var left = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    block.style.left = left + dx + "px";
    if (left + dx <= 10) {
        dx = -dx;
    } else if (left + dx >= 1200) {
        dx = -dx;
    }
}

document.querySelector('.drop').addEventListener('click', function () {
    clearInterval(a1);
    a2 = setInterval(drop, 10);
})


function drop() {
    document.querySelector('.drop').disabled = true;
    var top = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
    var left = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    if (blocklist.length == 0) {
        var top2 = parseInt(window.getComputedStyle(document.querySelector('.ground')).getPropertyValue('top'));
    } else {
        var top2 = parseInt(window.getComputedStyle(blocklist[blocklist.length - 1]).getPropertyValue('top'));
        var left2 = parseInt(window.getComputedStyle(blocklist[blocklist.length - 1]).getPropertyValue('left'));
    }

    if (top < top2 - 32) {
        block.style.top = top + 3 + 'px';
    } else {
        if ((left >= left2 + 160 || left + 160 <= left2) && blocklist.length > 0 ) {
            console.log('gameover');
            console.log('s');
            document.querySelector('.drop').disabled = true;
            showl();
            clearInterval(a2);
            lost.play();
            return 0;
        }
        var ti = setInterval(moved, 62);
        setTimeout(function () {
            clearInterval(ti)
        }, 1000);
        clearInterval(a2);
        blocklist.push(block);
        score += 15;
        if(score > 50){
            dx = 2;
        }
        if(score > 100){
            dx = 4;
        }
        if(score > 200){
            dx  = 8;
        }
        document.querySelector('.score').innerHTML = "Score : " + String(score);
        document.querySelector('.drop').disabled = false;
        poup.play();
        spawn();



    }
}

function moved() {
    for (i of blocklist) {
        var t1 = parseInt(window.getComputedStyle(i).getPropertyValue('top'));
        i.style.top = t1 + 2 + "px";
        // var b1 = parseInt( window.getComputedStyle(i).getPropertyValue('bottom'));
        // if(b1 <= 10){
        //     i.style.display = 'none';
        // }

    }
    var bot2 = parseInt(window.getComputedStyle(document.querySelector('.ground')).getPropertyValue('bottom'));
    console.log(bot2);
    // if(bot2 <= 10){
    //     document.querySelector('.ground').style.display = 'none';
    // }
    var top2 = parseInt(window.getComputedStyle(document.querySelector('.ground')).getPropertyValue('top'));
    document.querySelector('.ground').style.top = top2 + 2 + "px";




}

var led = 0;

function showl() {
    document.querySelector('.drop').disabled = true;
    setTimeout(function () {
        if (led == 0) {
            var keys = Object.keys(localStorage);

            if (keys.includes(name)) {
                var value = parseInt(localStorage.getItem(name));
                if (score > value) {
                    localStorage.setItem(name, String(score));
                    
                    alert('new personal high score!')

                }
            } else {
                localStorage.setItem(name, String(score));
                
                alert('new personal high score!')


            }

            var keys = Object.keys(localStorage);
            var scorest = [];
            for (i of keys) {
                scorest.push([parseInt(localStorage.getItem(i)), i]);
            }

            function sortFunction(a, b) {
                if (a[0] === b[0]) {
                    return 0;
                } else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            }
            document.getElementById('lo').innerHTML = "";
            scorest.sort(sortFunction);
            scorest.reverse();
            if (score > scorest[0]) {
                alert('New highscore!');
            }
            console.log(scorest);
            for (i of scorest) {
                var li = document.createElement('li');
                var text = document.createTextNode(i[1] + "  -  " + String(i[0]));
                if (i[1] == name) {
                    li.style.backgroundColor = 'white';
                    li.style.color = '#250d3f';
                }

                li.appendChild(text);
                document.getElementById('lo').appendChild(li);

            }
            document.querySelector('#lead').style.display = 'block';
            led = 1;
        }
    }, 1000);
}


document.querySelector('.close').addEventListener('click',function(){
    location.reload();
})
