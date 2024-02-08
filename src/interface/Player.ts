import { Card } from "../models/Card";

export interface Player {
  readonly name: string;
  hand: Card[];
  status: string;

  getHandScore(): number;

  countAce(): number;

  getCard(card: Card): void;

  isBlackjack(): boolean;

  isBust(): boolean;

  stand(): void;

  hit(card: Card): void;
}
