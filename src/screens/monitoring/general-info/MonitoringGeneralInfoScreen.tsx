import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import TabQuadrants from './TabQuadrants';
import TabQualifications from './TabQualifications';
import styles from './styles';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';

type Props = MaterialTopTabScreenProps<MonitoringTabsParamList, 'MonitoringGeneralInfo'>;
type Tabs = 'qualifications' | 'quadrants';

const MonitoringGeneralInfoScreen = ({ route }: Props) => {
  const { monitoring } = route.params;
  const [tab, setTab] = useState<Tabs>('qualifications');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'MonitoringBoard' },
          { label: 'Información general', screen: 'MonitoringGeneralInfo' },
        ]}
        active="MonitoringGeneralInfo"
      />

      <View style={styles.buttonToggleContainer}>
        <TouchableOpacity
          onPress={() => setTab('qualifications')}
          disabled={tab === 'qualifications'}
          style={[
            styles.buttonToggle,
            styles.buttonToggleLeft,
            tab === 'qualifications' && styles.buttonToggleActive,
          ]}>
          <Text
            style={[
              styles.buttonToggleText,
              tab === 'qualifications' && styles.buttonToggleTextActive,
            ]}>
            Calificación
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('quadrants')}
          disabled={tab === 'quadrants'}
          style={[
            styles.buttonToggle,
            styles.buttonToggleRight,
            tab === 'quadrants' && styles.buttonToggleActive,
          ]}>
          <Text
            style={[styles.buttonToggleText, tab === 'quadrants' && styles.buttonToggleTextActive]}>
            Cuadrantes
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'qualifications' && <TabQualifications monitoring={monitoring} />}
      {tab === 'quadrants' && <TabQuadrants monitoring={monitoring} />}
    </ScrollView>
  );
};

export default MonitoringGeneralInfoScreen;
