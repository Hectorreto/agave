import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputRadioGroup from '../../../components/input-radio-group/InputRadioGroup';
import { Monitoring } from '../../../services/monitoringService';

type Props = {
  monitoring: Partial<Monitoring>;
  onChange?: (value: Partial<Monitoring>) => void;
  onPressDelete?: () => void;
};

const Form5 = ({ monitoring, onChange, onPressDelete }: Props) => {
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
        onChange={
          onChange
            ? (environmentalDamageFrostIncidence) =>
                onChange({ ...monitoring, environmentalDamageFrostIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (environmentalDamageStressIncidence) =>
                onChange({ ...monitoring, environmentalDamageStressIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (environmentalDamageFloodIncidence) =>
                onChange({ ...monitoring, environmentalDamageFloodIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (environmentalDamageFireIncidence) =>
                onChange({ ...monitoring, environmentalDamageFireIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (environmentalDamageHailIncidence) =>
                onChange({ ...monitoring, environmentalDamageHailIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (environmentalDamageOtherIncidence) =>
                onChange({ ...monitoring, environmentalDamageOtherIncidence })
            : undefined
        }
      />
    </Expandable>
  );
};

export default Form5;
