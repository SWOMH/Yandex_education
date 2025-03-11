import React, { FC, FormEvent } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './reset-password.module.css';
import { resetPassword } from '../../../utils/api-constants'
import { IFormEvent, IResetPasswordForm } from '../../../utils/types'

const ResetPassword: FC = () => {
    const navigate = useNavigate()
    const route_nomber = localStorage.getItem('route_reset')

    React.useEffect(() => {
        if (route_nomber !== '1') {
            navigate('/forgot-password')
        }
    }, [])

    const [form, setForm] = React.useState<IResetPasswordForm>({
        password: '',
        token: ''
    });

    const onChange = (e: IFormEvent) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword(form.password, form.token)
            .then((success) => {
                localStorage.removeItem('route_reset');
                if (success) {
                    navigate({ pathname: '/' });
                }
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Востановление пароля</h2>
            <form onSubmit={handleSubmit} className={styles.form}>                
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    placeholder="Введите новый пароль"
                    name={'password'}
                    extraClass="mb-6"
                />
                <Input 
                    onChange={onChange}
                    value={form.token}
                    name={'token'}
                    placeholder="Введите код из письма"
                    extraClass="mb-6"
                    onPointerEnterCapture={() => {}} 
                    onPointerLeaveCapture={() => {}}/>                
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

export default ResetPassword;