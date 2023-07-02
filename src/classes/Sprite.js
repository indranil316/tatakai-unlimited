/** @type {HTMLCanvasElement} */
const gravity = 0.7;

export default class Sprite{
    constructor({width,height,position, velocity, color = 'red',offset},c,canvas){
        this.position = position;
        this.velocity=velocity;
        this.width=width;
        this.height = height;
        this.c=c;
        this.canvas=canvas;
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
    draw(){
        this.c.fillStyle = this.color;
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
        if(this.isAttacking){
            this.c.fillStyle = 'blue';
            this.c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }    
    }
    update(){
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y >= this.canvas.height){
            this.velocity.y=0
        }
        else{
            this.velocity.y += gravity;
        }
        if(this.position.x + this.width + this.velocity.x >= this.canvas.width){
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