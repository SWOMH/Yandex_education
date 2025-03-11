import React, { FC, FormEvent, useState } from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../services/actions/user';
import styles from './login.module.css';
import { ILoginForm, IFormEvent } from '../../../utils/types';

const Login: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState<ILoginForm>({
        email: '',
        password: ''
    });

    const onChange = (e: IFormEvent): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        // @ts-ignore
        dispatch(loginUser(form.email, form.password))
        // @ts-ignore
            .then((success) => {
                if (success) {
                    const { from } = location.state || { from: { pathname: '/' } };
                    navigate(from);
                }
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Вход</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="E-mail"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;