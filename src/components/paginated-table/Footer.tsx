import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import ChevronLeft from '../../../assets/svg/table/chevron_left.svg';
import ChevronRight from '../../../assets/svg/table/chevron_right.svg';
import FirstPage from '../../../assets/svg/table/first_page.svg';
import LastPage from '../../../assets/svg/table/last_page.svg';

type Props = {
  start: number;
  end: number;
  total: number;
  page: number;
  onPressStart: () => void;
  onPressPrev: () => void;
  onPressNext: () => void;
  onPressEnd: () => void;
};

const Footer = ({
  start,
  end,
  total,
  page,
  onPressStart,
  onPressPrev,
  onPressNext,
  onPressEnd,
}: Props) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        {start}-{end} de {total}
      </Text>
      <View style={styles.footerFrame2}>
        <TouchableOpacity style={styles.navIcon} onPress={onPressStart}>
          <FirstPage />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={onPressPrev}>
          <ChevronLeft />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={onPressNext}>
          <ChevronRight />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={onPressEnd}>
          <LastPage />
        </TouchableOpacity>
      </View>
      <View style={styles.footerFrame3}>
        <Text style={styles.footerText}>Página</Text>
        <Text style={styles.footerText}>{page}</Text>
        {/*<TouchableOpacity>*/}
        {/*  <View style={styles.footerPageNumber}>*/}
        {/*    <Text>{page}</Text>*/}
        {/*    <TArrowDropDown />*/}
        {/*  </View>*/}
        {/*  <Divider />*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  );
};

export default Footer;
