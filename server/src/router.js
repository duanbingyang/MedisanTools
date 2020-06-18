const userController = require('./controller/user');
const mysqlController = require('./controller/mysql');
const fileController = require('./controller/file-oss');
const ERPfileController = require('./controller/ErPsth/upload');
const CRMfileController = require('./controller/crmApi/m_addMeetingUser');
const pubController = require('./controller/public/pubController');
const medisanCrmDB = require('./controller/medisanCrmDB');
const RD_progress_add = require('./controller/RD_progress/addProgress');
const RD_progress_node = require('./controller/RD_progress/progressList');
const RD_progress_edit_code = require('./controller/RD_progress/editCode');

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
    .get('/meetdetail', medisanCrmDB.resApi)
    .post('/given', medisanCrmDB.givenApi)
    .post('/addProgress', RD_progress_add.addProgressApi)
    .get('/projectList', RD_progress_add.projectList)
    .get('/projectListUseId', RD_progress_add.projectListUseId)
    .post('/progressNodeAdd', RD_progress_node.addProgressNodeAdd)
    .get('/progressNodeUseId', RD_progress_node.progressNodeUseId)
    .post('/deleteProgressId', RD_progress_node.deleteProgressNodeUseId)
    .post('/editProgressNode', RD_progress_node.editProgressNode)
    .get('/selectProgressNodeUseId', RD_progress_node.selectProgressNodeUseId)
    .post('/auth', RD_progress_node.progressAudit)
    .post('/projectAudit', RD_progress_add.projectAudit)
    .get('/editCode', RD_progress_edit_code.editCode)
};
