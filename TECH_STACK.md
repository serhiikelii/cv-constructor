# Технологический Стек Проекта (Tech Stack)

## Core (Ядро)
*   **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
    *   *Почему:* Лучшая производительность, удобный роутинг, оптимизация изображений и шрифтов из коробки.
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
    *   *Почему:* Строгая типизация критически важна для объекта "Резюме" (Resume Object). Это предотвратит 90% багов типа "undefined is not a function", когда поле не заполнено.

## UI & Styling (Интерфейс и Стили)
*   **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
    *   *Почему:* Утилитарные классы позволяют верстать быстрее. Легкая настройка отступов для печати (Print modifiers).
*   **Icons:** [Lucide React](https://lucide.dev/)
    *   *Почему:* Легкие, аккуратные SVG иконки, идеально подходящие для профессиональных документов.
*   **Fonts:** [Next/Font](https://nextjs.org/docs/basic-features/font-optimization) (Google Fonts)
    *   *Выбор:* Merriweather (Serif) для шаблона Classic, Inter (Sans) для UI.

## State Management & Forms (Управление данными)
*   **Global State:** [Zustand](https://github.com/pmndrs/zustand)
    *   *Почему:* Проще и легковеснее Redux. Позволяет хранить JSON резюме и обращаться к нему из любого компонента (формы или превью).
*   **Form Handling:** [React Hook Form](https://react-hook-form.com/)
    *   *Почему:* Лучшая библиотека для работы с большими формами. Минимизирует лишние перерисовки (re-renders) страницы при вводе текста.
*   **Validation:** [Zod](https://zod.dev/)
    *   *Почему:* Работает в связке с React Hook Form. Гарантирует, что введенные данные соответствуют ожидаемому формату (например, валидация email).

## PDF & Printing (Генерация документа)
*   **Printing:** Native CSS `@media print`
    *   *Подход:* Мы верстаем идеальную HTML-страницу и используем встроенную печать браузера (Ctrl+P -> Save as PDF).
*   **Helper:** [react-to-print](https://github.com/gregnb/react-to-print)
    *   *Почему:* Упрощает вызов окна печати для конкретного компонента React.

## Dev Tools (Инструменты разработки)
*   **Linter:** ESLint + Prettier
*   **Package Manager:** npm или pnpm