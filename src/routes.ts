import { SignIn, SignUp, Home, Game, Leaderboard, Forums, Forum, Profile } from './pages';
import { PublicLayout, PrivateLayout } from './layouts';

export const routes = {
  forum: {
    name: 'forum',
    path: '/forum/:id',
    component: Forum,
    layout: PrivateLayout,
    exact: true,
  },
  forums: {
    name: 'forums',
    path: '/forum',
    component: Forums,
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
  signUp: {
    name: 'signUp',
    path: '/sign-up',
    component: SignUp,
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
  leaderboard: {
    name: 'leaderboard',
    path: '/leaderboard',
    component: Leaderboard,
    layout: PrivateLayout,
    exact: true,
  },
  profile: {
    name: 'profile',
    path: '/profile',
    component: Profile,
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
};
