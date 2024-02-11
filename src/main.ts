import { Controller } from "./controllers/controller";

const userName = document.getElementById("name-input") as HTMLInputElement;
const gameType = document.getElementById(
  "game-type-select"
) as HTMLSelectElement;
const startButton = document.getElementById("start-button") as HTMLElement;
startButton.addEventListener("click", () => {
  if (userName.value.length > 30) {
    alert("30文字以内で名前を入力して下さい");
    userName.value = "";
    return;
  }
  if (userName.value.length === 0) userName.value = "User1";
  new Controller(gameType.value, userName.value);
});
