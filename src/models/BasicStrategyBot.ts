import { Challenger } from "./Challenger";
import { Player } from "../interface/Player";
import { Bot } from "../interface/Bot";
import { Action } from "../types";
import { hardHandStrategy, softHandStrategy } from "./BasicStrategyTable";

export class BasicStrategyBot extends Challenger implements Player, Bot {
  constructor(name: string) {
    super(name);
  }
  public makeBet(): void {
    if (this.chips - 50 >= 0) {
      this.chips -= 50;
      this.betAmount += 50;
    } else {
      this.betAmount = this.chips;
      this.chips = 0;
    }
  }

  public decideAction(dealerUpCard: number): Action {
    const botStrategy =
      this.countAce() === 0 ? hardHandStrategy : softHandStrategy;
    const actions: Action[] = ["Double", "Hit", "Stand"];

    for (let action of actions) {
      if (botStrategy[dealerUpCard][action].includes(this.getHandScore())) {
        if (action === "Double" && !this.canDouble()) return "Hit";
        return action;
      }
    }
    return "Stand";
  }
}
