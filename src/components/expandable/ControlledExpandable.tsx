import { ReactNode, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import ExpandLess from '../../../assets/svg/expand_less.svg';
import ExpandMore from '../../../assets/svg/expand_more.svg';
import Divider from '../divider/Divider';

type Props = {
  label: string;
  hideLabelAndShowContent?: boolean;
  children: ReactNode;
  right?: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ControlledExpandable = ({
  label,
  children,
  hideLabelAndShowContent,
  right,
  isOpen,
  setIsOpen,
}: Props) => {
  useEffect(() => {
    if (hideLabelAndShowContent) {
      setIsOpen(true);
    }
  }, [hideLabelAndShowContent]);

  if (hideLabelAndShowContent) {
    return (
      <View style={styles.onlyContentContainer}>
        {children}
        <Divider />
      </View>
    );
  }

  return (
    <View style={[styles.outerContainer, !isOpen && styles.outerContainerClosed]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer} onPress={() => setIsOpen(!isOpen)}>
          <Text style={styles.title}>{label}</Text>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </TouchableOpacity>
        <View style={styles.icon}>{right}</View>
      </View>
      {isOpen && children}
      <Divider />
    </View>
  );
};

export default ControlledExpandable;
