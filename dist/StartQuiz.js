export class StartQuiz {
    constructor() {
        this.currentIndex = 0;
        this.timer = 0;
        this.startButton = document.querySelector(".btn-start");
        this.containerQuestions = document.querySelector(".quiz-main");
        this.backBtn = document.querySelector(".back-btn");
        this.questions = [
            {
                id: 1,
                nameQuestion: "Что такое 'undefined' в JavaScript?",
                answer: "A",
                questions: [
                    { letter: "A", text: "Отсутствующее значение переменной" },
                    { letter: "B", text: "Пустая строка" },
                    { letter: "C", text: "Число 0" },
                    { letter: "D", text: "Ложное значение" },
                ],
            },
            {
                id: 2,
                nameQuestion: "Что такое замыкание (closure) в JavaScript?",
                answer: "B",
                questions: [
                    { letter: "A", text: "Способ объявления переменных" },
                    { letter: "B", text: "Функция + её лексическое окружение" },
                    { letter: "C", text: "Метод массива" },
                    { letter: "D", text: "Тип данных" },
                ],
            },
            {
                id: 3,
                nameQuestion: "Что такое Promise в JavaScript?",
                answer: "A",
                questions: [
                    { letter: "A", text: "Объект для работы с асинхронными операциями" },
                    { letter: "B", text: "Синхронная функция" },
                    { letter: "C", text: "Тип цикла" },
                    { letter: "D", text: "Метод строки" },
                ],
            },
            {
                id: 4,
                nameQuestion: "Как выбрать элемент по ID в DOM?",
                answer: "C",
                questions: [
                    { letter: "A", text: "document.querySelector()" },
                    { letter: "B", text: "document.getElementsByClassName()" },
                    { letter: "C", text: "document.getElementById()" },
                    { letter: "D", text: "document.findElement()" },
                ],
            },
            {
                id: 5,
                nameQuestion: "Что такое деструктуризация в ES6?",
                answer: "B",
                questions: [
                    { letter: "A", text: "Создание новых объектов" },
                    { letter: "B", text: "Извлечение данных из массивов/объектов" },
                    { letter: "C", text: "Удаление переменных" },
                    { letter: "D", text: "Изменение типов данных" },
                ],
            },
            {
                id: 6,
                nameQuestion: "Что такое прототипное наследование?",
                answer: "D",
                questions: [
                    { letter: "A", text: "Наследование через классы" },
                    { letter: "B", text: "Копирование свойств" },
                    { letter: "C", text: "Импорт модулей" },
                    { letter: "D", text: "Наследование через цепочку прототипов" },
                ],
            },
            {
                id: 7,
                nameQuestion: "Чем отличается map() от forEach()?",
                answer: "A",
                questions: [
                    {
                        letter: "A",
                        text: "map() возвращает новый массив, forEach() — undefined",
                    },
                    { letter: "B", text: "forEach() быстрее map()" },
                    { letter: "C", text: "map() изменяет исходный массив" },
                    { letter: "D", text: "forEach() работает только с числами" },
                ],
            },
            {
                id: 8,
                nameQuestion: "Как создать класс в ES6?",
                answer: "C",
                questions: [
                    { letter: "A", text: "function ClassName() {}" },
                    { letter: "B", text: "var class = {}" },
                    { letter: "C", text: "class ClassName {}" },
                    { letter: "D", text: "new Class()" },
                ],
            },
            {
                id: 9,
                nameQuestion: "Что такое TypeScript?",
                answer: "B",
                questions: [
                    { letter: "A", text: "Новая версия JavaScript" },
                    { letter: "B", text: "Typed superset of JavaScript" },
                    { letter: "C", text: "Библиотека для React" },
                    { letter: "D", text: "Альтернативный язык программирования" },
                ],
            },
            {
                id: 10,
                nameQuestion: "Что такое generics в TypeScript?",
                answer: "D",
                questions: [
                    { letter: "A", text: "Специальные функции" },
                    { letter: "B", text: "Типы для генераторов" },
                    { letter: "C", text: "Методы работы с массивами" },
                    { letter: "D", text: "Обобщённые типы для повторного использования" },
                ],
            },
        ];
    }
    openTest() {
        if (!this.startButton)
            return;
        this.startButton.addEventListener("click", () => {
            this.currentIndex = 0;
            localStorage.setItem("quiz-points", "0");
            this.renderTest();
            this.btnNextQuestions();
            this.btnBackQuestions();
            this.progressBar();
            this.updateTime();
        });
    }
    renderTest() {
        if (!this.containerQuestions)
            return;
        if (this.currentIndex < this.questions.length) {
            this.containerQuestions.innerHTML = `
    <div class="block-progress-bar">
      <div class="quantity-question">
        <p>Вопрос: <span>${this.questions[this.currentIndex]?.id}</span> из <span>${this.questions.length}</span></p>
         <span class="time">00:30</span>
       </div>
       <div class="progress-bar">
          <div class="active-progress"></div>
       </div>
    </div>

   <div class="block-questions">
      <h2 class="questions-text">Вопрос</h2>
        <p class="current-questions-text">
          ${this.questions[this.currentIndex]?.nameQuestion}
        </p>
      <question-list data-index="${this.currentIndex}"></question-list>
     <div class="container-buttons">
      <button class="back-btn">
        <i class="fas fa-arrow-left"></i>Назад
      </button>
      <button class="next-btn">Далее</button>
     </div>
   </div>
    `;
        }
        else {
            this.containerQuestions.innerHTML = `<results-quiz></results-quiz>`;
        }
    }
    progressBar() {
        const activeProgressBar = document.querySelector(".active-progress");
        if (!activeProgressBar)
            return;
        activeProgressBar.style.width = `${this.currentIndex * 12}%`;
    }
    btnNextQuestions() {
        const nextBtn = document.querySelector(".next-btn");
        if (!nextBtn)
            return;
        nextBtn.addEventListener("click", () => this.nextQuestions());
    }
    btnBackQuestions() {
        const backBtn = document.querySelector(".back-btn");
        if (!backBtn)
            return;
        backBtn.addEventListener("click", () => this.backQuestions());
    }
    nextQuestions() {
        if (this.currentIndex < this.questions.length) {
            this.currentIndex++;
        }
        this.renderTest();
        this.progressBar();
        this.btnNextQuestions();
        this.btnBackQuestions();
        this.updateTime();
    }
    backQuestions() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        this.renderTest();
        this.progressBar();
        this.btnNextQuestions();
        this.btnBackQuestions();
        this.updateTime();
    }
    updateTime() {
        if (this.timer)
            clearInterval(this.timer);
        let count = 30;
        const timeEL = document.querySelector(".time");
        if (!timeEL)
            return;
        this.timer = setInterval(() => {
            if (this.currentIndex < this.questions.length - 1) {
                timeEL.textContent = `00:${count}`;
                if (count < 10)
                    timeEL.textContent = `00:0${count}`;
                count--;
                if (count < 0) {
                    if (!this.timer)
                        return;
                    clearInterval(this.timer);
                    this.nextQuestions();
                }
            }
            else
                timeEL.textContent = `00:30`;
        }, 1000);
    }
}
const startClick = new StartQuiz();
startClick.openTest();
//# sourceMappingURL=StartQuiz.js.map