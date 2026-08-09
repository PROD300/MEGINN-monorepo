// Образец конфига дашборда. РАБОЧИЙ config.js рядом генерирует директива
// directive_dashboard при подключении — руками это заполнять не нужно.
window.DASHBOARD_CONFIG = {
  // Адрес сбора (директива берёт из деплоя — твой VPS, порт сбора):
  endpoint: "http://123.45.67.89:8787",
  // Адрес живого прототипа (из деплоя) — из него дашборд собирает ссылку U-теста по сценарию:
  prototypeUrl: "https://my-prototype.example",
  // Человекочитаемые имена экранов (слаг → имя); слаг показывается вторичной строкой:
  screens: {
    "/dashboard": "Дашборд",
    "/server-create": "Создание сервера",
    "/server-details": "Параметры сервера",
    "/balance": "Баланс",
    "/topup-amount": "Сумма пополнения",
    "/topup-done": "Пополнение готово"
  },
  // Сценарии: один объект на флоу. id (слаг) — метка U-теста в ссылке и точная привязка сессий.
  flows: [
    { id: "server-create", name: "Создание сервера",
      funnel: ["/dashboard", "/server-create", "/server-details"],
      goal: "/server-details",
      firstClick: { screen: "/dashboard", target: "button: Создать сервер" } },
    { id: "balance-topup", name: "Пополнение баланса",
      funnel: ["/balance", "/topup-amount", "/topup-done"],
      goal: "/topup-done",
      firstClick: { screen: "/balance", target: "button: Пополнить" } }
  ],
  // Если на сборе включён DASH_KEY — директива пропишет ключ сюда:
  key: ""
};
