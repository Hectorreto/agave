const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

const login = async (email: string, password: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation Mutation($loginUserInput: LoginUserInput!) {
          login(loginUserInput: $loginUserInput) {
            access_token
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
  const data = await response.json();
  return data.data.login.access_token;
};

export default login;
