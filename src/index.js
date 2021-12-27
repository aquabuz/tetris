import 'bootstrap';
import './css/index.scss';

// DOM
const playground = document.querySelector(".playground > ul");

// Settings
const GAME_ROWS = 20;
const GMAE_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    tree: [
        [
            [0,0], [0,1], [1,0], [1,1],
        ],
        [],
        [],
        [],
    ],
}

const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 0,
}

init()

// functions
function init() {
    tempMovingItem = { ...movingItem };
    
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }

    renderBlocks()
}

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j=0; j < GMAE_COLS; j++) {
        const martix = document.createElement("li");
        ul.prepend(martix)
    }

    li.prepend(ul)
    playground.prepend(li)
}

function renderBlocks() {
    const { type, direction, top, left } = tempMovingItem;

    BLOCKS[type][direction].forEach(block => {
        const x = block[0];
        const y = block[1];
    });
}