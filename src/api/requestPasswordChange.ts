const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

const requestPasswordChange = async (email: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation RequestPasswordChange($requestPasswordChangeInput: RequestPasswordChangeInput!) {
          requestPasswordChange(requestPassworChangeInput: $requestPasswordChangeInput) {
            success
          }
        }
      `,
      variables: {
        requestPasswordChangeInput: {
          email_address: email,
        },
      },
    }),
  });
  const gqlResponse = await response.json();

  if (!gqlResponse.data.requestPasswordChange.success) {
    throw new Error('requestPasswordChange');
  }
};

export default requestPasswordChange;
