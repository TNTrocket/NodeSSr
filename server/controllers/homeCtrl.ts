import User from '../models/home.model'
class homeCtrl {
   async getHomeName(){
    let data = await User.findAll({where: {}})
    let userList: Object[] = []
    data.forEach((item)=>{
        userList.push({
            name: item.name,
            features: item.features
        })
    })
    return userList
    }

}

export default new homeCtrl()