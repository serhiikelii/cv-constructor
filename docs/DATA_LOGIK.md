Это "Мозг" твоего приложения. Без правильной структуры данных ты не сможешь ни построить форму редактора, ни сгенерировать PDF.

Сохрани этот план как `TASK_DATA_LOGIC.md`.

***

```markdown
# Задача: Проектирование Структуры Данных и Логики (State Management)

**Цель:** Создать надежный слой управления данными. Приложение должно уметь хранить, обновлять и сохранять состояние резюме, используя TypeScript для строгой типизации и Zustand для реактивности.

**Стек:** TypeScript, Zustand (State Manager), Immer (опционально, для удобства мутаций), LocalStorage.

---

## Этап 1: Проектирование Типов Данных (TypeScript Interfaces)
Прежде чем писать код, мы должны договориться, как выглядит объект "Резюме".

- [ ] **Создание файла `types.ts`:**
    - Описать интерфейс `PersonalDetails` (fullName, email, phone, url, summary).
    - Описать интерфейс `ExperienceItem` (id, company, position, startDate, endDate, description, isCurrent).
    - Описать интерфейс `EducationItem` (id, school, degree, startDate, endDate).
    - Описать интерфейс `SkillItem` (id, name, level?).
    - Описать главный интерфейс `ResumeData`, который объединяет всё вышеперечисленное + настройки (выбранный шаблон, цвет акцента).

**Пример структуры:**
```typescript
export interface ResumeData {
  personal: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    city: string;
    linkedin?: string;
    summary: string; // Rich text or plain string
  };
  experience: Array<{
    id: string; // UUID
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
  }>;
  education: Array<any>; // ...аналогично
  skills: string[]; // Или массив объектов, если нужны уровни
  
  // Мета-данные для приложения
  meta: {
    templateId: 'classic' | 'modern' | 'creative';
    primaryColor: string; // hex code
    typography: 'serif' | 'sans';
  };
}
```

## Этап 2: Настройка Zustand Store (Хранилище)
Настройка глобального состояния.

- [ ] **Установка библиотек:**
    - `npm install zustand`
    - `npm install uuid` (для генерации уникальных ID элементам списков).
- [ ] **Создание стора `useResumeStore`:**
    - Инициализировать стор с пустым состоянием (или моковыми данными для теста).
    - Разделить логику на `State` (данные) и `Actions` (функции изменения данных).

## Этап 3: Реализация Actions (Логика изменения)
Функции, которые будет вызывать интерфейс редактора.

- [ ] **Update Actions (Простые поля):**
    - `setPersonalDetails(data: Partial<PersonalDetails>)` — обновляет поля профиля. Используем spread operator `...` чтобы обновлять только переданные поля.
- [ ] **Array Actions (Списки - Опыт/Образование):**
    - `addExperience()` — добавляет пустой объект опыта с новым `id` в массив.
    - `removeExperience(id: string)` — фильтрует массив, удаляя элемент.
    - `updateExperience(id: string, data: Partial<ExperienceItem>)` — находит элемент по ID и обновляет его поля.
    - `reorderExperience(oldIndex, newIndex)` — (на будущее) для Drag & Drop сортировки.
- [ ] **Settings Actions:**
    - `setTemplate(templateId)` — переключение шаблона.
    - `setColor(color)` — смена темы.

## Этап 4: Персистентность (LocalStorage)
Чтобы данные не исчезали при обновлении страницы `F5`.

- [ ] **Подключение Middleware:**
    - Использовать встроенный middleware `persist` из Zustand.
    - Настроить ключ хранения: `name: 'resume-storage'`.
- [ ] **Проверка гидратации (Hydration):**
    - Убедиться, что при загрузке страницы Next.js не ругается на несоответствие серверного и клиентского HTML (Text content does not match server-rendered HTML).
    - *Решение:* Использовать специальный хук или загружать данные только в `useEffect`.

## Этап 5: Подготовка Моковых Данных (Mock Data)
Для разработки шаблонов нам нужно видеть, как они выглядят с текстом, а не пустые поля.

- [ ] **Создание `initialState`:**
    - Создать объект с данными вымышленного "Джона Доу" (Заполненный опыт, образование, длинное описание).
    - Добавить в стор кнопку или метод `loadDemoData()`, чтобы одной кнопкой заполнить форму и проверить верстку шаблона.

---

## Детальный пример кода (для `store.ts`)
*Вставь это в файл задания, чтобы не писать с нуля.*

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData } from './types';

interface ResumeState {
  data: ResumeData;
  actions: {
    updatePersonal: (details: Partial<ResumeData['personal']>) => void;
    addExperience: () => void;
    updateExperience: (id: string, details: Partial<ResumeData['experience'][0]>) => void;
    // ... другие экшены
  };
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      data: { ...initialEmptyState }, // Начальное состояние
      actions: {
        updatePersonal: (details) =>
          set((state) => ({
            data: {
              ...state.data,
              personal: { ...state.data.personal, ...details },
            },
          })),
        // ... реализация остальных экшенов
      },
    }),
    {
      name: 'resume-storage', // Имя ключа в LocalStorage
    }
  )
);
```

## Критерии приемки (Definition of Done)
1.  Я могу вызвать `useResumeStore` в любом компоненте.
2.  Я вижу в Redux DevTools (или консоли), как меняется стейт при вызове экшенов.
3.  После перезагрузки страницы введенные данные остаются на месте.
4.  Типизация TypeScript работает (IDE подсказывает поля `firstName`, `company` и т.д.).
```