import { Challenger } from "./Challenger";
import { Player } from "../interfaces/Player";

export class User extends Challenger implements Player {
  constructor(username: string) {
    super(username);
  }

  public makeBet(userBetAmount: number): void {
    if (this.chips - userBetAmount < 0) return;
    this.betAmount += userBetAmount;
    this.chips -= userBetAmount;
  }

  public resetBet(): void {
    this.chips = 500;
    this.betAmount = 0;
  }
}
