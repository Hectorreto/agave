import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import Visibility from '../../../../assets/svg/visibility16x16.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import useProperties from '../../../hooks/useProperties';
import { PropertyStackParamList } from '../../../navigation/PropertyStack';

type Props = NativeStackScreenProps<PropertyStackParamList, 'ListProperties'>;

const ListPropertyScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const { data } = useProperties({ search });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={{ width: 260 }}>
          <InputText
            placeholder="Nombre, registro o identificador..."
            value={search}
            onChange={setSearch}
            iconRight={<Search />}
          />
        </View>
      </View>
      <PaginatedTable
        flex={[1, 0]}
        titles={[<Text style={styles.tableTitleText}>Predio</Text>, <></>]}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.name}</Text>,
            <View style={styles.moreButton}>
              <CustomButton
                color="blueWhite"
                Icon={Visibility}
                onPress={() => navigation.navigate('PropertyTabs', { propertyId: value.id })}
              />
            </View>,
          ],
        }))}
      />

      <View style={styles.newItemContainer}>
        <CustomButton
          color="blue"
          text="Nuevo predio"
          Icon={AddCircle}
          onPress={() => navigation.navigate('CreateProperty')}
        />
      </View>
    </ScrollView>
  );
};

export default ListPropertyScreen;
