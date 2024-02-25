import { Application, Product } from '../../services/applicationService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  limit: number;
  skip: number;
};

const conceptTypes: any = {
  NUTRITION: 'nutrition',
  UNDERGROWTH: 'undergrowth',
  PHYTOSANITARY: 'phytosanitary',
};

const getAllApplications = async ({ accessToken, limit, skip }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query Applications($findApplicationsArgs: FindApplicationArgs!) {
          applications(findApplicationsArgs: $findApplicationsArgs) {
            data {
              guid
              created_date
              updated_date
              created_by {
                first_name
                last_name
              }
              updated_by {
                first_name
                last_name
              }
              month
              status
              scheduled_date
              concept
              bottles
              notes
              start_picture {
                path
              }
              completed_picture {
                path
              }
              land {
                guid
              }
              template_recipe {
                products {
                  applied_total_dose
                  dose_per_bottle
                  product_name
                }
              }
            }
          }
        }
      `,
      variables: {
        findApplicationsArgs: {
          skip,
          limit,
          sort: {
            column: 'scheduled_date',
            order: 'DESC',
          },
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  const data: any[] = gqlResponse.data.applications.data;

  const statusTypes: any = {
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'inProcess',
    COMPLETED: 'finalized',
  };

  return data.map<Application>((value) => {
    const productsRaw: any[] = value.template_recipe?.products ?? [];
    const products = productsRaw.map<Product>((product) => {
      const data: Product = {
        name: product.product_name,
        amount: String(product.dose_per_bottle),
      };
      if (product.applied_total_dose) {
        data.realAmount = String(product.applied_total_dose);
      }

      return data;
    });

    return {
      id: value.guid,
      guid: value.guid,
      createdAt: value.created_date,
      updatedAt: value.updated_date,
      createdBy: JSON.stringify(value.created_by),
      updatedBy: JSON.stringify(value.updated_by),
      applicationMonth: `${Number(value.month)}`,
      state: statusTypes[value.status],
      scheduledDate: value.scheduled_date,
      concept: conceptTypes[value.concept],
      containerAmount: `${Number(value.bottles)}`,
      notes: value.notes,
      videoUri: value.start_picture?.path,
      products: JSON.stringify(products),
      finalizeVideoUri: value.completed_picture?.path,
      propertyId: value.land?.guid,
    };
  });
};

export default getAllApplications;
