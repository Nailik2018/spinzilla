import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post, Query,
    Request, UseGuards,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Public} from './decorators/public.decorator';
import {AuthGuard} from './auth.guard';

@ApiTags('Auth')
@Controller({path: 'auth', version: '1'})
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiQuery({ name: 'username', required: true, description: 'Username for login' })
    @ApiQuery({ name: 'password', required: true, description: 'Password for login' })
    @ApiResponse({ status: 200, description: 'Successful login' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    signIn(@Query('username') username: string, @Query('password') password: string) {
        return this.authService.signIn(username, password);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}