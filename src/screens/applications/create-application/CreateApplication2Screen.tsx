import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
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
import useGeneratePDF from '../../../hooks/useGeneratePDF';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';
import { Product } from '../../../services/productService';
import { Colors } from '../../../themes/theme';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication2'>;

const newProduct = (applicationId: string): Product => {
  return {
    id: uuid.v4() as string,
    name: '',
    amount: '',
    applicationId,
  };
};

const CreateApplication2Screen = ({ navigation, route }: Props) => {
  const { application } = route.params;
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState([newProduct(application.id)]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [submitted, setSubmitted] = useState(false);
  const { viewShotRef, loading, generatePDF } = useGeneratePDF();

  const handleSubmit = () => {
    setSubmitted(true);
    if (!amount || !notes) return;
    const productsCopy = [...products];
    const lastProduct = productsCopy[productsCopy.length - 1];
    if (!lastProduct.name && !lastProduct.amount) productsCopy.pop();
    if (productsCopy.length === 0) return;
    if (productsCopy.some((product) => !product.name || !product.amount)) return;

    navigation.navigate('CreateApplication3', {
      application: {
        ...application,
        containerAmount: amount,
        notes,
      },
      products: productsCopy,
    });
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
          rows={products.map((value) => ({
            id: value.id,
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

      {products.map((product, index) => (
        <FormProduct
          key={product.id}
          product={product}
          canDelete={index < products.length - 1}
          onChange={(product) => {
            const copyProducts = [...products];
            copyProducts[index] = product;
            setProducts(copyProducts);
          }}
          onPressAdd={() => {
            setProducts([...products, newProduct(application.id)]);
          }}
          onPressDelete={() => {
            setIsModalVisible(true);
            setSelectedProduct(product);
          }}
          submitted={submitted}
        />
      ))}

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
          setIsModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateApplication2Screen;
