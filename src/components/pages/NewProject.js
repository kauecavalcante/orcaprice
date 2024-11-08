import { useNavigate } from "react-router-dom";
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';
import { db } from "../../firebaseConfig"; // Importe sua configuração do Firebase
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importe o Auth do Firebase

function NewProject() {
    const navigate = useNavigate();
    const auth = getAuth();

    async function createPost(project) {
        const user = auth.currentUser; // Obtenha o usuário autenticado

        if (!user) {
            console.error("Usuário não autenticado.");
            return;
        }

        // Inicializa `orcaprice` e `services`
        project.orcaprice = 0;
        project.services = [];
        project.userId = user.uid; // Associa o ID do usuário ao projeto

        try {
            const projectsCollectionRef = collection(db, "projects");
            await addDoc(projectsCollectionRef, project); // Adiciona o projeto ao Firestore
            navigate("/projects", { state: { message: "Projeto criado com sucesso!" } }); // Redireciona para "/projects"
        } catch (error) {
            console.error("Erro ao criar projeto:", error);
        }
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
