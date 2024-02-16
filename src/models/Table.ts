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
import { Card } from "./Card";

export class Table {
  readonly gameType: string;
  readonly userName: string;
  private gamePhase: GamePhase;
  public resultLog: string[];
  public deck: Deck;
  private cardCountingScore: number;
  public players: (User | BasicStrategyBot | PerfectStrategyBot | Dealer)[];

  constructor(gameType: string, userName: string) {
    this.gameType = gameType;
    this.userName = userName;
    this.deck = new Deck();
    this.gamePhase = "Betting";
    this.resultLog = [];
    this.cardCountingScore = 0;
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

  public getCardCountingTotal(): number {
    return this.cardCountingScore;
  }

  public updateCountingScore(card: Card): void {
    this.cardCountingScore += card.getCountingNumber();
  }

  public botsMakeBet(): void {
    const bots = getAllBotsInTable(this);
    for (let bot of bots) {
      bot.makeBet(this.getCardCountingTotal());
    }
  }

  public assignPlayerHands(): void {
    for (let player of this.players) {
      for (let i = 0; i < 2; i++) {
        const card = this.deck.drawOne();
        player.drawCard(card);
        this.updateCountingScore(card);
      }
      if (!(player instanceof Dealer) && player.isBlackjack()) {
        player.setBlackjack();
      }
    }
  }

  public botMakeAction(bot: BasicStrategyBot | PerfectStrategyBot) {
    const dealer = getDealerInTable(this);
    const action = bot.decideAction(dealer.getHandScore());
    if (action === "Double") {
      const card = this.deck.drawOne();
      bot.double(card);
      this.updateCountingScore(card);
    } else if (action === "Hit") {
      const card = this.deck.drawOne();
      bot.hit(card);
      this.updateCountingScore(card);
    } else bot.stand();
  }

  public dealerMakeActioin(dealer: Dealer) {
    if (dealer.getHandScore() <= 16) {
      const card = this.deck.drawOne();
      dealer.hit(card);
      this.updateCountingScore(card);
    } else dealer.stand();
  }

  public processGamePhase() {
    if (this.getGamePhase() === "Betting") {
      this.setGamePhase("Acting");
      this.botsMakeBet();
      this.assignPlayerHands();
      const dealer = getDealerInTable(this);
      dealer.flipCard();
      console.log(this.getCardCountingTotal());
    } else if (this.getGamePhase() === "Acting") {
      this.setGamePhase("Evaluating");
      this.evaluateMatchResult();
    } else if (this.getGamePhase() === "Evaluating") {
      this.setGamePhase("Betting");
      this.resetTable();
    }
  }

  //各チャレンジャーとディーラーの勝敗を判定する関数
  private evaluateMatchResult(): void {
    const dealer = getDealerInTable(this);
    const challengers = getChallengerInTable(this);
    for (let challenger of challengers) {
      const result = this.evaluateWinner(challenger, dealer);
      const exChallengerChips = challenger.chips + challenger.betAmount;
      challenger.chips = this.caluculateChallengerChips(
        result,
        challenger,
        exChallengerChips
      );

      const log = `${challenger.name}: ${result} ${exChallengerChips}→${challenger.chips}`;
      this.resultLog.push(log);
    }
  }

  private evaluateWinner(
    challenger: Challenger,
    dealer: Dealer
  ): "Win" | "Lose" | "Draw" {
    if (challenger.status === "Blackjack")
      return dealer.status === "Blackjack" ? "Draw" : "Win";
    if (challenger.status === "Bust") return "Lose";
    if (dealer.status === "Bust") return "Win";
    return this.compareWithDealerHandScore(challenger, dealer);
  }

  private compareWithDealerHandScore(
    challenger: Challenger,
    dealer: Dealer
  ): "Win" | "Lose" | "Draw" {
    if (challenger.getHandScore() === dealer.getHandScore()) return "Draw";
    else if (challenger.getHandScore() > dealer.getHandScore()) return "Win";
    else return "Lose";
  }

  private caluculateChallengerChips(
    result: string,
    challenger: Challenger,
    baseChips: number
  ): number {
    if (result === "Draw") return baseChips;
    else if (result === "Win") {
      return challenger.status === "Blackjack"
        ? baseChips + Math.floor(challenger.betAmount * 1.5)
        : baseChips + challenger.betAmount;
    } else {
      return baseChips - challenger.betAmount;
    }
  }

  private resetTable() {
    this.resultLog = [];
    for (let player of this.players) {
      player.resetState();
    }
  }
}
