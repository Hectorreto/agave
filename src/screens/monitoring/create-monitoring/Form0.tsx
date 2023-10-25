import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputText from '../../../components/input-text/InputText';
import { Monitoring } from '../../../services/monitoringService';

type Props = {
  monitoring: Partial<Monitoring>;
  onChange?: (value: Partial<Monitoring>) => void;
  onPressDelete?: () => void;
};

const Form0 = ({ monitoring, onChange, onPressDelete }: Props) => {
  return (
    <Expandable
      label="Planta"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputText
        label="Estimación de rendimiento en kg"
        placeholder="### kg"
        value={monitoring.plantPerformanceKg || ''}
        onChange={
          onChange
            ? (plantPerformanceKg) => onChange({ ...monitoring, plantPerformanceKg })
            : undefined
        }
      />
    </Expandable>
  );
};

export default Form0;
