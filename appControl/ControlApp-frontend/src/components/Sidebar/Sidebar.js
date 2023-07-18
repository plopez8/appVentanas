import React from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import logosvg from 'assets/img/Gestorhoraris.png';
import { Nav } from 'react-bootstrap';
import { getROL } from 'variables/variables';

function Sidebar({ color, image, routes, rol }) {
    const history = useHistory();
    if(getROL() === "null"){
        console.log("ifsi")
        history.push({
            pathname: '/public',
          });
    }
    console.log("getROL()");
    console.log(getROL());
    console.log("rol");
    console.log(rol);
    const location = useLocation();
    const activeRoute = (routeName) =>
        location.pathname.indexOf(routeName) > -1 ? 'active' : '';

    const filteredRoutes = routes.filter((route) => {
        if (rol === 'admin') {
            return route.type === 'admin' || route.type === 'user';
        }
        if (rol === 'user') {
            return route.type === 'user';
        }
        return true;
    });

    return (
        <div
            className="sidebar"
            data-image={image}
            data-color={color}
            style={{
                borderTopRightRadius: '30px',
                borderBottomRightRadius: '30px',
            }}
        >
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-center">
                    <img
                        style={{ maxHeight: '75px' }}
                        className="img-fluid"
                        alt="..."
                        src={logosvg}
                    ></img>
                </div>
                <Nav>
                    {filteredRoutes.map((prop) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={
                                        prop.upgrade
                                            ? 'active active-pro'
                                            : activeRoute(
                                                  prop.layout + prop.path,
                                              )
                                    }
                                    style={
                                        prop.path === '/users-list'
                                            ? {
                                                  borderTop: 'solid',
                                                  borderTopWidth: '0.1px',
                                                  borderTopColor: 'grey',
                                                  marginTop: '15px',
                                                  paddingTop: '15px',
                                              }
                                            : {}
                                    }
                                    key={prop.name}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon}></i>
                                        <p> {prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
