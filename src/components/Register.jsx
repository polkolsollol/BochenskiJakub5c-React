import { useState } from "react";

function Register({ onRegister, onGoToLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        //obsluga rejestracji
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Hasło musi mieć minimum 6 znaków.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Hasła nie są takie same.");
            return;
        }

        try {
            const result = await onRegister(email, password);

            if (!result || !result.success) {
                setError(result?.message || "Błąd rejestracji.");
            }
        } catch (err) {
            console.error(err);
            setError("Nie udało się utworzyć konta.");
        }
    }

    return (
        //formularz rejestracji
        <section className="auth-container">
            <h1>Utwórz konto</h1>
            <p className="auth-subtitle">
                Zarejestruj się, aby korzystać z naszego sklepu.
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
                        placeholder="Minimum 6 znaków"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label>Powtórz hasło</label>
                    <input
                        type="password"
                        placeholder="Wpisz ponownie hasło"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="auth-error">{error}</p>}

                <button className="auth-submit" type="submit">
                    Zarejestruj się
                </button>
            </form>

            <div className="auth-footer">
                Masz już konto?
                <button type="button" onClick={onGoToLogin}>
                    Zaloguj się
                </button>
            </div>
        </section>
    );
}

export default Register;
