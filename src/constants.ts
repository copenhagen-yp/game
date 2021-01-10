export enum APP_TEXT {
  ENTER = 'Вход',
  AUTH_TEXT = 'Авторизоваться',
  PROFILE_FORM_TITLE = 'Профиль',
  PROFILE_SUBMIT_BUTTON_TEXT = 'Изменить',
  PASSWORD_FORM_TITLE = 'Изменение пароля',
  DEFAULT_AVATAR = '/images/default_avatar.png',
}

export enum API_URL {
  DOMAIN = 'https://ya-praktikum.tech',
  API_DOMAIN = 'https://ya-praktikum.tech/api/v2/',
  SIGN_IN = 'auth/signin',
  LEADERBOARD_ALL = 'leaderboard/all',
  EDIT_PROFILE = 'user/profile',
  GET_USER_INFO = 'auth/user',
  UPDATE_AVATAR = 'user/profile/avatar',
  CHANGE_PASSWORD = 'user/password',
}

export enum REQUEST_METHOD {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
}
