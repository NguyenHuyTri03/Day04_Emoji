let canvas = document.getElementById("myCanvas");
let pr = canvas.getContext("2d");

function drawMid(){
    pr.beginPath();
    pr.moveTo(450, 0);
    pr.lineTo(450, 500);
    pr.stroke();

    pr.beginPath();
    pr.moveTo(0, 250);
    pr.lineTo(900, 250);
    pr.stroke();
}

function drawFace(x, y){
    pr.beginPath();
    pr.arc(x, y, 120, 0, 2 * Math.PI);
    pr.fillStyle = "#F7C64B";
    pr.fill();
}

function drawEye(x, y, size){
    pr.beginPath();
    pr.arc(x, y, size, 0, 2 * Math.PI);
    pr.fillStyle = "white";
    pr.fill();
}

function drawPupil(x, y){
    pr.beginPath();
    pr.arc(x, y, 10, 0, 2 * Math.PI);
    pr.fillStyle = "#634300";
    pr.fill();
}

function drawMouth(x, y, squrLen){
    let squrY = y + squrLen;

    pr.beginPath();
    pr.arc(x, y, 20, Math.PI, 2 * Math.PI);
    pr.fillStyle = "#634300";
    pr.fill();

    pr.beginPath();
    pr.rect(x - 20, y, 40, squrLen);
    pr.fillStyle = "#634300";
    pr.fill();

    pr.beginPath();
    pr.arc(x, squrY + 2, 16, Math.PI, 2 * Math.PI);
    pr.fillStyle = "#BB1D80";
    pr.strokeStyle = "#634300";
    pr.lineWidth = 3;
    pr.fill();
    pr.stroke();

    pr.beginPath();
    pr.arc(x, squrY - 1, 17, 0, Math.PI);
    pr.fillStyle = "#BB1D80";
    pr.strokeStyle = "#634300";
    pr.lineWidth = 6;
    pr.fill();
    pr.stroke();
}

function drawEmoji(len, pupilPos1, pupilPos2, eSize){
    drawFace(450, 250);
    drawEye(410, 215, eSize);
    drawEye(490, 215, eSize);
    drawPupil(pupilPos1, 215);
    drawPupil(pupilPos2, 215);
    drawMouth(450, 280, len);
}


let currTime = Date.now();
let mouthLen = 20;
let mouthY = 320;
let pPos1 = 410;
let pPos2 = 490;
let eSize = 25;
let mouthMove = 0;
let mouthMax = false;
let clicks = 0;
let eBig = false;

drawEmoji(20, 410, 490, 25);

canvas.addEventListener("click", function(){
    let timer;
    clicks++;
    
    if(clicks % 2 != 0){
        timer = setInterval(function(){
            console.log(eSize);
            if(mouthY <= 340 && mouthMax == false){
                drawEmoji(mouthLen, pPos1, pPos2, eSize);
                if(mouthY == 340){
                    mouthMax = true;
                }else{
                    if(mouthMove % 2 != 0){
                        mouthY++;
                        eSize++;
                        pPos1++;
                        pPos2++;
                        mouthLen++;
                    }else{
                        if(eSize <= 20){
                            mouthY++;
                            pPos1--;
                            pPos2--;
                            mouthLen++;
                        }else{
                            mouthY++;
                            eSize--;
                            pPos1--;
                            pPos2--;
                            mouthLen++;
                        }
                    }
                }
            }else if(mouthY >= 320 && mouthMax == true){
                drawEmoji(mouthLen, pPos1, pPos2, eSize);
                if(mouthY == 320){
                    mouthMax = false;
                    mouthMove++;
                }else{
                    if(mouthMove % 2 != 0){
                        if(eSize <= 20){
                            mouthY--;
                            pPos1--;
                            pPos2--;
                            mouthLen--;
                        }else{
                            mouthY--;
                            eSize--;
                            pPos1--;
                            pPos2--;
                            mouthLen--;
                        }
                    }else{
                        mouthY--;
                        eSize++;
                        pPos1++;
                        pPos2++;
                        mouthLen--;
                    }
                }
            }        
        }, 20);
    }else{
        for(let i = 0; i < 100; i++){
            window.clearInterval(i);
        }
        drawEmoji(mouthLen, pPos1, pPos2, eSize);
    }
});