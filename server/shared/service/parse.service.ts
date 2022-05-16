import bcrypt from 'bcrypt';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';
import { httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { Injectable, Logger } from '@nestjs/common';

//types
import { LogHandler } from '@interface/server/logging';
import { ErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';

export interface SignedJWT {
  decoded: JwtPayload;
  token: string;
}
/**
 A class for the parsing/formatting of strings/JSON.
 */
@Injectable()
export class ParseService {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  private readonly jwtSecret: Secret;
  constructor(private readonly logger: Logger) {
    this.log = (...args: any) => {
      logger.log(args);
    };
    this.error = (...args: any) => {
      logger.error(args);
    };
    this.httpError = httpErrorHandler(this.error);

    this.jwtSecret = process.env.JWT_SECRET as Secret;
  }
  public hashPassword(password: string): Promise<string> {
    return new Promise(async (resolve) => {
      const salt: string = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'));
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          this.httpError('Invalid Password');
        } else {
          resolve(hash);
        }
      });
    });
  }

  signJWT(data: object): Promise<SignedJWT> {
    return new Promise((resolve) => {
      if (!process.env.JWT_SECRET) {
        this.httpError('ENV NOT SET');
      }
      const token: string = signJwt(data, process.env.JWT_SECRET, { expiresIn: '14 days' });
      verifyJwt(token, process.env.JWT_SECRET, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          this.httpError('Failed to sign token', err);
        } else {
          resolve({ token, decoded });
        }
      });
    });
  }

  jwtVerify(token: string): Promise<unknown> {
    return new Promise((resolve) => {
      signJwt(token, this.jwtSecret, (err, decoded: any) => {
        if (err) {
          this.httpError('JWT Verification Failed', err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  randomizeString(length: number) {
    const result: string[] = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }
}
