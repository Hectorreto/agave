import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import ArrowDropDown from '../../../../assets/svg/arrow_drop_down.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import PropertyTabIndicator from '../../../components/property-tab-indicator/PropertyTabIndicator';
import { formatDateTime } from '../../../utils/dateUtils';

const data = [
  {
    id: '1',
    type: 'Fitosanitaria',
    plants: '###',
    date: new Date(2023, 7, 8, 15, 34),
  },
  {
    id: '2',
    type: 'Para monitoreo',
    plants: '###',
    date: new Date(2023, 7, 6, 10, 3),
  },
  {
    id: '3',
    type: 'Fitosanitaria',
    plants: '###',
    date: new Date(2023, 7, 1, 9, 41),
  },
];

const PropertyPlantExitsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyTabIndicator active={3} />
      <View style={styles.filterContainer}>
        <FilterAlt style={styles.filterLeftIcon} />
        <Text style={styles.filterText}>Fecha de monitoreo</Text>
        <ArrowDropDown style={styles.filterRightIcon} />
      </View>
      <View style={styles.map} />
      <View style={styles.newItemContainer}>
        <CustomButton color="blue" text="Nueva salida" Icon={AddCircle} onPress={() => {}} />
      </View>
      <Divider />
      <PaginatedTable
        titles={['Tipo de salida', 'Plantas', 'Fecha', '']}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.type}</Text>,
            <Text style={styles.dataText}>{value.plants}</Text>,
            <Text style={styles.formattedDate}>{formatDateTime(value.date)}</Text>,
            <View style={styles.moreButton}>
              <CustomButton color="blueWhite" Icon={MoreVert} onPress={() => {}} />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default PropertyPlantExitsScreen;
