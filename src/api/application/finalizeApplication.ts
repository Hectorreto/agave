import postVideo from './postVideo';
import { Application, Product } from '../../services/applicationService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  application: Application;
  products: Product[];
};

const finalizeApplication = async ({ accessToken, application, products }: Props) => {
  const videoGuid = await postVideo({
    accessToken,
    uri: application.finalizeVideoUri,
    category: 'APPLICATION_COMPLETED',
  });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation Mutation($completeApplicationInput: CompleteApplicationInput!) {
          completeApplication(completeApplicationInput: $completeApplicationInput) {
            guid
          }
        }
      `,
      variables: {
        completeApplicationInput: {
          application_guid: application.guid,
          applied_recipe: {
            products: products.map((product) => ({
              applied_total_dose: Number(product.realAmount),
              dose_per_bottle: Number(product.amount),
              product_name: product.name,
            })),
          },
          complete_evidence_guid: videoGuid,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.completeApplication.guid;
};

export default finalizeApplication;
