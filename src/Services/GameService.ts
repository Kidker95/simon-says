import greenSound from "../Assets/Sound/green.mp3";
import blueSound from "../Assets/Sound/blue.mp3";
import yellowSound from "../Assets/Sound/yellow.mp3";
import redSound from "../Assets/Sound/red.mp3";
import wrongSound from "../Assets/Sound/wrong.mp3";

class GameService {

    private steps: string[] = [];
    private audio = new Audio();

    public addStep(): void {
        const num = Math.floor(Math.random() * 4) + 1;
        switch (num) {
            case 1: this.steps.push("green");
                break;
            case 2: this.steps.push("red");
                break;
            case 3: this.steps.push("yellow");
                break;
            case 4: this.steps.push("blue");
                break;
        }
    }

    public getSteps() {return this.steps;}

    public async playSound(step: string) {
        switch (step) {
            case "green": this.audio.src = greenSound;
                break;
            case "red": this.audio.src = redSound;
                break;
            case "blue": this.audio.src = blueSound;
                break;
            case "yellow": this.audio.src = yellowSound;
                break;
            default: this.audio.src = wrongSound;
        }
        await this.audio.play();
    }

    public initSteps(){this.steps = [];}

}

export const gameService = new GameService();
