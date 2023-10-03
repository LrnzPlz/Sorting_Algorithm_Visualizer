let n;
const array = [];


const slider = document.getElementById('slider');
const display = document.getElementById('display');

slider.value = 10;

setInterval(() => {
    display.innerText = slider.value;
}, 300);

slider.addEventListener('input', function() {
    n = parseInt(this.value);  // Update n based on slider value
    init();  // Reinitialize the array with the updated number of items
});

n = parseInt(slider.value);


init();

function init(){
    array.length = 0;
    for(let i = 0; i < n; i++){
        array.push(Math.random());
    }
    showBars();
}

function play(){
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);    
}


function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if(move.type == "swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(move);
    setTimeout(function(){
        animate(moves);
    }, 1); 
    /*requestAnimationFrame(function() {
        animate(moves);
    });*/
}

function bubbleSort(array){
    const moves = [];
    let swapped;

    for(let i = 0; i < array.length; i++){
        swapped = false;
        for(let j = 0; j < array.length - 1 - i; j++){
            moves.push({ indices: [j, j + 1], type: "comp"});

            if(array[j] > array[j + 1]){
                swapped = true;
                moves.push({ indices: [j, j + 1], type: "swap" });
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }

        if(!swapped){
            break;
        }
    }

    return moves;
   
}

function isSorted(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}

function colorBars(move){
    for(let i = 0; i < array.length; i++){
        if(move){
            bar.style.backgroundColor= "green";
        } 
        container.appendChild(bar);
    }
}

function showBars(move){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100.0 + "%";
        bar.style.width = 1000 / n + "px";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
                move.type == "swap" ? "green" : "purple";
        } 
        container.appendChild(bar);
    }
}


/*TO DO:
create a top bar with buttons. OK
set up sliding bar for array size: min 10 max 100 (?) (the size has to change with the number). OK
after the sort is done the array becomes one color. NO
put a "slow" mode and a "fast" mode. 
implement other algorithms.
change the style.
fix bubble sort so it doesnt check the already sorted part of the array. OK
Make the page responsive.
Move the title on top (?).
*/
