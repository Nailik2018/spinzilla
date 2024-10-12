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
import {AssociationService} from './association.service';
import {CreateAssociationDto} from './dto/create-association.dto';
import {UpdateAssociationDto} from './dto/update-association.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from '../../auth/decorators/roles.decotrator';
import {Public} from '../../auth/decorators/public.decorator';
import {GetAssociationDto} from './dto/get-association.dto';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';
import {Association} from './entities/association.entity';
import {ForbiddenResponse} from '../../common/doc-response/forbiddenResponse';
import {NotFoundResponse} from '../../common/doc-response/notFoundResponse';
import {BadRequestResponse} from '../../common/doc-response/badRequestResponse';
import {AuthGuard} from '../../auth/auth.guard';
import {RolesGuard} from '../../auth/roles.guard';

@ApiBearerAuth()
@Roles('admin')
@ApiTags('Association')
@Controller({path: 'association', version: '1'})
export class AssociationController {

    constructor(private readonly associationService: AssociationService) {
    }

    @Post()
    @ApiOperation({summary: 'Create new association'})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseGuards(AuthGuard, RolesGuard)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Created",
        type: GetAssociationDto
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Bad request",
        type: BadRequestResponse
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: "Forbidden",
        type: ForbiddenResponse
    })
    create(@Body() createAssociationDto: CreateAssociationDto): Promise<Association> {
        return this.associationService.create(createAssociationDto);
    }

    @Get()
    @Public()
    @ApiOperation({summary: 'Get all associations'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Created",
        type: GetAssociationDto,
        isArray: true
    })
    findAll(): Promise<Association[]> {
        return this.associationService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({summary: 'Get a association'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: GetAssociationDto
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Not found",
        type: NotFoundResponse
    })
    findOne(@Param('id') id: string): Promise<Association> {
        return this.associationService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a association'})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseGuards(AuthGuard, RolesGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: GetAssociationDto
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
    update(@Param('id') id: string, @Body() updateAssociationDto: UpdateAssociationDto): Promise<Association> {
        return this.associationService.update(+id, updateAssociationDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a association'})
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
        return this.associationService.remove(+id);
    }
}
