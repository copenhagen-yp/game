export enum APP_TEXT {
  ENTER = 'Вход',
  AUTH_TEXT = 'Авторизоваться',
  PROFILE_FORM_TITLE = 'Профиль',
  PROFILE_SUBMIT_BUTTON_TEXT = 'Изменить',
  PASSWORD_FORM_TITLE = 'Изменение пароля',
  DEFAULT_AVATAR = '/images/default_avatar.png',
  REGISTRATION = 'Регистрация',
  REGISTRATION_BTN_TEXT = 'Зарегистрироваться',
  ERROR_EMAIL = 'Не корректный email',
  COMMENT_TITLE = 'Оставить комментарий',
  BTN_SEND = 'Отправить',
  FORUM_TITLE = 'Создать топик',
}

export enum API_URL {
  DOMAIN = 'https://ya-praktikum.tech',
  API_DOMAIN = 'https://ya-praktikum.tech/api/v2/',
  OAUTH_DOMAIN = 'https://oauth.yandex.ru/authorize',
  SIGN_IN = 'auth/signin',
  LEADERBOARD_ALL = 'leaderboard/all',
  LEADERBOARD = 'leaderboard',
  EDIT_PROFILE = 'user/profile',
  GET_USER_INFO = 'auth/user',
  UPDATE_AVATAR = 'user/profile/avatar',
  CHANGE_PASSWORD = 'user/password',
  SIGN_UP = 'auth/signup',
  LOGOUT = 'auth/logout',
  OAUTH_SERVICE_ID = 'oauth/yandex/service-id',
  OAUTH_CODE = 'oauth/yandex',
  FEEDBACK = 'api/feedback',
  THEME = 'api/theme',
  FORUM = 'api/forum/topic',
}

export enum REQUEST_METHOD {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
}

export const APP_REGULAR = {
  VALID_EMAIL: /^([\w-.*]+@([\w-]+\.)+[\w-]{2,4})?$/
};
