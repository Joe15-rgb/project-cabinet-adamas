// src/models/Dossier.ts
import { Model, DataTypes } from 'sequelize';
import type { IDossier } from '../interfaces/DossierInterface';
import { DossierStatut } from 'App/types/enums';
import { Sequelize } from 'sequelize';
import clientModel from 'App/modules/clients/model/clientModel';
import avocatModel from '../../Avocat/model/AvocatModel';


class Dossier extends Model<IDossier> implements IDossier {
  public DossierID!: number;
  public Nom!: string;
  public DateOuverture!: Date;
  public DateCloture?: Date;
  public Statut!: DossierStatut;
  public Type!: string;
  public Description?: string;
  public ClientID?: number;
  public AvocatID?: number;


  public static associateModel(): void {
    Dossier.belongsTo(clientModel, { foreignKey: 'ClientID', as: 'clients' });
    Dossier.belongsTo(avocatModel, { foreignKey: 'AvocatID', as: 'avocats' });
  }

  public static initializeMode(sequelize: Sequelize) {

    Dossier.init({
      DossierID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Nom: { type: DataTypes.STRING, allowNull: false },
      DateOuverture: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      DateCloture: { type: DataTypes.DATE, allowNull: true },
      Statut: { type: DataTypes.ENUM(...Object.values(DossierStatut)), allowNull: false, defaultValue: DossierStatut.Ouvert },
      Type: { type: DataTypes.STRING, allowNull: false },
      Description: { type: DataTypes.TEXT, allowNull: true }
    }, {
      sequelize,
      modelName: 'Dossier',
      tableName: 'dossiers',

    });

  }
}
export default Dossier