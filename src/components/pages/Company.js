import styles from './Contact.module.css'

function Company() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}> Empresa </h1>
            <p className={styles.title}>Esse projeto foi desenvolvido em <span className={styles.bold}> Reactjs </span>usando o amazenado e a autenticação do firebase para armazenar seus projetos e serviços.</p>
        </div>
    )
}

export default Company