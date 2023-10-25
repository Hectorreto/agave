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

const Form3 = ({ monitoring, onChange, onPressDelete }: Props) => {
  return (
    <Expandable
      label="Maleza"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputText
        label="Maleza"
        placeholder="Maleza"
        value={monitoring.undergrowthName || ''}
        onChange={
          onChange ? (undergrowthName) => onChange({ ...monitoring, undergrowthName }) : undefined
        }
      />
      <InputRadioGroup
        label="Tipo de hoja"
        items={[
          { label: 'Ancha', value: 'wide' },
          { label: 'Angosta', value: 'narrow' },
          { label: 'Leñosa', value: 'woody' },
        ]}
        value={monitoring.undergrowthLeafType || ''}
        onChange={
          onChange
            ? (undergrowthLeafType) => onChange({ ...monitoring, undergrowthLeafType })
            : undefined
        }
      />
      <InputText
        label="Altura aproximada en cm"
        placeholder="Altura"
        value={monitoring.undergrowthHeight || ''}
        onChange={
          onChange
            ? (undergrowthHeight) => onChange({ ...monitoring, undergrowthHeight })
            : undefined
        }
      />
    </Expandable>
  );
};

export default Form3;
