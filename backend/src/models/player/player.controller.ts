import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus} from '@nestjs/common';
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
    findAll(): Promise<Player[]> {
        return this.playerService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({summary: 'Get a player'})
    findOne(@Param('id') id: string): Promise<Player> {
        return this.playerService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a player'})
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playerService.update(+id, updatePlayerDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @Roles('admin')
    @ApiOperation({summary: 'Get a player'})
    remove(@Param('id') id: string) {
        return this.playerService.remove(+id);
    }
}
