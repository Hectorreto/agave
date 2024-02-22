import { Application } from '../../services/applicationService';
import { Product } from '../../services/productService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  application: Application;
  products: Product[];
};

const postApplication = async ({ accessToken, application, products }: Props) => {
  const conceptTypes: any = {
    nutrition: 'NUTRITION',
    undergrowth: 'UNDERGROWTH',
    phytosanitary: 'PHYTOSANITARY',
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation Mutation($createApplicationInput: CreateApplicationInput!) {
          createApplication(createApplicationInput: $createApplicationInput) {
            guid
            __typename
          }
        }
      `,
      variables: {
        createApplicationInput: {
          concept: conceptTypes[application.concept],
          land_guid: application.propertyId,
          month: Number(application.applicationMonth),
          scheduled_date: application.scheduledDate,
          bottles: Number(application.containerAmount),
          notes: application.notes,
          template_recipe: {
            products: products.map((value) => ({
              product_name: value.name,
              dose_per_bottle: Number(value.amount),
            })),
          },
          start_picture: null,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.createApplication.guid;
};

export default postApplication;
