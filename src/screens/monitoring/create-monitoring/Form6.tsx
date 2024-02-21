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

const Form6 = ({ monitoring, onChange, onPressDelete, submitted }: Props) => {
  const handleOnChange = (key: keyof Monitoring) => {
    if (!onChange) return undefined;
    return (value: string) => {
      onChange({ ...monitoring, [key]: value });
    };
  };

  return (
    <Expandable
      label="Colorimetría"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputRadioGroup
        label="Colorimetría"
        items={[
          { label: 'Buena', value: 'good' },
          { label: 'Regular', value: 'regular' },
          { label: 'Mala', value: 'bad' },
        ]}
        value={monitoring.colorimetryIncidence || ''}
        onChange={handleOnChange('colorimetryIncidence')}
        submitted={submitted}
      />
      <InputText
        multiline
        label="Comentarios"
        placeholder="Escribe tus comentarios"
        value={monitoring.colorimetryComments || ''}
        onChange={handleOnChange('colorimetryComments')}
        submitted={submitted}
      />
    </Expandable>
  );
};

export default Form6;
