import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputNumber from '../../../components/input-number/InputNumber';
import { Monitoring } from '../../../services/monitoringService';

type Props = {
  monitoring: Partial<Monitoring>;
  onChange?: (value: Partial<Monitoring>) => void;
  onPressDelete?: () => void;
  submitted?: boolean;
};

const Form0 = ({ monitoring, onChange, onPressDelete, submitted }: Props) => {
  const handleOnChange = (key: keyof Monitoring) => {
    if (!onChange) return undefined;
    return (value: string) => {
      onChange({ ...monitoring, [key]: value });
    };
  };

  return (
    <Expandable
      label="Planta"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputNumber
        label="Estimación de rendimiento en kg"
        placeholder="### kg"
        value={monitoring.plantPerformanceKg || ''}
        onChange={handleOnChange('plantPerformanceKg')}
        submitted={submitted}
      />
    </Expandable>
  );
};

export default Form0;
