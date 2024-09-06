let rock = document.querySelector(".rockbtn");
let paper=document.querySelector(".paperbtn");
let scissor=document.querySelector(".scissorsbtn");
let res=document.querySelector(".result");
let sboard=document.querySelector('.score-board');
let reset=document.querySelector(".reset-score-btn");
let autobtn=document.querySelector(".auto-play-btn");

// Computer Move function

function ComputerMove()
{
    let cMove=Math.floor(Math.random()*3);
    return cMove;
}

function Scoreupdate()
{
    sboard.innerText=`Wins: ${win}, Losses: ${lose}, Ties: ${draw}`;
}

function resetbtn()
{
    reset.addEventListener('click',()=>
    {
      win=0;
      lose=0;
      draw=0;
      sboard.innerText=`Wins: ${win}, Losses: ${lose}, Ties: ${draw}`;
      res.innerText='';
      removefromlocalstorage();
    });
    
}

let draw=0;
let lose=0;
let win=0;

Scoreupdate();

function setlocalstorage()
{
   
        localStorage.setItem('win',JSON.stringify(win));
        localStorage.setItem('draw',JSON.stringify(draw));
        localStorage.setItem('lose',JSON.stringify(lose));

}

function loadfromlocalstorage()
{
    win=JSON.parse(localStorage.getItem('win'))||0;
    draw=JSON.parse(localStorage.getItem('draw'))||0;
    lose=JSON.parse(localStorage.getItem('lose'))||0;
    Scoreupdate();
}

function removefromlocalstorage()
{
    localStorage.removeItem('win');
    localStorage.removeItem('draw');
    localStorage.removeItem('lose');
    win=0;
    lose=0;
    draw=0;
}



function playerhandle(humanMove)
{
let Computer_Mo=ComputerMove();
if(humanMove===Computer_Mo)
{
    draw++;
    res.innerText='Game is Draw';
    
}
else if(humanMove==0&&Computer_Mo==2||humanMove===1&&Computer_Mo===0||humanMove===2&&Computer_Mo===1)
{
    win++;
    res.innerText='You Won';
    
}
else
{
    lose++;
    res.innerText='You Lose';
}
Scoreupdate();
setlocalstorage();
}

rock.addEventListener('click',()=>playerhandle(0));
paper.addEventListener('click',()=>playerhandle(1));
scissor.addEventListener('click',()=>playerhandle(2));

resetbtn();
let newpara=document.createElement('p');
autobtn.insertAdjacentElement('afterend',newpara);

let stopbutton = document.createElement('button');
stopbutton.innerText = 'Stop Button';
stopbutton.classList.add('stop-play-btn'); // Add existing class

newpara.append(stopbutton); // Insert the button after the auto-play button
let intervalId;

function stopbtnfunction()
{
    stopbutton.addEventListener('click',()=>
        {
         if(intervalId)
         {
           clearInterval(intervalId);
           intervalId=null;
           alert('You Stop the Game');
         }
        });
        
}

stopbtnfunction();

function autoPlay()
{
   
 autobtn.addEventListener('click',()=>
{
    intervalId=setInterval(()=>
        {
     let Machine1= ComputerMove();
     let Machine2=ComputerMove();

if(Machine2===Machine1)
{
    draw++;
    res.innerText='Game is Draw';
}
else if(Machine2===0&&Machine1===2||Machine2===1&&Machine1===0||Machine2===2&&Machine1===1)
{
    win++;
    res.innerText='You Won';
}
else if(Machine2===0&&Machine1===1||Machine2===1&&Machine1===2||Machine2===2&&Machine1===0)
{
    lose++;
    res.innerText='You Lose';
}

Scoreupdate();
setlocalstorage();
},1000);

});

}

autoPlay();

document.addEventListener('DOMContentLoaded',loadfromlocalstorage);