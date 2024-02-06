const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

const changePassword = async (password: string, guid: string, accessToken: string) => {
  console.log({ password, guid, accessToken });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
          changePassword(changePasswordInput: $changePasswordInput) {
            success
          }
        }
      `,
      variables: {
        changePasswordInput: {
          new_password: password,
          otp_guid: guid,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  console.log(gqlResponse);
  return {
    success: false,
  };
};

export default changePassword;
