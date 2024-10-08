import { useNavigate } from "react-router-dom";
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        // Initialize orcaprice and services
        project.orcaprice = 0;
        project.services = [];

        fetch("http://localhost:3001/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Erro ao criar projeto');
            }
            return resp.json();
        })
        .then((e) => navigate("/projects", { state: { message: 'Projeto criado com sucesso!' } }))  // Redireciona para "/projects" após o POST
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}

export default NewProject;
