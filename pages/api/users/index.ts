import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

// route to get all users from db in ordert by created order

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ errorMsg: 'This methode is not allowd' });
  }

  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ errorMsg: 'This methode is not allowd', error: err });
  }
}
