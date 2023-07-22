/** @type {HTMLCanvasElement} */
import {canvas, c, WIDTH, HEIGHT} from '../state';

export default class Sprite{
    constructor({
        width, 
        height,
        position, 
        imageSrc, 
        scale=1, 
        framesMax = 1,
        offset = {x:0,y:0}
    }){
        this.position = position;
        this.width=width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale=scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElasped = 0;
        this.framesHold = 10;
        this.offset=offset;
    }
    draw(){
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.width / this.framesMax) * this.scale, 
            (this.height) * this.scale
        );
    }
    animateFrames(){
        this.framesElasped++;
        if(this.framesElasped % this.framesHold === 0 ){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent ++ ;
            }
            else{
                this.framesCurrent = 0;
            }
        }
    }
    update(){
        this.draw();
        this.animateFrames();
    }
}