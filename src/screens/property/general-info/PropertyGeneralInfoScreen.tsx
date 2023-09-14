import { ScrollView, View } from 'react-native';

import styles from './styles';
import PropertyTabIndicator from '../../../components/property-tab-indicator/PropertyTabIndicator';

const PropertyGeneralInfoScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyTabIndicator active={2} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
      <View style={{ height: 100, borderWidth: 1, margin: 5 }} />
    </ScrollView>
  );
};

export default PropertyGeneralInfoScreen;
