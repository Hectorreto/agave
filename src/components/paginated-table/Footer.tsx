import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import TArrowDropDown from '../../../assets/svg/table/arrow_drop_down.svg';
import ChevronLeft from '../../../assets/svg/table/chevron_left.svg';
import ChevronRight from '../../../assets/svg/table/chevron_right.svg';
import FirstPage from '../../../assets/svg/table/first_page.svg';
import LastPage from '../../../assets/svg/table/last_page.svg';
import Divider from '../divider/Divider';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>1-5 de 10</Text>
      <View style={styles.footerFrame2}>
        <TouchableOpacity style={styles.navIcon}>
          <FirstPage />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <ChevronLeft />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <ChevronRight />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <LastPage />
        </TouchableOpacity>
      </View>
      <View style={styles.footerFrame3}>
        <Text style={styles.footerText}>Página</Text>
        <View>
          <View style={styles.footerPageNumber}>
            <Text>1</Text>
            <TArrowDropDown />
          </View>
          <Divider />
        </View>
      </View>
    </View>
  );
};

export default Footer;
