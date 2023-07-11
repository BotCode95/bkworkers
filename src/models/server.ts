import express, {Application} from 'express'
import { dbConnection } from '../db/connectionDB'
import cors from 'cors'
import workersRoutes from '../routes/workersRoutes'
import tagsRoutes from '../routes/tagsRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from '../../swagger.config'

export class Server {

	private port : string | undefined
	private app : Application
	private swaggerDocs: any
	private path = {
		workers: '/api/worker',
        tags: '/api/tag'

	}


	constructor(){
		this.app = express()
		this.port = process.env.NODE_ENV === 'dev' ? process.env.PORT_DEVELOPMENT : process.env.PORT
		this.swaggerDocs = swaggerJSDoc(swaggerOptions)

		this.connectionDB()
		this.middlewares()
		this.routes()
	}


	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
	}


	async connectionDB() {
		await dbConnection()
	}


	routes() {
		this.app.use(this.path.workers, workersRoutes)
		this.app.use(this.path.tags, tagsRoutes)
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocs));
	}
    
	listen(){
		this.app.listen(this.port, () => {
			console.log(`Server run in ${this.port}`)
		})
	}

}