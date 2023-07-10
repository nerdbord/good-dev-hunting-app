export interface userDatafromGH {
  email: string
  image: string
  name: string
}

export const createInitialPartOfUser = async (
  userDatafromGH: userDatafromGH,
  status: string,
) => {
  await fetch(`${process.env.API_PROFILES_URL}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${status}`,
    },
    body: JSON.stringify(userDatafromGH),
  })
}
