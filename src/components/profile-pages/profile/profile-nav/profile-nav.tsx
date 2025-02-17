import { NavLink, useNavigate } from 'react-router-dom';
import styles from './profile-nav.module.css';
import { logout } from '../../../../utils/api-constants'
import { FC } from 'react';

const ProfileNav: FC = () => {

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const success = await logout();
            if (success) {
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (        
        <nav className={styles.nav}>
            <NavLink 
                to="/profile"
                className={({ isActive }) => 
                    `${styles.link} text text_type_main-medium ${isActive ? styles.active : 'text_color_inactive'}`
                }
                end
            >
                Профиль
            </NavLink>
            <NavLink 
                to="/profile/orders"
                className={({ isActive }) => 
                    `${styles.link} text text_type_main-medium ${isActive ? styles.active : 'text_color_inactive'}`
                }
            >
                История заказов
            </NavLink>
            <button className={`${styles.link} text text_type_main-medium text_color_inactive`} onClick={handleClick}>
                Выход
            </button>
            <p className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </nav>
    );
}

export default ProfileNav; 