import { View } from 'react-native';

import { Exit } from './CreateExitScreen';
import styles from './styles';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';

type Props = {
  exit: Exit;
  onChange: (exit: Exit) => void;
};

const FormExit = ({ exit, onChange }: Props) => {
  return (
    <View style={{ gap: 8 }}>
      <View style={styles.form}>
        <InputSelect
          label="Tipo de salida"
          placeholder="Selecciona"
          value={exit.type}
          onChange={(type) => {
            onChange({ ...exit, type });
          }}
          items={[
            { label: 'Cosecha', value: '1' },
            { label: 'Fitosanitaria', value: '2' },
            { label: 'Para monitoreo', value: '3' },
            { label: 'Otros', value: '4' },
          ]}
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
