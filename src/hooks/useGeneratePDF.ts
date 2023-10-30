import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';
import { printAsync } from 'expo-print';
import { useEffect, useRef, useState } from 'react';
import ViewShot from 'react-native-view-shot';

const useGeneratePDF = () => {
  const viewShotRef = useRef<ViewShot>(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    if (generatingPDF) {
      generatePDF().catch(console.error);
    }
  }, [generatingPDF]);

  const generatePDF = async () => {
    try {
      if (!viewShotRef.current?.capture) return;
      const uri = await viewShotRef.current.capture();
      const asset = Asset.fromURI(uri);
      const image = await manipulateAsync(asset.localUri ?? asset.uri, [], { base64: true });
      const html = `
        <html lang="es">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <title>document</title>
          </head>
          <body style="justify-content: center; align-items: center; display: flex">
            <img
              src="data:image/jpeg;base64,${image.base64}"
              alt="image"
              style="height: 90vh;"
            />
          </body>
        </html>
    `;
      await printAsync({ html });
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  return {
    viewShotRef,
    generatePDF: () => setGeneratingPDF(true),
    loading: generatingPDF,
  };
};

export default useGeneratePDF;
