import React, { useState } from 'react';
import { LEVELS } from '../engine/levels.js';

export default function Overlays({ gameState, score, highScore, gameRef, setGameState }) {
    const [showLevelSelect, setShowLevelSelect] = useState(false);

    const handleSelectLevel = (idx) => {
        if (gameRef.current) {
            gameRef.current.score = 0;
            gameRef.current.lives = 3;
            gameRef.current.loadLevel(idx);
            gameRef.current.gameState = 'PLAYING';
            setGameState('PLAYING');
        }
        setShowLevelSelect(false);
    };

    if (showLevelSelect) {
        return (
            <div className="overlay">
                <div className="glass-card">
                    <h2 className="game-title" style={{ fontSize: '1.8rem' }}>SELECT LEVEL</h2>
                    <div className="level-grid">
                        {LEVELS.map((lvl, idx) => (
                            <button
                                key={lvl.id}
                                className={`level-btn ${lvl.isBoss ? 'boss-level' : ''}`}
                                title={lvl.name}
                                onClick={() => handleSelectLevel(idx)}
                            >
                                {lvl.isBoss ? '👑' : idx + 1}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowLevelSelect(false)}>
                        BACK TO MENU
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'MENU') {
        return (
            <div className="overlay">
                <div className="glass-card">
                    <img src="/logo.jpg" alt="BREAKGRID Logo" className="game-logo" />
                    <h1 className="game-title">BREAKGRID</h1>
                    <p className="game-subtitle">React Arcade Brick Breaker & Boss Battles</p>
                    <div className="btn-group">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                if (gameRef.current) gameRef.current.startNewGame();
                            }}
                        >
                            ▶ PLAY GAME
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowLevelSelect(true)}>
                            ⚡ LEVEL SELECT
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'PAUSED') {
        return (
            <div className="overlay">
                <div className="glass-card">
                    <h2 className="game-title">GAME PAUSED</h2>
                    <p className="game-subtitle">Take a breather</p>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => gameRef.current && gameRef.current.togglePause()}>
                            RESUME
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                if (gameRef.current) {
                                    gameRef.current.score = 0;
                                    gameRef.current.lives = 3;
                                    gameRef.current.loadLevel(gameRef.current.currentLevelIndex);
                                    gameRef.current.gameState = 'PLAYING';
                                    setGameState('PLAYING');
                                }
                            }}
                        >
                            RESTART LEVEL
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                if (gameRef.current) gameRef.current.gameState = 'MENU';
                                setGameState('MENU');
                            }}
                        >
                            MAIN MENU
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'GAME_OVER') {
        return (
            <div className="overlay">
                <div className="glass-card">
                    <h2 className="game-title" style={{ background: 'linear-gradient(135deg, #ff0055, #ffe600)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        GAME OVER
                    </h2>
                    <p style={{ marginBottom: '8px' }}>Final Score: <strong style={{ color: 'var(--neon-cyan)' }}>{score}</strong></p>
                    <p style={{ marginBottom: '20px' }}>High Score: <strong style={{ color: 'var(--neon-yellow)' }}>{highScore}</strong></p>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => gameRef.current && gameRef.current.startNewGame()}>
                            TRY AGAIN
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                if (gameRef.current) gameRef.current.gameState = 'MENU';
                                setGameState('MENU');
                            }}
                        >
                            MAIN MENU
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'WIN') {
        return (
            <div className="overlay">
                <div className="glass-card">
                    <h2 className="game-title" style={{ background: 'linear-gradient(135deg, #00ff66, #00f0ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        VICTORY!
                    </h2>
                    <p className="game-subtitle">You destroyed The Core!</p>
                    <p style={{ marginBottom: '20px' }}>Grand Score: <strong style={{ color: 'var(--neon-yellow)', fontSize: '1.5rem' }}>{score}</strong></p>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => gameRef.current && gameRef.current.startNewGame()}>
                            PLAY AGAIN
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                if (gameRef.current) gameRef.current.gameState = 'MENU';
                                setGameState('MENU');
                            }}
                        >
                            MAIN MENU
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
