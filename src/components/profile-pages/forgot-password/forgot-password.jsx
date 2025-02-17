import React from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { forgotPassword } from '../../../utils/api-constants'

function ForgotPassword() {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({
        email: '',
    });
    

    React.useEffect(() => {
        if (localStorage.getItem('route_reset') === '1') {
            navigate({ pathname: '/reset-password' })
        }
    }, []) 

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPassword(form.email, form.password)
            .then((success) => {
                localStorage.setItem('route_reset', 1);
                if (success) {
                    const { from } = location.state || { from: { pathname: '/reset-password' } };
                    navigate(from);
                }
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="Укажите E-mail"
                    isIcon={false}
                    extraClass="mb-6"
                />                
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
                </p>                
            </div>
        </div>
    );
}

export default ForgotPassword;