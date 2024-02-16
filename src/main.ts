import { Controller } from "./controllers/controller";

const userName = document.getElementById("name-input") as HTMLInputElement;
const gameType = document.getElementById(
  "game-type-select"
) as HTMLSelectElement;
const startButton = document.getElementById("start-button") as HTMLElement;
startButton.addEventListener("click", () => {
  if (userName.value.length > 30) {
    alert("名前を15文字以内で入力して下さい");
    userName.value = "";
    return;
  }
  if (userName.value.length === 0) {
    alert("名前を入力してください");
    return;
  }
  new Controller(gameType.value, userName.value);
});
