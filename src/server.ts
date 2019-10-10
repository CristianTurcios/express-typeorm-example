import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

import { config } from './config';
import './routes';

createConnection({
    database: 'test',
    entities: [
        __dirname + '/entity/*',
    ],
    host: 'test92.database.windows.net',
    logging: false,
    options: {
        encrypt : true,
    },
    password: '',
    port: 1433,
    synchronize: true,
    type: 'mssql',
    username: 'test92',
}).then((connection) => {
    app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));
}).catch((error) => console.log(error));
