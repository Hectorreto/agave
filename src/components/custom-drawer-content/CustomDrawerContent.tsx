import { DrawerContentComponentProps } from '@react-navigation/drawer';
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

type Props = DrawerContentComponentProps;

const CustomDrawerContent = ({ navigation }: Props) => {
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
          onPress={() => navigation.navigate('ExitsStack', { screen: 'CreateExit' })}
        />
        <Item
          Icon={Grass}
          label="Agregar nuevo monitoreo"
          onPress={() => navigation.navigate('MonitoringStack', { screen: 'CreateMonitoring' })}
        />
        <Item
          Icon={Science}
          label="Agregar nueva aplicación"
          onPress={() => navigation.navigate('ApplicationsStack', { screen: 'CreateApplication' })}
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

export default CustomDrawerContent;
