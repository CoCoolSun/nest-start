import { Module } from '@nestjs/common';
import { UploadDownloadService } from './upload-download.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from "nestjs-config";

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.get('multerModuleConfig'),
      inject: [ConfigService]
    })
  ],
  providers: [UploadDownloadService],
  exports: [UploadDownloadService]
})
export class UploadDownloadModule {}
