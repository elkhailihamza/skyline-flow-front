import { Injectable } from '@angular/core';
import { ImageHandler } from './interface/image';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable, shareReplay, take } from 'rxjs';
import { IS_PUBLIC } from '../auth/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ImageHandlerService {
  private readonly BASE_URL = "image";
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};

  constructor(private http: HttpClient) { }

  getImage(image: ImageHandler): Observable<Blob> {
    return this.http.get(`${this.BASE_URL}/${image.imageName}`, {responseType: 'blob'});  
  }

  loadImage(image: ImageHandler): Observable<string | null> {
    return this.getImage(image).pipe(
      map((blob: Blob | null) => {
        if (blob) {
          return URL.createObjectURL(blob);
        } else {
          return null;
        }
      }),
    );
  }

  createImageUrl(image: ImageHandler) {
    if (image.image) {
      return URL.createObjectURL(image.image);
    }
    return null;
  }

  revokeImageUrl(image: string | null) {
    if (image) {
      URL.revokeObjectURL(image);
    }
  }
}
