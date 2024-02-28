import { useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputNumber from '../../../components/input-number/InputNumber';
import InputText from '../../../components/input-text/InputText';
import { Monitoring } from '../../../services/monitoringService';
import { parseArray, sum } from '../../../utils/arrayUtils';
import { getQuadrantQualification } from '../create-monitoring/helpers';

type Props = {
  monitoring: Monitoring;
};

const TabQualifications = ({ monitoring }: Props) => {
  const quadrantQualifications: string[] = useMemo(() => {
    if (!monitoring.data) return [];

    const values: number[][] = [];
    const data = parseArray(monitoring.data);

    data.forEach((container) => {
      const quadrant = container.quadrant;
      const form = container.form;
      const { qualification } = getQuadrantQualification(form);

      values[quadrant - 1] ??= [];
      values[quadrant - 1].push(qualification);
    });

    return values.map((group) => {
      const avg = sum(group) / group.length;
      return String(avg);
    });
  }, []);

  const monitoringQualification = useMemo(() => {
    const values = quadrantQualifications.map(Number);
    const avg = sum(values) / values.length;
    return String(avg);
  }, []);

  return (
    <>
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {quadrantQualifications.map((value, index) => (
            <View key={index} style={{ width: '49%', marginBottom: 4 }}>
              <InputNumber placeholder="###" label={`Cuadrante ${index + 1}`} value={value} />
            </View>
          ))}
        </View>

        <InputNumber label="De monitoreo" placeholder="###" value={monitoringQualification} />

        <InputText
          multiline
          label="Comentarios (Opcional)"
          placeholder="Escribe tus comentarios"
          value={monitoring.comments || ''}
        />
      </View>
      <View style={styles.bottomFormUploadImageButton}>
        <InputCamera value={monitoring.imageUri} hideButton />
      </View>
    </>
  );
};

export default TabQualifications;
