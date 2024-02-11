import { User } from "../models/User";
import { Table } from "../models/Table";
import { Dealer } from "../models/Dealer";

export const getUserInTable = (table: Table) => {
  return table.players.find((player) => player instanceof User) as User;
};

export const getDealerInTable = (table: Table) => {
  return table.players.find((player) => player instanceof Dealer) as Dealer;
};
