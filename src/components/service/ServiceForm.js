import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

import styles from '../project/ProjectForm.module.css';

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({
    name: '',
    orcaprice: 0,
    description: '',
  });

  const submit = (e) => {
    e.preventDefault();
    
    // Verifica se todos os campos estão preenchidos
    if (!service.name || !service.orcaprice || !service.description) {
      alert("Por favor, preencha todos os campos do serviço.");
      return;
    }

    // Atualiza o `projectData` com o novo serviço
    const updatedProjectData = {
      ...projectData,
      services: [...projectData.services, service],
    };

    // Chama o `handleSubmit` com o projeto atualizado
    handleSubmit(updatedProjectData);
  };

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="orcaprice"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do projeto"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
