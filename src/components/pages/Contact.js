import {Link} from 'react-router-dom'

import styles from './Contact.module.css'

function Contact() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contato</h1>
            <p className={styles.title}>Esse projeto foi desenvolvido por:</p>
            <ul  className={styles.lista}>
                <li>
                 <Link to="https://github.com/kauecavalcante" target='_blank'>Kauê Cavalante</Link>
                </li>
                <li>
                <Link to="https://github.com/marjufeitosa" target='_blank'>Maju Feitosa</Link>
                </li>
                <li>
                <Link to="https://github.com/pedroteixeira02" target='_blank'>Pedro Teixeira</Link>
                </li>
                <li>
                <Link to="https://github.com/JoaoPedro-09" target='_blank'>João Pedro</Link>
                 </li>
            
            </ul>
        </div>
    )
}

export default Contact