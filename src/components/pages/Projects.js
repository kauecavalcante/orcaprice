import { useLocation } from "react-router-dom"


import Message from "../layout/Message"
import Container from '../layout/Container'
import Loading from "../layout/loading"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"

import styles from './Projects.module.css'
import { useState, useEffect } from "react"

function Projects() {
    const [projects, setProjects] = useState([]) // criando um state para salvar os projetos. começando em um array vazio
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout( // setTimeout de proposito para mostrar a funcao do loading...
            () => {
                fetch('http://localhost:3001/projects', {
                    method: 'GET', 
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                }).then(resp => resp.json())
                .then(data => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
            }, 300) //  3 segundos 

    }, [])

    function removeProject(id){
        fetch(`http://localhost:3001/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            // Mensagem 
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }


    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                 <h1>Meus projetos</h1>
                 <LinkButton to='/newproject' text="Criar Projeto" />
            </div>
            {message && <Message type='success' msg={message} />}
            {projectMessage && <Message type='success' msg={projectMessage} />}
            <Container customClass='start'>
                {projects.length > 0 && 
                  projects.map((project) => 
                    <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name}  key={project.id} handleRemove={removeProject}/>
                  )
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div> 
    )
}

export default Projects