import { Table } from "../models/Table";
import { View } from "../views/view";

export class Controller {
  startPage = document.getElementById("start-page") as HTMLElement;
  gameType: string;
  userName: string;
  table: Table;
  view: View;
  constructor(gameType: string, userName: string) {
    this.gameType = gameType;
    this.userName = userName;
    this.table = new Table(gameType, userName);
    this.startPage.classList.add("hidden");
    this.view = new View(this.table);
    //this.view.renderBettingModal();
    //this.setupBetActions();

    //actingPageのテスト
    this.view.renderActingPage();
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
    const user = this.table.getUser();
    if (user) {
      user.resetBet();
      this.view.updateBetAndChipsDisplay(user);
    }
  }

  userMakeBet(chipValue: number) {
    const user = this.table.getUser();
    if (user) {
      user.makeBet(chipValue);
      this.view.updateBetAndChipsDisplay(user);
    }
  }
}
