export type ChallengerStatus =
  | "Initial"
  | "Bust"
  | "Blackjack"
  | "Hit"
  | "Stand"
  | "Double"
  | "Gameover";

export type ActiveChallengerStatus = Exclude<
  ChallengerStatus,
  "Initial" | "Gameover"
>;

export type DealerStatus = "Initial" | "Bust" | "Blackjack" | "Hit" | "Stand";
