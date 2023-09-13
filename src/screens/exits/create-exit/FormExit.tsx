import { Text, TouchableOpacity, View } from 'react-native';

import { Exit } from './CreateExitScreen';
import styles from './styles';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import Delete from '../../../../assets/svg/delete.svg';
import ExpandMore from '../../../../assets/svg/expand_more.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';

type Props = {
  exit: Exit;
  showTitle: boolean;
  onPressDelete: () => void;
  onChange: (exit: Exit) => void;
};

const FormExit = ({ showTitle, exit, onPressDelete, onChange }: Props) => {
  return (
    <View>
      <View style={styles.formContainer}>
        {showTitle && (
          <View
            style={[styles.exitTitleContainer, !exit.visible && styles.exitTitleContainerHidden]}>
            <TouchableOpacity
              style={styles.colapseButtonContainer}
              onPress={() => {
                onChange({ ...exit, visible: !exit.visible });
              }}>
              <Text style={styles.exitTitle}>Salida {exit.cnt}</Text>
              <ExpandMore />
            </TouchableOpacity>
            <CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />
          </View>
        )}
        {exit.visible && (
          <>
            <View style={styles.form}>
              <InputSelect
                label="Tipo de salida"
                placeholder="Selecciona"
                value={exit.type}
                onPress={(type) => {
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
          </>
        )}
      </View>
      <Divider />
    </View>
  );
};

export default FormExit;
