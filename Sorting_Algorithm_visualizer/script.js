const n = 100;
const array = [];

init();

function init(){
    for(let i = 0; i < n; i++){
        array[i] = Math.random();
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
    }, 0.01);
}

function bubbleSort(array){
    const moves = [];
    do{
        var swapped = false;
    
        for(let i = 1; i < array.length; i++){
            moves.push({
                indices: [i - 1, i], type: "comp"
            });
            if(array[i - 1] > array[i]){
                swapped = true;
                moves.push({
                    indices: [i - 1, i], type: "swap"
                });
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
    
        }
    
    }while(swapped);
    return moves;
}


function showBars(move){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100.0 + "%";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
                move.type == "swap" ? "green" : "purple";
        }
        container.appendChild(bar);
    }
}


/*TO DO:
create a top bar with buttons.
set up sliding bar for array size: min 10 max 100 (?) (the size has to change with the number).
after the sort is done the array becomes one color.
put a "slow" mode and a "fast" mode.
implement other algorithms.
change the style.
fix bubble sort so it doesnt check the already sorted part of the array.
*/
