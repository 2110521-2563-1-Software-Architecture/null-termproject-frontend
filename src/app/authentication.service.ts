import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";



// current login info
interface UserInfo {
  username?: string;
}

// username/pass
interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
}

// JWT payload from server
interface LoginResponseT {
  token: string;
}

interface JWTPayload {
  username: string;
}

const API_URL = 'http://localhost:3000';
const BASE_URL = 'api/users'


const decodeJWT = (jwt: string): any => {
  const [_header, payload, _sig] = jwt.split('.');
  if (!payload) throw new Error("This appear to be not a JWT");
  try {
    const text = atob(payload);
    try {
      return JSON.parse(text);
    } catch (err) {
      throw 'Payload is not JSON';
    }
  } catch (err) {
    throw  'Payload is not base64 encoded';
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: BehaviorSubject<UserInfo>;
  private token: string; // JWT

  constructor(
    private httpClient: HttpClient,
  ) {
    this.currentUser = new BehaviorSubject<UserInfo>({});
  }


  async login(credentials: LoginCredentials) {
    this.httpClient.post(`${API_URL}/${BASE_URL}/authentication`, credentials)
    .toPromise().then((res: LoginResponseT) => {
      const jwt: JWTPayload = decodeJWT(res.token);
      this.token = res.token;

      this.token = res.token; // save token
      this.currentUser.next({
        username: jwt.username,
      });
    })
    .catch(err => {
      console.error(err);
      console.error('Error in login')
      this.currentUser.error(err);
    })
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    return this.httpClient.post(`${API_URL}/${BASE_URL}`, credentials)
    .toPromise().then(res => {
      return;
    })
    .catch(err => {
      console.error("Error in register")
      throw err;
    });
  }
}
