//DOM Variables
const keys = document.querySelectorAll('button');
const equation = document.querySelector('#equation');
const currentDisplay = document.querySelector('#currentDisplay')

//variables
let currentKey;
let operand = null;
let num1 = null;
let num2 = null;
let prevOp = null;
let prevousKey = null;
let answer = null;
let symbols = ['+','-','*','/','='];

//click button on calculator
keys.forEach(key =>{ key.addEventListener('click',function(e){
        currentKey = e.target.textContent;
        updateDisplay();
    })
});

//keyboard functionality
window.addEventListener('keydown', function(e) {
    if(!valid(e)){
        return;
    }
    currentKey = e.key;
    updateDisplay();
  });

//check if key is valid
function valid(e){
    if(e.keyCode ==8 || e.keyCode ===13 || e.keyCode ===191 || e.keyCode ===190){
        return true;
    }
    else if(symbols.indexOf(e.key) === -1 && isNaN(e.key)){
        return false;
    }
    return true;
}
function updateDisplay(e){
  //  currentKey = e.target.textContent;

    if(currentKey === 'C'){
        reset();
    }else if(currentKey === '←' || currentKey ==='Backspace'){
        if (!isNaN(previousKey) || previousKey === '←' || previousKey ==='Backspace'){
            currentDisplay.textContent = currentDisplay.textContent.substring(0,currentDisplay.textContent.length-1);
            if(currentDisplay.textContent.length === 0){
                currentDisplay.textContent = 0;
            }
        }   
    }else if(currentKey === '.'){
        //only add one decimal, for ex 5.5.2.3 cannot occur
        if(currentDisplay.textContent.indexOf('.')=== -1){
            currentDisplay.textContent += '.';
        }
            
    }
    else{
        if(!isNaN(currentKey)){ // if button clicked is a number
            if(operand !== null && (isNaN(previousKey))&& previousKey !== '.'){ // after operand, reset display
                currentDisplay.textContent = '0';
            }
            if(num1===null & num2!==null){ //if previouskey was '=' then reset when you click a new number
                reset();
            }

            if(currentDisplay.textContent === '0'){ //initial text is 0, replace it when press key
                currentDisplay.textContent = currentKey; 
            }else{
                currentDisplay.textContent += currentKey; // keep adding number to string, 55 
            }
        }else if (currentKey === '=' || currentKey ==='Enter'){ 

                num2= +currentDisplay.textContent; // + sign turns string into number
                equation.textContent += num2 + " = ";
                //if you press only one number and then = btn
                if(num1 !==null){
                    answer = operate(operand,num1,num2);
                    currentDisplay.textContent = parseFloat(answer);
                }
                num1=null;
            
        }else{ //if key is operand + - * /
            operand = currentKey;

            if(previousKey == '+' || previousKey =='-' || previousKey =='*' ||previousKey =='÷' ||previousKey =='/'){
                equation.textContent = currentDisplay.textContent + currentKey;
            }
            else if(num1 === null){ 
                equation.textContent = currentDisplay.textContent + currentKey;
                num1= +currentDisplay.textContent;
            }else{ // ex: 5 + 9 + 2 , if you keep using operands without equal sign
                num2 = +currentDisplay.textContent;
                equation.textContent += num2 + currentKey;
                answer = operate(prevOp,num1,num2);
                currentDisplay.textContent = parseFloat(answer);
                num1 = +currentDisplay.textContent;
            }
            
        }

    }
    previousKey = currentKey;
    prevOp = operand;

}

// Basic math operations
function add(a,b){
    return a +b;
}

function subtract(a,b){
    return a -b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a/b;
}

function operate(op,num1,num2){
    let answer;
    switch(op){
        case '+':
           answer = add(num1,num2);
            break;
        case '-':
            answer = subtract(num1,num2);
            break;
        case '*':
            answer = multiply(num1,num2);
            break;
        case '÷':
        case '/':
            answer = divide(num1,num2);
            break;
        default:
            return;
    }
    return answer;
}
//function runs when clear button hit , or click a number after clicking =
function reset(){
    num1 = null;
    num2= null;
    operand = null;
    previousKey = null;
    equation.textContent = '';
    currentDisplay.textContent = '0';

}

function checkZero(ans){
    if(ans ==="Infinity"){
        return "You cannot divide by 0!";
    }
    return ans;
}

//functionality for using keyboard to enter numbers;