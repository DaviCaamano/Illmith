import fs from 'fs';
const path = require('path');
import bcrypt from 'bcrypt';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';
import { httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { Injectable, Logger } from '@nestjs/common';

//types
import { LogHandler } from '@interface/server/logging';
import { ErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { JwtPayload, Secret } from 'jsonwebtoken';

/**
 A class for the parsing/formatting of strings/JSON.
 */
@Injectable()
export class ParseService {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  private readonly jwtPrivateKey: Secret;
  private readonly jwtPublicKey: Secret;
  private encryptionSalt: string;
  constructor(private readonly logger: Logger) {
    this.log = (...args: any) => {
      logger.log(args);
    };
    this.error = (...args: any) => {
      logger.error(args);
    };
    this.httpError = httpErrorHandler(this.error);

    this.jwtPrivateKey = fs.readFileSync(path.join(__dirname, '/../../../../constants/jwt/private.jwt.pem'));
    this.jwtPublicKey = fs.readFileSync(path.join(__dirname, '/../../../../constants/jwt/public.jwt.pem'));
    bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')).then((salt: string) => {
      this.encryptionSalt = salt;
      console.log('Salt', salt);
    });
  }

  public getSalt = () => this.encryptionSalt;
  public hashPassword(password: string): Promise<string> {
    return new Promise(async (resolve) => {
      bcrypt.hash(password, this.encryptionSalt, (err, hash) => {
        if (err) {
          this.httpError('Invalid Password');
        } else {
          resolve(hash);
        }
      });
    });
  }

  signJWT(data: object): JwtPayload {
    if (!this.jwtPrivateKey) {
      this.httpError('ENV NOT SET');
    }
    const token: string = signJwt(data, this.jwtPrivateKey, { expiresIn: '14 days', algorithm: 'ES256' });

    const payload = verifyJwt(token, this.jwtPublicKey) as JwtPayload;

    return { token, ...payload };
  }

  jwtVerify(token: string): Promise<unknown> {
    return new Promise((resolve) => {
      verifyJwt(token, this.jwtPublicKey, (err, decoded: any) => {
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
