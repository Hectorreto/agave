import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

import FormProduct from './FormProduct';
import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputNumber from '../../../components/input-number/InputNumber';
import InputText from '../../../components/input-text/InputText';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { FormContext } from '../../../contexts/notification-context/FormContext';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import useGeneratePDF from '../../../hooks/useGeneratePDF';
import { ApplicationFormStackParamList } from '../../../navigation/ApplicationFormStack';
import { Application, Product } from '../../../services/applicationService';
import { Colors } from '../../../themes/theme';
import { parseArray } from '../../../utils/arrayUtils';

type Props = NativeStackScreenProps<ApplicationFormStackParamList, 'FormApplication2'>;

const FormApplication2Screen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { formValue, setFormValue } = useContext(FormContext);
  const application = formValue as Partial<Application>;
  const setApplication = setFormValue as (value: Partial<Application>) => void;
  const [products, setProducts] = useState<Product[]>(
    application.products ? parseArray(application.products) : []
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [submitted, setSubmitted] = useState(false);
  const { viewShotRef, loading, generatePDF } = useGeneratePDF();

  const handleSubmit = () => {
    setSubmitted(true);

    if (!application.applicationMonth || !application.notes) {
      return showNotification('Formulario incompleto', 'incorrect');
    }
    if (products.length === 0) {
      return showNotification('Agrega al menos un producto', 'incorrect');
    }
    if (products.some((product) => !product.name || !product.amount)) {
      return showNotification('Formulario incompleto', 'incorrect');
    }

    navigation.navigate('FormApplication3');
  };

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
          rows={products.map((product, index) => ({
            id: `${index}`,
            values: [
              <Text style={styles.dataText}>{product.name}</Text>,
              <Text style={styles.dataText}>{product.amount}</Text>,
            ],
          }))}
        />
      </ViewShot>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['', 'Receta', '', '']} current={2} />

      <InputNumber
        label="No. de tambos a aplicar"
        placeholder="Número"
        value={application.containerAmount ?? ''}
        onChange={
          application.id
            ? undefined
            : (value) => {
                if (value.match(/^\d*$/g)) {
                  setApplication({ ...application, containerAmount: value });
                }
              }
        }
        submitted={submitted}
      />
      <InputText
        multiline
        label="Notas"
        placeholder="Escribe una nota"
        value={application.notes ?? ''}
        onChange={
          application.id ? undefined : (value) => setApplication({ ...application, notes: value })
        }
        submitted={submitted}
      />

      {products.map((product, index) => (
        <FormProduct
          key={index}
          product={product}
          onChange={
            application.id
              ? undefined
              : (newProduct) => {
                  const copyProducts = [...products];
                  copyProducts[index] = newProduct;
                  setProducts(copyProducts);
                  setApplication({ ...application, products: JSON.stringify(copyProducts) });
                }
          }
          onPressDelete={
            application.id
              ? undefined
              : () => {
                  setIsModalVisible(true);
                  setSelectedProduct(product);
                }
          }
          submitted={submitted}
        />
      ))}

      {application.id ? undefined : (
        <FormProduct
          product={{ name: '', amount: '' }}
          onPressAdd={() => {
            const listProducts = [...products, { name: '', amount: '' }];
            setProducts(listProducts);
            setApplication({ ...application, products: JSON.stringify(listProducts) });
          }}
          submitted={false}
        />
      )}

      <View style={styles.pdfButton}>
        <CustomButton color="white" text="Ver receta en PDF" onPress={generatePDF} />
      </View>

      <View style={{ flex: 1 }} />
      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Anterior" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Siguiente" onPress={handleSubmit} />
      </View>

      <ModalDelete
        visible={isModalVisible}
        title="Eliminar producto"
        message={
          <Text style={styles.modalText}>
            ¿Estás seguro de que deseas
            <Text style={styles.modalTextBold}> eliminar </Text>
            este producto? Esta acción no se puede deshacer.
          </Text>
        }
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          const copyProducts = products.filter((value) => value !== selectedProduct);
          setProducts(copyProducts);
          setApplication({ ...application, products: JSON.stringify(copyProducts) });
          setIsModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default FormApplication2Screen;
