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
