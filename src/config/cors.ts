import type { CorsOptions } from "cors";

const whiteLists = ["http://localhost:4000"];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whiteLists.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
