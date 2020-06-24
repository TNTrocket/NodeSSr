import basic from '../basic'
import axios from 'axios'
class test extends basic{
    constructor(){
        super()
    }
    init(){ 
        console.log('at test')
        axios.get('/tnt/getAge?name=111')
    }
}
new test()