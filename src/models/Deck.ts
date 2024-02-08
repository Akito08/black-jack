import { Card } from "./Card";

export class Deck {
  public cards: Card[];

  constructor() {
    this.cards = [];
    this.initializeDeck();
  }

  public initializeDeck(): void {
    const suits: string[] = ["H", "D", "C", "S"];
    const ranks: string[] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }

    this.shuffleDeck();
  }

  private shuffleDeck(): void {
    const deckSize = this.cards.length;
    for (let i = deckSize - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  public drawOne(): Card {
    if (this.cards.length === 0) {
      this.initializeDeck();
    }
    return this.cards.pop()!;
  }
}
