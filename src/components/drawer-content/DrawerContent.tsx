import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DrawerItem from './DrawerItem';
import styles from './styles';
import Grass from '../../../assets/svg/header/grass.svg';
import Lock from '../../../assets/svg/header/lock.svg';
import Logout from '../../../assets/svg/header/logout.svg';
import MenuOpen from '../../../assets/svg/header/menu_open.svg';
import Science from '../../../assets/svg/header/science.svg';
import Agriculture from '../../../assets/svg/tabs/applications.svg';
import { AuthContext } from '../../contexts/notification-context/AuthContext';

type Props = {
  navigation: DrawerNavigationHelpers;
};

const DrawerContent = ({ navigation }: Props) => {
  const { removeAuthData } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.drawerIcon} onPressOut={() => navigation.closeDrawer()}>
          <MenuOpen />
        </TouchableOpacity>
      </View>
      <View style={styles.primaryContainer}>
        {/* <DrawerItem
          Icon={Property}
          label="Agregar nuevo predio"
          onPress={() =>
            navigation.navigate('PropertyStack', {
              screen: 'CreateProperty',
              initial: false,
            })
          }
        /> */}
        <DrawerItem
          Icon={Agriculture}
          label="Agregar nueva salida"
          onPress={() =>
            navigation.navigate('PropertyStack', {
              screen: 'CreateExit',
              initial: false,
            })
          }
        />
        <DrawerItem
          Icon={Grass}
          label="Agregar nuevo monitoreo"
          onPress={() =>
            navigation.navigate('MonitoringStack', {
              screen: 'CreateMonitoring',
              initial: false,
            })
          }
        />
        <DrawerItem
          Icon={Science}
          label="Agregar nueva aplicación"
          onPress={() =>
            navigation.navigate('ApplicationStack', {
              screen: 'CreateApplication1',
              initial: false,
            })
          }
        />
      </View>
      <View style={styles.secondaryContainer}>
        <DrawerItem
          Icon={Lock}
          label="Cambiar contraseña"
          onPress={() => navigation.navigate('ChangePass')}
        />
        <DrawerItem
          Icon={Logout}
          label="Cerrar sesión"
          onPress={() => {
            removeAuthData();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
