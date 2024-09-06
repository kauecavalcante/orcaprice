function Select({ name, text, options }) {
    return (
        <div>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
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
