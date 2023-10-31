import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputRadioGroup from '../../../components/input-radio-group/InputRadioGroup';
import { Monitoring } from '../../../services/monitoringService';

type Props = {
  monitoring: Partial<Monitoring>;
  onChange?: (value: Partial<Monitoring>) => void;
  onPressDelete?: () => void;
  submitted?: boolean;
};

const Form4 = ({ monitoring, onChange, onPressDelete, submitted }: Props) => {
  const handleOnChange = (key: keyof Monitoring) => {
    if (!onChange) return undefined;
    return (value: string) => {
      onChange({ ...monitoring, [key]: value });
    };
  };

  return (
    <Expandable
      label="Daño fitotóxico"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputRadioGroup
        title="Herbicidas"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.phytotoxicDamageHerbicideIncidence || ''}
        onChange={handleOnChange('phytotoxicDamageHerbicideIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Pesticidas"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.phytotoxicDamagePesticideIncidence || ''}
        onChange={handleOnChange('phytotoxicDamagePesticideIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Exceso de sales"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.phytotoxicDamageExcessSaltIncidence || ''}
        onChange={handleOnChange('phytotoxicDamageExcessSaltIncidence')}
        submitted={submitted}
      />
    </Expandable>
  );
};

export default Form4;
