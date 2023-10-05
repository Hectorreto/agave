import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
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

const CreateApplication3Screen = ({ navigation, route }: Props) => {
  const { application, products } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['', '', 'Ticket', '']} current={3} />

      <PaginatedTable
        titles={[
          <Text style={styles.tableTitleText}>Producto</Text>,
          <Text style={styles.tableTitleText}>Cantidad total</Text>,
        ]}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.product}</Text>,
            <Text style={styles.dataText}>{value.total}</Text>,
          ],
        }))}
      />

      <View style={styles.pdfButton}>
        <CustomButton color="white" text="Ver receta en PDF" onPress={() => {}} />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton
          color="blue"
          text="Siguiente"
          onPress={() => navigation.navigate('CreateApplication4', { application, products })}
        />
      </View>
    </ScrollView>
  );
};

export default CreateApplication3Screen;
