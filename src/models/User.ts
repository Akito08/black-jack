import { Challenger } from "./Challenger";
import { Player } from "../interface/Player";

export class User extends Challenger implements Player {
  constructor(username: string) {
    super(username);
  }

  public makeBet(userBetAmount: number): void {
    this.betAmount = userBetAmount;
  }
}