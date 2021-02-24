import { UserSession } from '@stacks/auth';
import { Storage } from '@stacks/storage';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });
const storage = new Storage({ userSession });

