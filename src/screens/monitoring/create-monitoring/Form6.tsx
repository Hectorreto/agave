import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputRadioGroup from '../../../components/input-radio-group/InputRadioGroup';
import InputText from '../../../components/input-text/InputText';
import { Monitoring } from '../../../services/monitoringService';

type Props = {
  monitoring: Partial<Monitoring>;
  onChange?: (value: Partial<Monitoring>) => void;
  onPressDelete?: () => void;
};

const Form6 = ({ monitoring, onChange, onPressDelete }: Props) => {
  return (
    <Expandable
      label="Colorimetría"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputRadioGroup
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.colorimetryIncidence || ''}
        onChange={
          onChange
            ? (colorimetryIncidence) => onChange({ ...monitoring, colorimetryIncidence })
            : undefined
        }
      />
      <InputText
        multiline
        label="Comentarios"
        placeholder="Escribe tus comentarios"
        value={monitoring.colorimetryComments || ''}
        onChange={
          onChange
            ? (colorimetryComments) => onChange({ ...monitoring, colorimetryComments })
            : undefined
        }
      />
    </Expandable>
  );
};

export default Form6;
