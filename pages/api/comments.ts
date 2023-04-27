import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // potected the route ans extract currentUser
    const { currentUser } = await serverAuth(req, res);

    const { body } = req.body;

    const { postId } = req.query;

    // check if postId is valid
    if (!postId || typeof postId !== 'string') {
      throw new Error('PostID is not valid');
    }

    const comment = await prismadb.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId: postId,
      },
    });

    try {
      const post = await prismadb.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prismadb.notification.create({
          data: {
            body: 'Someone liked your tweet!',
            userId: post.userId,
          },
        });

        await prismadb.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }

    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
