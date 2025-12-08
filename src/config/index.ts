import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path:path.join(process.cwd(),'.env')});

export const config = {
    port:process.env.PORT || 5000,
    connection_str:process.env.CONNECTION_STR as string,
    jwt_secret : process.env.JWT_SECRET
}