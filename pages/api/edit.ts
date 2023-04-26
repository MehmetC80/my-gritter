import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'PATCH') {
      return res.status(405).json({ errorMsg: 'This methode is not allowd' });
    }

    // get authenticated currentUser from request
    const { currentUser } = await serverAuth(req);

    // get all field from request to update
    const { name, username, bio, profilImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error('Missing field!');
    }

    // find user by id and update values
    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profilImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res
      .status(405)
      .json({ errorMsg: 'This methode is not allowd', error: err });
  }
}
