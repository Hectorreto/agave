import { DefaultTheme, Theme } from '@react-navigation/native';

export const Colors = {
  NEUTRAL: '#FEFEFE',
  NEUTRAL_50: '#FBFBFB',
  NEUTRAL_100: '#F1F8FB',
  NEUTRAL_200: '#E0E8EC',
  NEUTRAL_400: '#A6B1B9',
  NEUTRAL_600: '#6E7981',
  NEUTRAL_700: '#545D63',
  PRIMARY: '#33B3E8',
  PRIMARY_100: '#CAEDFC',
  PRIMARY_700: '#054B67',
  SECONDARY: '#65B22E',
};

export const NavigationTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.PRIMARY,
    background: Colors.NEUTRAL,
    card: Colors.NEUTRAL_50,
    text: Colors.PRIMARY_700,
    border: DefaultTheme.colors.border,
    notification: DefaultTheme.colors.notification,
  },
};
