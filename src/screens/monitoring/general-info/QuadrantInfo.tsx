import { Monitoring } from '../../../services/monitoringService';
import Form0 from '../create-monitoring/Form0';
import Form1 from '../create-monitoring/Form1';
import Form2 from '../create-monitoring/Form2';
import Form3 from '../create-monitoring/Form3';
import Form4 from '../create-monitoring/Form4';
import Form5 from '../create-monitoring/Form5';
import Form6 from '../create-monitoring/Form6';
import Form7 from '../create-monitoring/Form7';

type Props = {
  forms: (Partial<Monitoring> | undefined)[];
};

const QuadrantInfo = ({ forms }: Props) => {
  return (
    <>
      {forms[0]?.plantPerformanceKg ? <Form0 monitoring={forms[0]} /> : null}

      {forms[1]?.plagueType && forms[1]?.plagueIncidence ? <Form1 monitoring={forms[1]} /> : null}

      {forms[2]?.diseaseType && forms[2]?.diseaseIncidence ? <Form2 monitoring={forms[2]} /> : null}

      {forms[3]?.undergrowthName && forms[3]?.undergrowthLeafType && forms[3]?.undergrowthHeight ? (
        <Form3 monitoring={forms[3]} />
      ) : null}

      {forms[4]?.phytotoxicDamageHerbicideIncidence &&
      forms[4]?.phytotoxicDamagePesticideIncidence &&
      forms[4]?.phytotoxicDamageExcessSaltIncidence ? (
        <Form4 monitoring={forms[4]} />
      ) : null}

      {forms[5]?.environmentalDamageFrostIncidence &&
      forms[5]?.environmentalDamageStressIncidence &&
      forms[5]?.environmentalDamageFloodIncidence &&
      forms[5]?.environmentalDamageFireIncidence &&
      forms[5]?.environmentalDamageHailIncidence &&
      forms[5]?.environmentalDamageOtherIncidence ? (
        <Form5 monitoring={forms[5]} />
      ) : null}

      {forms[6]?.colorimetryIncidence && forms[6]?.colorimetryComments ? (
        <Form6 monitoring={forms[6]} />
      ) : null}

      {forms[7]?.physicalDamageType && forms[7]?.physicalDamageIncidence ? (
        <Form7 monitoring={forms[7]} />
      ) : null}
    </>
  );
};

export default QuadrantInfo;
