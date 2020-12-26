import { SignIn, Home, Game } from './pages';
import { PublicLayout, PrivateLayout } from './layouts';

export const routes = {
  home: {
    name: 'home',
    path: '/home',
    component: Home,
    layout: PrivateLayout,
    exact: true,
  },
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
  }
}