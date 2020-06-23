import basic from '../basic'
import axios from 'axios'

class home extends basic{
    constructor(){
        super()
    }
    init(){
        console.log('at home')
        axios.post('/tnt/getAge',{name: '666'})
        axios.get('/tnt/getAge?name=111')
    }
}
new home()