import { SignIn, SignUp, Home, Game, Leaderboard, Topic, Forum, Profile } from './pages';
import { PublicLayout, PrivateLayout } from './layouts';

export const routes = {
  forum: {
    name: 'topic',
    path: '/forum/:id',
    component: Topic,
    layout: PrivateLayout,
    exact: true,
    isPrivate: true,
  },
  forums: {
    name: 'forum',
    path: '/forum',
    component: Forum,
    layout: PrivateLayout,
    exact: true,
    isPrivate: true,
  },
  signIn: {
    name: 'signIn',
    path: '/sign-in',
    component: SignIn,
    layout: PublicLayout,
    exact: true,
    isPrivate: false,
  },
  signUp: {
    name: 'signUp',
    path: '/sign-up',
    component: SignUp,
    layout: PublicLayout,
    exact: true,
    isPrivate: false,
  },
  game: {
    name: 'game',
    path: '/play',
    component: Game,
    layout: PrivateLayout,
    exact: true,
    isPrivate: true,
  },
  leaderboard: {
    name: 'leaderboard',
    path: '/leaderboard',
    component: Leaderboard,
    layout: PrivateLayout,
    exact: true,
    isPrivate: true,
  },
  profile: {
    name: 'profile',
    path: '/profile',
    component: Profile,
    layout: PrivateLayout,
    exact: true,
    isPrivate: true,
  },
  home: {
    name: 'home',
    path: '/',
    component: Home,
    layout: PrivateLayout,
    exact: true,
    isPrivate: true,
  },
};
