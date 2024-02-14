import { Player } from "../interface/Player";
import { ChallengerStatus } from "../types";
import { Card } from "./Card";

export class Challenger implements Player {
  readonly name: string;
  public hand: Card[];
  public status: ChallengerStatus;
  public chips: number;
  public betAmount: number;
  public isTurnEnd: boolean;
  constructor(name: string) {
    this.name = name;
    this.hand = [];
    this.status = "Initial";
    this.chips = 500;
    this.betAmount = 0;
    this.isTurnEnd = false;
  }

  public updateStatus(challengerStatus: ChallengerStatus): void {
    this.status = challengerStatus;
  }

  public getHandScore(): number {
    let score = 0;
    let NumOfAce = this.countAce();
    const handSize = this.hand.length;
    for (let i = 0; i <= handSize - 1; i++) {
      if (this.hand[i].isFront) score += this.hand[i].getRankNumber();
    }
    while (score > 21 && NumOfAce > 0) {
      score -= 10;
      NumOfAce -= 1;
    }
    return score;
  }

  public countAce(): number {
    return this.hand.filter((card) => card.rank === "A").length;
  }

  public drawCard(card: Card): void {
    this.hand.push(card);
  }

  public isBlackjack(): boolean {
    return this.getHandScore() === 21 && this.hand.length === 2;
  }

  public isBust(): boolean {
    return this.getHandScore() > 21;
  }

  public canHit(): boolean {
    return this.status !== "Double";
  }

  public canDouble(): boolean {
    return this.status === "Initial" && this.betAmount * 2 <= this.chips;
  }

  public stand(): void {
    this.updateStatus("Stand");
    this.isTurnEnd = true;
  }

  public hit(card: Card): void {
    this.drawCard(card);
    if (!this.isBust()) this.updateStatus("Hit");
    else {
      this.updateStatus("Bust");
      this.isTurnEnd = true;
    }
  }

  public double(card: Card): void {
    if (!this.canDouble()) return;
    this.chips -= this.betAmount;
    this.betAmount *= 2;
    this.drawCard(card);
    if (this.isBust()) this.updateStatus("Bust");
    else this.updateStatus("Double");
    this.isTurnEnd = true;
  }

  public resetState() {
    this.status = "Initial";
    this.betAmount = 0;
    this.hand = [];
    this.isTurnEnd = false;
  }
}
