interface IRenderQuestionOption {
  letter: string;
  text: string;
}

interface IRenderQuestion {
  id: number;
  nameQuestion: string;
  answer: string;
  questions: IRenderQuestionOption[];
}

export class QuestionList extends HTMLElement {
  private questionsIndex: number = 0;
  private questions: IRenderQuestion[] = [
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

  constructor() {
    super();
  }

  private get storedPoints(): number {
    return Number(localStorage.getItem("quiz-points")) || 0;
  }

  private set storedPoints(value: number) {
    localStorage.setItem("quiz-points", String(value));
  }

  public connectedCallback(): void {
    // зарезервированное имя, когда элемент добавлен на страницу
    this.setupIndex(); // Вызываем
  }

  private setupIndex(): void {
    const indexFromHtml = this.dataset.index;

    if (indexFromHtml) {
      this.questionsIndex = Number(indexFromHtml);
    }
    this.init();
  }

  public init(): void {
    const containerList = document.createElement("ul");
    containerList.className = "container-questions";

    this.innerHTML = "";
    let array = this.questions[this.questionsIndex];

    if (!array) return;

    for (let index = 0; index < array.questions.length; index++) {
      const currentOption = array.questions[index];
      if (!currentOption) return;
      const createLi = document.createElement("li");
      createLi.className = "questions";
      createLi.dataset.letter = currentOption.letter;

      createLi.addEventListener("click", (): void => {
        const nameDataset = createLi.dataset.letter;
        const doneQuestion = array.answer;

        optionLetter.style.background = "#fff";
        optionLetter.style.color = "#000";
        createLi.style.border = "1px solid #fff";

        if (nameDataset === doneQuestion) {
          if (nameDataset) {
            createLi.classList.add("blocked");
            this.storedPoints = this.storedPoints + 1;
          }
        }
      });

      const optionLetter = document.createElement("div");
      optionLetter.className = "option-letter";
      optionLetter.innerText = currentOption.letter;

      const optionText = document.createElement("p");
      optionText.className = "option-text";
      optionText.textContent = currentOption.text;

      containerList.appendChild(createLi);
      createLi.appendChild(optionLetter);
      createLi.appendChild(optionText);
    }
    this.appendChild(containerList);
  }
}
customElements.define("question-list", QuestionList);
