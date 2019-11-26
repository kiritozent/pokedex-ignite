import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeNavigator from './HomeNavigator';

const PrimaryNav = createSwitchNavigator(
  {
    Main: HomeNavigator,
  },
  {
    initialRouteName: 'Main',
  },
);

export default createAppContainer(PrimaryNav);
