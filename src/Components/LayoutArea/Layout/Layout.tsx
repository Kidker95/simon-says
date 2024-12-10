import { Game } from "../../GameArea/Game/Game";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <main>
                <Game />
            </main>
        </div>
    );
}
