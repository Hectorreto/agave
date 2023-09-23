import { useState } from 'react';
import { View } from 'react-native';

import { Item } from './CreateExitScreen';
import styles from './styles';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';

type Props = {
  exit: Item;
  onChange: (exit: Item) => void;
};

const FormExit = ({ exit, onChange }: Props) => {
  const [exitType, setExitType] = useState('');
  const [customType, setCustomType] = useState('');

  return (
    <View style={{ gap: 8 }}>
      <View style={styles.form}>
        <InputSelect
          label="Tipo de salida"
          placeholder="Selecciona"
          value={exitType}
          onChange={(type) => {
            setExitType(type);
            setCustomType('');
            onChange({ ...exit, type });
          }}
          items={[
            { label: 'Cosecha', value: 'Cosecha' },
            { label: 'Fitosanitaria', value: 'Fitosanitaria' },
            { label: 'Para monitoreo', value: 'Para monitoreo' },
            { label: 'Otros', value: 'Otros' },
          ]}
        />
        {exitType === 'Otros' && (
          <InputText
            label="Especificar salida"
            placeholder="Escribe"
            value={customType}
            onChange={(type) => {
              setCustomType(type);
              onChange({ ...exit, type: type || exitType });
            }}
          />
        )}
        <InputText
          label="Numero de plantas"
          placeholder="###"
          value={exit.plantCount}
          onChange={(plantCount) => {
            onChange({ ...exit, plantCount });
          }}
        />
        <InputText
          multiline
          label="Notas"
          placeholder="Notas"
          value={exit.notes}
          onChange={(notes) => {
            onChange({ ...exit, notes });
          }}
        />
      </View>
      <View style={styles.extraActions}>
        <CustomButton color="blue" text="Subir foto" Icon={CameraAlt} onPress={() => {}} />
      </View>
    </View>
  );
};

export default FormExit;
