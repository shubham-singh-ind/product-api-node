import { Environment } from "./env";

export const ProdEnvironment: Environment = {
  db_options: {
    username: "root",
    password: "",
    host: "localhost",
    db: "demo_db",
  },
  img_base_url: '',
  jwt_secret: 'lidfu8789%^$&F*D&F%^$F&FDU(F*(*D^FD%^&^F%F&%DF',
  jwt_expires_in: '30d',
  imageUploadPath: './public/uploads',
  mailer_options: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  },
  base_url: "http://localhost:3000" // make as production.
};
