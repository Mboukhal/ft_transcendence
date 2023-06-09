import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, Intra42Strategy } from "./strategy";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [ConfigModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
        }),
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, Intra42Strategy],
})
export class AuthModule {}