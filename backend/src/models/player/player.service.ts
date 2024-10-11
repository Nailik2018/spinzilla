import {BadRequestException, Injectable} from '@nestjs/common';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {Player} from './entities/player.entity';
import {DeleteResult, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {AppCustomLogger} from '../../app.custom.logger';
import {DeleteResponseOk} from '../../common/doc-response/deleteResponseOk';

@Injectable()
export class PlayerService {

    private readonly logger: AppCustomLogger = new AppCustomLogger(PlayerService.name);

    constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>) {
    }

    async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        try {
            this.logger.log(`Create player [post]`);
            return this.playerRepository.save(createPlayerDto);
        } catch (error) {
            this.logger.error(`The player could not be created! [create] ${error.code}`);
            throw new Error(`The player could not be created!`);
        }
    }

    async findAll(): Promise<Player[]> {
        return this.playerRepository.find();
    }

    async findOne(id: number): Promise<Player> {
        this.logger.log(`Find location ID ${id} [get id]`);
        const player: Player = await this.playerRepository.findOne({
            where: {
                licenseNr: id
            },
        });
        if (!player) {
            throw new BadRequestException(`The location with the ID ${id} could not be found!`);
        }
        return player;
    }

    async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        const existingPlayer: Player = await this.playerRepository.findOne(
            {
                where: {
                    licenseNr: id
                }
            }
        );
        if (!existingPlayer) {
            throw new BadRequestException(`The player with the ID ${id} could not be changed!`);
        }
        try {
            this.logger.log(`Update player ID ${id} [put]`);
            const updatedPlayer = this.playerRepository.merge(existingPlayer, updatePlayerDto);
            return this.playerRepository.save(updatedPlayer);
        } catch (error) {
            this.logger.error(`The player with the ID ${id} could not be changed! [update] ${error.code}`);
            throw new BadRequestException(`The player with the ID ${id} could not be changed!`);
        }
    }

    async remove(id: number): Promise<DeleteResponseOk> {
        try {
            const deleteResult: DeleteResult = await this.playerRepository.delete(id);
            if (deleteResult.affected !== 1) {
                throw new Error();
            }
            this.logger.log(`The player with the ID ${id} was successfully deleted! [delete]`);
            return new DeleteResponseOk(`Der Spieler mit der ID ${id} wurde erfolgreich gelöscht!`);
        } catch (error) {
            this.logger.error(`The player with the ID ${id} could not be deleted! [delete] ${error.code}`);
            throw new BadRequestException(`The player with the ID ${id} could not be deleted!`);
        }
    }
}
