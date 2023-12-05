import React, { Component } from 'react'

import {Link} from 'react-router-dom'
import PersonneSercice from '../services/PersonneSercice'
import { motion } from 'framer-motion'
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

function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [profession, setProfession] = React.useState(''); 

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let personne = {nom , prenom, profession}
    PersonneSercice.postPersonne(personne);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <motion.div variant={containerVariants} initial={"initial"} animate={"visible"} exit={"exit"}>
            <br />
            <Link to="/">
            <button className='btn btn-primary'>Retour</button>
            </Link>

            <div className="container">
            <h2 className="text-center">Ajout de Personne</h2> <br />
            <fieldset className="border">
                <form action="" method="post">
                <label htmlFor="">Nom</label>
                <input type="text" className='form-control' placeholder='Nom' name="nom" value={nom} onChange={handleNomChange}/>
                <label htmlFor="">Prenom</label>
                <input type="text" className='form-control' placeholder='Prenom' name="prenom" value={prenom} onChange={handlePrenomChange}/>
                <label htmlFor="">Profession</label>
                <input type="text" className='form-control' placeholder='Profession' name="profession" value={profession} onChange={handleProfessionChange}/>
                <br />
                </form>
                <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color="success" onClick={handleClick}>
                    Ajouter
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Ajout Réussi
                    </Alert>
                </Snackbar>
                </Stack>
            </fieldset>
            </div>
    </motion.div>
  );
  }


export default class AjouterPersonneComponents extends Component {
  render() {
    return (
      <div>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
        <CustomizedSnackbars />
        </motion.div>
      </div>
    )
  }
}
