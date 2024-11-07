// src/models/Avocat.ts
import { Model, DataTypes } from 'sequelize';
import type { IAvocat } from '../interfaces/AvocatInterface';
import { AvocatStatut } from 'App/types/enums';
import { Sequelize } from 'sequelize';
import appointmentModel from 'App/modules/Appointment/models/appointmentModel';
import dossierModel from 'App/modules/Folders/model/dossierModel';

class Avocat extends Model<IAvocat> implements IAvocat {
  public AvocatID!: number;
  public Nom!: string;
  public Prenom!: string;
  public Specialite?: string;
  public Barreau?: string;
  public Email!: string;
  public Telephone?: string;
  public Statut!: AvocatStatut;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associateModel(): void {
    Avocat.hasMany(appointmentModel, { foreignKey: 'AvocatID', as: 'appointments' });
    Avocat.hasMany(dossierModel, { foreignKey: 'AvocatID', as: 'dossiers' });
  }

  public static initializeMode(sequelize: Sequelize) {

    Avocat.init({
      AvocatID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Nom: { type: DataTypes.STRING, allowNull: false },
      Prenom: { type: DataTypes.STRING, allowNull: false },
      Specialite: { type: DataTypes.STRING, allowNull: true },
      Barreau: { type: DataTypes.STRING, allowNull: true },
      Email: { type: DataTypes.STRING, unique: true, allowNull: false },
      Telephone: { type: DataTypes.STRING, allowNull: true },
      Statut: { type: DataTypes.ENUM(...Object.values(AvocatStatut)), allowNull: false }
    }, {
      sequelize,
      modelName: 'Avocat',
      tableName: 'avocats',

    });
  }
}
export default Avocat;
