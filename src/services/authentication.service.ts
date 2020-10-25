import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { API_URL } from 'src/config';


// current login info
interface UserInfo {
  username?: string;
  _id?: string;
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


const BASE_URL = 'api/user'

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

  async autoLogin() {
    const user = (await this.httpClient.get(`${API_URL}/${BASE_URL}/me`, {withCredentials: true}).toPromise()) as any
    this.currentUser.next({username: user.username, _id: user._id})
  }

  async login(credentials: LoginCredentials) {
    this.httpClient.post(`${API_URL}/${BASE_URL}/login`, credentials, {withCredentials: true})
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
    return this.httpClient.post(`${API_URL}/${BASE_URL}/create`, credentials, {withCredentials: true})
    .toPromise().then(res => {
      return;
    })
    .catch(err => {
      console.error("Error in register")
      throw err;
    });
  }

  async logout(): Promise<void> {
    return this.httpClient.post(`${API_URL}/${BASE_URL}/logout`, {}, {withCredentials: true}).toPromise()
    .then(res => {
      console.log("logout");
      this.currentUser.next({});
    })
    .catch(err => {
      console.error("Error in logout")
      throw err;
    })
  }
}
