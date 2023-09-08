import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import CreateApplicationTabs from './CreateApplicationTabs';
import styles from './style';
import CustomButton from '../../../components/custom-button/CustomButton';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication3'>;

const data = [
  {
    id: '1',
    product: 'Nombre del producto',
    total: '###',
  },
  {
    id: '2',
    product: 'Nombre del producto',
    total: '###',
  },
  {
    id: '3',
    product: 'Nombre del producto',
    total: '###',
  },
  {
    id: '4',
    product: 'Nombre del producto',
    total: '###',
  },
  {
    id: '5',
    product: 'Nombre del producto',
    total: '###',
  },
  {
    id: '6',
    product: 'Nombre del producto',
    total: '###',
  },
];

const CreateApplication3Screen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateApplicationTabs index={3} />

      <PaginatedTable
        titles={['Producto', 'Cantidad total']}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.product}</Text>,
            <Text style={styles.dataText}>{value.total}</Text>,
          ],
        }))}
      />

      <CustomButton color="white" text="Ver receta en PDF" onPress={() => {}} />

      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton
          color="blue"
          text="Siguiente"
          onPress={() => navigation.navigate('CreateApplication4')}
        />
      </View>
    </ScrollView>
  );
};

export default CreateApplication3Screen;
