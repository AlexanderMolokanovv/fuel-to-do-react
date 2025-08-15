# Проект: Нейросетевое проектирование состава топливных композиций

![Статус проекта](https://img.shields.io/badge/status-beta-blue)
[![Деплой](https://img.shields.io/badge/Vercel-Deployed-brightgreen)](https://fuel-to-do-react-4myswvw5i-alexandermolokanovvs-projects.vercel.app/)

Это учебная версия веб-приложения, разработанная для студентов Харбинского политехнического университета, для расчета характеристик топливных композиций для летательных аппаратов с использованием нейросетевых алгоритмов. Проект включает фронтенд (React) и бэкенд (Node.js с Express), обеспечивающие ввод параметров, расчет КПД топлива, дальности полета и стоимости, а также отображение результатов.

## Оглавление

- [Ссылки](#ссылки)
- [Описание](#описание)
- [Структура проекта](#структура-проекта)
- [Технологии](#технологии)
- [Установка и запуск](#установка-и-запуск)
- [Доступные скрипты](#доступные-скрипты)
- [Тестирование](#тестирование)
- [Деплой](#деплой)
- [Примеры использования](#примеры-использования)
- [Решение проблем](#решение-проблем)
- [Контрибьютинг](#контрибьютинг)
- [Дополнительная информация](#дополнительная-информация)
- [Планы на будущее](#планы-на-будущее)
- [Контакты](#контакты)
- [Лицензия](#лицензия)

## Ссылки

- **Текущий деплой**: [fuel-to-do-react-4myswvw5i-alexandermolokanovvs-projects.vercel.app](https://fuel-to-do-react-4myswvw5i-alexandermolokanovvs-projects.vercel.app/)
- **Репозиторий**: [github.com/AlexanderMolokanovv/fuel-to-do-react](https://github.com/AlexanderMolokanovv/fuel-to-do-react)
- **IP-адрес сервера**: `158.160.55.39` (для будущего деплоя)

## Описание

Приложение позволяет:
- Выбирать тип летательного аппарата (самолет, ракета, вертолет) и двигателя.
- Вводить параметры, такие как масса аппарата, объем топливного бака, полезная нагрузка и WSM-коэффициенты.
- Устанавливать ограничивающие параметры (например, температура застывания, плотность, вязкость и др.).
- Отправлять данные на сервер для расчета характеристик топлива.
- Просматривать результаты, включая КПД топлива, дальность полета, стоимость и графики зависимости вязкости и теплоемкости от температуры.

![Скриншот интерфейса](https://1drv.ms/i/c/c13b7c80493a17f0/EfaQTFNW4YpMtUvXXhTVU4UBfSTnG699lDASY3cfk-dzNw?e=MUWItr)
![Скриншот результатов](https://1drv.ms/i/c/c13b7c80493a17f0/ESi21MLEEPlGvWvNRKsy7A8BxdH7eWDHW4oElRMCpYv-fw?e=HHx8W0)

## Структура проекта

### Основные директории
- `/src` — Фронтенд (React-компоненты, стили, API-запросы).
- `/server` — Бэкенд (Node.js/Express API, маршруты, контроллеры, утилиты для расчетов).
- `/src/components` — React-компоненты (App.jsx, Header.jsx, InputComponent.jsx, SliderComponent.jsx, ResultsPage.jsx и др.).
- `/src/blocks` — CSS-стили для компонентов (в стиле БЭМ).
- `/server/routes` — Маршруты API (calculateRoutes.js).
- `/server/controllers` — Контроллеры (calculateController.js).
- `/server/utils` — Утилиты для расчетов (calculations.js).
- `/server/tests` — Тесты для API (calculate.test.js).

### Основные маршруты
- `/` — Главная страница для ввода параметров летательного аппарата.
- `/results` — Страница с результатами расчета (КПД, дальность, стоимость, состав топлива, графики).

## Технологии

- **Фронтенд**: React (18.x), React Router (6.x), Axios, Recharts (для графиков), Jest (для тестирования).
- **Бэкенд**: Node.js (18.x), Express (4.x), Winston (логирование), Supertest (для тестирования API).
- **Стили**: CSS с методологией БЭМ, кастомные шрифты (MADE, MADE-EVO), Normalize.css.
- **Инструменты**: Create React App, Git, Vercel (для деплоя).

**Системные требования**:
- Node.js: >= 18.x
- npm: >= 8.x
- Браузер: Современные версии Chrome, Firefox, Safari.

## Установка и запуск

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/AlexanderMolokanovv/fuel-to-do-react.git
   cd fuel-to-do-react
   ```

2. **Установите зависимости для фронтенда**:
   ```bash
   npm install
   ```

3. **Установите зависимости для бэкенда** (в папке `/server`):
   ```bash
   cd server
   npm install
   ```

4. **Настройте переменные окружения**:
   - Создайте файл `.env` в папке `/server`:
     ```env
     PORT=3001
     ```
   - Для фронтенда, если требуется, настройте `REACT_APP_API_URL` в `.env` в корне проекта:
     ```env
     REACT_APP_API_URL=http://localhost:3001
     ```

5. **Запустите фронтенд**:
   ```bash
   npm start
   ```
   Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

6. **Запустите бэкенд**:
   ```bash
   cd server
   node server.js
   ```
   API будет доступно по адресу [http://localhost:3001](http://localhost:3001).

7. **Сборка исходного кода в текстовый файл** (если требуется):
   ```bash
   chmod +x dump-src.sh dump-serv.sh
   npm run dump-src
   npm run dump-serv
   ```
   Скрипты `dump-src.sh` и `dump-serv.sh` собирают исходный код фронтенда и бэкенда в текстовые файлы.

## Доступные скрипты

В директории проекта доступны следующие команды:

- `npm start` — Запускает фронтенд в режиме разработки ([http://localhost:3000](http://localhost:3000)).
- `npm test` — Запускает тесты фронтенда в интерактивном режиме.
- `npm run build` — Собирает фронтенд для продакшена в папку `build`.
- `npm run eject` — Извлекает конфигурацию Create React App для полной настройки (необратимая операция).

## Тестирование

- **Фронтенд**: Тесты написаны с использованием Jest и React Testing Library (см. `App.test.js`).
- **Бэкенд**: Тесты для API написаны с использованием Supertest (см. `calculate.test.js`).
  Запустите тесты командой:
  ```bash
  npm test
  ```

## Деплой

Текущий деплой размещен на Vercel: [fuel-to-do-react-4myswvw5i-alexandermolokanovvs-projects.vercel.app](https://fuel-to-do-react-4myswvw5i-alexandermolokanovvs-projects.vercel.app/).  
В будущем планируется размещение на сервере с IP `158.160.55.39` или других платформах.

Для деплоя на Vercel:
1. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Выполните деплой:
   ```bash
   vercel
   ```

## Решение проблем

- **Ошибка CORS**: Убедитесь, что сервер настроен с `cors` (`app.use(cors())`) и переменная `REACT_APP_API_URL` указывает на правильный адрес API.
- **Ошибка зависимостей**: Если `npm install` не работает, удалите `node_modules` и `package-lock.json`, затем выполните `npm install` снова.
- **Сервер не запускается**: Проверьте, свободен ли порт `3001` (`lsof -i :3001` на Linux/Mac) и наличие файла `.env` с `PORT=3001`.

## Контрибьютинг

Мы приветствуем вклад в проект! Чтобы внести изменения:
1. Форкните репозиторий.
2. Создайте ветку для изменений: `git checkout -b feature/описание-изменений`.
3. Следуйте кодстайлу (ESLint, Prettier).
4. Создайте pull request с описанием изменений.
5. Убедитесь, что тесты проходят: `npm test`.

Подробности в [CONTRIBUTING.md](CONTRIBUTING.md) (скоро будет добавлен).

## Дополнительная информация

- **Документация Create React App**: [https://create-react-app.dev/](https://create-react-app.dev/)
- **Документация React**: [https://reactjs.org/](https://reactjs.org/)
- **Документация по деплою**: [https://create-react-app.dev/docs/deployment/](https://create-react-app.dev/docs/deployment/)
- **Оптимизация производительности**: [https://create-react-app.dev/docs/analyzing-the-bundle-size/](https://create-react-app.dev/docs/analyzing-the-bundle-size/)

## Планы на будущее

- Реализация полноценной нейросетевой модели для расчета топливных композиций.
- Добавление новых параметров и характеристик для более точных расчетов.
- Интеграция с дополнительными API для анализа данных.
- Улучшение UI/UX на основе пользовательских отзывов.
- Переход на новый сервер для деплоя.

## Контакты

- **GitHub Issues**: [Создать задачу](https://github.com/AlexanderMolokanovv/fuel-to-do-react/issues)
- **Email**: [20230291@hit.edu.cn](mailto:20230291@hit.edu.cn)
- **Discord**: Скоро будет добавлен.

## Лицензия

Проект распространяется под лицензией MIT. Подробности в файле [LICENSE](LICENSE).