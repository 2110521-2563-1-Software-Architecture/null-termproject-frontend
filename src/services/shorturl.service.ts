import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ShortUrl from '../models/short-url';
import { API_URL } from "src/config";
import { ReplaySubject } from 'rxjs';

const BASE_URL = `api/short-url`

interface CreateUrlParams {
  shortUrl?: string;
  realUrl: string;
}

interface UpdateUrlParams  {
  oldShortUrl: string;
  newShortUrl: string;
  realUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class ShorturlService {

  myUrls = new ReplaySubject<ShortUrl[]>(1);

  constructor(
    private httpClient: HttpClient,
  ) { }

  async createUrl(params: CreateUrlParams): Promise<ShortUrl> {
    const data = await this.httpClient.post(`${API_URL}/${BASE_URL}/create`, params, {withCredentials: true}).toPromise();
    return data as ShortUrl;
  }

  async updateUrl(params: UpdateUrlParams): Promise<ShortUrl> {
    const {oldShortUrl: id, realUrl, newShortUrl: shortUrl } = params;
    const body = {realUrl, shortUrl}
    const data = await this.httpClient.post(`${API_URL}/${BASE_URL}/${id}`, body, {withCredentials: true}).toPromise();
    return data as ShortUrl;
  }

  async getUrl(id: string): Promise<ShortUrl> {
    const data = await this.httpClient.get(`${API_URL}/${BASE_URL}/${id}`, {withCredentials: true}).toPromise();
    return data as ShortUrl;
  }

  async getMyUrls(): Promise<ShortUrl[]> {
    const data = await this.httpClient.get(`${API_URL}/${BASE_URL}/`, {withCredentials: true}).toPromise();
    this.myUrls.next(data as ShortUrl[]);
    return data as ShortUrl[];
  }

  async deleteUrl(id: string): Promise<void> {
    await this.httpClient.delete(`${API_URL}/${BASE_URL}/${id}`, {withCredentials: true}).toPromise();
  }
}
