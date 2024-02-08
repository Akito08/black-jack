import { Deck } from "./Deck";
import { BasicStrategyBot } from "./BasicStrategyBot";
import { User } from "./User";
import { Dealer } from "./Dealer";

export class Table {
  readonly gameType: string;
  readonly userName: string;
  public gamePhase: string;
  public resultLog: string[];
  public deck: Deck;
  public players: (User | BasicStrategyBot | Dealer)[];

  constructor(gameType: string, userName: string) {
    this.gameType = gameType;
    this.userName = userName;
    this.deck = new Deck();
    this.gamePhase = "Betting";
    this.resultLog = [];
    this.players = [];
    this.players.push(new BasicStrategyBot("Bot1"));
    this.players.push(new User(userName));
    this.players.push(new BasicStrategyBot("Bot2"));
    this.players.push(new Dealer("Dealer"));
  }

  public botMakeBet(): void {
    for (let player of this.players) {
      if (player instanceof User) continue;
      if (player instanceof Dealer) continue;
      player.makeBet();
    }
  }

  public assignPlayerHands(): void {
    for (let player of this.players) {
      player.drawCard(this.deck.drawOne());
      player.drawCard(this.deck.drawOne());
    }
  }
}
