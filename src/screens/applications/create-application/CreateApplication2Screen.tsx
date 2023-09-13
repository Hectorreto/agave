import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import uuid from 'react-native-uuid';

import CreateApplicationTabs from './CreateApplicationTabs';
import FormProduct from './FormProduct';
import styles from './style';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication2'>;

export type Product = {
  id: string;
  name: string;
  amount: string;
};

const newProduct = (): Product => {
  return {
    id: uuid.v4() as string,
    name: '',
    amount: '',
  };
};

const CreateApplication2Screen = ({ navigation }: Props) => {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState([newProduct()]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateApplicationTabs index={2} />

      <InputText
        label="No. de tambos a aplicar"
        placeholder="Número"
        value={amount}
        onChange={setAmount}
      />
      <InputText
        multiline
        label="Notas"
        placeholder="Escribe una nota"
        value={notes}
        onChange={setNotes}
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
            setProducts([...products, newProduct()]);
          }}
          onPressDelete={() => {
            setIsModalVisible(true);
            setSelectedProduct(product);
          }}
        />
      ))}

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
          onPress={() => navigation.navigate('CreateApplication3')}
        />
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
