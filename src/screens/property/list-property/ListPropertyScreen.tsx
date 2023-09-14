import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import Visibility from '../../../../assets/svg/visibility16x16.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { PropertyStackParamList } from '../../../navigation/PropertyStack';

const data = [
  { id: '1', property: 'Nombre del predio' },
  { id: '2', property: 'Nombre del predio' },
  { id: '3', property: 'Nombre del predio' },
  { id: '4', property: 'Nombre del predio' },
  { id: '5', property: 'Nombre del predio' },
  { id: '6', property: 'Nombre del predio' },
  { id: '7', property: 'Nombre del predio' },
];

type Props = NativeStackScreenProps<PropertyStackParamList, 'ListProperties'>;

const ListPropertyScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Nombre, registro o identificador...</Text>
          <Search />
        </View>
      </View>
      <PaginatedTable
        titles={['Predio', '']}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.property}</Text>,
            <View style={styles.moreButton}>
              <CustomButton
                color="blueWhite"
                Icon={Visibility}
                onPress={() => navigation.navigate('PropertyBoard')}
              />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default ListPropertyScreen;
