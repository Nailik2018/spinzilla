import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus} from '@nestjs/common';
import {ClubService} from './club.service';
import {CreateClubDto} from './dto/create-club.dto';
import {UpdateClubDto} from './dto/update-club.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from '../../auth/decorators/roles.decotrator';
import {Public} from '../../auth/decorators/public.decorator';
import {Club} from './entities/club.entity';
import {GetClubDto} from './dto/get-club.dto';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';

@Roles('admin')
@ApiBearerAuth()
@ApiTags('Club')
@Controller({path: 'club', version: '1'})
export class ClubController {

    readonly clubService: ClubService;

    constructor(clubService: ClubService) {
        this.clubService = clubService;
    }

    @Post()
    @ApiOperation({summary: 'Create new club'})
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiResponse({
      status: HttpStatus.CREATED,
      description: "Created",
      type: GetClubDto
    })
    create(@Body() createClubDto: CreateClubDto) {
        return this.clubService.create(createClubDto);
    }

    @Get()
    @Public()
    @ApiOperation({summary: 'Get all clubs'})
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Ok",
      type: GetClubDto,
      isArray: true
    })
    findAll(): Promise<Club[]> {
        return this.clubService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({summary: 'Get a club'})
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Ok",
      type: GetClubDto
    })
    findOne(@Param('id') id: string): Promise<Club> {
        return this.clubService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'update a club'})
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Ok",
      type: GetClubDto
    })
    update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
        return this.clubService.update(+id, updateClubDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a club'})
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Ok",
      type: DeleteResponseOk
    })
    remove(@Param('id') id: string) {
        return this.clubService.remove(+id);
    }
}
