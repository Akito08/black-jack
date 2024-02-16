import { Challenger } from "./Challenger";
import { Player } from "../interface/Player";
import { Bot } from "../interface/Bot";
import { Action } from "../types";
import { hardHandStrategy, softHandStrategy } from "./BasicStrategyTable";

export class PerfectStrategyBot extends Challenger implements Player, Bot {
  constructor(name: string) {
    super(name);
  }
  public makeBet(cardCountingTotal: number): void {
    let countBasedBetAmount = this.caluculateBetAmount(cardCountingTotal);
    if (this.chips - countBasedBetAmount >= 0) {
      this.chips -= countBasedBetAmount;
      this.betAmount += countBasedBetAmount;
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

  private caluculateBetAmount(cardCountingTotal: number) {
    let bet = 0;
    if (cardCountingTotal < -3) bet = 25;
    else if (cardCountingTotal >= -3 && cardCountingTotal <= 3) bet = 50;
    else if (cardCountingTotal > 3 && cardCountingTotal <= 10) bet = 100;
    else bet = 150;

    return bet;
  }
}
