import { User } from "../models/User";
import { Table } from "../models/Table";
import { Deck } from "../models/Deck";
import { View } from "../views/view";
import {
  getUserInTable,
  getAllBotsInTable,
  getDealerInTable,
  sleep,
} from "../utils/helper";

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
    this.view.renderBettingModal();
    this.setupBetActions();
  }

  async gamePhaseController() {
    if (this.table.getGamePhase() === "Betting") {
      this.table.processGamePhase();
      this.view.renderActingPage();
      const user = getUserInTable(this.table);
      if (user.isBlackjack()) {
        await sleep(800);
        this.view.disableAllActionButtons();
        this.view.highlightCurrentPlayer(user);
        this.processBotAndDealerTurn();
        return;
      }
      this.setupPlayerActions();
    } else if (this.table.getGamePhase() === "Acting") {
      this.table.processGamePhase();
      const user = getUserInTable(this.table);
      if (user.chips <= 0) {
        this.view.renderGameOverModal();
        return;
      }
      this.view.renderResultModal();
      this.setupNextGameButton();
    } else if (this.table.getGamePhase() === "Evaluating") {
      this.table.processGamePhase();
      this.view.renderBettingModal();
      this.setupBetActions();
    }
  }

  private setupPlayerActions() {
    this.setupStandAction();
    this.setupHitAction();
    this.setupDoubleAction();
  }

  private setupBetActions() {
    const user = getUserInTable(this.table);
    const resetButton = document.getElementById(
      "reset-button"
    ) as HTMLButtonElement;
    resetButton.addEventListener("click", () => {
      user.resetBet();
      this.view.updateBetAndChipsDisplay(user);
    });

    const dealButton = document.getElementById(
      "deal-button"
    ) as HTMLButtonElement;
    dealButton.addEventListener("click", () => {
      if (user.betAmount === 0) {
        alert("賭け金を設定してください。");
        return;
      }
      this.gamePhaseController();
    });

    document.querySelectorAll(".chip-button").forEach((button) => {
      button.addEventListener("click", () => {
        const chipValue = Number(button.getAttribute("chip-value"));
        user.makeBet(chipValue);
        this.view.updateBetAndChipsDisplay(user);
      });
    });
  }

  setupStandAction() {
    const user = getUserInTable(this.table);
    const standButton = document.getElementById(
      "stand-button"
    ) as HTMLButtonElement;
    standButton.addEventListener("click", async () => {
      user.stand();
      this.view.updatePlayerStatus(user);
      await sleep(800);
      this.view.disableAllActionButtons();
      this.view.highlightCurrentPlayer(user);
      this.processBotAndDealerTurn();
    });
  }

  setupHitAction() {
    const user = getUserInTable(this.table) as User;
    const hitButton = document.getElementById(
      "hit-button"
    ) as HTMLButtonElement;
    hitButton.addEventListener("click", async () => {
      const card = this.deck.drawOne();
      user.hit(card);
      this.table.updateCountingScore(card);
      this.view.updateChallengerInfoDisplay(user);
      if (user.isBust()) {
        await sleep(800);
        this.view.disableAllActionButtons();
        this.view.highlightCurrentPlayer(user);
        this.processBotAndDealerTurn();
      } else this.view.disableDoubleButton();
    });
  }

  setupDoubleAction() {
    const user = getUserInTable(this.table);
    const doubleButton = document.getElementById(
      "double-button"
    ) as HTMLButtonElement;
    doubleButton.addEventListener("click", async () => {
      const card = this.deck.drawOne();
      user.double(card);
      this.table.updateCountingScore(card);
      this.view.updateChallengerInfoDisplay(user);
      await sleep(800);
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
      this.gamePhaseController();
    });
  }

  public async processBotAndDealerTurn() {
    await sleep(200);
    const bots = getAllBotsInTable(this.table);
    for (let bot of bots) {
      await sleep(1000);
      this.view.highlightCurrentPlayer(bot);
      await sleep(1000);
      while (!bot.isTurnEnd) {
        this.table.botMakeAction(bot);
        this.view.updateChallengerInfoDisplay(bot);
        await sleep(1000);
      }
      this.view.highlightCurrentPlayer(bot);
    }

    await sleep(800);
    const dealer = getDealerInTable(this.table);
    this.view.highlightCurrentPlayer(dealer);
    await sleep(1000);
    dealer.flipCard();
    this.view.updateDealerInfoDisplay(dealer);
    if (dealer.isBlackjack()) {
      dealer.setBlackjack();
      this.view.updateDealerInfoDisplay(dealer);
      await sleep(1000);
      this.view.highlightCurrentPlayer(dealer);
      this.gamePhaseController();
      return;
    }

    while (!dealer.isTurnEnd) {
      await sleep(1000);
      this.table.dealerMakeActioin(dealer);
      this.view.updateDealerInfoDisplay(dealer);
    }
    await sleep(1000);
    this.view.highlightCurrentPlayer(dealer);
    this.gamePhaseController();
  }
}
