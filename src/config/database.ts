import sequelizeConnectDatabase from './envConfig';
// Import models
import clientModel from 'App/modules/clients/model/clientModel';
import dossierModel from 'App/modules/Folders/model/dossierModel';
import appointmentModel from 'App/modules/Appointment/models/appointmentModel';
import avocatModel from 'App/modules/Avocat/model/AvocatModel';
// import userModel from 'App/modules/User/model/userModel';

const sequelize = sequelizeConnectDatabase.getInstance();

clientModel.initializeMode(sequelize);
dossierModel.initializeMode(sequelize);
appointmentModel.initializeMode(sequelize);
avocatModel.initializeMode(sequelize);


appointmentModel.associateModel()
clientModel.associateModel()
avocatModel.associateModel()
dossierModel.associateModel()


export const db = {
  sequelize,
  clientModel,
  dossierModel,
  appointmentModel,
  avocatModel,
}

