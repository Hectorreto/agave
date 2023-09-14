import { ScrollView, View } from 'react-native';

import PropertyTabIndicator from '../../../components/property-tab-indicator/PropertyTabIndicator';
import styles from '../../applications/list-application/styles';

const PropertyBoardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyTabIndicator active={1} />
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

export default PropertyBoardScreen;
