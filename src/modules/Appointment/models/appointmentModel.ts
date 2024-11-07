// src/models/Appointment.ts

import { DataTypes, Model } from 'sequelize';
import type { Optional, Sequelize } from 'sequelize';
import type { IAppointment } from '../interface/AppointmentInterface';
import type { AppointmentStatus } from 'App/types/enums';
import clientModel from 'App/modules/clients/model/clientModel';
import avocatModel from 'App/modules/Avocat/model/AvocatModel';

// Définir les attributs optionnels pour l'initialisation
interface AppointmentCreationAttributes extends Optional<IAppointment, 'AppointmentID' | 'DossierID'> { }

class Appointment extends Model<IAppointment, AppointmentCreationAttributes> implements IAppointment {
  public AppointmentID!: number;
  public Date!: Date;
  public Heure!: string;
  public Duree!: string;
  public Description!: string;
  public ClientID!: number;
  public AvocatID!: number;
  public Statut!: AppointmentStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association des modèles
  public static associateModel(): void {
    Appointment.belongsTo(clientModel, { foreignKey: 'ClientID', as: 'clients' });
    Appointment.belongsTo(avocatModel, { foreignKey: 'AvocatID', as: 'avocats' });
  }

  // Initialisation du modèle
  public static initializeMode(sequelize: Sequelize) {
    Appointment.init(
      {
        AppointmentID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ClientID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        AvocatID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        DossierID: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        Date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        Heure: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        Duree: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        Description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Statut: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['En attente', 'Confirmé', 'Annulé']], // Exemples de statut
          },
        },
      },
      {
        sequelize,
        modelName: 'Appointment',
        tableName: 'Appointments',
        timestamps: true, // Pour activer `createdAt` et `updatedAt`
      }
    );
  }
}

export default Appointment;
