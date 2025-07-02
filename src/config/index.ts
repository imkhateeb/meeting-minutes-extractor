import { AppConfigType } from "../types";

const APP_CONFIG: AppConfigType = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
    PORT: parseInt(process.env.PORT ?? "5000")
};

export default APP_CONFIG;