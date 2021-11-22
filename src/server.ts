import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as session from 'express-session';
import * as ejs from 'ejs';

import { getEnvironmentVariables } from './environments/env';
import CustomerRouter from './routers/CustomerRouter';
import { Mailer } from './utils/Mailer';

export class Server {
    public app : any = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    
    setConfigurations() {
        this.configureBodyparser();
        this.configureEjs();
    }

    configureBodyparser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    configureEjs() {
        this.app.use(express.static( path.join(__dirname , 'public') ));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
    }

    configureSession() {
        const ss = {
            secret: 'my top secret',
            cookie:  { },
            resave: false,
            saveUninitialized: true
        };
        if( process.env.NODE_ENV == "production" ) {
            this.app.set('trust proxy', 1) // trust first proxy
            //ss.cookie.secure = true // serve secure cookies
        }
        this.app.use(session(ss));
    }   

    setRoutes() {
        this.app.use('/api/customer', CustomerRouter);
    }

    error404Handler() {
        this.app.use((req, res) => {
          res.status(404).json({
              message: 'Not found',
              status: 404
          })  
        })
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            if( errorStatus == 500 && process.env.NODE_ENV == "production" )
                error.message = "Something went wrong. Please try again.";
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again.',
                status: errorStatus
            });
        })
    }
}