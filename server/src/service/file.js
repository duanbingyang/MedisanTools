const qiniu = require('qiniu');
const accessKey = 'sq072GKuTmRQaG5fEeEBg4WWbu3sniKYHZtb_80Y';
const secretKey = 'w7btHyvadim8PXU5nIDr7HaS5NzpBA9zTRyhNanJ';
const bucket = 'medisan'


class FileService {

    async fileIploadToken() {
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: bucket,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        return putPolicy.uploadToken(mac);
    }
}
module.exports = new FileService();