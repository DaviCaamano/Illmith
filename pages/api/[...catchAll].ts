import { Backend } from '@server/main';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  new Promise(async (resolve) => {
    const listener = await Backend.getListener();
    listener(req, res);
    res.on('finish', resolve);
  }).then();
}
