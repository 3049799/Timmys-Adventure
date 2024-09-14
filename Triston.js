// Access the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up player properties
const playerSize = 50;
const playerColor = 'white';
const playerSpeed = 5;
let playerPos = { x: 50, y: 50 };

// Set up collectibles and goal
const collectibleSize = 30;
const collectibleColor = 'gold';
let collectibles = [
    { x: 150, y: 150 },
    { x: 300, y: 300 },
    { x: 450, y: 450 }
];

const goalSize = 50;
const goalColor = 'red';
const goalPos = { x: 700, y: 500 };

// Handle keyboard input
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Check if player collides with collectibles
function checkCollectibles() {
    collectibles = collectibles.filter(collectible => {
        if (playerPos.x < collectible.x + collectibleSize &&
            playerPos.x + playerSize > collectible.x &&
            playerPos.y < collectible.y + collectibleSize &&
            playerPos.y + playerSize > collectible.y) {
            return false; // Remove this collectible
        }
        return true;
    });
}

// Check if player reaches the goal
function checkGoal() {
    if (playerPos.x < goalPos.x + goalSize &&
        playerPos.x + playerSize > goalPos.x &&
        playerPos.y < goalPos.y + goalSize &&
        playerPos.y + playerSize > goalPos.y) {
        alert("Congratulations! You've reached the goal!");
        // Restart the game or implement other game logic here
        resetGame();
    }
}

// Reset game state
function resetGame() {
    playerPos = { x: 50, y: 50 };
    collectibles = [
        { x: 150, y: 150 },
        { x: 300, y: 300 },
        { x: 450, y: 450 }
    ];
}

// Game loop
function gameLoop() {
    // Update player position based on input
    if (keys['ArrowLeft']) {
        playerPos.x -= playerSpeed;
    }
    if (keys['ArrowRight']) {
        playerPos.x += playerSpeed;
    }
    if (keys['ArrowUp']) {
        playerPos.y -= playerSpeed;
    }
    if (keys['ArrowDown']) {
        playerPos.y += playerSpeed;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerPos.x, playerPos.y, playerSize, playerSize);

    // Draw collectibles
    ctx.fillStyle = collectibleColor;
    collectibles.forEach(collectible => {
        ctx.fillRect(collectible.x, collectible.y, collectibleSize, collectibleSize);
    });

    // Draw the goal
    ctx.fillStyle = goalColor;
    ctx.fillRect(goalPos.x, goalPos.y, goalSize, goalSize);

    // Check for collisions
    checkCollectibles();
    checkGoal();

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
