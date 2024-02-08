import { Deck } from "./Deck";
import { BasicStrategyBot } from "./BasicStrategyBot";
import { User } from "./User";
import { Dealer } from "./Dealer";
import { ActiveChallengerStatus } from "../types";

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

  //各プレイヤーとディーラーの勝敗を判定する関数
  public evaluateWinner(): void {
    const dealer = this.players[this.players.length - 1] as Dealer;
    for (let player of this.players) {
      if (player instanceof Dealer) continue;

      let result = "";
      // プレイヤーがBustの場合、自動的に負け
      if (player.status === "Bust") result = "Lose";
      else if (player.status === "Blackjack")
        result = dealer.status === "Blackjack" ? "Draw" : "Win";
      else if (dealer.status === "Bust") result = "Win";
      // 上記以外のケース（Stand, Hit, Double）
      else result = this.compareWithDealerHands(player, dealer);
      const exPlayerChips = player.chips + player.betAmount;
      if (result === "Win" || result === "Lose")
        player.chips = this.updatePlayerChips(player, exPlayerChips, result);
      else player.chips = exPlayerChips;

      const log = `${player.name}: ${result} ${exPlayerChips}→${player.chips}`;
      this.resultLog.push(log);
    }
  }
  //プレイヤーとディーラーのBlackjackとBustの状態は省かれているため、手札の大小を比べれば良い
  public compareWithDealerHands(
    player: User | BasicStrategyBot,
    dealer: Dealer
  ): "Win" | "Lose" | "Draw" {
    if (player.getHandScore() === dealer.getHandScore()) return "Draw";
    else if (player.getHandScore() > dealer.getHandScore()) return "Win";
    else return "Lose";
  }

  public updatePlayerChips(
    player: User | BasicStrategyBot,
    chips: number,
    result: "Win" | "Lose"
  ): number {
    const map: { [key in ActiveChallengerStatus]: number } = {
      Bust: -1,
      Stand: result === "Win" ? 1 : -1,
      Hit: result === "Win" ? 1 : -1,
      Double: result === "Win" ? 1 : -1,
      Blackjack: 1.5,
    };
    return (
      chips +
      Math.floor(
        player.betAmount * map[player.status as ActiveChallengerStatus]
      )
    );
  }
}
