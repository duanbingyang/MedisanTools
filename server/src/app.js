const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const respond = require('koa-respond');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');
// const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

require('./router')(router);

app
    .use(logger())
    .use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 4000*1024*1024    // 设置上传文件大小最大限制，默认2M
        }
    }))
    .use(cors({
        credentials: true
    }))
    .use(helmet())
    .use(respond())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(path.join(process.cwd(), 'build')))
    .listen(port, () => {
        console.log('The server is running at:');
        console.log(
            `    - Local:  http://localhost:${port}`
        );
    });
