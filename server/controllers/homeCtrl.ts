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
    
    async getAge(name:string){
        let data = await User.findOne({where: {name}})
        let age = data?.age || ''
        return {age}
    }

}

export default new homeCtrl()