import { Request as ExpressRequest } from 'express';
import React from 'react';

declare module 'express' {
  export interface Request extends ExpressRequest {
    user?: {
      id: number;
      username: string | null;
      email: string;
      roleId: number;
    };
    userValidated?: boolean;
    userAuthorized?: boolean;
    authToken?: {
      token: string;
      expiration: Date;
    };
  }
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
