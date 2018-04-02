import axios from 'axios'
import IDGenerator from '../api/IDGenerator'

class CRUD {

    insertData(title, date, note, token){
        let id = IDGenerator()
        let data={id, title, date, note, token}
        return axios.post('http://localhost:5500/api/profile/i', data)
        
    }

    readData(token){
        return axios.post('http://localhost:5500/api/profile/r', {token})
    }

    editData(id ,title, date, note, token){
        let data={id, title, date, note, token}
        console.log(data)
        return axios.post('http://localhost:5500/api/profile/e', data)
    }

    deleteData(id, token){
        let data = {id, token}
        return axios.post('http://localhost:5500/api/profile/d', data)
    }
}

export default CRUD;