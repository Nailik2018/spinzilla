import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateAssociationDto} from './dto/create-association.dto';
import {UpdateAssociationDto} from './dto/update-association.dto';
import {Association} from './entities/association.entity';
import {AppCustomLogger} from '../../app.custom.logger';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';

@Injectable()
export class AssociationService {

    private readonly logger: AppCustomLogger = new AppCustomLogger(AssociationService.name);

    constructor(@InjectRepository(Association) private readonly associationRepository: Repository<Association>) {
    }

    async create(createAssociationDto: CreateAssociationDto): Promise<Association> {
        try {
            this.logger.log(`Create association [post]`);
            return this.associationRepository.save(createAssociationDto);
        } catch (error) {
            this.logger.error(`The association could not be created! [create] ${error.code}`);
            throw new Error(`The association could not be created!`);
        }
    }

    async findAll(): Promise<Association[]> {
        return this.associationRepository.find();
    }

    async findOne(id: number): Promise<Association> {
        this.logger.log(`Find association ID ${id} [get id]`);
        const association: Association = await this.associationRepository.findOne({
            where: {
                id: id
            },
        });
        if (!association) {
            throw new BadRequestException(`The association with the ID ${id} could not be found!`);
        }
        return association;
    }

    async update(id: number, updateAssociationDto: UpdateAssociationDto): Promise<Association> {
        const existingAssociation: Association = await this.associationRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if (!existingAssociation) {
            throw new BadRequestException(`The association with the ID ${id} could not be changed!`);
        }
        try {
            this.logger.log(`Update association ID ${id} [put]`);
            const updatedAssociation: Association = this.associationRepository.merge(existingAssociation, updateAssociationDto);
            return this.associationRepository.save(updatedAssociation);
        } catch (error) {
            this.logger.error(`The association with the ID ${id} could not be changed! [update] ${error.code}`);
            throw new BadRequestException(`The association with the ID ${id} could not be changed!`);
        }
    }

    async remove(id: number): Promise<DeleteResponseOk> {
        try {
            const deleteResult: DeleteResult = await this.associationRepository.delete(id);
            if (deleteResult.affected !== 1) {
                throw new Error();
            }
            this.logger.log(`The association with the ID ${id} was successfully deleted! [delete]`);
            return new DeleteResponseOk(`Der Verband mit der ID ${id} wurde erfolgreich gelöscht!`);
        } catch (error) {
            this.logger.error(`The association with the ID ${id} could not be deleted! [delete] ${error.code}`);
            throw new BadRequestException(`The association with the ID ${id} could not be deleted!`);
        }
    }
}
