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
  PRIMARY_50: '#EBF9FF',
  PRIMARY_100: '#CAEDFC',
  PRIMARY_200: '#A7E0F8',
  PRIMARY_300: '#7ED0F1',
  PRIMARY_400: '#57C6F3',
  PRIMARY_600: '#0679A6',
  PRIMARY_700: '#054B67',
  PRIMARY_800: '#001C27',
  SECONDARY: '#65B22E',
  SECONDARY_50: '#E8FCD9',
  SECONDARY_200: '#BAF58F',
  ALERT_RED: '#EB5E55',
  ALERT_RED_2: '#F8746B',
  CHART_A: '#5A5D8C',
  CHART_B: '#9ED775',
  CHART_C: '#FEF29D',
  CHART_D: '#84C8CD',
  CHART_E: '#FFB07D',
  CHART_A1: '#1F2142',
  CHART_B1: '#65B22E',
  CHART_C1: '#F4E368',
  CHART_D1: '#009AA6',
  CHART_E1: '#FF8C42',
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
