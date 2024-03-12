export interface IFormValuesDb {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
}

export interface ISignInValues {
  email: string;
  password: string;
}

export const fakeDb: IFormValuesDb[] = [
  {
    id: "1234",
    firstName: "Elush",
    lastName: "Shirazpour",
    email: "eshirazp@gmail.com",
    password: "Coolcat1",
  },
];

const fakeGetUserCall = (user: ISignInValues): Promise<boolean> => {
  return new Promise((res, rej) => {
    const arr = fakeDb.find(
      (dbUser) =>
        dbUser.email === user.email && dbUser.password === user.password
    );
    if (arr) {
      res(true);
    }

    rej(false);
  });
};

const fakePostUserCall = (newUser: IFormValuesDb): Promise<boolean> => {
  return new Promise((res, rej) => {
    const arr = fakeDb.find((user) => user.email === newUser.email);
    if (arr) {
      rej(false);
    }

    fakeDb.push(newUser);
    res(true);
  });
};

export async function GET(user: ISignInValues) {
  const result = await fakeGetUserCall(user);
  return result;
}

export async function POST(newUser: IFormValuesDb) {
  const result = await fakePostUserCall(newUser);
  return result;
}
