import { IClientEntity } from '../../../entities/models/client.entity';
import { ClientModel } from '../../../frameworks/database/models/client.model';
import { IClientRepository } from './../../../entities/repositoryInterfaces/client/client-repository.interface';

export class ClientRepository implements IClientRepository {
   async save(data:Partial<IClientEntity>): Promise<IClientEntity> {
      return await ClientModel.create(data)
   }

   async findByEmail(email: string): Promise<IClientEntity | null> {
      return await ClientModel.findOne({email})
   }
   
   // async find()
}
