
export default class Dialog{
    static DOMElement = document.querySelector('.dialog');
    static restartButton = Dialog.DOMElement.querySelector('button.restart');
    static openDialog(text){
        Dialog.DOMElement.querySelector('.text').innerHTML = text;
        Dialog.DOMElement.style.display='flex';
    }
    static closeDialog(){
        Dialog.DOMElement.querySelector('.text').innerHTML = '';
        Dialog.DOMElement.style.display='none';
    }
}