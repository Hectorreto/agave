import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import IconAlert from '../../../../assets/svg/applications/alert.svg';
import IconCheck from '../../../../assets/svg/applications/check.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import useApplications from '../../../hooks/useApplications';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'ListApplications'>;

const MonthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const ListApplicationScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const { data } = useApplications({ search });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={{ width: 270 }}>
          <InputText
            placeholder="Predio o lugar..."
            value={search}
            onChange={setSearch}
            iconRight={<Search />}
          />
        </View>
      </View>
      <PaginatedTable
        titles={[
          <Text style={styles.tableTitleText}>Predio</Text>,
          <Text style={[styles.tableTitleText, { maxWidth: 120 }]}>Mes de aplicación</Text>,
          <Text style={styles.tableTitleText}>Estado</Text>,
          <></>,
        ]}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.propertyName}</Text>,
            <Text style={styles.dataText}>{MonthNames[Number(value.applicationMonth)]}</Text>,
            <>
              {value.state === 'scheduled' && (
                <View style={[styles.statusContainer, styles.statusScheduled]}>
                  <Text style={styles.statusScheduledText}>Programado</Text>
                </View>
              )}
              {value.state === 'inProcess' && (
                <View style={[styles.statusContainer, styles.statusInProcess]}>
                  <Text style={styles.statusInProcessText}>En proceso</Text>
                </View>
              )}
              {value.state === 'finalized' && (
                <View style={[styles.statusContainer]}>
                  <Text>Finalizado</Text>
                </View>
              )}
            </>,
            <View style={styles.moreButton}>
              {value.state === 'scheduled' && (
                <CustomButton
                  small
                  color="white"
                  Icon={IconAlert}
                  text="Iniciar"
                  onPress={() => {
                    navigation.navigate('ApplicationFormStack', { application: value });
                  }}
                />
              )}
              {value.state === 'inProcess' && (
                <CustomButton
                  small
                  color="white"
                  text="Finalizar"
                  Icon={IconCheck}
                  onPress={() =>
                    navigation.navigate('FinaliceApplication1', { applicationId: value.id })
                  }
                />
              )}
              {value.state === 'finalized' && (
                <CustomButton small color="white" text="Finalizar" Icon={IconCheck} />
              )}
            </View>,
          ],
        }))}
      />
      <View style={styles.newItemContainer}>
        <CustomButton
          text="Nueva aplicación"
          color="blue"
          Icon={AddCircle}
          onPress={() => navigation.navigate('ApplicationFormStack')}
        />
      </View>
    </ScrollView>
  );
};

export default ListApplicationScreen;
