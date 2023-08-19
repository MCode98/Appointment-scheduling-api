import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interfaces/active-user-interface';
import { RefreshTokenDto } from './dto/refresh-token.dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { InvalidatedRefreshTokenError, RefreshTokenIdsStorage } from './refresh-token-ids.storage/refresh-token-ids.storage';
import { Admin } from 'src/admins/entities/admin.entity';
import { ConsultantSignUpDto } from './dto/consultant/consultant-sign-up.dto';
import { Consultant } from 'src/consultants/entities/consultant.entity';
import { JobSeekerSignUpDto } from './dto/job-seeker/job-seeker-sign-up.dto';
import { JobSeeker } from 'src/job_seekers/entities/job_seeker.entity';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Consultant) private consultantRepository: Repository<Consultant>,
        @InjectRepository(JobSeeker) private jsRepository: Repository<JobSeeker>,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    ) {}

    async signUp(signUpDto: SignUpDto) {

        try {
            const admin = new Admin();
            admin.email = signUpDto.email;
            admin.password = await this.hashingService.hash(signUpDto.password);
            admin.user_name = signUpDto.user_name;
            await this.adminRepository.save(admin);
        } catch (err) {
            const uniqueViolationErrorCode = 'ER_DUP_ENTRY';
            if (err.code === uniqueViolationErrorCode) {
                throw new ConflictException();
            }
            throw err;
        }
        return ('success');
    }

    async consultantSignUp(signUpDto: ConsultantSignUpDto) {
        try {
            const consultant = new Consultant();
            consultant.email = signUpDto.email;
            consultant.password = await this.hashingService.hash(signUpDto.password);
            consultant.name = signUpDto.name;
            consultant.country = signUpDto.country;
            consultant.job_type = signUpDto.job_type;
            await this.consultantRepository.save(consultant);
        } catch (err) {
            const uniqueViolationErrorCode = 'ER_DUP_ENTRY';
            if (err.code === uniqueViolationErrorCode) {
                throw new ConflictException();
            }
            throw err;
        }
        return ('success');
    }

    async jobSeekerSignUp(signUpDto: JobSeekerSignUpDto){
        try {
            const js = new JobSeeker();
            js.email = signUpDto.email;
            js.password = await this.hashingService.hash(signUpDto.password);
            js.name = signUpDto.name;
            js.age = signUpDto.age;
            await this.jsRepository.save(js);
        } catch (err) {
            const uniqueViolationErrorCode = 'ER_DUP_ENTRY';
            if (err.code === uniqueViolationErrorCode) {
                throw new ConflictException();
            }
            throw err;
        }
        return ('success');
    }

    async signIn(signInDto: SignInDto, role: string) {
        let repository:any;
        if (role == 'admin'){
            repository = this.adminRepository;
        }else if (role == 'consultant'){
            repository = this.consultantRepository;
        }else{
            repository = this.jsRepository;
        }

        const user = await repository.findOneBy({
            email: signInDto.email,
        });
        if (!user) {
            throw new UnauthorizedException('User does not exists');
        }
        const IsMatch = await this.hashingService.compare(
            signInDto.password,
            user.password
        );
        if (!IsMatch) {
            throw new UnauthorizedException('Password does not match');
        }
        return await this.generateTokens(user, role);
    }

    async generateTokens(user: any, role: string) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                { email: user.email, role: role}
            ),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
                refreshTokenId, role: role
            })
        ]);

        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId, role);
        return {
            accessToken,
            refreshToken
        };
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
        const { sub, role, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & Pick<ActiveUserData, 'role'> & { refreshTokenId:string}
        >(
            refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            }
        );
        const user = await this.adminRepository.findOneByOrFail({
            id: sub,
        });
        const isValid = await this.refreshTokenIdsStorage.validate(
            user.id,
            refreshTokenId,
            role
        );
        if(isValid) {
            await this.refreshTokenIdsStorage.invalidate(user.id, role);
        } else {
            throw new Error('Refresh token is invalid');
        }
        return this.generateTokens(user, role);
        } catch(err){
            if (err instanceof InvalidatedRefreshTokenError) {
                throw new UnauthorizedException('Access denied');
            }
            throw new UnauthorizedException();
        }
    }

    async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        );
    }
}
