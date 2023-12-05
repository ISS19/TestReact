import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PersonneSercice from '../services/PersonneSercice';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ModificationComponent() {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    getPersonne();
  }, []);

  const getPersonne = () => {
    PersonneSercice.getPersonne(id).then((res) => {
      let personne = res.data;
      setNom(personne.nom);
      setPrenom(personne.prenom);
      setProfession(personne.profession);
    });
  };

  const changeNom = (event) => {
    setNom(event.target.value);
  };

  const changePrenom = (event) => {
    setPrenom(event.target.value);
  };

  const changeProfession = (event) => {
    setProfession(event.target.value);
  };

  const updatePersonne = (event) => {
    event.preventDefault();
    let personne = {nom , prenom, profession}
    PersonneSercice.updatePersonne(id, personne);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h1>Modification de l'élément avec l'ID : {id}</h1>
            <br />
            <Link to="/">
            <button className='btn btn-primary'>Retour</button>
            </Link>

            <div className="container">
            <h2 className="text-center">Ajout de Personne</h2> <br />
            <fieldset className="border">
                <form action="" method="post">
                <label htmlFor="">Nom</label>
                <input type="text" className='form-control' placeholder='Nom' name="nom" value={nom} onChange={changeNom}/>
                <label htmlFor="">Prenom</label>
                <input type="text" className='form-control' placeholder='Prenom' name="prenom" value={prenom} onChange={changePrenom}/>
                <label htmlFor="">Profession</label>
                <input type="text" className='form-control' placeholder='Profession' name="profession" value={profession} onChange={changeProfession}/>
                <br />
                <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color="success" onClick={updatePersonne}>
                    Modifier
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Modification Réussi
                    </Alert>
                </Snackbar>
                </Stack>
                </form>
            </fieldset>
            </div>
        </motion.div>
    </div>
  );
}


class TestId extends Component {
    render() {
        return (
            <div>
                <ModificationComponent />
            </div>
        );
    }
}

export default TestId;
