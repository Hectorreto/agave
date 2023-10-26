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

const Form7 = ({ monitoring, onChange, onPressDelete }: Props) => {
  return (
    <Expandable
      label="Daño físico"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputText
        label="Tipo de daño físico"
        placeholder="Tipo de daño físico"
        value={monitoring.physicalDamageType || ''}
        onChange={
          onChange
            ? (physicalDamageType) => onChange({ ...monitoring, physicalDamageType })
            : undefined
        }
      />
      <InputRadioGroup
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.physicalDamageIncidence || ''}
        onChange={
          onChange
            ? (physicalDamageIncidence) => onChange({ ...monitoring, physicalDamageIncidence })
            : undefined
        }
      />
    </Expandable>
  );
};

export default Form7;
