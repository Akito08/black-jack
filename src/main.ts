import { Dealer } from "./models/Dealer";
import { User } from "./models/User";
import { BasicStrategyBot } from "./models/BasicStrategyBot";

const dealer = new Dealer("Dealer");
const user = new User("akito");
const bot1 = new BasicStrategyBot("Bot1");
bot1.makeBet();
console.log(dealer);
console.log(bot1);
console.log(user);
