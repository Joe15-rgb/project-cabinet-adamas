// src/models/Client.ts
import { Model, DataTypes, Sequelize } from 'sequelize';
import type { IClient } from '../interfaces/ClientInterface';
import { ClientType } from 'App/types/enums';
import dossierModel from 'App/modules/Folders/model/dossierModel';
import appointmentModel from 'App/modules/Appointment/models/appointmentModel';


class Client extends Model<IClient> implements IClient {
  public ClientID!: number;
  public Nom!: string;
  public Prenom!: string;
  public Email!: string;
  public Telephone?: string;
  public Adresse?: string;
  public Type!: ClientType;
  public SecteurActivite?: string;


  public static associateModel(): void {
    Client.hasMany(dossierModel, { foreignKey: 'ClientID', as: 'dossiers' });
    Client.hasMany(appointmentModel, { foreignKey: 'ClientID', as: 'appointments' });
  }

  public static initializeMode(sequelize: Sequelize) {

    Client.init({
      ClientID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Nom: { type: DataTypes.STRING, allowNull: false },
      Prenom: { type: DataTypes.STRING, allowNull: false },
      Email: { type: DataTypes.STRING, unique: true, allowNull: false },
      Telephone: { type: DataTypes.STRING, allowNull: true },
      Adresse: { type: DataTypes.STRING, allowNull: true },
      Type: { type: DataTypes.ENUM(...Object.values(ClientType)), allowNull: false },
      SecteurActivite: { type: DataTypes.STRING, allowNull: true }
    }, {
      sequelize,
      modelName: 'Client',
      tableName: 'clients',
    });
  }
}
export default Client


