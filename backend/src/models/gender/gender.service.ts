import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateGenderDto} from './dto/create-gender.dto';
import {UpdateGenderDto} from './dto/update-gender.dto';
import {Gender} from './entities/gender.entity';
import {AppCustomLogger} from '../../app.custom.logger';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';

@Injectable()
export class GenderService {

    private readonly logger: AppCustomLogger = new AppCustomLogger(GenderService.name);

    constructor(@InjectRepository(Gender) private readonly genderRepository: Repository<Gender>) {
    }

    async create(createGenderDto: CreateGenderDto): Promise<Gender> {
        try {
            this.logger.log(`Create gender [post]`);
            return this.genderRepository.save(createGenderDto);
        } catch (error) {
            this.logger.error(`The gender could not be created! [create] ${error.code}`);
            throw new Error(`The gender could not be created!`);
        }
    }

    async findAll(): Promise<Gender[]> {
        return this.genderRepository.find();
    }

    async findOne(id: number): Promise<Gender> {
        this.logger.log(`Find gender ID ${id} [get id]`);
        const gender: Gender = await this.genderRepository.findOne({
            where: {
                id: id
            },
        });
        if (!gender) {
            throw new BadRequestException(`The gender with the ID ${id} could not be found!`);
        }
        return gender;
    }

    async update(id: number, updateGenderDto: UpdateGenderDto): Promise<Gender> {
        const existingGender: Gender = await this.genderRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if (!existingGender) {
            throw new BadRequestException(`The gender with the ID ${id} could not be changed!`);
        }
        try {
            this.logger.log(`Update gender ID ${id} [put]`);
            const updatedPlayer = this.genderRepository.merge(existingGender, updateGenderDto);
            return this.genderRepository.save(updatedPlayer);
        } catch (error) {
            this.logger.error(`The gender with the ID ${id} could not be changed! [update] ${error.code}`);
            throw new BadRequestException(`The gender with the ID ${id} could not be changed!`);
        }
    }

    async remove(id: number): Promise<DeleteResponseOk>{
        try {
        const deleteResult: DeleteResult = await this.genderRepository.delete(id);
        if (deleteResult.affected !== 1) {
            throw new Error();
        }
        this.logger.log(`The gender with the ID ${id} was successfully deleted! [delete]`);
        return new DeleteResponseOk(`Das Geschlecht mit der ID ${id} wurde erfolgreich gelöscht!`);
    } catch (error) {
        this.logger.error(`The gender with the ID ${id} could not be deleted! [delete] ${error.code}`);
        throw new BadRequestException(`The gender with the ID ${id} could not be deleted!`);
    }    }
}
