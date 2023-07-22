/** @type {HTMLCanvasElement} */
import Sprite from "./Sprite";
import {canvas, c, WIDTH, HEIGHT} from '../state';
const gravity = 0.7;

export default class Fighter extends Sprite{
    constructor({
        width,
        height,
        position, 
        velocity, 
        color = 'red',
        offset = {x:0,y:0},
        imageSrc,
        scale = 1,
        framesMax = 1,
    }){
        super({
            imageSrc,
            scale,
            framesMax,
            position,
            width,
            height,
            offset
        });
        this.framesCurrent = 0;
        this.framesElasped = 0;
        this.framesHold = 8;
        this.velocity=velocity;
        this.lastKey=null;
        this.attackBox = {
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width : 100,
            height : 50
        }
        this.color=color;
        this.isAttacking = false;
        this.health=100;
    }

    update(){
        this.draw();
        this.animateFrames();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y=0
        }
        else{
            this.velocity.y += gravity;
        }
        if(this.position.x + this.width + this.velocity.x >= canvas.width){
            this.velocity.x=0
        }
    }
    attack(){
        this.isAttacking=true;
        setTimeout(()=>{
            this.isAttacking=false;
        },100)
    }
}