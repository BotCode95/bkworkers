"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const connectionDB_1 = require("../db/connectionDB");
const cors_1 = __importDefault(require("cors"));
const workersRoutes_1 = __importDefault(require("../routes/workersRoutes"));
const tagsRoutes_1 = __importDefault(require("../routes/tagsRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_config_1 = require("../../swagger.config");
class Server {
    constructor() {
        this.path = {
            workers: '/api/worker',
            tags: '/api/tag'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.NODE_ENV === 'dev' ? process.env.PORT_DEVELOPMENT : process.env.PORT;
        this.swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_config_1.swaggerOptions);
        this.connectionDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    connectionDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, connectionDB_1.dbConnection)();
        });
    }
    routes() {
        this.app.use(this.path.workers, workersRoutes_1.default);
        this.app.use(this.path.tags, tagsRoutes_1.default);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerDocs));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run in ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map