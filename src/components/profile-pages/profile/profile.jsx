import React from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
    const [form, setForm] = React.useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    });

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // пока ничего, потом логику реализую
    };

    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Профиль</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    type="text"
                    placeholder="Имя"
                    onChange={onChange}
                    value={form.name}
                    name="name"
                    icon="EditIcon"
                />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name="email"
                    placeholder="Логин"
                    isIcon={true}
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name="password"
                    icon="EditIcon"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
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
}

export default Profile;