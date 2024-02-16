import { Action } from "../types";

export interface Bot {
  makeBet(cardCountingTotal?: number): void;
  decideAction(dealerUpcard: number): Action;
}
