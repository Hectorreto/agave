import { Text, View } from 'react-native';

import styles from './styles';
import IconColorimetry from '../../../assets/svg/alerts/colorimetry.svg';
import IconEnvironmental from '../../../assets/svg/alerts/environmental.svg';
import IconIllness from '../../../assets/svg/alerts/illness.svg';
import IconPhysical from '../../../assets/svg/alerts/physical.svg';
import IconPlague from '../../../assets/svg/alerts/plague.svg';
import IconToxicity from '../../../assets/svg/alerts/toxicity.svg';
import IconUndergrowth from '../../../assets/svg/alerts/undergrowth.svg';
import { Colors } from '../../themes/theme';
import { daysBetween } from '../../utils/dateUtils';

const alertIcons: any = {
  PHYSICAL_DAMAGE: IconPhysical,
  COLORIMETRY: IconColorimetry,
  ENVIROMENTAL_DAMAGE: IconEnvironmental,
  PHYTOTOXIC_DAMAGE: IconToxicity,
  UNDERGROWTH: IconUndergrowth,
  SICKNESS: IconIllness,
  PLAGUE: IconPlague,
};

type Props = {
  title: string;
  time: number;
  type: string;
};

const CardAlert = ({ title, time, type }: Props) => {
  const days = daysBetween(time, Date.now());
  const message = days === 1 ? 'en el último día' : `en los últimos ${days} días`;
  const Icon = alertIcons[type];

  return (
    <View style={styles.indicator}>
      <View style={styles.indicatorIcon}>{Icon && <Icon fill={Colors.NEUTRAL} />}</View>

      <View style={styles.textContainer}>
        <Text style={styles.indicatorText1} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
        <Text style={styles.indicatorText2}>{message}</Text>
      </View>
    </View>
  );
};

export default CardAlert;
