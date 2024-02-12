import { Table } from "../models/Table";
import { User } from "../models/User";
import {
  getUserInTable,
  getDealerInTable,
  getBasicStrategyBotInTable,
  getPerfectStrategyBotInTable,
  sleep,
} from "../utils/helper";
import { Player } from "../interface/Player";
import { BasicStrategyBot } from "../models/BasicStrategyBot";
import { PerfectStrategyBot } from "../models/PerfectStrategyBot";
import { Dealer } from "../models/Dealer";

export class View {
  root: HTMLElement;
  table: Table;
  constructor(table: Table) {
    this.root = document.getElementById("root") as HTMLElement;
    this.table = table;
  }

  renderBettingModal() {
    const user = getUserInTable(this.table);

    this.root.innerHTML = `
    <section id="betting-modal">
        <div class="bg-white rounded-lg text-center h-1/2 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 id="user-bet" class="font-bold text-3xl mt-10 mb-5 w-full">
            You bet: $${user.betAmount}
          </h2>
          <h2 id="user-chips" class="font-bold text-2xl mb-10 w-full">
            You have $${user.chips} chips
          </h2>
          <div class="flex justify-center items-center space-x-8 mb-12">
            <div
              class="chip-button hover:brightness-125 relative w-24 h-24 rounded-full flex justify-center items-center bg-cover bg-center"
              style="background-image: url('/chips/chip-icon-1.svg')"
              chip-value="5"
            >
              <span class="text-orange-400 font-bold text-xl">5</span>
            </div>
            <div
              class="chip-button hover:brightness-125 relative w-24 h-24 rounded-full flex justify-center items-center bg-cover bg-center"
              style="background-image: url('/chips/chip-icon-2.svg')"
              chip-value="20"
            >
              <span class="text-green-600 font-bold text-xl">20</span>
            </div>
            <div
              class="chip-button hover:brightness-150 relative w-24 h-24 rounded-full flex justify-center items-center bg-cover bg-center"
              style="background-image: url('/chips/chip-icon-3.svg')"
              chip-value="50"
            >
              <span class="text-blue-800 font-bold text-xl">50</span>
            </div>
            <div
              class="chip-button hover:brightness-150 relative w-24 h-24 rounded-full flex justify-center items-center bg-cover bg-center"
              style="background-image: url('/chips/chip-icon-4.svg')"
              chip-value="100"
            >
              <span class="text-purple-800 font-bold text-xl">100</span>
            </div>
          </div>
          <div class="space-x-2">
            <button
              id="deal-button"
              class="font-bold text-white text-2xl h-10 w-60 bg-blue-700 hover:bg-blue-600 rounded-xl"
            >
              Deal
            </button>
            <button
              id="reset-button"
              class="font-bold text-white text-2xl h-10 w-60 bg-red-600 hover:bg-red-500 rounded-xl"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    `;
  }

  updateBetAndChipsDisplay(user: User) {
    const userBetAmountElement = document.getElementById(
      "user-bet"
    ) as HTMLElement;
    const userChipsElement = document.getElementById(
      "user-chips"
    ) as HTMLElement;
    if (userBetAmountElement && userChipsElement) {
      userBetAmountElement.innerText = `You bet: $${user.betAmount}`;
      userChipsElement.innerText = `You have $${user.chips} chips`;
    }
  }

  renderActingPage() {
    const user = getUserInTable(this.table);
    const bot1 = getBasicStrategyBotInTable(this.table);
    const bot2 = getPerfectStrategyBotInTable(this.table);
    const dealer = getDealerInTable(this.table);
    this.root.innerHTML = `
    <section id="acting-page">
    <!-- Dealer ↓ -->
    <div class="w-full h-56 flex flex-col items-center relative mb-9">
      <h3
        id="dealer-name"
        class="text-white text-l my-2 font-bold text-2xl"
      >
        ${dealer.name}
      </h3>
      <div id="dealer-status" class="text-white">${dealer.status}</div>
      <div id="dealer-hand-score" class="text-white mb-4">
        HandScore: ${dealer.getHandScore()}
      </div>
      <div
        id="dealer-hand"
        class="flex space-x-2 justify-center items-center"
      >
      </div>
    </div>
    <!-- Dealer ↑ -->

    <div class="w-full flex justify-around">
      <!-- Bot1 ↓ -->
      <div class="w-1/3 flex flex-col items-center">
        <h3 id="bot1-name" class="text-white my-2 font-bold text-2xl">${
          bot1.name
        }</h3>
        <div id="bot1-status" class="text-white">${bot1.status}</div>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div id="bot1-hand-score" class="text-white">
            HandScore: ${bot1.getHandScore()}
          </div>
          <div id="bot1-bet-amount" class="text-white">
            Bet: ${bot1.betAmount}
          </div>
          <div id="bot1-chips" class="text-white">Chips: ${bot1.chips}</div>
        </div>
        <div
          id="bot1-hand"
          class="flex space-x-2 justify-center items-center"
        >
          <!-- Bot1の手札を表示 -->
        </div>
      </div>
      <!-- Bot1 ↑ -->

      <!-- User ↓ -->
      <div class="w-1/3 flex flex-col items-center pt-8"">
        <h3 id="${user.name.toLowerCase()}-name" class="text-white my-2 font-bold text-2xl">${
      user.name
    }</h3>
        <div id="${user.name.toLowerCase()}-status" class="text-white">
          Initial
        </div>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div
            id="${user.name.toLowerCase()}-hand-score"
            class="text-white"
          >
            HandScore: ${user.getHandScore()}
          </div>
          <div
            id="${user.name.toLowerCase()}-bet-amount"
            class="text-white"
          >
            Bet: ${user.betAmount}
          </div>
          <div id="${user.name.toLowerCase()}-chips" class="text-white">
            Chips: ${user.chips}
          </div>
        </div>
        <div
          id="${user.name.toLowerCase()}-hand"
          class="flex space-x-2 justify-center items-center"
        >
          <!-- Userの手札を表示 -->
        </div>
      </div>
      <!-- User ↑ -->

      <!-- Bot2 ↓ -->
      <div class="w-1/3 flex flex-col items-center">
        <h3 id="bot2-name" class="text-white my-2 font-bold text-2xl">${
          bot2.name
        }</h3>
        <div id="bot2-status" class="text-white">${bot2.status}</div>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div id="bot2-hand-score" class="text-white">
            HandScore: ${bot2.getHandScore()}
          </div>
          <div id="bot2-bet-amount" class="text-white">
            Bet: ${bot2.betAmount}
          </div>
          <div id="bot2-chips" class="text-white">Chips: ${bot2.chips}</div>
        </div>
        <div
          id="bot2-hand"
          class="flex space-x-2 justify-center items-center"
        >
          <!-- Bot2の手札を表示 -->
        </div>
      </div>
      <!-- Bot2 ↑ -->
    </div>
    <div
      class="text-center h-1/4 w-full absolute bottom-0 left-1/2 -translate-x-1/2 border-t border-black bg-green-800"
    >
      <div class="flex justify-center items-center space-x-44 mt-10">
        <button
          id="stand-button"
          class="action-button w-24 h-24 bg-red-500 hover:bg-red-400 rounded-full flex justify-center items-center border-double border-8 border-white"
        >
          <span class="text-white font-bold">STAND</span>
        </button>
        <button
          id="hit-button"
          class="action-button w-24 h-24 bg-yellow-400 hover:bg-yellow-300 rounded-full flex justify-center items-center border-double border-8 border-white"
        >
          <span class="text-white font-bold">HIT</span>
        </button>
        <button
          id="double-button"
          class="action-button w-24 h-24 bg-indigo-500 hover:bg-indigo-400 rounded-full flex justify-center items-center border-double border-8 border-white"
        >
          <span class="text-white font-bold">DOUBLE</span>
        </button>
      </div>
    </div>
  </section>
    `;
  }

  public updateChallengerInfoDisplay(
    player: User | BasicStrategyBot | PerfectStrategyBot
  ) {
    this.updatePlayerStatus(player);
    this.updateHandScore(player);
    this.updateBetAmount(player);
    this.updateChips(player);
    this.updatePlayerHandDisplay(player);
  }

  public updateDealerInfoDisplay(dealer: Dealer) {
    this.updatePlayerStatus(dealer);
    this.updateHandScore(dealer);
    this.updatePlayerHandDisplay(dealer);
  }

  public updatePlayerHandDisplay(player: Player) {
    const PlayerHandsElememnt = document.getElementById(
      `${player.name.toLowerCase()}-hand`
    ) as HTMLElement;

    PlayerHandsElememnt.innerHTML = "";
    for (let card of player.hand) {
      let container = document.createElement("img");
      container.src = container.className = "h-32 w-24";
      container.src = `/trumps/${card.suit}${card.rank}.gif`;
      PlayerHandsElememnt.appendChild(container);
    }
  }

  public updatePlayerStatus(player: User | BasicStrategyBot | Dealer) {
    const playerStatusElement = document.getElementById(
      `${player.name.toLowerCase()}-status`
    ) as HTMLElement;
    playerStatusElement.innerHTML = `${player.status}`;
  }

  private updateHandScore(player: User | BasicStrategyBot | Dealer) {
    const playerHandScoreElement = document.getElementById(
      `${player.name.toLowerCase()}-hand-score`
    ) as HTMLElement;
    playerHandScoreElement.innerText = `HandScore: ${player.getHandScore()}`;
  }

  private updateBetAmount(player: User | BasicStrategyBot) {
    const playerBetAmountElement = document.getElementById(
      `${player.name.toLowerCase()}-bet-amount`
    ) as HTMLElement;
    playerBetAmountElement.innerText = `Bet: ${player.betAmount}`;
  }

  private updateChips(player: User | BasicStrategyBot) {
    const playerChipsElement = document.getElementById(
      `${player.name.toLowerCase()}-chips`
    ) as HTMLElement;
    playerChipsElement.innerText = `Chips: ${player.chips}`;
  }

  public async disableDoubleButton() {
    await sleep(800);
    const doubleButton = document.getElementById(
      "double-button"
    ) as HTMLButtonElement;
    doubleButton.disabled = true;
    doubleButton.classList.add("opacity-50");
  }

  public async disableAllActionButtons() {
    await sleep(800);
    document.querySelectorAll(".action-button").forEach((element) => {
      const actionButton = element as HTMLButtonElement;
      actionButton.disabled = true;
      actionButton.classList.add("opacity-50");
    });
  }

  public highlightCurrentPlayer(player: Player) {
    const playerNameElement = document.getElementById(
      `${player.name.toLowerCase()}-name`
    ) as HTMLElement;
    if (playerNameElement.classList.contains("text-white")) {
      playerNameElement.classList.remove("text-white");
      playerNameElement.classList.add("text-yellow-500");
      console.log(playerNameElement);
    } else {
      playerNameElement.classList.remove("text-yellow-500");
      playerNameElement.classList.add("text-white");
    }
  }

  renderResultModal() {
    this.root.innerHTML = `
    <section id="result-modal">
      <div
          id="result-list" class="bg-white text-center h-1/2 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-10 pt-14"
        >
      </div>
    </section>`;

    let resultListElement = document.getElementById(
      "result-list"
    ) as HTMLElement;
    for (let result of this.table.resultLog) {
      let resulElement = document.createElement("div");
      resulElement.innerHTML = `
      <div class="font-bold text-3xl">${result}<div>
      `;
      resultListElement.appendChild(resulElement);
    }

    const nextGameButton = document.createElement("button");
    nextGameButton.textContent = "Next Game"; // ボタンのテキストを設定
    nextGameButton.id = "next-game-button"; // ボタンのIDを設定
    nextGameButton.className =
      "font-bold text-white text-2xl mt-4 h-9 w-60 bg-blue-500 hover:bg-blue-400 rounded-xl";
    resultListElement.appendChild(nextGameButton);
  }

  renderGameOverModal() {
    this.root.innerHTML = `
    <section id="game-over-modal">
      <div class="bg-white text-center h-1/3 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">GAME OVER</div>
      </div>
    </section>`;
  }
}
