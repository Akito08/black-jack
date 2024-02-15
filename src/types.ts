export type ChallengerStatus =
  | "Initial"
  | "Bust"
  | "Blackjack"
  | "Hit"
  | "Stand"
  | "Double"
  | "Gameover";

export type DealerStatus = "Initial" | "Bust" | "Blackjack" | "Hit" | "Stand";

export type Action = "Hit" | "Stand" | "Double";

export type GamePhase = "Betting" | "Acting" | "Evaluating";
