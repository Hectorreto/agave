import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputNumber from '../../../components/input-number/InputNumber';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { FormContext } from '../../../contexts/notification-context/FormContext';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import { ApplicationFinalizeFormStackParamList } from '../../../navigation/ApplicationFinalizeFormStack';
import { Application, Product } from '../../../services/applicationService';
import { parseArray } from '../../../utils/arrayUtils';

type Props = NativeStackScreenProps<ApplicationFinalizeFormStackParamList, 'FinaliceApplication1'>;

const FinaliceApplication1Screen = ({ navigation, route }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { formValue, setFormValue } = useContext(FormContext);
  const application = formValue as Application;
  const setApplication = setFormValue as (value: Application) => void;

  const products: Product[] = parseArray(application.products);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (products.some((product) => !product.realAmount)) {
      return showNotification('Formulario incompleto', 'incorrect');
    }

    navigation.navigate('FinaliceApplication2');
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
        rows={products.map((value, index) => ({
          id: `${index}`,
          values: [
            <Text style={styles.tableText}>{value.name}</Text>,
            <Text style={styles.tableText}>{value.amount}</Text>,
            <View style={styles.tableInput}>
              <InputNumber
                placeholder="###"
                value={products[index].realAmount ?? ''}
                onChange={(value) => {
                  if (value.match(/^\d*$/g)) {
                    const copyProducts = [...products];
                    copyProducts[index].realAmount = value;
                    setApplication({ ...application, products: JSON.stringify(copyProducts) });
                  }
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
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Siguiente" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default FinaliceApplication1Screen;
