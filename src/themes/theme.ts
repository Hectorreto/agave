import { DefaultTheme, Theme } from '@react-navigation/native';

export const Colors = {
  NEUTRAL: '#FEFEFE',
  NEUTRAL_50: '#FBFBFB',
  NEUTRAL_100: '#F1F8FB',
  NEUTRAL_200: '#E0E8EC',
  NEUTRAL_300: '#BBC6CE',
  NEUTRAL_400: '#A6B1B9',
  NEUTRAL_500: '#88939B',
  NEUTRAL_600: '#6E7981',
  NEUTRAL_700: '#545D63',
  NEUTRAL_800: '#30363A',
  PRIMARY: '#33B3E8',
  PRIMARY_100: '#CAEDFC',
  PRIMARY_300: '#7ED0F1',
  PRIMARY_400: '#57C6F3',
  PRIMARY_600: '#0679A6',
  PRIMARY_700: '#054B67',
  PRIMARY_800: '#001C27',
  SECONDARY: '#65B22E',
  ALERT_RED: '#EB5E55',
  ALERT_RED_2: '#F8746B',
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

export const shadowStyle = {
  backgroundColor: Colors.NEUTRAL,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};
