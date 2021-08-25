import React from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import { Link, useHistory } from 'react-router-dom';
import UserAvatar from '../../atoms/Avatar';
import UserRole from '../../atoms/UserRole';

export default function LoggedUser(props) {

    const user = useSelector(state => state.user.data);
    const history = useHistory();

    const logout = () => {
        ApiRequest.removeToken();
        history.replace("/login");
    };

    const menu = (
        <Menu>
            <Link to="/user/me">
                <Menu.Item>
                    Meus Dados
                </Menu.Item>
            </Link>
            <Link to="/user/password">
                <Menu.Item>
                    Trocar Senha
                </Menu.Item>
            </Link>
            <UserRole roles={['admin', 'root']}>
                <Link to="/user">
                    <Menu.Item>
                        Administração
                    </Menu.Item>
                </Link>
            </UserRole>
            <Menu.Item onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <Dropdown overlay={menu} trigger={['click']}>
                <a href="#">
                    <UserAvatar user={user} />
                </a>
            </Dropdown>
        </React.Fragment>
    );
}