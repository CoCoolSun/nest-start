import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default {
  transport: {
    host: "smtp.126.com",
    port: 465,
    auth: {
      user: "xxxx@126.com",
      pass: "RUZSGFLQNIILLCPS",
    }
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: join(__dirname, '../templates/email/'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
}