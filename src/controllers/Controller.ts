import { Table } from "../models/Table";
import { Deck } from "../models/Deck";
import { View } from "../views/view";
import { getUserInTable } from "../utils/helper";
import { Player } from "../interface/Player";
import { User } from "../models/User";
import { BasicStrategyBot } from "../models/BasicStrategyBot";
//import { PerfectStrategyBot } from "../models/PerfectStrategyBot";

export class Controller {
  startPage = document.getElementById("start-page") as HTMLElement;
  gameType: string;
  userName: string;
  table: Table;
  deck: Deck;
  view: View;
  constructor(gameType: string, userName: string) {
    this.gameType = gameType;
    this.userName = userName;
    this.table = new Table(gameType, userName);
    this.deck = this.table.deck;
    this.startPage.classList.add("hidden");
    this.view = new View(this.table);
    //this.view.renderBettingModal();
    //this.setupBetActions();

    //actingPageのテスト
    this.table.assignPlayerHands();
    this.view.renderActingPage();
    const user = getUserInTable(this.table);
    this.view.initialPlayerHandDisplay(user);
    this.setupHitAction(user);
    this.setupDoubleAction(user);
    this.setupStandAction(user);
    //this.view.updatePlayerHandDisplay(user);
  }

  setupBetActions() {
    const resetButton = document.getElementById("reset-button");
    resetButton?.addEventListener("click", () => {
      this.userResetBet();
    });

    document.querySelectorAll(".chip-button").forEach((button) => {
      button.addEventListener("click", () => {
        const chipValue = Number(button.getAttribute("chip-value"));
        this.userMakeBet(chipValue);
      });
    });
  }

  userResetBet() {
    const user = getUserInTable(this.table);
    if (user) {
      user.resetBet();
      this.view.updateBetAndChipsDisplay(user);
    }
  }

  userMakeBet(chipValue: number) {
    const user = getUserInTable(this.table);
    if (user) {
      user.makeBet(chipValue);
      this.view.updateBetAndChipsDisplay(user);
    }
  }

  setupStandAction(player: Player) {
    const user = getUserInTable(this.table);
    const standButton = document.getElementById(
      "stand-button"
    ) as HTMLButtonElement;
    standButton.addEventListener("click", () => {
      player.stand();
      this.view.updatePlayerStatus(user);
      this.view.disableAllActionButtons();
      //this.allBotsMakeActions();
    });
  }

  setupHitAction(player: Player) {
    const user = getUserInTable(this.table);
    const hitButton = document.getElementById(
      "hit-button"
    ) as HTMLButtonElement;
    hitButton.addEventListener("click", () => {
      const card = this.deck.drawOne();
      player.hit(card);
      this.view.updatePlayerInfoDisplay(user, card);
      if (user.isBust()) {
        this.view.disableAllActionButtons();
        //this.allBotsMakeActions();
      } else this.view.disableDoubleButton();
    });
  }

  setupDoubleAction(player: User | BasicStrategyBot) {
    const user = getUserInTable(this.table);
    const doubleButton = document.getElementById(
      "double-button"
    ) as HTMLButtonElement;
    doubleButton.addEventListener("click", () => {
      const card = this.deck.drawOne();
      player.double(card);
      this.view.updatePlayerInfoDisplay(user, card);
      this.view.disableAllActionButtons();
      //this.allBotsMakeActions();
    });
  }
}
