import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateClubDto} from './dto/create-club.dto';
import {UpdateClubDto} from './dto/update-club.dto';
import {Club} from './entities/club.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {AppCustomLogger} from '../../app.custom.logger';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';

@Injectable()
export class ClubService {

    private readonly logger: AppCustomLogger = new AppCustomLogger(ClubService.name);

    constructor(@InjectRepository(Club) private readonly clubRepository: Repository<Club>) {
    }

    async create(createClubDto: CreateClubDto): Promise<Club> {
        try {
            this.logger.log(`Create club [post]`);
            return this.clubRepository.save(createClubDto);
        } catch (error) {
            this.logger.error(`The club could not be created! [create] ${error.code}`);
            throw new Error(`The club could not be created!`);
        }
    }

    async findAll(): Promise<Club[]> {
      return this.clubRepository.find();
    }

    async findOne(id: number): Promise<Club> {
      this.logger.log(`Find club ID ${id} [get id]`);
      const club: Club = await this.clubRepository.findOne({
        where: {
          id: id
        },
      });
      if (!club) {
        throw new BadRequestException(`The club with the ID ${id} could not be found!`);
      }
      return club;
    }

    async update(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
        const existingClub: Club = await this.clubRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if (!existingClub) {
            throw new BadRequestException(`The club with the ID ${id} could not be changed!`);
        }
        try {
            this.logger.log(`Update club ID ${id} [put]`);
            const updateClub: Club = this.clubRepository.merge(existingClub, updateClubDto);
            return this.clubRepository.save(updateClub);
        } catch (error) {
            this.logger.error(`The club with the ID ${id} could not be changed! [update] ${error.code}`);
            throw new BadRequestException(`The club with the ID ${id} could not be changed!`);
        }
    }

    async remove(id: number): Promise<DeleteResponseOk> {
        try {
            const deleteResult: DeleteResult = await this.clubRepository.delete(id);
            if (deleteResult.affected !== 1) {
                throw new Error();
            }
            this.logger.log(`The club with the ID ${id} was successfully deleted! [delete]`);
            return new DeleteResponseOk(`Der Club mit der ID ${id} wurde erfolgreich gelöscht!`);
        } catch (error) {
            this.logger.error(`The club with the ID ${id} could not be deleted! [delete] ${error.code}`);
            throw new BadRequestException(`The club with the ID ${id} could not be deleted!`);
        }
    }

    async findAllClubsByAssociationId(associationId: number): Promise<Club[]> {
        const clubs: Club[] = await this.clubRepository.find({
            where: { association: { id: associationId } }, // Hier filtern wir die Clubs anhand der associationId
            // relations: ['association'], // Optional: Lade die zugehörige Association, falls benötigt
        });

        if (!clubs.length) { // Überprüfe, ob Clubs gefunden wurden
            throw new NotFoundException(`No clubs found for association with ID ${associationId}`);
        }

        return clubs; // Gebe die gefundenen Clubs zurück
    }
}
