import { Table } from "../models/Table";
import { User } from "../models/User";
import { Dealer } from "../models/Dealer";
import { getUserInTable, getDealerInTable } from "../utils/helper";

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
    const dealer = getDealerInTable(this.table);
    const user = getUserInTable(this.table);
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
      <div id="dealer-hand-score" class="text-white mb-4">HandScore: ${dealer.getHandScore()}</div>
      <div
        id="dealer-hands"
        class="flex space-x-2 justify-center items-center"
      >
        <img src="/trumps/CQ.gif" class="h-32 w-24" />
        <img src="/trumps/HA.gif" class="h-32 w-24" />
      </div>
    </div>
    <!-- Dealer ↑ -->

    <div class="w-full flex justify-around">
      <!-- Bot1 ↓ -->
      <div class="w-1/3 flex flex-col items-center">
        <h3 class="text-white my-2 font-bold text-2xl">Bot1</h3>
        <div class="text-white">Initial</div>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div class="text-white">HandScore: 0</div>
          <div class="text-white">Bet: 0</div>
          <div class="text-white">Chips: 500</div>
        </div>
        <div class="flex space-x-2 justify-center items-center">
          <img src="/trumps/CQ.gif" class="h-32 w-24" />
          <img src="/trumps/HA.gif" class="h-32 w-24" />
        </div>
      </div>
      <!-- Bot1 ↑ -->

      <!-- User ↓ -->
      <div class="w-1/3 flex flex-col items-center">
        <h3 class="text-white my-2 font-bold text-2xl">${user.name}</h3>
        <div class="text-white">Initial</div>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div class="text-white">HandScore: ${user.getHandScore()}</div>
          <div class="text-white">Bet: ${user.betAmount}</div>
          <div class="text-white">Chips: ${user.chips}</div>
        </div>
        <div class="flex space-x-2 justify-center items-center">
          <img src="/trumps/CQ.gif" class="h-32 w-24" />
          <img src="/trumps/HA.gif" class="h-32 w-24" />
        </div>
      </div>
      <!-- User ↑ -->

      <!-- Bot2↓ -->
      <div class="w-1/3 flex flex-col items-center">
        <h3 class="text-white my-2 font-bold text-2xl">Bot2</h3>
        <div class="text-white">Initial</div>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div class="text-white">HandScore: 0</div>
          <div class="text-white">Bet: 0</div>
          <div class="text-white">Chips: 500</div>
        </div>
        <div class="flex space-x-2 justify-center items-center">
          <img src="/trumps/CQ.gif" class="h-32 w-24" />
          <img src="/trumps/HA.gif" class="h-32 w-24" />
        </div>
      </div>
      <!-- Bot2↑ -->
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
}
