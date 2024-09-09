function Select({ name, text, options, handleOnChange, value }) {
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
