import { Card } from "../models/Card";
import { ChallengerStatus, DealerStatus } from "../types";

export interface Player {
  readonly name: string;
  hand: Card[];
  status: ChallengerStatus | DealerStatus;

  updateStatus(playerStatus: ChallengerStatus | DealerStatus): void;
  getHandScore(): number;
  countAce(): number;
  drawCard(card: Card): void;
  isBlackjack(): boolean;
  isBust(): boolean;
  stand(): void;
  hit(card: Card): void;
  resetState(): void;
}
