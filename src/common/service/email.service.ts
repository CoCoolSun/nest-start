import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService:MailerService) {
  }
  sendEmail(
    to: string = "xxxx@qq.com",
    from: string = 'xxxx126.com',
    subject: string = 'Testing Nest MailerModule ✔',
    template: string = './welcome',
    // html: '<b>Welcome Frost!</b>',
    context: Object = {code: '测试用例',username: 'walker lee'}) {
    this.mailerService.sendMail({
      to, from, subject, template, context
    })
  }
}
