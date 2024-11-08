import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Select({ name, text, handleOnChange, value }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesCollection = collection(db, "categories");
            const categorySnapshot = await getDocs(categoriesCollection);
            const categoriesList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOptions(categoriesList);
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option value="">Selecione uma opção</option>
                {options.length > 0 ? (
                    options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Carregando categorias...</option>
                )}
            </select>
        </div>
    );
}

export default Select;
