import { Challenger } from "./Challenger";
import { Player } from "../interface/Player";
import { Bot } from "../interface/Bot";

export class BasicStrategyBot extends Challenger implements Player, Bot {
  constructor(name: string) {
    super(name);
  }
  public makeBet(): void {
    if (this.chips - 100 >= 0) {
      this.chips -= 100;
      this.betAmount += 100;
    } else {
      this.betAmount = this.chips;
      this.chips = 0;
    }
  }

  public makeAction(): void {}
}
