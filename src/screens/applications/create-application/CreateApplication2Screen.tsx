import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import ViewShot from 'react-native-view-shot';

import FormProduct from './FormProduct';
import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputNumber from '../../../components/input-number/InputNumber';
import InputText from '../../../components/input-text/InputText';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import useGeneratePDF from '../../../hooks/useGeneratePDF';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';
import { Application, Product, getProducts } from '../../../services/applicationService';
import { Colors } from '../../../themes/theme';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication2'>;

type ProductContainer = {
  id: string;
  product: Product;
};

const createProductContainer = (): ProductContainer => {
  return {
    id: uuid.v4() as string,
    product: {
      name: '',
      amount: '',
    },
  };
};

const getProductContainers = (application: Partial<Application>) => {
  if (!application.products) return [];
  const products = getProducts(application.products);
  return products.map((value) => ({
    id: uuid.v4() as string,
    product: value,
  }));
};

const CreateApplication2Screen = ({ navigation, route }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { application } = route.params;

  const [amount, setAmount] = useState(application.containerAmount ?? '');
  const [notes, setNotes] = useState(application.notes ?? '');
  const [productContainers, setProductContainers] = useState<ProductContainer[]>(
    getProductContainers(application)
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductContainer>();
  const [submitted, setSubmitted] = useState(false);
  const { viewShotRef, loading, generatePDF } = useGeneratePDF();

  const handleSubmit = () => {
    setSubmitted(true);

    if (!amount || !notes) return showNotification('Formulario incompleto', 'incorrect');
    if (productContainers.length === 0)
      return showNotification('Agrega al menos un producto', 'incorrect');
    if (productContainers.some((value) => !value.product.name || !value.product.amount))
      return showNotification('Formulario incompleto 2', 'incorrect');

    const products = productContainers.map((value) => value.product);
    application.containerAmount = amount;
    application.notes = notes;
    application.products = JSON.stringify(products);

    navigation.navigate('CreateApplication3', { application });
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
          rows={productContainers.map((value) => ({
            id: value.id,
            values: [
              <Text style={styles.dataText}>{value.product.name}</Text>,
              <Text style={styles.dataText}>{value.product.amount}</Text>,
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
        value={amount}
        onChange={(value) => {
          if (value.match(/^\d*$/g)) {
            setAmount(value);
          }
        }}
        submitted={submitted}
      />
      <InputText
        multiline
        label="Notas"
        placeholder="Escribe una nota"
        value={notes}
        onChange={setNotes}
        submitted={submitted}
      />

      {productContainers.map((value, index) => (
        <FormProduct
          key={value.id}
          product={value.product}
          onChange={(product) => {
            const copyContainers = [...productContainers];
            copyContainers[index].product = product;
            setProductContainers(copyContainers);
          }}
          onPressDelete={() => {
            setIsModalVisible(true);
            setSelectedProduct(value);
          }}
          submitted={submitted}
        />
      ))}

      <FormProduct
        product={createProductContainer()}
        onPressAdd={() => {
          setProductContainers([...productContainers, createProductContainer()]);
        }}
        submitted={false}
      />

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
          const copyContainers = productContainers.filter((value) => value !== selectedProduct);
          setProductContainers(copyContainers);
          setIsModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateApplication2Screen;
