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

const Form1 = ({ monitoring, onChange, onPressDelete }: Props) => {
  return (
    <Expandable
      label="Plaga"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputText
        label="Tipo de plaga"
        placeholder="Tipo de plaga"
        value={monitoring.plagueType || ''}
        onChange={onChange ? (plagueType) => onChange({ ...monitoring, plagueType }) : undefined}
      />
      <InputRadioGroup
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.plagueIncidence || ''}
        onChange={
          onChange ? (plagueIncidence) => onChange({ ...monitoring, plagueIncidence }) : undefined
        }
      />
    </Expandable>
  );
};

export default Form1;
