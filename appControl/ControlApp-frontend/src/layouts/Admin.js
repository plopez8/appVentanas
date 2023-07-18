/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation, useHistory, Route, Switch } from 'react-router-dom';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import { dashboardRoutes } from 'routes';

function Admin({ setAuthenticated, userType }) {
    const location = useLocation();
  const history = useHistory();

    const mainPanel = React.useRef(null);

    const getRoutes = (dashboardRoutes) =>
        // eslint-disable-next-line array-callback-return, consistent-return
        dashboardRoutes.map((prop, key) => {
            if (prop.layout === '/private') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={(props) => <prop.component {...props} />}
                        // eslint-disable-next-line react/no-array-index-key
                        key={key}
                    />
                );
            }
        });
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainPanel.current.scrollTop = 0;
        if (
            window.innerWidth < 993 &&
            document.documentElement.className.indexOf('nav-open') !== -1
        ) {
            document.documentElement.classList.toggle('nav-open');
            const element = document.getElementById('bodyClick');
            element.parentNode.removeChild(element);
        }
    }, [location]);

    const handleLogout = (e) => {

        e.preventDefault();
        setAuthenticated(false);
        history.push({
            pathname: '/public',
          });
    };

    const routes = [];
    // eslint-disable-next-line array-callback-return
    dashboardRoutes.map((r) => {
        routes.push(r);
    });

    return (
        <div className="wrapper">
            <Sidebar color="black" routes={routes} rol={userType} />
            <div className="main-panel" ref={mainPanel}>
                <AdminNavbar handleLogout={handleLogout} notifications={0} />
                <div className="content">
                    <Switch>{getRoutes(dashboardRoutes)}</Switch>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Admin;
