import { useState } from "react";

function Login({ onLogin, onGoToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        //obsluga logowania
        e.preventDefault();
        setError("");

        try {
            const result = await onLogin(email, password);

            if (!result || !result.success) {
                setError(result?.message || "Błąd logowania.");
            }
        } catch (err) {
            console.error(err);
            setError("Wystąpił błąd logowania.");
        }
    }

    return (
        //formularz logowania
        <section className="auth-container">
            <h1>Zaloguj się</h1>
            <p className="auth-subtitle">
                Witaj ponownie! Wpisz dane swojego konta.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label>E-mail</label>
                    <input
                        type="email"
                        placeholder="Wpisz swój e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label>Hasło</label>
                    <input
                        type="password"
                        placeholder="Wpisz swoje hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="auth-error">{error}</p>}

                <button className="auth-submit" type="submit">
                    Zaloguj się
                </button>
            </form>

            <div className="auth-footer">
                Nie masz jeszcze konta?
                <button type="button" onClick={onGoToRegister}>
                    Zarejestruj się
                </button>
            </div>
        </section>
    );
}

export default Login;