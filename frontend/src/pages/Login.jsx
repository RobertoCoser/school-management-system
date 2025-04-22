import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
                localStorage.setItem("token", res.data.token); // Armazena o JWT
                window.location.href = "/dashboard"; // Redireciona
            } catch (err) {
                alert("Erro no login!");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.errors.email && <p>{formik.errors.email}</p>}

            <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password && <p>{formik.errors.password}</p>}

            <button type="submit">Entrar</button>
        </form>
    );
};

export default Login;