import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Item from './Item';
import styles from './styles';
import Agriculture from '../../../assets/svg/header/agriculture.svg';
import Grass from '../../../assets/svg/header/grass.svg';
import Lock from '../../../assets/svg/header/lock.svg';
import Logout from '../../../assets/svg/header/logout.svg';
import MenuOpen from '../../../assets/svg/header/menu_open.svg';
import Science from '../../../assets/svg/header/science.svg';

type Props = {
  navigation: DrawerNavigationHelpers;
};

const DrawerContent = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.drawerIcon} onPressOut={() => navigation.closeDrawer()}>
          <MenuOpen />
        </TouchableOpacity>
      </View>
      <View style={styles.primaryContainer}>
        <Item
          Icon={Agriculture}
          label="Agregar nueva salida"
          onPress={() =>
            navigation.navigate('ExitStack', {
              screen: 'CreateExit',
              initial: false,
            })
          }
        />
        <Item
          Icon={Grass}
          label="Agregar nuevo monitoreo"
          onPress={() =>
            navigation.navigate('MonitoringStack', {
              screen: 'CreateMonitoring',
              initial: false,
            })
          }
        />
        <Item
          Icon={Science}
          label="Agregar nueva aplicación"
          onPress={() =>
            navigation.navigate('ApplicationStack', {
              screen: 'CreateApplication',
              initial: false,
            })
          }
        />
      </View>
      <View style={styles.secondaryContainer}>
        <Item
          Icon={Lock}
          label="Cambiar contraseña"
          onPress={() => navigation.navigate('ChangePass')}
        />
        <Item
          Icon={Logout}
          label="Cerrar sesión"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
