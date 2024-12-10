import { useState } from "react";
import "./Game.css";
import { gameService } from "../../../Services/GameService";
import { helper } from "../../../Utils/Helper";
import { notify } from "../../../Utils/Notify";

export function Game(): JSX.Element {
    const [activeButton, setActiveButton] = useState<string>(null);
    const [index, setIndex] = useState<number>(0);
    const [onGoing, setOnGoing] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [isRotating, setIsRotating] = useState<boolean>(false);

    const handleClick = async (color: string) => {
        setActiveButton(color);
        setTimeout(() => setActiveButton(null), 300);
        const steps = gameService.getSteps();

        if (color !== steps[index]) {
            gameService.playSound("wrong");
            await helper.delay(500);
            notify.error("Wrong step!");
            gameService.initSteps();
            setIndex(0);
            setOnGoing(false);
            return;
        }

        setIndex(index + 1);
        gameService.playSound(color);
        await helper.delay(500);
        setScore(score + 1);

        if (index === steps.length - 1) {
            await helper.delay(1000);
            await computerTurn();
            setIndex(0);
        }
    };

    const start = async () => {
        if (onGoing) return;
        setScore(0);
        await computerTurn();
        setIndex(0);
        setOnGoing(true);
    };

    const computerTurn = async () => {
        gameService.addStep();
        const steps = gameService.getSteps();
        for (const step of steps) {
            setActiveButton(step);
            gameService.playSound(step);
            await helper.delay(500);
            setActiveButton(null);
            await helper.delay(500);
        }
    };

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    return (
        <div className="Game">
            <div className="game-container">
                <h1>Simon Says Game</h1> {/* Added Title */}
                <div className={`game-board ${isRotating ? "rotate" : ""}`}>
                    <div className="game-circle">
                        <button
                            onClick={() => handleClick("green")}
                            className={`game-button green-button ${
                                activeButton === "green" ? "active" : ""
                            }`}
                        />
                        <button
                            onClick={() => handleClick("red")}
                            className={`game-button red-button ${
                                activeButton === "red" ? "active" : ""
                            }`}
                        />
                        <button
                            onClick={() => handleClick("yellow")}
                            className={`game-button yellow-button ${
                                activeButton === "yellow" ? "active" : ""
                            }`}
                        />
                        <button
                            onClick={() => handleClick("blue")}
                            className={`game-button blue-button ${
                                activeButton === "blue" ? "active" : ""
                            }`}
                        />
                        <div className="center-circle">
                            {!onGoing && (
                                <span className="center-text" onClick={start}>
                                    Start
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {onGoing && <span className="score">Score: {score}</span>}
                <button onClick={toggleRotation} className="toggle-rotation-button">
                    {isRotating ? "Stop Rotation" : "Start Rotation"}
                </button>
            </div>
        </div>
    );
}
