import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

// route to get user by userId from db

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ errorMsg: 'Mehtode is not allowed' });
  }

  try {
    //get userId from request.query
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    // get # follows from a single user
    const followersCount = await prismadb.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMsg: 'Something went wromg', error: err });
  }
}
