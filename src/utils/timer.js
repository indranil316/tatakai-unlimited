import {customEvents} from '../constants';

const initialTime = 90;
var time = initialTime;


var timer;
export function decreaseTimer(){
    timer = setTimeout(decreaseTimer,1000);
    if(time>0){
        time--;
        document.querySelector('.timer').innerHTML=time;
    }
    if(time===0){
        dispatchEvent(customEvents.gameOverEvent);
        clearTimeout(timer);
    }
}

function reset(){
    document.querySelector('.timer').innerHTML=initialTime;
}
reset()