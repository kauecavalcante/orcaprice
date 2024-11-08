import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import styles from './Register.module.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redireciona para a página inicial ou outra rota desejada
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
            console.error("Erro no cadastro:", err);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Cadastre-se</h2>
            <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Confirme a Senha:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.btnCreate} type="submit">Cadastrar</button>
            </form>
            <p className={styles.backToLogin}>
                Já tem uma conta? <Link to="/login">Voltar para Login</Link>
            </p>
        </div>
    );
}

export default Register;
