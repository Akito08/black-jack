import { Table } from "./models/Table";

const table = new Table("BlackJack", "akito");
table.botMakeBet();
table.assignPlayerHands();
for (let i = 0; i <= 2; i++) {
  table.players[i].status = "Hit";
}
table.evaluateWinner();
console.log(table.players[0].getHandScore());
console.log(table.players[1].getHandScore());
console.log(table.players[2].getHandScore());
console.log(table.players[3].getHandScore());
console.log(table);

const userHand = document.getElementById("user-hands") as HTMLElement;
let container1 = document.createElement("img");
container1.src = "/trumps/C2.gif";
container1.className = "h-32 w-24";
userHand.appendChild(container1);
let container2 = document.createElement("img");
container2.src = "/trumps/HJ.gif";
container2.className = "h-32 w-24";
userHand.appendChild(container2);
