import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import bcrypt from 'bcrypt';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ errorMsg: 'Method is not allowed' });
  }

  try {
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ errorMsg: 'Method is not allowed', error: err });
  }
}
