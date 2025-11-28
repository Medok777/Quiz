export class FinallyWindow extends HTMLElement {
  private number;

  constructor() {
    super();
    this.init();
    this.number = 10;
  }

  public init(): void {
    this.number = Number(localStorage.getItem("quiz-points")) || 0;

    const containerBlock = document.createElement("div");
    containerBlock.className = "results-quiz";

    const icon = document.createElement("i");
    icon.className = "fas fa-chart-bar";

    const headingTitle = document.createElement("h1");
    headingTitle.className = "results-title";

    const currentPoint = document.createElement("span");
    currentPoint.className = "results-point";
    currentPoint.textContent = `${this.number}/10`;

    const resultText = document.createElement("p");
    resultText.className = "results-text";
    let message = "";
    if (this.number <= 4) {
      message =
        "Ваш результат ниже среднего. Не переживайте — вы можете попробовать ещё раз и улучшить свои";
    } else if (this.number <= 7) {
      message =
        "Неплохой результат! Вы справились, но у вас есть куда расти. Отличный повод пройти викторину снова.";
    } else if (this.number <= 10) {
      message = "Прекрасно! Вы показали отличный уровень. Так держать!";
    } else {
      message = "Medok учуял что то подозрительное😑😑😑";
    }
    resultText.textContent = message;

    const reloadBtn = document.createElement("button");
    reloadBtn.className = "reload-quiz";
    reloadBtn.textContent = "Пройти снова";

    const iconBtn = document.createElement("i");
    iconBtn.className = "fas fa-redo";

    containerBlock.appendChild(icon);
    containerBlock.appendChild(headingTitle);
    containerBlock.appendChild(currentPoint);
    containerBlock.appendChild(resultText);
    containerBlock.appendChild(reloadBtn);
    reloadBtn.appendChild(iconBtn);

    this.appendChild(containerBlock);
    this.reloadQuestion();
  }

  private reloadQuestion(): void {
    const reloadBtn = document.querySelector(".reload-quiz");
    if (!reloadBtn) return;
    reloadBtn.addEventListener("click", () => {
      localStorage.setItem("quiz-points", "0");
      window.location.reload();
    });
  }
}
customElements.define("results-quiz", FinallyWindow);
