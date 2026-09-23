/* UI & HUD Overlay Manager */
export class UIManager {
    constructor() {
        this.elScore = document.getElementById('val-score');
        this.elHighScore = document.getElementById('val-highscore');
        this.elLives = document.getElementById('val-lives');
        this.elCombo = document.getElementById('val-combo');
        this.elLevel = document.getElementById('val-level');
        this.elPowerupsContainer = document.getElementById('active-powerups');

        this.overlayMenu = document.getElementById('overlay-menu');
        this.overlayPause = document.getElementById('overlay-pause');
        this.overlayGameOver = document.getElementById('overlay-gameover');
        this.overlayWin = document.getElementById('overlay-win');
        this.overlayLevelSelect = document.getElementById('overlay-levelselect');

        this.finalScoreEl = document.getElementById('final-score');
        this.finalHighScoreEl = document.getElementById('final-highscore');
        this.winScoreEl = document.getElementById('win-score');
    }

    updateScore(score, highScore) {
        if (this.elScore) this.elScore.textContent = score;
        if (this.elHighScore) this.elHighScore.textContent = highScore;
    }

    updateLives(lives) {
        if (this.elLives) this.elLives.textContent = '❤️ '.repeat(Math.max(0, lives));
    }

    updateCombo(combo) {
        if (this.elCombo) {
            this.elCombo.textContent = combo > 1 ? `x${combo}` : '1x';
        }
    }

    updateLevel(levelName) {
        if (this.elLevel) this.elLevel.textContent = levelName;
    }

    updatePowerupBadges(activePowerupsMap) {
        if (!this.elPowerupsContainer) return;
        this.elPowerupsContainer.innerHTML = '';
        for (const [key] of activePowerupsMap.entries()) {
            const badge = document.createElement('div');
            badge.className = 'powerup-badge';
            badge.innerHTML = `<span>⚡</span> <span>${key}</span>`;
            this.elPowerupsContainer.appendChild(badge);
        }
    }

    hideAll() {
        [this.overlayMenu, this.overlayPause, this.overlayGameOver, this.overlayWin, this.overlayLevelSelect]
            .forEach(el => el && el.classList.add('hidden'));
    }

    showMenu() {
        this.hideAll();
        if (this.overlayMenu) this.overlayMenu.classList.remove('hidden');
    }

    showPause() {
        this.hideAll();
        if (this.overlayPause) this.overlayPause.classList.remove('hidden');
    }

    showGameOver(score, highScore) {
        this.hideAll();
        if (this.finalScoreEl) this.finalScoreEl.textContent = score;
        if (this.finalHighScoreEl) this.finalHighScoreEl.textContent = highScore;
        if (this.overlayGameOver) this.overlayGameOver.classList.remove('hidden');
    }

    showWin(score) {
        this.hideAll();
        if (this.winScoreEl) this.winScoreEl.textContent = score;
        if (this.overlayWin) this.overlayWin.classList.remove('hidden');
    }

    showLevelSelect() {
        this.hideAll();
        if (this.overlayLevelSelect) this.overlayLevelSelect.classList.remove('hidden');
    }
}
