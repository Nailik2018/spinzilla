import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import {PlayerService} from './player.service';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from '../../auth/decorators/roles.decotrator';
import {Public} from '../../auth/decorators/public.decorator';
import {Player} from './entities/player.entity';
import {GetPlayerDto} from './dto/get-player.dto';
import {BadRequestResponse} from '../../common/doc-response/badRequestResponse';
import {ForbiddenResponse} from '../../common/doc-response/forbiddenResponse';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';
import {NotFoundResponse} from '../../common/doc-response/notFoundResponse';
import {AuthGuard} from '../../auth/auth.guard';
import {RolesGuard} from '../../auth/roles.guard';

@ApiBearerAuth()
@Roles('admin')
@ApiTags('Player')
@Controller({path: 'player', version: '1'})
export class PlayerController {

    constructor(private readonly playerService: PlayerService) {
    }

    @Post()
    @ApiOperation({summary: 'Create new player'})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseGuards(AuthGuard, RolesGuard)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetPlayerDto
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Bad request",
        type: BadRequestResponse
    })
    @ApiResponse({
        status: HttpStatus.NOT_ACCEPTABLE,
        description: "Forbidden",
        type: ForbiddenResponse
    })
    create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return this.playerService.create(createPlayerDto);
    }

    @Get()
    @Public()
    @ApiOperation({summary: 'Get all players'})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetPlayerDto,
        isArray: true
    })
    findAll(): Promise<Player[]> {
        return this.playerService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({summary: 'Get a player'})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetPlayerDto
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not found",
        type: NotFoundResponse
    })
    findOne(@Param('id') id: string): Promise<Player> {
        return this.playerService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a player'})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseGuards(AuthGuard, RolesGuard)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetPlayerDto
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not found",
        type: NotFoundResponse
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: "Forbidden",
        type: ForbiddenResponse
    })
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        return this.playerService.update(+id, updatePlayerDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiOperation({summary: 'Get a player'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: DeleteResponseOk
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not found",
        type: NotFoundResponse
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: "Forbidden",
        type: ForbiddenResponse
    })
    remove(@Param('id') id: string): Promise<DeleteResponseOk> {
        return this.playerService.remove(+id);
    }
}
