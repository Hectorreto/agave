const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

const login = async (email: string, password: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation Login($loginUserInput: LoginUserInput!) {
          login(loginUserInput: $loginUserInput) {
            access_token
            user {
              guid
              role
            }
          }
        }
      `,
      variables: {
        loginUserInput: {
          email_address: email,
          password,
        },
      },
    }),
  });
  const gqlResponse = await response.json();

  if (gqlResponse.errors?.[0].code === 401) {
    throw new Error('errorCredentials');
  }
  if (gqlResponse.data?.login.user.role !== 'OPERATOR') {
    throw new Error('errorRole');
  }

  return {
    accessToken: gqlResponse.data?.login.access_token,
    guid: gqlResponse.data?.login.user.guid,
  };
};

export default login;
