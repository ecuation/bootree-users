import { app } from './app';
import { MongooseDatabase } from './database/mongoose/mongoose-database';
import { Database } from './database/database-interface';

const database: Database = new MongooseDatabase();

const init = async () => {
    database.connect();
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
};

init();