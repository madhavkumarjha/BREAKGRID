import React from 'react';

export default function HUD({ score, highScore, lives, combo, levelName, activePowerups, gameState, onTogglePause }) {
    const showPause = (gameState === 'PLAYING' || gameState === 'PAUSED') && onTogglePause;

    return (
        <header id="hud">
            <div className="hud-item">
                <span className="hud-label">Score</span>
                <span className="hud-value" id="val-score">{score}</span>
            </div>
            <div className="hud-item">
                <span className="hud-label">High Score</span>
                <span className="hud-value" id="val-highscore">{highScore}</span>
            </div>
            <div className="hud-item">
                <span className="hud-label">Lives</span>
                <span className="hud-value lives" id="val-lives">
                    {'❤️ '.repeat(Math.max(0, lives))}
                </span>
            </div>
            <div className="hud-item">
                <span className="hud-label">Combo</span>
                <span className="hud-value combo" id="val-combo">{combo > 1 ? `x${combo}` : '1x'}</span>
            </div>
            <div className="hud-item">
                <span className="hud-label">Level</span>
                <span className="hud-value" id="val-level" style={{ fontSize: '0.9rem' }}>{levelName}</span>
            </div>
            {showPause && (
                <button className="pause-btn" onClick={onTogglePause} title="Pause Game" aria-label="Pause Game">
                    ⏸️
                </button>
            )}
        </header>
    );
}

