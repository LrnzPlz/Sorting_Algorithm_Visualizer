let n;
const array = [];

let isAnimationInProgress = false;


const slider = document.getElementById('slider');
const display = document.getElementById('display');

slider.value = 80;

slider.addEventListener('input', function() {
    n = parseInt(this.value);  // Update n based on slider value
    init();  // Reinitialize the array with the updated number of items
});

const slider2 = document.getElementById('slider2');

const speedValues = [1, 100, 250, 450, 600, 700]; // Corresponding animation speeds for each level
const totalSpeedLevels = speedValues.length;

slider2.value = speedValues.length;

slider2.addEventListener('input', function() {
    const sliderValue = parseInt(this.value);
    // Calculate the reversed animation speed
    animationSpeed = speedValues[totalSpeedLevels - sliderValue];
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

function playSortingAlgorithm(algorithm) {
    if (isAnimationInProgress) {
        return;
    }

    const newArrayButton = document.querySelector('.generate-button');
    newArrayButton.disabled = true;

    slider.disabled = true;

    disableSortingButtons();
    clearAnimationFrame();

    const copy = [...array];
    let moves;

    switch (algorithm) {
        case 'bubble':
            moves = bubbleSort(copy);
            break;
        case 'selection':
            moves = selectionSort(copy);
            break;
        case 'insertion':
            moves = insertionSort(copy);
            break;
        case 'quick':
            moves = quickSort(copy);
            colorBarsAfterSort(quickSort);
            break;
        case 'heap':
            moves = heapSort(copy);
            break;
        default:
            return;
    }

    animate(moves);
}

document.getElementById('bubbleButton').addEventListener('click', () => playSortingAlgorithm('bubble'));
document.getElementById('selectionButton').addEventListener('click', () => playSortingAlgorithm('selection'));
document.getElementById('insertionButton').addEventListener('click', () => playSortingAlgorithm('insertion'));
document.getElementById('quickButton').addEventListener('click', () => playSortingAlgorithm('quick'));
document.getElementById('heapButton').addEventListener('click', () => playSortingAlgorithm('heap'));

let animationFrameId;

let animationSpeed = 1;  // Default animation speed

let isAnimationStopped = false;

function stopAnimation() {
    isAnimationStopped = true;

    const stopButton = document.getElementById('stopButton');
    stopButton.disabled = false;
}

function animate(moves){
    if (isAnimationStopped) {
        isAnimationStopped = false; // Reset the flag for future animations
        showBars(); // Show the final state of the bars
        isAnimationInProgress = false;
        slider.disabled = false;
        enableSortingButtons();

        const newArrayButton = document.querySelector('.generate-button');
        newArrayButton.disabled = false;

        return;
    }
    if (moves.length === 0) {
        showBars();
        colorBarsAfterSort();
        isAnimationInProgress = false; // Animation is complete
        slider.disabled = false;
        enableSortingButtons();

        const newArrayButton = document.querySelector('.generate-button');
        newArrayButton.disabled = false;
        
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
    }, animationSpeed); 
    
}

function disableSortingButtons() {
    const buttons = document.querySelectorAll('.Alg_button');
    for (const button of buttons) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

function enableSortingButtons() {
    const buttons = document.querySelectorAll('.Alg_button');
    for (const button of buttons) {
        button.disabled = false;
        button.classList.remove('disabled');
    }
}

function colorBarsAfterSort() {
    const bars = document.querySelectorAll('.bar');

    let index = 0;

    function colorNextBar() {
        if (index < bars.length) {
            bars[index].style.backgroundColor = 'green';
            index++;
            setTimeout(colorNextBar, 10);
        }
    }

    colorNextBar();
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

function heapify(array, n, i, moves) {
    let largest = i; 
    const left = 2 * i + 1; 
    const right = 2 * i + 2; 

    if (left < n && array[left] > array[largest]) {
        moves.push({ indices: [left, largest], type: "comp" });
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        moves.push({ indices: [right, largest], type: "comp" });
        largest = right;
    }

    if (largest !== i) {
        moves.push({ indices: [i, largest], type: "swap" });
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, moves);
    }
}

function heapSort(array) {
    const moves = [];
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(array, n, i, moves);

    for (let i = n - 1; i >= 0; i--) {
        moves.push({ indices: [0, i], type: "swap" });
        [array[0], array[i]] = [array[i], array[0]];
        heapify(array, i, 0, moves);
    }

    return moves;
}



function showBars(move){
    container.innerHTML = "";

    const fragment = document.createDocumentFragment(); 

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
    container.appendChild(fragment);
}

