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

function bubble_play(){
    clearAnimationFrame();
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);    
}

function selection_play(){
    clearAnimationFrame();
    const copy=[...array];
    const moves=selectionSort(copy);
    animate(moves);    
}

function insertion_play(){
    clearAnimationFrame();
    const copy=[...array];
    const moves=insertionSort(copy);
    animate(moves);    
}

function quick_play() {
    clearAnimationFrame();
    const copy = [...array];
    const moves = quickSort(copy);
    animate(moves);
}


let animationFrameId;

function animate(moves){
    if (moves.length === 0) {
        showBars();
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(move);


    setTimeout(function(){
        animate(moves);
    }, 400); 
    /*
    animationFrameId = requestAnimationFrame(() => {
        animate(moves);
    });
    */
}

function clearAnimationFrame() {
    cancelAnimationFrame(animationFrameId);
}

function selectionSort(array){
    const moves = [];
    let swapped;

    for(let i = 0; i < array.length; i++){
        swapped = false;
        let min_index = i;
        for(let j = i + 1; j < array.length; j++){
            moves.push({ indices: [i, j], type: "comp"});
            if(array[j] < array[min_index]){
                min_index = j;
            }
        }
        if(min_index !== i){
            moves.push({ indices: [i, min_index], type: "swap" });
            [array[i], array[min_index]] = [array[min_index], array[i]];
        }
    }

    return moves;
}

function insertionSort(array){
    const moves = [];

    for (let i = 1; i < array.length; i++) {
        const key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            moves.push({ indices: [j, j + 1], type: "comp" });
            moves.push({ indices: [j, j + 1], type: "swap" });
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }

    return moves;
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

function quickSort(array) {
    const moves = [];

    function partition(left, right) {
        const pivot = array[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (array[i] < pivot) {
                moves.push({ indices: [i, j], type: "comp" });
                i++;
            }
            while (array[j] > pivot) {
                moves.push({ indices: [i, j], type: "comp" });
                j--;
            }
            if (i <= j) {
                moves.push({ indices: [i, j], type: "swap" });
                [array[i], array[j]] = [array[j], array[i]];
                i++;
                j--;
            }
        }
        return i;
    }

    function sort(left, right) {
        let index;

        if (array.length > 1) {
            index = partition(left, right);
            if (left < index - 1) {
                sort(left, index - 1);
            }
            if (index < right) {
                sort(index, right);
            }
        }
    }

    sort(0, array.length - 1);
    return moves;
}




function showBars(move){
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();  // Create a document fragment for batch DOM insertion

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100.0 + "%";
        bar.style.width = 1000 / n + "px";
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type == "swap" ? "green" : "purple";
        }

        fragment.appendChild(bar);
    }

    container.style.setProperty('--num-bars', n);
    container.appendChild(fragment);  // Batch DOM insertion
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
