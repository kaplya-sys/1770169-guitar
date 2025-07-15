import {registerAs} from '@nestjs/config';

import {getMongooseConfig} from '@1770169-guitar/helpers';

export const MongoConfig = registerAs('mongoConfig', getMongooseConfig);
