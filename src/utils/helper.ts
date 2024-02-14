import { User } from "../models/User";
import { Table } from "../models/Table";
import { Dealer } from "../models/Dealer";
import { BasicStrategyBot } from "../models/BasicStrategyBot";
import { PerfectStrategyBot } from "../models/PerfectStrategyBot";
import { Challenger } from "../models/Challenger";

export const getUserInTable = (table: Table) => {
  return table.players.find((player) => player instanceof User) as User;
};

export const getDealerInTable = (table: Table) => {
  return table.players.find((player) => player instanceof Dealer) as Dealer;
};

export const getBasicStrategyBotInTable = (table: Table) => {
  return table.players.find(
    (player) => player instanceof BasicStrategyBot
  ) as BasicStrategyBot;
};

export const getPerfectStrategyBotInTable = (table: Table) => {
  return table.players.find(
    (player) => player instanceof PerfectStrategyBot
  ) as PerfectStrategyBot;
};

export const getAllBotsInTable = (
  table: Table
): Array<BasicStrategyBot | PerfectStrategyBot> => {
  return table.players.filter(
    (player) =>
      player instanceof BasicStrategyBot || player instanceof PerfectStrategyBot
  ) as Array<BasicStrategyBot | PerfectStrategyBot>;
};

export const getChallengerInTable = (table: Table): Array<Challenger> => {
  return table.players.filter(
    (player) => player instanceof Challenger
  ) as Array<Challenger>;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
