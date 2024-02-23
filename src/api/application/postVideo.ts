import { Asset } from 'expo-asset';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  uri: string;
};

const postVideo = async ({ uri, accessToken }: Props) => {
  const asset = Asset.fromURI(uri);
  const name = 'uploadFileName';
  const mimeType = `video/${asset.type}`;

  const formData = new FormData();
  formData.append(
    'operations',
    JSON.stringify({
      query: `
        mutation UploadFile($uploadFileArgs: UploadFileInput!) {
          uploadFile(uploadFileArgs: $uploadFileArgs) {
            guid
            path
            name
            __typename
          }
        }
      `,
      variables: {
        uploadFileArgs: {
          category: 'APPLICATION_START',
          name,
          file: null,
        },
      },
    })
  );
  formData.append('map', JSON.stringify({ '1': ['variables.uploadFileArgs.file'] }));
  formData.append('1', {
    uri,
    type: mimeType,
    name,
  } as any);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Apollo-Require-Preflight': 'true',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const gqlResponse = await response.json();

  return gqlResponse.data.uploadFile.guid;
};

export default postVideo;
