import postVideo from './postVideo';
import { Application } from '../../services/applicationService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  application: Application;
};

const startApplication = async ({ application, accessToken }: Props) => {
  const videoGuid = await postVideo({
    accessToken,
    uri: application.videoUri,
    category: 'APPLICATION_START',
  });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation Mutation($startApplicationInput: StartApplicationInput!) {
          startApplication(startApplicationInput: $startApplicationInput) {
            guid
            start_picture {
              guid
              path
            }
          }
        }
      `,
      variables: {
        startApplicationInput: {
          application_guid: application.guid,
          start_evidence_guid: videoGuid,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.startApplication.guid;
};

export default startApplication;
