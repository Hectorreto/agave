import { View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import RemoveCircle from '../../../../assets/svg/remove_circle.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputNumber from '../../../components/input-number/InputNumber';
import InputText from '../../../components/input-text/InputText';
import { Product } from '../../../services/productService';

type Props = {
  product: Product;
  canDelete: boolean;
  onChange: (product: Product) => void;
  onPressAdd: () => void;
  onPressDelete: () => void;
  submitted: boolean;
};

const FormProduct = ({
  product,
  canDelete,
  onChange,
  onPressAdd,
  onPressDelete,
  submitted,
}: Props) => {
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
            submitted={submitted}
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
        <InputNumber
          label="Dosis por tambo (en litros)"
          placeholder="Dosis"
          value={product.amount}
          onChange={(value) => {
            if (value.match(/^\d*$/g)) {
              onChange({ ...product, amount: value });
            }
          }}
          submitted={submitted}
        />
      </View>
    </View>
  );
};

export default FormProduct;
