export class Card {
  readonly suit: string;
  readonly rank: string;
  public isFront: boolean;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
    this.isFront = true;
  }

  public getRankNumber(): number {
    const pairs: { [key: string]: number } = {
      J: 10,
      Q: 10,
      K: 10,
      A: 11,
    };
    if (this.rank in pairs) return pairs[this.rank];

    return Number(this.rank);
  }
}
