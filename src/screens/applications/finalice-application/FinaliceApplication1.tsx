import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

const data = [
  {
    id: '1',
    product: 'Nombre de producto',
    total: '###',
  },
  {
    id: '2',
    product: 'Nombre de producto',
    total: '###',
  },
  {
    id: '3',
    product: 'Nombre de producto',
    total: '###',
  },
  {
    id: '4',
    product: 'Nombre de producto',
    total: '###',
  },
  {
    id: '5',
    product: 'Nombre de producto',
    total: '###',
  },
  {
    id: '6',
    product: 'Nombre de producto',
    total: '###',
  },
];

type Props = NativeStackScreenProps<ApplicationStackParamList, 'FinaliceApplication1'>;

const FinaliceApplication1 = ({ navigation }: Props) => {
  const [amounts, setAmounts] = useState<string[]>(data.map(() => ''));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['Ticket', 'Finalizar aplicación']} current={1} />
      <PaginatedTable
        titles={['Producto', 'Cant. total', 'Cant. real']}
        rows={data.map((value, index) => ({
          id: value.id,
          values: [
            <Text style={styles.tableText}>{value.product}</Text>,
            <Text style={styles.tableText}>{value.total}</Text>,
            <View style={styles.tableInput}>
              <InputText
                placeholder="###"
                value={amounts[index]}
                onChange={(text) => {
                  const copyAmounts = [...amounts];
                  copyAmounts[index] = text;
                  setAmounts(copyAmounts);
                }}
              />
            </View>,
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
          onPress={() => navigation.navigate('FinaliceApplication2')}
        />
      </View>
    </ScrollView>
  );
};

export default FinaliceApplication1;
