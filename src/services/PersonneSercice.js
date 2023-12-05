import axios from 'axios';

const PERSONNE_API_URL = "http://localhost:8080/api/v1/personne";

class PersonneService{
    getPersonne(){
        return axios.get(PERSONNE_API_URL);
    }

    postPersonne(personne){
        return axios.post(PERSONNE_API_URL, personne);
    }

    getPersonneById(personneId){
        return axios.get(PERSONNE_API_URL + "/" + personneId)
    }

    updatePersonne(personneId, personne){
        return axios.put(PERSONNE_API_URL + "/" + personneId, personne)
    }

    deletePersonne(personneId){
        return axios.delete(PERSONNE_API_URL + "/" + personneId)
    }
}

export default new PersonneService();