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
import {GenderService} from './gender.service';
import {CreateGenderDto} from './dto/create-gender.dto';
import {UpdateGenderDto} from './dto/update-gender.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from '../../auth/decorators/roles.decotrator';
import {GetGenderDto} from './dto/get-gender.dto';
import {BadRequestResponse} from '../../common/doc-response/badRequestResponse';
import {ForbiddenResponse} from '../../common/doc-response/forbiddenResponse';
import {Gender} from './entities/gender.entity';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';
import {NotFoundResponse} from '../../common/doc-response/notFoundResponse';
import {Public} from '../../auth/decorators/public.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {RolesGuard} from '../../auth/roles.guard';

@ApiBearerAuth()
@Roles('admin')
@ApiTags('Gender')
@Controller({path: 'gender', version: '1'})
export class GenderController {

    constructor(private readonly genderService: GenderService) {
    }

    @Post()
    @ApiOperation({summary: 'Create new gender type'})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseGuards(AuthGuard, RolesGuard)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetGenderDto
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
    create(@Body() createGenderDto: CreateGenderDto): Promise<Gender> {
        return this.genderService.create(createGenderDto);
    }

    @Get()
    @Public()
    @ApiOperation({summary: 'Get all genders'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: GetGenderDto,
        isArray: true
    })
    findAll(): Promise<Gender[]> {
        return this.genderService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({summary: 'Get a gender'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: GetGenderDto
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not found",
        type: NotFoundResponse
    })
    findOne(@Param('id') id: string): Promise<Gender> {
        return this.genderService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a gender'})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseGuards(AuthGuard, RolesGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: GetGenderDto
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
    update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto): Promise<Gender> {
        return this.genderService.update(+id, updateGenderDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a gender'})
    @UseGuards(AuthGuard, RolesGuard)
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
        return this.genderService.remove(+id);
    }
}
