import { View } from 'react-native';

import { Product } from './CreateApplication2Screen';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import RemoveCircle from '../../../../assets/svg/remove_circle.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputText from '../../../components/input-text/InputText';

type Props = {
  product: Product;
  canDelete: boolean;
  onChange: (product: Product) => void;
  onPressAdd: () => void;
  onPressDelete: () => void;
};

const FormProduct = ({ product, canDelete, onChange, onPressAdd, onPressDelete }: Props) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.formTopContainer}>
        <View style={styles.formTopInputContainer}>
          <InputText
            label="Nombre del producto"
            placeholder="Nombre"
            value={product.name}
            onChange={(name) => {
              onChange({ ...product, name });
            }}
          />
        </View>
        <View style={styles.formTopButtonContainer}>
          {canDelete ? (
            <CustomButton color="red" onPress={onPressDelete} Icon={RemoveCircle} />
          ) : (
            <CustomButton color="blue" onPress={onPressAdd} Icon={AddCircle} />
          )}
        </View>
      </View>
      <View style={styles.formBottomContainer}>
        <InputText
          label="Dosis por tambo (en litros)"
          placeholder="Dosis"
          value={product.amount}
          onChange={(amount) => {
            onChange({ ...product, amount });
          }}
        />
      </View>
    </View>
  );
};

export default FormProduct;
