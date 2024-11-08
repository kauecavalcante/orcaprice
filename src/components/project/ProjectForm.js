import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesCollection = collection(db, "categories");
                const categorySnapshot = await getDocs(categoriesCollection);
                const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(categoryList);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        fetchCategories();
    }, []);

    // Verifica se todos os campos foram preenchidos
    useEffect(() => {
        const allFieldsFilled = project.name && project.budget && project.category;
        setIsFormComplete(allFieldsFilled);
    }, [project]);

    const submit = (e) => {
        e.preventDefault();
        if (isFormComplete) {
            handleSubmit(project);
        }
    };

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} disabled={!isFormComplete} /> {/* Desabilita o botão se o formulário não estiver completo */}
        </form>
    );
}

export default ProjectForm;
