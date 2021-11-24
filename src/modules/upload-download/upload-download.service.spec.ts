import { Test, TestingModule } from '@nestjs/testing';
import { UploadDownloadService } from './upload-download.service';

describe('UploadDownloadService', () => {
  let service: UploadDownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadDownloadService],
    }).compile();

    service = module.get<UploadDownloadService>(UploadDownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
