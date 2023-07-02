import {customEvents, dialog} from '../constants';
import {Dialog} from '../classes'

export function determineGameResults(playerA, playerB){
    window.addEventListener(customEvents.gameOverText, ()=>{
        if(playerA.health<=0){
            Dialog.openDialog(dialog.enemyWin);
        }
        else if(playerB.health<=0){
            Dialog.openDialog(dialog.playerWin);
        }
        else{
            Dialog.openDialog(dialog.draw)
        }
        Dialog.restartButton.addEventListener('click',e=>{
            window.location.reload();
        })
    })
}


export function rectangularCollision({rect1,rect2}){
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    )
}