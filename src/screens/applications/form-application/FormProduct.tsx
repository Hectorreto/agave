import { View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import RemoveCircle from '../../../../assets/svg/remove_circle.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputNumber from '../../../components/input-number/InputNumber';
import InputText from '../../../components/input-text/InputText';
import { Product } from '../../../services/applicationService';

type Props = {
  product: Product;
  onChange?: (product: Product) => void;
  onPressAdd?: () => void;
  onPressDelete?: () => void;
  submitted: boolean;
};

const FormProduct = ({ product, onChange, onPressAdd, onPressDelete, submitted }: Props) => {
  const handleChangeName = () => {
    if (!onChange) return;
    return (value: string) => {
      onChange({ ...product, name: value });
    };
  };

  const handleChangeAmount = () => {
    if (!onChange) return;
    return (value: string) => {
      if (value.match(/^\d*$/g)) {
        onChange({ ...product, amount: value });
      }
    };
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formTopContainer}>
        <View style={styles.formTopInputContainer}>
          <InputText
            label="Nombre del producto"
            placeholder="Nombre"
            value={product.name}
            onChange={handleChangeName()}
            submitted={submitted}
          />
        </View>
        <View style={styles.formTopButtonContainer}>
          {onPressAdd !== undefined && (
            <CustomButton color="blue" onPress={onPressAdd} Icon={AddCircle} />
          )}
          {onPressDelete !== undefined && (
            <CustomButton color="red" onPress={onPressDelete} Icon={RemoveCircle} />
          )}
        </View>
      </View>
      <View style={styles.formBottomContainer}>
        <InputNumber
          label="Dosis por tambo (en litros)"
          placeholder="Dosis"
          value={product.amount}
          onChange={handleChangeAmount()}
          submitted={submitted}
        />
      </View>
    </View>
  );
};

export default FormProduct;
