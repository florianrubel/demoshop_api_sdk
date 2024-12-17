export interface SignInUser {
    userName: string;
    password: string;
}

export interface AuthenticationTokenSet {
    accessToken: string;
    refreshToken: string;
}

export interface TokenUser {
    jti: string;
    sub: string;
    deviceid: string;
    unique_name: string;
    role: string[];
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
  }
