import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    connect_string: process.env.CONNECTIONSTRING as string,
    port: process.env.PORT,
    jwt_secret: process.env.jWT_SECRET as string,
    refresh_secret: process.env.jWT_REFRESH_SECRET as string,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
}

export default config