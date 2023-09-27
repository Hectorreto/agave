import { useState } from 'react';
import { View } from 'react-native';

import { Item } from './CreateExitScreen';
import styles from './styles';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';

type Props = {
  item: Item;
  onChange: (exit: Item) => void;
};

const FormExit = ({ item, onChange }: Props) => {
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
            onChange({ ...item, exit: { ...item.exit, type } });
          }}
          items={[
            { label: 'Cosecha', value: 'Cosecha' },
            { label: 'Fitosanitaria', value: 'Fitosanitaria' },
            { label: 'Para monitoreo', value: 'Para monitoreo' },
            { label: 'Otro', value: 'Otro' },
          ]}
        />
        {exitType === 'Otros' && (
          <InputText
            label="Especificar salida"
            placeholder="Escribe"
            value={customType}
            onChange={(type) => {
              setCustomType(type);
              onChange({ ...item, exit: { ...item.exit, type: type || exitType } });
            }}
          />
        )}
        <InputText
          label="Numero de plantas"
          placeholder="###"
          value={item.exit.plantCount}
          onChange={(plantCount) => {
            onChange({ ...item, exit: { ...item.exit, plantCount } });
          }}
        />
        <InputText
          multiline
          label="Notas"
          placeholder="Notas"
          value={item.exit.notes}
          onChange={(notes) => {
            onChange({ ...item, exit: { ...item.exit, notes } });
          }}
        />
      </View>
      <View style={styles.extraActions}>
        <InputCamera
          value={item.exit.imageUri}
          onChange={(imageUri) => {
            onChange({ ...item, exit: { ...item.exit, imageUri } });
          }}
        />
      </View>
    </View>
  );
};

export default FormExit;
