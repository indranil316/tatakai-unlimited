export const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    arrowleft:{
        pressed:false
    },
    arrowright:{
        pressed:false
    }
}

export const canvas = document.querySelector('canvas#game');
export const c = canvas.getContext('2d');

export const WIDTH = canvas.width = window.innerWidth;
export const HEIGHT = canvas.height = window.innerHeight;