import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routeProducts from '../routes/product';
import db from '../db/conmection';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        console.log(process.env.PORT);
        this.app = express();
        this.port = '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    routes(){
        this.app.get('/', (req: Request, res: Response) => {
            Response.json({
                msg: 'Servidor'
            })
        })
        this.app.use('/api/products', routeProducts);
    }

    midlewares(){
        //Se parsea el bodyRequest
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }
    
    async dbConnect(){
       try {
        await db.authenticate();
        console.log('Base de datos conectada');
       }catch (err) {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
       }
       
    }
    
}
export default Server;