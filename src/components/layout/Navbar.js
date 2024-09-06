import {Link} from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png' 

function Navbar(){
    return(
        <Container>
        <nav class={styles.navbar} >
          <Link to="/"><img src={logo} alt="orcaprice" /> </Link> 
          <ul class={styles.list}>
            <li class={styles.item}>
            <Link to="/">Home</Link>
            </li>
            <li class={styles.item}>
            <Link to="/projects">Projetos</Link>
            </li>
            <li class={styles.item}>
            <Link to="/company">Empresa</Link>
            </li>
            <li class={styles.item}>
            <Link to="/contact">Contato</Link>
            </li>
          </ul>
        </nav>
      </Container>
    )
        
}

export default Navbar