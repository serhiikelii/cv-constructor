
# Задача: Логика и База Данных секции "Навыки" (Smart Skills Selector)

**Цель:** Реализовать интерфейс выбора навыков, который работает как конструктор. Пользователь не должен мучительно вспоминать, что он умеет. Система должна предлагать ему профессиональные наборы (Presests) в зависимости от выбранной роли, исключая "воду" и клише.

---

## 1. UX/UI Логика Конструктора (Как это работает)

Вместо одного пустого поля ввода, интерфейс делится на две зоны:

### А. Зона выбранных навыков (My Skills)
*   **Вид:** Область с добавленными "чипсами" (тегами).
*   **Действия:**
    *   Клик на крестик (x) — удаляет навык.
    *   Drag & Drop — меняет порядок (важные навыки должны быть первыми).

### Б. Зона предложений (Suggestions Cloud)
*   **Вид:** Облако тегов под полем ввода.
*   **Фильтрация по категориям:** Вверху табы: `Разработка`, `Дизайн`, `Маркетинг`, `Менеджмент`, `Soft Skills`.
*   **Поиск:** При вводе текста в инпут, облако фильтруется в реальном времени.
*   **Действие:** Клик по тегу в облаке -> Мгновенно переносит его в "My Skills" и убирает из предложений.

### В. Сценарий "Быстрый старт"
1.  Пользователь выбирает свою роль в начале (например, "Frontend Developer").
2.  Система автоматически подгружает топ-10 навыков для этой роли в "Предложения".

---

## 2. База Данных Навыков (JSON Data Source)
Ниже представлена структура данных без "воды" (стрессоустойчивости и коммуникабельности). Используй этот список для наполнения базы данных приложения.

### Категория 1: IT & Development (Разработка)

**Core Tech:**
*   `JavaScript` `TypeScript` `Python` `Java` `C#` `C++` `Go (Golang)` `PHP` `Ruby` `Swift` `Kotlin` `Rust` `SQL`

**Frontend:**
*   `React` `Next.js` `Vue.js` `Angular` `HTML5` `CSS3` `SASS/SCSS` `Tailwind CSS` `Redux` `Zustand` `Webpack` `Vite`

**Backend & Database:**
*   `Node.js` `Express` `NestJS` `Django` `Spring Boot` `.NET Core` `PostgreSQL` `MongoDB` `MySQL` `Redis` `GraphQL` `REST API`

**DevOps & Tools:**
*   `Git` `GitHub/GitLab` `Docker` `Kubernetes` `AWS` `Azure` `Google Cloud` `CI/CD` `Linux` `Nginx` `Terraform` `Jenkins`

### Категория 2: Design & Creative (Дизайн)

**Tools:**
*   `Figma` `Adobe Photoshop` `Adobe Illustrator` `Adobe After Effects` `Adobe InDesign` `Sketch` `Cinema 4D` `Blender` `Miro` `ProtoPie`

**Disciplines:**
*   `UI Design` `UX Research` `Prototyping` `Wireframing` `User Testing` `Design Systems` `Typography` `Color Theory` `Motion Design` `3D Modeling` `Branding`

### Категория 3: Product & Project Management (Менеджмент)

**Methodologies:**
*   `Agile` `Scrum` `Kanban` `Waterfall` `Lean` `Six Sigma`

**Skills & Processes:**
*   `Roadmap Planning` `Backlog Grooming` `Sprint Planning` `Stakeholder Management` `Risk Management` `Resource Planning` `User Stories` `A/B Testing` `Product Strategy` `OKRs` `KPI Tracking`

**Tools:**
*   `Jira` `Confluence` `Trello` `Asana` `Notion` `Monday.com` `Linear` `Microsoft Project`

### Категория 4: Marketing & Analytics (Маркетинг)

**Digital Marketing:**
*   `SEO` `SEM` `Google Ads` `Facebook Ads` `Content Marketing` `Email Marketing` `SMM` `Copywriting` `Affiliate Marketing` `Growth Hacking`

**Analytics & Data:**
*   `Google Analytics 4` `Google Tag Manager` `Yandex Metrica` `Excel (Advanced)` `Tableau` `Power BI` `SQL for Analytics` `Python (Pandas)` `Data Visualization`

**CRM & Tools:**
*   `Salesforce` `HubSpot` `Mailchimp` `WordPress` `Shopify` `Zapier`

### Категория 5: Business & Sales (Бизнес и Продажи)

**Skills:**
*   `B2B Sales` `B2C Sales` `Cold Calling` `Lead Generation` `Negotiation` `Account Management` `Contract Law` `Financial Modeling` `Budgeting` `Market Research` `Business Strategy` `Public Speaking`

### Категория 6: Professional Soft Skills (Софт-скиллы без воды)
Только то, что ценится в современной корпоративной культуре.

*   `Cross-functional Collaboration` (Кросс-функциональное взаимодействие)
*   `Mentoring` (Наставничество/Обучение)
*   `Team Leadership` (Управление командой)
*   `Conflict Resolution` (Разрешение конфликтов)
*   `Critical Thinking` (Критическое мышление)
*   `Strategic Planning` (Стратегическое планирование)
*   `Adaptability` (Адаптивность к изменениям)
*   `Time Management` (Тайм-менеджмент)
*   `Remote Work` (Эффективная удаленная работа)
*   `Presentation Skills` (Навыки презентации)

---

## 3. Техническая реализация (Код)

**Структура данных для компонента `SkillsSelector`:**

```typescript
type SkillCategory = 'Development' | 'Design' | 'Marketing' | 'Management' | 'Soft Skills';

interface SkillSuggestion {
  id: string;
  name: string;
  category: SkillCategory;
  popular: boolean; // Если true, показываем в топе
}

// Пример массива данных
export const SKILLS_DATABASE: SkillSuggestion[] = [
  { id: '1', name: 'React', category: 'Development', popular: true },
  { id: '2', name: 'Figma', category: 'Design', popular: true },
  { id: '3', name: 'Agile', category: 'Management', popular: true },
  // ... и так далее весь список выше
];
```

## 4. План действий разработчика
1.  Создать файл `data/skillsDb.ts` и скопировать туда массивы из раздела 2.
2.  Создать компонент `SkillsInput.tsx`.
3.  Реализовать фильтрацию: `SKILLS_DATABASE.filter(s => s.name.toLowerCase().includes(input))`
4.  Добавить логику "Add Custom Skill": Если пользователь ввел то, чего нет в базе, он нажимает Enter, и навык все равно добавляется. Мы не ограничиваем пользователя только нашей базой.



```


● ✅ Build успешен! Исправил ошибку.

  Проблема: В localStorage хранятся старые данные со структурой technical вместо новой hardSkills, tools, softSkills.

  Решение - выбери один из способов:

  Вариант 1: Очистить localStorage (быстро)

  1. Открой DevTools (F12)
  2. Application → Local Storage
  3. Найди ключ cv-constructor-resume
  4. Удали его (правый клик → Delete)
  5. Обнови страницу (F5)

  Вариант 2: Загрузить Demo Data

  Если в интерфейсе есть кнопка "Load Demo Data" - нажми её, это обновит данные на новую структуру.

  Вариант 3: Консоль браузера

  localStorage.removeItem('cv-constructor-resume')
  location.reload()

  После очистки всё заработает! 🚀

  Что исправлено:
  - Добавлены fallback'и для currentData.skills (защита от undefined)
  - Обновлена проверка перед отображением selected skills
  - Build успешен

  Попробуй ещё раз после очистки localStorage! 👍
