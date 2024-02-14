import { Deck } from "./Deck";
import { BasicStrategyBot } from "./BasicStrategyBot";
import { PerfectStrategyBot } from "./PerfectStrategyBot";
import { User } from "./User";
import { Dealer } from "./Dealer";
import {
  getDealerInTable,
  getAllBotsInTable,
  getChallengerInTable,
} from "../utils/helper";
import { GamePhase } from "../types";
import { Challenger } from "./Challenger";

export class Table {
  readonly gameType: string;
  readonly userName: string;
  private gamePhase: GamePhase;
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
    this.players.push(new PerfectStrategyBot("Bot2"));
    this.players.push(new Dealer("Dealer"));
  }

  public getGamePhase(): GamePhase {
    return this.gamePhase;
  }

  public setGamePhase(gamePhase: GamePhase): void {
    this.gamePhase = gamePhase;
  }

  public allBotsMakeBet(): void {
    const bots = getAllBotsInTable(this);
    for (let bot of bots) {
      bot.makeBet();
    }
  }

  public assignPlayerHands(): void {
    for (let player of this.players) {
      player.drawCard(this.deck.drawOne());
      player.drawCard(this.deck.drawOne());
      if (player.isBlackjack()) player.status = "Blackjack";
    }
  }

  public botAct(bot: BasicStrategyBot | PerfectStrategyBot) {
    if (bot.getHandScore() <= 16) bot.hit(this.deck.drawOne());
    else bot.stand();
  }

  public dealerAct(dealer: Dealer) {
    if (dealer.getHandScore() <= 16) dealer.hit(this.deck.drawOne());
    else dealer.stand();
  }

  public processGamePhase() {
    if (this.getGamePhase() === "Betting") {
      this.setGamePhase("Acting");
      this.allBotsMakeBet();
      this.assignPlayerHands();
    } else if (this.getGamePhase() === "Acting") {
      this.setGamePhase("Evaluating");
      this.evaluateWinner();
    } else if (this.getGamePhase() === "Evaluating") {
      this.setGamePhase("Betting");
      this.resetTable();
    }
  }

  //各チャレンジャーとディーラーの勝敗を判定する関数
  private evaluateWinner(): void {
    const dealer = getDealerInTable(this);
    const challengers = getChallengerInTable(this);
    for (let challenger of challengers) {
      let result = "";
      if (challenger.status === "Bust") result = "Lose";
      else if (challenger.status === "Blackjack")
        result = dealer.status === "Blackjack" ? "Draw" : "Win";
      else if (dealer.status === "Bust") result = "Win";
      else result = this.compareWithDealerHand(challenger, dealer);

      const exChallengerChips = challenger.chips + challenger.betAmount;
      if (result === "Win") {
        if (challenger.status === "Blackjack") {
          challenger.chips =
            exChallengerChips + Math.floor(challenger.betAmount * 1.5);
        } else {
          challenger.chips = exChallengerChips + challenger.betAmount;
        }
      } else if (result === "Lose")
        challenger.chips = exChallengerChips - challenger.betAmount;
      else challenger.chips = exChallengerChips;

      const log = `${challenger.name}: ${result} ${exChallengerChips}→${challenger.chips}`;
      this.resultLog.push(log);
    }
  }

  private compareWithDealerHand(
    challenger: Challenger,
    dealer: Dealer
  ): "Win" | "Lose" | "Draw" {
    if (challenger.getHandScore() === dealer.getHandScore()) return "Draw";
    else if (challenger.getHandScore() > dealer.getHandScore()) return "Win";
    else return "Lose";
  }
  private resetTable() {
    this.resultLog = [];
    for (let player of this.players) {
      player.resetState();
    }
  }
}
