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
    logging: false,
    synchronize: true,
    type: 'sqlite',
}).then((connection) => {
    app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));
}).catch((error) => console.log(error));
