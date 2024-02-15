import { Action } from "../types";

export interface Bot {
  makeBet(): void;
  decideAction(dealerUpcard: number): Action;
}
