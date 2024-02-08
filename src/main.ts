import { Table } from "./models/Table";

const table = new Table("BlackJack", "akito");
table.botMakeBet();
table.assignPlayerHands();
console.log(table);
