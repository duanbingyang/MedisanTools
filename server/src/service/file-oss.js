const OSS = require('ali-oss');

const client = new OSS({
    region: 'oss-cn-beijing',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    // accessKeyId: '',
    // accessKeySecret: '',
    bucket: 'medisan'
});

class FileService {

    async put(fileName, fileUrl) {
        try {
            let result = await client.put(fileName, fileUrl);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    async getBuffer (objectName) {
        try {
          let result = await client.get(objectName);
          return result;
        } catch (e) {
          console.log(e);
        }
      }

}

module.exports = new FileService();