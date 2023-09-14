import { ScrollView, View } from 'react-native';

import styles from './styles';
import PropertyTabIndicator from '../../../components/property-tab-indicator/PropertyTabIndicator';

const PropertyPlantExitsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyTabIndicator active={3} />
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

export default PropertyPlantExitsScreen;
