import type { CSSProperties } from "react";
import type { Game } from "../types";

interface Props { game: Game; onClick: () => void; }

export function GameCard({ game, onClick }: Props) {
  return (
    <button
      className="game-card"
      onClick={onClick}
      style={{ "--card-accent": game.color } as CSSProperties}
    >
      <span className="game-icon" aria-hidden="true">{game.icon}</span>
      <span className="game-title">{game.title}</span>
      <span className="game-description">{game.description}</span>
      <span className="play-label">Jogar →</span>
    </button>
  );
}