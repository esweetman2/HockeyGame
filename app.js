const puck = document.querySelector('.puck');
const goals = document.querySelectorAll('.goal');
let timeUp = false;
const lane = document.querySelectorAll('.lane');
let score = document.querySelector('.score-board h4');
let puckShot = document.querySelector('.puck-shot');

let lastNet;
let scoreOfRound = 0;


document.querySelector('.start-game').addEventListener('click',function(){
    countDown();
    document.querySelector('.score-board').style.display = "block";
    document.querySelector('.instructions').style.display = "none";
    document.querySelector('.give-score').style.display = "none";
    setTimeout(() => startGame(), 4000);
    document.querySelector('.start-game').style.display = 'none';
});

puck.addEventListener('dragstart', dragStart);
puck.addEventListener('dragend', dragEnd);

lane.forEach(function (item) {
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragover', dragOver);
});



function dragStart() {
    setTimeout(() => this.className = 'invisible', 0);
    
}
function dragEnd() {
    this.className = 'puck';

    shoot();
    puckPlace();

}
function dragEnter() {
    this.appendChild(puck);
}
function dragOver(e) {
    e.preventDefault;
}

function shoot() {
    puck.className = 'puck-shot';
    setTimeout(() => puck.className = 'puck', 300);
};



function randomNet(item){
    let ranNet = Math.floor(Math.random() * goals.length)
       let net = item[ranNet];
       if(lastNet === net){
           return randomNet(item);
       }
       lastNet = net
    return net;
}






function showNet(){
    let net = randomNet(goals);

    let time = 1000;
    net.style.display = 'block';
        setTimeout(function(){
            net.style.display = 'none';
            if(!timeUp){
             showNet() 
            }
         }, time); 

}

function startGame(){
    points = 0;

    score.textContent = points;
    timeUp = false;
    showNet();
    setTimeout(() => timeUp = true, 10000); 
    setTimeout(() => document.querySelector('.start-game').style.display = 'block' , 10500); 
    setTimeout(() => document.querySelector('.give-score').style.display = "block" , 10500); 
    setTimeout(() => document.querySelector('.give-score .score-display').innerHTML = "Your Score was: "+  points, 10500);
   
}

let points;
function puckPlace(){
        for(let i = 0; i< goals.length; i++){
            if (puck.className === 'puck-shot' && goals[i].style.display === 'block' && puck.parentElement === goals[i].parentElement){
                points = points + 1;
                score.textContent = points;
            }
           
        } 

}





//COUNTDOWN

let countStart = document.querySelector(".overlay p");
let overlay = document.querySelector(".overlay");

let count = countStart.textContent;
function countDown(){
    overlay.style.display = 'block';
    if(count > 0){
        countStart.textContent = count;
        count--;
        setTimeout(countDown, 800);                     
    }else{
        overlay.style.display = "none";
        count= 3;       
    }
}




