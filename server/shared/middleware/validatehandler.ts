import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ADMIN_ROLE_ID } from '@constants/shared';
import { ErrorHandler } from '@utils/server';
import { PrismaService } from '@server/shared';

interface AuthenticationRec {
  expiration: Date;
  user: {
    id: number;
    username: string | null;
    email: string;
    roleId: number;
  };
}
export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction,
  admin: boolean,
  httpError: ErrorHandler,
  db: PrismaService
) => {
  const token = req.get('auth');
  if (!token) return httpError(HttpStatus.UNAUTHORIZED);
  const { ip } = req;

  db.authentication
    .findFirst({
      select: {
        expiration: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            roleId: true,
          },
        },
      },
      where: {
        ip,
        token,
        user: {
          roleId: admin ? ADMIN_ROLE_ID : undefined,
        },
      },
    })
    .then((rec: AuthenticationRec | null) => {
      if (rec) {
        const {
          user: { id, email, username, roleId },
          expiration,
        } = rec;
        req.userValidated = true;
        if (admin) req.userAuthorized = false;
        req.user = {
          id,
          username,
          email,
          roleId,
        };
        req.authToken = {
          token,
          expiration,
        };
      }
      next();
    });
};
