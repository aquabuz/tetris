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
        [[2,1], [0,1], [1,0], [1,1]],
        [[1,2], [0,1], [1,0], [1,1]],
        [[1,2], [0,1], [2,1], [1,1]],
        [[2,1], [1,2], [1,0], [1,1]],
    ],
}

const movingItem = {
    type: "tree",
    direction: 3,
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

function renderBlocks(moveType="") {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");

    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const inAvailable = checkEmpty(target);
        if (inAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem }
            setTimeout(() => {
                if (moveType === "top") {
                    seizeBlock()
                }
                renderBlocks();
            }, 0)
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock() {
    console.log("seize block");
}

function checkEmpty(target) {
    if (!target) {
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()
}

// event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 32:
            changeDirection();
            break;
        default:
            break;
    }
    // console.log(e);
})
