import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as CryptoJS from 'crypto-js';

export class Utils {
  public static encodeString(plain: string): string {
    return CryptoJS.AES.encrypt(plain, process.env.HASH_KEY).toString();
  }

  public static decodeString(cipher: string): string {
    const bytes = CryptoJS.AES.decrypt(cipher, process.env.HASH_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public static badRequestExceptionFactory(
    validationErrors: ValidationError[] = [],
  ) {
    const errors = validationErrors.map((e) => ({
      field: e.property,
      message: Object.keys(e.constraints)
        .map((key) => e.constraints[key])
        .join('\n'),
    }));
    return new BadRequestException(errors);
  }
}
