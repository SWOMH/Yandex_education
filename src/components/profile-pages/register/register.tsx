import React, { FC, FormEvent, useState } from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { useDispatch } from '../../../services/types/data';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/actions/user';
import { IRegisterForm, IFormEvent } from '../../../utils/types';

const Register: FC = () => {
    const [form, setForm] = useState<IRegisterForm>({
        name: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e: IFormEvent): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(registerUser(form.email, form.password, form.name))
            .then((success) => {
                if (success) {
                    navigate('/');
                }
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Регистрация</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input 
                    onChange={onChange}
                    value={form.name}
                    name={'name'}
                    placeholder="Имя"
                    extraClass="mb-6"
                    onPointerEnterCapture={() => {}} 
                    onPointerLeaveCapture={() => {}}/>
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
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
                </p>                
            </div>
        </div>
    );
};

export default Register;