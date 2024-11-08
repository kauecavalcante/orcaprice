import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";

import styles from './Project.module.css';

import Loading from '../layout/loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {
  let { id } = useParams();
  const [project, setProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const projectData = docSnap.data();
          setProject(projectData);
          setServices(projectData.services || []);
        } else {
          console.error("Projeto não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar o projeto:", error);
      }
    };

    fetchProject();
  }, [id]);

  async function editPost(updatedProject) {
    if (updatedProject.budget < updatedProject.orcaprice) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }

    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, updatedProject);
      setProject(updatedProject);
      setShowProjectForm(!showProjectForm);
      setMessage('Projeto atualizado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao atualizar o projeto:", error);
    }
  }

  async function createService(updatedProject) {
    const newService = { ...updatedProject.services[updatedProject.services.length - 1], id: uuidv4() };
    const newCost = parseFloat(updatedProject.orcaprice) + parseFloat(newService.orcaprice);

    if (newCost > parseFloat(updatedProject.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('error');
      updatedProject.services.pop();
      return;
    }

    updatedProject.orcaprice = newCost;
    updatedProject.services = [...services, newService]; // Adiciona o novo serviço à lista de serviços

    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, {
        services: updatedProject.services,
        orcaprice: updatedProject.orcaprice,
      });

      setProject(updatedProject);
      setServices(updatedProject.services);
      setShowServiceForm(false);
      setMessage('Serviço adicionado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }
  }

  async function removeService(serviceId, serviceCost) {
    // Filtra para criar uma nova lista de serviços, excluindo o serviço especificado
    const updatedServices = project.services.filter((service) => service.id !== serviceId);
    
    // Atualiza o custo total do projeto
    const updatedProject = {
        ...project,
        services: updatedServices,
        orcaprice: project.orcaprice - serviceCost,
    };

    try {
        const docRef = doc(db, "projects", id);
        await updateDoc(docRef, {
            services: updatedServices,
            orcaprice: updatedProject.orcaprice,
        });

        // Atualiza o estado local após a atualização no Firestore
        setProject(updatedProject);
        setServices(updatedServices);
        setMessage('Serviço removido com sucesso!');
        setType('success');
    } catch (error) {
        console.error("Erro ao remover o serviço:", error);
        setMessage("Erro ao remover o serviço.");
        setType("error");
    }
}


  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.orcaprice}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    orcaprice={service.orcaprice}
                    description={service.description}
                    key={service.id}
                    handleRemove={() => removeService(service.id, service.orcaprice)}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
