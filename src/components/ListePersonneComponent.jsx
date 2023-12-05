import React, { Component } from 'react'
import PersonneSercice from '../services/PersonneSercice'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion' 

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '50vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            delay: 0.5
        }
    },
    exit: {
        x: "100vw",
        transition: { ease: "easeInOut"}
    }
}

export default class ListePersonneComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            personne: []
        }

        /* this.ajout_Personne = this.ajoutPersonne.bind(this); */
        this.delete_Personne = this.deletePersonne.bind(this);
    }

    componentDidMount(){
        PersonneSercice.getPersonne().then((res) => {
            this.setState({personne: res.data})
        })
    }

    deletePersonne(id){
        PersonneSercice.deletePersonne(id).then((res) => {
            this.setState({personne: this.state.personne.filter(personne => personne.id !== id)});
        })
    }

    /* ajoutPersonne(){
        this.props.history.push('/Ajout_Personne');
    } */
  render() {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-center">Liste des Personnes</h2>
        <Link to="/Ajout_Personne">
            <button className='btn btn-primary'>Ajout</button>
        </Link>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Profession</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.personne.length === 0 ? 
                      (
                        <tr>
                          <td colSpan="4">Aucune personne trouvée</td>
                        </tr>
                      ) : (
                    this.state.personne.map(
                        personne=>
                        <tr key={personne.id}>
                            <td>{personne.nom}</td>
                            <td>{personne.prenom}</td>
                            <td>{personne.profession}</td>
                            <td>
                                <Link to={`/Modification_Personne/${personne.id}`}>
                                    <button className="btn btn-info">Modification</button>
                                </Link>
                                <button style={{marginLeft: "10px"}} onClick={() => this.delete_Personne(personne.id)} className='btn btn-danger'>Supprimer</button>
                            </td>
                        </tr>
                        )
                      )
                }
            </tbody>
        </table>
      </motion.div>
    )
  }
}
