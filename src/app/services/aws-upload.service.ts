import { Injectable } from '@angular/core';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { environment } from 'src/environments/environment';

interface Params {
  Bucket: string;
  Key: string;
  Body?: File;
  ACL?: string;
  ContentType?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AwsUploadService {
  constructor() {}

  s3Client = new S3Client({
    endpoint: environment.SPACES_ENDPOINT,
    forcePathStyle: false,
    region: environment.SPACES_REGION,
    credentials: {
      accessKeyId: environment.SPACES_ACCESS_KEY,
      secretAccessKey: environment.SPACES_SECRET_KEY,
    },
  });

  uploadObject(params: Params): Promise<any> {
    return new Promise((resolve, reject) => {
      this.s3Client
        .send(new PutObjectCommand(params))
        .then((data) => {
          resolve({
            Location: `${environment.SPCAES_CDN_URL}/${params.Key}`,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  uploadFile = (file: File, type: string) => {
    const params: Params = {
      Bucket: environment.SPACES_BUCKET,
      Key: `${
        type === 'thumbnail'
          ? environment.SPACES_THUMBNAIL_FOLDER
          : environment.SPACES_TRAILER_FOLDER
      }/${file.name.trim()}`,
      Body: file,
      ACL: environment.SPACES_ACL,
      ContentType: file.type,
    };
    return this.uploadObject(params);
  };
}
