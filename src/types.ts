export type ChallengerStatus =
  | "Initial"
  | "Bust"
  | "Blackjack"
  | "Hit"
  | "Stand"
  | "Double"
  | "Gameover";

export type DealerStatus = "Initial" | "Bust" | "Blackjack" | "Hit" | "Stand";

export type GamePhase = "Betting" | "Acting" | "Evaluating";
