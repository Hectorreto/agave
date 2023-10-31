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

const Form3 = ({ monitoring, onChange, onPressDelete, submitted }: Props) => {
  const handleOnChange = (key: keyof Monitoring) => {
    if (!onChange) return undefined;
    return (value: string) => {
      onChange({ ...monitoring, [key]: value });
    };
  };

  return (
    <Expandable
      label="Maleza"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputText
        label="Maleza"
        placeholder="Maleza"
        value={monitoring.undergrowthName || ''}
        onChange={handleOnChange('undergrowthName')}
        submitted={submitted}
      />
      <InputRadioGroup
        label="Tipo de hoja"
        items={[
          { label: 'Ancha', value: 'wide' },
          { label: 'Angosta', value: 'narrow' },
          { label: 'Leñosa', value: 'woody' },
        ]}
        value={monitoring.undergrowthLeafType || ''}
        onChange={handleOnChange('undergrowthLeafType')}
        submitted={submitted}
      />
      <InputText
        label="Altura aproximada en cm"
        placeholder="Altura"
        value={monitoring.undergrowthHeight || ''}
        onChange={handleOnChange('undergrowthHeight')}
        submitted={submitted}
      />
    </Expandable>
  );
};

export default Form3;
