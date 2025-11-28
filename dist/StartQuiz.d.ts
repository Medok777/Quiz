export declare class StartQuiz {
    startButton: HTMLButtonElement | null;
    containerQuestions: HTMLDivElement | null;
    backBtn: HTMLButtonElement | null;
    private currentIndex;
    private questions;
    private timer;
    constructor();
    openTest(): void;
    private renderTest;
    progressBar(): void;
    btnNextQuestions(): void;
    btnBackQuestions(): void;
    private nextQuestions;
    private backQuestions;
    private updateTime;
}
//# sourceMappingURL=StartQuiz.d.ts.map