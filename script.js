document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('target');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const startBtn = document.getElementById('start-btn');
    const gameArea = document.querySelector('.game-area');
    
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;
    let isGameRunning = false;
    let speed = 1;
    
    // Move target to random position
    function moveTarget() {
        const gameWidth = gameArea.clientWidth - target.clientWidth;
        const gameHeight = gameArea.clientHeight - target.clientHeight;
        
        const randomX = Math.floor(Math.random() * gameWidth);
        const randomY = Math.floor(Math.random() * gameHeight);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    }
    
    // Handle target click
    target.addEventListener('click', () => {
        if (!isGameRunning) return;
        
        score++;
        scoreDisplay.textContent = score;
        
        // Increase speed every 5 points
        if (score % 5 === 0) {
            speed += 0.2;
            clearInterval(gameInterval);
            gameInterval = setInterval(moveTarget, 1000 / speed);
        }
        
        moveTarget();
    });
    
    // Start game
    startBtn.addEventListener('click', () => {
        if (isGameRunning) return;
        
        isGameRunning = true;
        score = 0;
        timeLeft = 30;
        speed = 1;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        startBtn.disabled = true;
        
        // Make target visible
        target.style.display = 'block';
        
        // Initial target position
        moveTarget();
        
        // Move target at intervals
        gameInterval = setInterval(moveTarget, 1000 / speed);
        
        // Countdown timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    });
    
    // End game
    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        isGameRunning = false;
        startBtn.disabled = false;
        target.style.display = 'none';
        alert(`Game Over! Your score: ${score}`);
    }
    
    // Initialize target as hidden
    target.style.display = 'none';
});