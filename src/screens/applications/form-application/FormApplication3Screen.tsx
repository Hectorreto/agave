import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { FormContext } from '../../../contexts/notification-context/FormContext';
import useGeneratePDF from '../../../hooks/useGeneratePDF';
import { ApplicationFormStackParamList } from '../../../navigation/ApplicationFormStack';
import { Application, getProducts } from '../../../services/applicationService';
import { Colors } from '../../../themes/theme';

type Props = NativeStackScreenProps<ApplicationFormStackParamList, 'FormApplication3'>;

const FormApplication3Screen = ({ navigation }: Props) => {
  const { formValue } = useContext(FormContext);
  const application = formValue as Partial<Application>;

  const { viewShotRef, loading, generatePDF } = useGeneratePDF();
  const products = application.products ? getProducts(application.products) : [];

  if (loading) {
    return (
      <ViewShot ref={viewShotRef} style={{ flex: 1, backgroundColor: Colors.NEUTRAL }}>
        <PaginatedTable
          showFooter={false}
          flex={[3, 2]}
          titles={[
            <Text style={[styles.tableTitleText]}>Producto</Text>,
            <Text style={styles.tableTitleText}>Cantidad total</Text>,
          ]}
          rows={products.map((value, index) => ({
            id: `${index}`,
            values: [
              <Text style={styles.dataText}>{value.name}</Text>,
              <Text style={styles.dataText}>{value.amount}</Text>,
            ],
          }))}
        />
      </ViewShot>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['', '', 'Ticket', '']} current={3} />

      <PaginatedTable
        showFooter={false}
        flex={[3, 2]}
        titles={[
          <Text style={[styles.tableTitleText]}>Producto</Text>,
          <Text style={styles.tableTitleText}>Cantidad total</Text>,
        ]}
        rows={products.map((value, index) => ({
          id: `${index}`,
          values: [
            <Text style={styles.dataText}>{value.name}</Text>,
            <Text style={styles.dataText}>{value.amount}</Text>,
          ],
        }))}
      />

      <View style={styles.pdfButton}>
        <CustomButton color="white" text="Ver receta en PDF" onPress={generatePDF} />
      </View>

      <View style={{ flex: 1 }} />
      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Anterior" onPress={() => navigation.goBack()} />
        <CustomButton
          color="blue"
          text="Siguiente"
          onPress={() => navigation.navigate('FormApplication4')}
        />
      </View>
    </ScrollView>
  );
};

export default FormApplication3Screen;
