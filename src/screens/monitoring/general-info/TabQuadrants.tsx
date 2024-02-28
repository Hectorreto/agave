import { useMemo, useState } from 'react';
import { View } from 'react-native';

import QuadrantInfo from './QuadrantInfo';
import Filter from '../../../../assets/svg/filter_alt.svg';
import ControlledExpandable from '../../../components/expandable/ControlledExpandable';
import InputSelect from '../../../components/input-select/InputSelect';
import { Monitoring } from '../../../services/monitoringService';
import { parseArray, range } from '../../../utils/arrayUtils';
import { MonitoringContainer } from '../create-monitoring/CreateMonitoringScreen';

type Props = {
  monitoring: Monitoring;
};

const TabQuadrants = ({ monitoring }: Props) => {
  const [openExpandable, setOpenExpandable] = useState<number>();
  const [selectedQuadrant, setSelectedQuadrant] = useState(1);
  const [selectedPlant, setSelectedPlant] = useState(1);

  const items = useMemo(() => {
    const plantsPerQuadrant = Number(monitoring.plantsPerQuadrant);
    return range(1, plantsPerQuadrant + 1).map((value) => ({
      label: `Planta ${value}`,
      value: `${value}`,
    }));
  }, []);

  const containers: MonitoringContainer[] = useMemo(() => {
    return parseArray(monitoring.data ?? '[]');
  }, []);

  const quadrantLength = useMemo(() => {
    const set = new Set(containers.map((value) => value.quadrant));
    return set.size;
  }, []);

  const forms = useMemo(() => {
    const container = containers.find(
      (value) => value.quadrant === selectedQuadrant && value.plant === selectedPlant
    );
    if (!container) return [];
    return container.form;
  }, [selectedQuadrant, selectedPlant]);

  return (
    <View>
      {range(1, quadrantLength + 1).map((value) => (
        <View style={{ marginTop: 20 }}>
          <ControlledExpandable
            key={value}
            label={`Cuadrante ${value}`}
            isOpen={openExpandable === value}
            setIsOpen={(isOpen) => {
              if (isOpen) {
                setOpenExpandable(value);
                setSelectedQuadrant(value);
                setSelectedPlant(1);
              } else {
                setOpenExpandable(undefined);
              }
            }}>
            <>
              <View style={{ width: 184 }}>
                <InputSelect
                  iconLeft={
                    <View style={{ marginLeft: 8, marginRight: 4 }}>
                      <Filter />
                    </View>
                  }
                  items={items}
                  placeholder=""
                  value={String(selectedPlant)}
                  onChange={(value) => setSelectedPlant(Number(value))}
                />
              </View>
              <QuadrantInfo forms={forms} />
            </>
          </ControlledExpandable>
        </View>
      ))}
    </View>
  );
};

export default TabQuadrants;
