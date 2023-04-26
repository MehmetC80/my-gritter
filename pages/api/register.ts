import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ errorMsg: 'This methode is not allowd' });
  }

  try {
    const { email, username, password, name } = req.body;

    // bcrypt  getting password
    const hashedPassword = await bcrypt.hash(password, 12);

    // store new user in database

    const newUser = await prismadb.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    return res
      .status(405)
      .json({ errorMsg: 'This methode is not allowd', error: err });
  }
}
