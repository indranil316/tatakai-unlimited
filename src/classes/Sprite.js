/** @type {HTMLCanvasElement} */
const gravity = 0.7;

export default class Sprite{
    constructor({width, height,position, imageSrc},c,canvas){
        this.position = position;
        this.width=width;
        this.height = height;
        this.c=c;
        this.canvas=canvas;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw(){
        this.c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.draw();
    }
}