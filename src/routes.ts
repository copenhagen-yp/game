import { SignIn, Home, Game } from './pages';
import { PublicLayout, PrivateLayout } from './layouts';

export const routes = {
  signIn: {
    name: 'signIn',
    path: '/sign-in',
    component: SignIn,
    layout: PublicLayout,
    exact: true,
  },
  game: {
    name: 'game',
    path: '/play',
    component: Game,
    layout: PrivateLayout,
    exact: true,
  },
  home: {
    name: 'home',
    path: '/',
    component: Home,
    layout: PrivateLayout,
    exact: true,
  },
}