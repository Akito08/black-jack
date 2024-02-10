import { Table } from "../models/Table";
import { User } from "../models/User";

export class View {
  root: HTMLElement;
  table: Table;
  constructor() {
    this.root = document.getElementById("root") as HTMLElement;
    this.table = new Table("Black Jack", "akito");
  }

  renderBettingModal() {
    const user = this.table.players.find(
      (player) => player instanceof User
    ) as User;

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

    const userBetAmountElement = document.getElementById(
      "user-bet"
    ) as HTMLElement;

    const userChipsElement = document.getElementById(
      "user-chips"
    ) as HTMLElement;
    const resetButton = document.getElementById("reset-button") as HTMLElement;

    document.querySelectorAll(".chip-button").forEach((chipButton) => {
      chipButton.addEventListener("click", () => {
        const chipValue = Number(chipButton.getAttribute("chip-value"));
        user.makeBet(chipValue);
        updateDisplay();
      });
    });

    resetButton.addEventListener("click", () => {
      user.resetBet();
      updateDisplay();
    });

    const updateDisplay = () => {
      userBetAmountElement.innerText = `You bet: $${user.betAmount}`;
      userChipsElement.innerText = `You have $${user.chips} chips`;
    };
  }
}
