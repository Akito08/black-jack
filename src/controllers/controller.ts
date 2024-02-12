import { Table } from "../models/Table";
import { Deck } from "../models/Deck";
import { View } from "../views/view";
import {
  getUserInTable,
  getAllBotsInTable,
  getDealerInTable,
  sleep,
} from "../utils/helper";
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
    // this.table.assignPlayerHands();
    // this.table.allBotsMakeBet();
    // this.view.renderActingPage();
    // const user = getUserInTable(this.table);
    // for (let player of this.table.players) {
    //   this.view.updatePlayerHandDisplay(player);
    // }
    // this.setupHitAction(user);
    // this.setupDoubleAction(user);
    // this.setupStandAction(user);
    // this.view.highlightCurrentPlayer(user);
    //this.view.updatePlayerHandDisplay(user);

    //resultModalのテスト
    this.view.renderResultModal();
    this.setupNextGameButton();
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
      this.processBotAndDealerTurn();
      this.view.highlightCurrentPlayer(user);
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
      this.view.updateChallengerInfoDisplay(user);
      if (user.isBust()) {
        this.view.disableAllActionButtons();
        this.view.highlightCurrentPlayer(user);
        this.processBotAndDealerTurn();
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
      this.view.updateChallengerInfoDisplay(user);
      this.view.disableAllActionButtons();
      this.view.highlightCurrentPlayer(user);
      this.processBotAndDealerTurn();
    });
  }

  setupNextGameButton() {
    const nextGameButton = document.getElementById(
      "next-game-button"
    ) as HTMLButtonElement;
    nextGameButton.addEventListener("click", () => {
      console.log("Next Game");
    });
  }

  public async processBotAndDealerTurn() {
    await sleep(1000);
    const bots = getAllBotsInTable(this.table);
    for (let bot of bots) {
      await sleep(1000);
      this.view.highlightCurrentPlayer(bot);
      await sleep(1000);
      while (!bot.isTurnEnd) {
        this.table.botAct(bot);
        this.view.updateChallengerInfoDisplay(bot);
        await sleep(1000);
      }
      this.view.highlightCurrentPlayer(bot);
    }

    await sleep(1000);
    const dealer = getDealerInTable(this.table);
    this.view.highlightCurrentPlayer(dealer);
    await sleep(1000);
    while (!dealer.isTurnEnd) {
      this.table.dealerAct(dealer);
      this.view.updateDealerInfoDisplay(dealer);
      await sleep(1000);
    }
    this.view.highlightCurrentPlayer(dealer);
    this.table.evaluateWinner();
  }
}
