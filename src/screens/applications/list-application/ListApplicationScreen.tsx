import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useApplications } from './helpers';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Create from '../../../../assets/svg/create.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'ListApplications'>;

const ListApplicationScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const { data } = useApplications();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={{ width: 260 }}>
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
          <Text style={styles.tableTitleText}>Mes de aplicación</Text>,
          <Text style={styles.tableTitleText}>Estado</Text>,
          <></>,
        ]}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.property}</Text>,
            <Text style={styles.dataText}>{value.applicationMonth}</Text>,
            <View
              style={[
                styles.statusContainer,
                value.state === 'inProcess' && styles.statusInProcess,
              ]}>
              {value.state === 'inProcess' && <Text>En proceso</Text>}
              {value.state === 'finalized' && <Text>Finalizado</Text>}
            </View>,
            <View style={styles.moreButton}>
              {value.state === 'inProcess' && (
                <CustomButton
                  color="white"
                  Icon={Create}
                  onPress={() => navigation.navigate('FinaliceApplication1')}
                />
              )}
              {value.state === 'finalized' && <CustomButton color="white" Icon={Create} />}
            </View>,
          ],
        }))}
      />
      <View style={styles.newItemContainer}>
        <CustomButton
          text="Nueva aplicación"
          color="blue"
          Icon={AddCircle}
          onPress={() => navigation.navigate('CreateApplication1')}
        />
      </View>
    </ScrollView>
  );
};

export default ListApplicationScreen;
