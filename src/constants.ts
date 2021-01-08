export enum APP_TEXT {
  ENTER = 'Вход',
  REGISTRATION = 'Регистрация',
  REGISTRATION_BTN_TEXT = 'Зарегистрироваться',
  AUTH_TEXT = 'Авторизоваться',
  ERROR_EMAIL = 'Не корректный email'
}

export enum API_URL {
  DOMAIN = 'https://ya-praktikum.tech/api/v2/',
  SIGN_IN = 'auth/signin',
  LEADERBOARD_ALL = 'leaderboard/all',
  SIGN_UP = '/auth/signup'
}

export const APP_REGULAR = {
  VALID_EMAIL: /^([\w-.*]+@([\w-]+\.)+[\w-]{2,4})?$/
};
