/** @type {HTMLCanvasElement} */
import {Fighter, Sprite} from "./classes";
import {customEvents} from './constants';
import {keys, canvas, c, WIDTH, HEIGHT} from './state';
import {gameUtils,timer} from './utils';
import oak_woods_v10 from "./assets/oak_woods_v1.0";
import fighter1 from "./assets/fighter1";
import fighter2 from "./assets/fighter2";


const bglayer1 = new Sprite({
    width:WIDTH,
    height:HEIGHT,
    position:{
        x:0,
        y:0
    },
    imageSrc:oak_woods_v10.background.Layer1
});
const bglayer2 = new Sprite({
    width:WIDTH,
    height:HEIGHT,
    position:{
        x:0,
        y:0
    },
    imageSrc:oak_woods_v10.background.Layer2
});
const bglayer3 = new Sprite({
    width:WIDTH,
    height:HEIGHT,
    position:{
        x:0,
        y:0
    },
    imageSrc:oak_woods_v10.background.Layer3
});

const shop = new Sprite({
    width:300,
    height:50,
    position:{
        x:window.innerWidth-650,
        y:window.innerHeight-600
    },
    scale:12,
    framesMax:6,
    imageSrc:oak_woods_v10.decorations.ShopAnim,
})

const bglayers = [bglayer1, bglayer2, bglayer3];

const player = new Fighter({
    width:500,
    height:100,
    position:{
        x:100,
        y:HEIGHT-200
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:100,
        y:508
    },
    imageSrc: fighter1.Idle,
    framesMax: 8,
    scale:10
});


const enemy = new Fighter({
    width:500,
    height:100,
    position:{
        x:WIDTH-1000-400,
        y:HEIGHT-200
    },
    velocity:{
        x:0,
        y:1
    },
    offset:{
        x:-200,
        y:408
    },
    offset:{
        x:100,
        y:508
    },
    imageSrc: fighter2.Idle,
    framesMax: 4,
    scale:10
});



window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    switch(key){
        case 'a':
            keys.a.pressed=true;
            player.lastKey='a';
            break;
        case 'd':
            keys.d.pressed=true;
            player.lastKey='d';
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case 'arrowleft':
            keys.arrowleft.pressed=true;
            enemy.lastKey='arrowleft';
            break;
        case 'arrowright':
            keys.arrowright.pressed=true;
            enemy.lastKey='arrowright';
            break;
        case 'arrowup':
            enemy.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;
        case 'arrowdown':
            enemy.attack();
            break;
    }
})

window.addEventListener('keyup', e => {
    const key = e.key.toLowerCase();
    switch(key){
        case 'a':
            keys.a.pressed=false;
            break;
        case 'd':
            keys.d.pressed=false;
            break;
        case 'arrowleft':
            keys.arrowleft.pressed=false;
            break;
        case 'arrowright':
            keys.arrowright.pressed=false;
            break;
    }
})

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle="black";
    c.fillRect(0,0,WIDTH,HEIGHT);
    bglayers.forEach(layer => layer.update());
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x=0;
    enemy.velocity.x=0;
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5;
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x=5;
    }
    if(keys.arrowleft.pressed && enemy.lastKey === 'arrowleft'){
        enemy.velocity.x = -5;
    }
    else if(keys.arrowright.pressed && enemy.lastKey === 'arrowright'){
        enemy.velocity.x=5;
    }

    //detect collision
    if(
        gameUtils.rectangularCollision({
            rect1:player,
            rect2:enemy
        }) &&
        player.isAttacking
    ){
        if(enemy.health>=0){
            enemy.health-=1;
        }
        if(enemy.health === 0){
            dispatchEvent(customEvents.gameOverEvent);
        }
        document.querySelector('.enemy-health .health').style.width=enemy.health + '%';
    }
    if(
        gameUtils.rectangularCollision({
            rect1:enemy,
            rect2:player
        }) &&
        enemy.isAttacking
    ){
        if(player.health>=0){
            player.health-=1;
        }
        if(player.health === 0){
            dispatchEvent(customEvents.gameOverEvent);
        }
        document.querySelector('.player-health .health').style.width=player.health + '%';
    }
}

animate();

timer.decreaseTimer();
gameUtils.determineGameResults(player,enemy);

