import { Player } from "../interface/Player";
import { DealerStatus } from "../types";
import { Card } from "./Card";

export class Dealer implements Player {
  readonly name: string;
  public hand: Card[];
  public status: DealerStatus;
  constructor(name: string) {
    this.name = name;
    this.hand = [];
    this.status = "Initial";
  }

  public updateStatus(dealerStatus: DealerStatus): void {
    this.status = dealerStatus;
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

  public flipCard(): void {
    if (this.hand.length !== 2) return;
    this.hand[1].isFront = !this.hand[1].isFront;
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

  public stand(): void {
    this.updateStatus("Stand");
  }

  public hit(card: Card): void {
    this.drawCard(card);
    if (this.isBust()) this.updateStatus("Bust");
    else this.updateStatus("Hit");
  }
}
