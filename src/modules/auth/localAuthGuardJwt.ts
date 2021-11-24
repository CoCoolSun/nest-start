import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuardJwt extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 在这里添加自定义的认证逻辑
    // 例如调用 super.logIn(request) 来建立一个session
    // console.log(context);
    // console.log(context.getHandler().name);
    // console.log(context.getClass().name);
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // if (user.userId.roles) {
    //   if (user.status == 1) {
    //     user.isPass = true;
    //     console.log(user);
    //   } else if (user.userId.roles.length > 0) {
    //     user.isPass = true;
    //     console.log(user);
    //   }
    // }
    return user;
  }
}
