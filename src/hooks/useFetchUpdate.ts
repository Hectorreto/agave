import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.error(`Error fetching latest Expo update: ${error}`);
  }
};

const useFetchUpdate = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onFetchUpdateAsync().finally(() => setLoading(false));
  }, []);

  return { loading };
};

export default useFetchUpdate;
