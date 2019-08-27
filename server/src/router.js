const userController = require('./controller/user');
const mysqlController = require('./controller/mysql');
const fileController = require('./controller/file-oss');
const ERPfileController = require('./controller/ErPsth/upload');
const CRMfileController = require('./controller/crmApi/m_addMeetingUser');
const pubController = require('./controller/public/pubController');

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
    .post('/ERPuploadfile', ERPfileController.fileUploadapi)
    .post('/addUser_crm', CRMfileController.addUser)
    .post('/vCode', pubController.txVerificationCode)
};
