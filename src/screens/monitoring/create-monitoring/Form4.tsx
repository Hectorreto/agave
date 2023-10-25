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

const Form4 = ({ monitoring, onChange, onPressDelete }: Props) => {
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
        onChange={
          onChange
            ? (phytotoxicDamageHerbicideIncidence) =>
                onChange({ ...monitoring, phytotoxicDamageHerbicideIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (phytotoxicDamagePesticideIncidence) =>
                onChange({ ...monitoring, phytotoxicDamagePesticideIncidence })
            : undefined
        }
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
        onChange={
          onChange
            ? (phytotoxicDamageExcessSaltIncidence) =>
                onChange({ ...monitoring, phytotoxicDamageExcessSaltIncidence })
            : undefined
        }
      />
    </Expandable>
  );
};

export default Form4;
