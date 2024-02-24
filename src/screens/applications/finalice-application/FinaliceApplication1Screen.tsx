import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'FinaliceApplication1'>;

const FinaliceApplication1Screen = ({ navigation, route }: Props) => {
  const { applicationId } = route.params;
  const data: any[] = []; // TODO
  // const { data } = useProducts({ applicationId });
  const [amounts, setAmounts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    for (let i = 0; i < data.length; i++) {
      if (!amounts[i]) return;
    }

    const products = data.map((product, index) => ({
      ...product,
      realAmount: amounts[index],
    }));

    navigation.navigate('FinaliceApplication2', { applicationId, products });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['Ticket', 'Finalizar aplicación']} current={1} />
      <PaginatedTable
        showFooter={false}
        flex={[3, 2, 2]}
        titles={[
          <Text style={styles.tableTitleText}>Producto</Text>,
          <Text style={styles.tableTitleText}>Cant. total</Text>,
          <Text style={styles.tableTitleText}>Cant. real</Text>,
        ]}
        rows={data.map((value, index) => ({
          id: value.id,
          values: [
            <Text style={styles.tableText}>{value.name}</Text>,
            <Text style={styles.tableText}>{value.amount}</Text>,
            <View style={styles.tableInput}>
              <InputText
                placeholder="###"
                value={amounts[index]}
                onChange={(text) => {
                  const copyAmounts = [...amounts];
                  copyAmounts[index] = text;
                  setAmounts(copyAmounts);
                }}
                submitted={submitted}
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
        <CustomButton color="blue" text="Siguiente" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default FinaliceApplication1Screen;
