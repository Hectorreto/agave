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

const Form5 = ({ monitoring, onChange, onPressDelete, submitted }: Props) => {
  const handleOnChange = (key: keyof Monitoring) => {
    if (!onChange) return undefined;
    return (value: string) => {
      onChange({ ...monitoring, [key]: value });
    };
  };

  return (
    <Expandable
      label="Daño ambiental"
      right={<CustomButton color="redWhite" Icon={Delete} onPress={onPressDelete} />}>
      <InputRadioGroup
        title="Helada"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.environmentalDamageFrostIncidence || ''}
        onChange={handleOnChange('environmentalDamageFrostIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Estrés"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.environmentalDamageStressIncidence || ''}
        onChange={handleOnChange('environmentalDamageStressIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Inundación"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.environmentalDamageFloodIncidence || ''}
        onChange={handleOnChange('environmentalDamageFloodIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Incendio"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.environmentalDamageFireIncidence || ''}
        onChange={handleOnChange('environmentalDamageFireIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Granizo"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.environmentalDamageHailIncidence || ''}
        onChange={handleOnChange('environmentalDamageHailIncidence')}
        submitted={submitted}
      />
      <InputRadioGroup
        title="Otros"
        label="Incidencia"
        items={[
          { label: 'Baja', value: 'low' },
          { label: 'Media', value: 'medium' },
          { label: 'Alta', value: 'high' },
        ]}
        value={monitoring.environmentalDamageOtherIncidence || ''}
        onChange={handleOnChange('environmentalDamageOtherIncidence')}
        submitted={submitted}
      />
    </Expandable>
  );
};

export default Form5;
