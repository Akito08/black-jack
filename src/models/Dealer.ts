import { Player } from "../interface/player";
import { Card } from "./Card";

export class Dealer implements Player {
  readonly name: string;
  public hand: Card[];
  public status: string;
  constructor(name: string) {
    this.name = name;
    this.hand = [];
    this.status = "Initial";
  }

  public getHandScore(): number {
    let score = 0;
    let NumOfAces = this.countAce();
    const handSize = this.hand.length;
    for (let i = 0; i <= handSize - 1; i++) {
      if (this.hand[i].isFront) score += this.hand[i].getRankNumber();
    }
    while (score > 21 && NumOfAces > 0) {
      score -= 10;
      NumOfAces -= 1;
    }
    return score;
  }

  public countAce(): number {
    return this.hand.filter((card) => card.rank === "A").length;
  }

  public getCard(card: Card): void {
    this.hand.push(card);
  }

  public isBlackjack(): boolean {
    return this.getHandScore() === 21 && this.hand.length === 2;
  }

  public isBust(): boolean {
    return this.getHandScore() > 21;
  }

  public stand(): void {
    this.status = "Stand";
  }

  public hit(card: Card): void {
    this.getCard(card);
    if (this.isBust()) this.status = "Bust";
    else this.status = "Hit";
  }
}
