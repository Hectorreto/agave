const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  oldPassword: string;
  newPassword: string;
  guid: string;
  accessToken: string;
};

const changePassword = async ({ newPassword, oldPassword, guid, accessToken }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation Mutation($updateUserInput: UpdateUserInput!) {
          updateUser(updateUserInput: $updateUserInput) {
            updated_date
            __typename
          }
        }
      `,
      variables: {
        updateUserInput: {
          password: newPassword,
          old_password: oldPassword,
          guid,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return {
    errorOldPassword: gqlResponse.errors?.[0]?.message === 'La contraseña actual es érronea.',
    errorSamePassword:
      gqlResponse.errors?.[0]?.message ===
      'La nueva contraseña debe ser diferente que la anterior.',
    success: gqlResponse.data?.updateUser?.updated_date !== undefined,
  };
};

export default changePassword;
