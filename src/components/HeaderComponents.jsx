import React, { Component } from 'react'
import logoSpring from "../assets/R.png";
import { motion } from 'framer-motion'; 

export default class HeaderComponents extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <motion.img drag="x" dragConstraints={{left: 0, right: 30}}
                  src={logoSpring} alt="Logo" width="100" height="100" class="d-inline-block align-text-top"/>
            </div>
        </nav>
      </div>
    )
  }
}
  