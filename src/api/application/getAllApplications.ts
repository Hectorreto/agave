import { Application } from '../../services/applicationService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  limit: number;
  skip: number;
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

  return data.map<Application>((value) => ({
    id: value.guid,
    createdAt: value.created_date,
    updatedAt: value.updated_date,
    createdBy: JSON.stringify(value.created_by),
    updatedBy: JSON.stringify(value.updated_by),
    applicationMonth: value.month,
    state: statusTypes[value.status],
    scheduledDate: value.scheduled_date,
    concept: value.concept,
    containerAmount: value.bottles,
    notes: value.notes,
    videoUri: value.start_picture?.path,
    finalizeVideoUri: value.completed_picture?.path,
    propertyId: value.land?.guid,
  }));
};

export default getAllApplications;
