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
  submitted?: boolean;
};

const Form1 = ({ monitoring, onChange, onPressDelete, submitted }: Props) => {
  const handleOnChange = (key: keyof Monitoring) => {
    if (!onChange) return undefined;
    return (value: string) => {
      onChange({ ...monitoring, [key]: value });
    };
  };

  return (
    <Expandable
      label="Plaga"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputText
        label="Tipo de plaga"
        placeholder="Tipo de plaga"
        value={monitoring.plagueType || ''}
        onChange={handleOnChange('plagueType')}
        submitted={submitted}
      />
      <InputRadioGroup
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.plagueIncidence || ''}
        onChange={handleOnChange('plagueIncidence')}
        submitted={submitted}
      />
    </Expandable>
  );
};

export default Form1;
