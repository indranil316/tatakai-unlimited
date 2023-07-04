/** @type {HTMLCanvasElement} */
import {Fighter, Sprite} from "./classes";
import {customEvents} from './constants';
import {keys} from './state';
import {gameUtils,timer} from './utils';
import bgImage from './assets/images/background/bg2-moonlit-forest.jpg';

const canvas = document.querySelector('canvas#game');
const c = canvas.getContext('2d');

const WIDTH = canvas.width = window.innerWidth;
const HEIGHT = canvas.height = window.innerHeight;

const background = new Sprite({
    width:WIDTH,
    height:HEIGHT,
    position:{
        x:0,
        y:0
    },
    imageSrc:bgImage
},c,canvas)

const player = new Fighter({
    width:50,
    height:150,
    position:{
        x:100,
        y:HEIGHT-150
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    }
},c,canvas);


const enemy = new Fighter({
    width:50,
    height:150,
    position:{
        x:WIDTH-50-100,
        y:HEIGHT-150
    },
    velocity:{
        x:0,
        y:1
    },
    offset:{
        x:-50,
        y:0
    },
    color:'pink'
},c,canvas);



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
    background.update()
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

