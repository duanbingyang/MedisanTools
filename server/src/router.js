const userController = require('./controller/user');
const mysqlController = require('./controller/mysql');
const fileController = require('./controller/file-oss');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/profile', userController.profile)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .get('/excelapi', mysqlController.excelapi)
    .post('/logout', userController.logout)
    .post('/uploadfile', fileController.fileUploadapi)
    .get('/getfile', fileController.getFileapi)
    .get('/getlist', fileController.getList)
    .get('/search', fileController.search)
    .get('/detail', fileController.detail)
    .post('/adddetail', fileController.addDetail)
};
