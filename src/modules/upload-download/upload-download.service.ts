import { Injectable } from '@nestjs/common';
import { zip } from 'compressing';
import { ConfigService } from 'nestjs-config';
@Injectable()
export class UploadDownloadService {
  constructor(private readonly configService: ConfigService) {}

  async downloadAll() {
    const uploadDir = this.configService.get('multerModuleConfig').root;
    const tarStream = new zip.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: `${new Date().getTime()}.zip`, tarStream };

  }
}
