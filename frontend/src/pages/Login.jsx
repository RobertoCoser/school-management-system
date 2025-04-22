import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css"; // Importe o CSS

const Login = () => {
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("E-mail inválido").required("Obrigatório"),
            password: Yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.post("http://localhost:5000/api/auth/login", values);
                localStorage.setItem("token", res.data.token);
                window.location.href = "/dashboard";
            } catch (err) {
                alert("Erro no login!");
            }
        },
    });

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    className="login-input"
                    placeholder="Seu e-mail"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email && <p className="login-error">{formik.errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    className="login-input"
                    placeholder="Sua senha"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password && <p className="login-error">{formik.errors.password}</p>}

                <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    );
};

export default Login;