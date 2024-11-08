import { readFile } from "fs/promises";
import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

async function uploadData() {
  try {
    const data = JSON.parse(await readFile(new URL("./db.json", import.meta.url)));

    // Verificar e carregar 'projects'
    if (Array.isArray(data.projects)) {
      const projectsCollectionRef = collection(db, "projects");

      for (const project of data.projects) {
        await addDoc(projectsCollectionRef, project);
      }
      console.log("Dados de 'projects' carregados para o Firestore com sucesso!");
    } else {
      console.warn("'projects' não é um array ou está vazio.");
    }

    // Verificar e carregar 'categories'
    if (Array.isArray(data.categories)) {
      const categoriesCollectionRef = collection(db, "categories");

      for (const category of data.categories) {
        await addDoc(categoriesCollectionRef, category);
      }
      console.log("Dados de 'categories' carregados para o Firestore com sucesso!");
    } else {
      console.warn("'categories' não é um array ou está vazio.");
    }

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

uploadData();
