import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enums';
import { ConsultantSignUpDto } from './dto/consultant/consultant-sign-up.dto';
import { JobSeekerSignUpDto } from './dto/job-seeker/job-seeker-sign-up.dto';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('admin/register/secretRoute')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)

    @Post('consultant/register')
    consultantSignUp(@Body() signUpDto: ConsultantSignUpDto) {
        return this.authService.consultantSignUp(signUpDto);
    }

    @Post('js/register')
    JobSeekerSignUp(@Body() signUpDto: JobSeekerSignUpDto) {
        return this.authService.jobSeekerSignUp(signUpDto);
    }

    @Post('admin/login')
    signIn(@Body() signInDto: SignInDto) {
        const role = "admin" ;
        return this.authService.signIn(signInDto, role);
    }

    @HttpCode(HttpStatus.OK)
    @Post('consultant/login')
    ConsultantSignIn(@Body() signInDto: SignInDto) {
        const role = "consultant" ;
        return this.authService.signIn(signInDto, role);
    }

    @HttpCode(HttpStatus.OK)
    @Post('js/login')
    JobSeekerSignIn(@Body() signInDto: SignInDto) {
        const role = "job_seeker" ;
        return this.authService.signIn(signInDto, role);
    }

    @HttpCode(HttpStatus.OK)
    @Post('token-refresh')
    refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto);
    }
}
