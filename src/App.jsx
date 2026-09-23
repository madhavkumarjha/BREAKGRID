import React, { useEffect, useRef, useState } from 'react';
import HUD from './components/HUD.jsx';
import Overlays from './components/Overlays.jsx';
import { BreakoutGame } from './engine/game.js';

export default function App() {
    const canvasRef = useRef(null);
    const gameRef = useRef(null);

    const [gameState, setGameState] = useState('MENU');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('breakout_high_score') || '0'));
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(1);
    const [levelName, setLevelName] = useState('Neon Waves');
    const [activePowerups, setActivePowerups] = useState([]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const game = new BreakoutGame(canvasRef.current, (state) => {
            setScore(state.score);
            setHighScore(state.highScore);
            setLives(state.lives);
            setCombo(state.combo);
            setGameState(state.gameState);
            setLevelName(state.levelName);
            setActivePowerups(state.activePowerups);
        });

        gameRef.current = game;

        let animationFrameId;
        const renderLoop = () => {
            game.update();
            game.draw();
            animationFrameId = requestAnimationFrame(renderLoop);
        };
        animationFrameId = requestAnimationFrame(renderLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            game.destroy();
        };
    }, []);

    return (
        <div id="app-container">
            <HUD
                score={score}
                highScore={highScore}
                lives={lives}
                combo={combo}
                levelName={levelName}
                activePowerups={activePowerups}
            />

            <div id="canvas-wrapper">
                <canvas ref={canvasRef} id="gameCanvas" width={800} height={600} />

                {/* Active Powerups Bar */}
                <div id="active-powerups" className="active-powerups">
                    {activePowerups.map((pKey) => (
                        <div key={pKey} className="powerup-badge">
                            <span>⚡</span> <span>{pKey}</span>
                        </div>
                    ))}
                </div>

                {/* React Modals & Overlays */}
                <Overlays
                    gameState={gameState}
                    score={score}
                    highScore={highScore}
                    gameRef={gameRef}
                    setGameState={setGameState}
                />
            </div>

            <footer className="controls-hint">
                <span><span className="key-badge">A / D</span> or <span className="key-badge">← / →</span> or <span className="key-badge">Mouse</span> Move Paddle</span>
                <span><span className="key-badge">Space</span> Launch / Shoot Lasers</span>
                <span><span className="key-badge">P</span> Pause</span>
            </footer>
        </div>
    );
}
