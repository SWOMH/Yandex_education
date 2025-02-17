import React from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ProfileNav from './profile-nav/profile-nav';
import { editUserInfo } from '../../../services/actions/user'

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [form, setForm] = React.useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    });
    const [isEditing, setIsEditing] = React.useState(false);

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm({
            name: user?.name || '',
            email: user?.email || '',
            password: ''
        });
        setIsEditing(false);
    };

    const handleSave = () => {
        const updatedFields = {};

        if (form.name !== user?.name) updatedFields.name = form.name;
        if (form.email !== user?.email) updatedFields.email = form.email;
        if (form.password) updatedFields.password = form.password;

        if (Object.keys(updatedFields).length > 0) {
            dispatch(editUserInfo(updatedFields));
        }

        setIsEditing(false);
    }

    return (
        <div className={styles.container}>
            <ProfileNav />
            <form className={styles.form}>
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
                {isEditing && (
                    <div className={styles.buttons}>
                        <Button 
                            type="secondary" 
                            size="medium" 
                            onClick={handleCancel}
                        >
                            Отмена
                        </Button>
                        <Button 
                            type="primary" 
                            size="medium"
                            onClick={handleSave}
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Profile;