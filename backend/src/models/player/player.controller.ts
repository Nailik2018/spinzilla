import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {PlayerService} from './player.service';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Roles} from '../../auth/decorators/roles.decotrator';
import {Public} from '../../auth/decorators/public.decorator';

@ApiBearerAuth()
@Roles('admin')
@ApiTags('Player')
@Controller({path: 'player', version: '1'})
export class PlayerController {

    constructor(private readonly playerService: PlayerService) {
    }

    @Post()
    @ApiOperation({summary: 'Create new player'})
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playerService.create(createPlayerDto);
    }

    @Get()
    @Public()
    @ApiOperation({summary: 'Get all players'})
    findAll() {
        return this.playerService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({summary: 'Get a player'})
    findOne(@Param('id') id: string) {
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
