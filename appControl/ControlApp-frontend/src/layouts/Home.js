import React from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';

import { homeRoutes } from 'routes';

function Home() {
    const location = useLocation();
    const mainPanel = React.useRef(null);
    const getRoutes = (homeRoutes) =>
        // eslint-disable-next-line array-callback-return, consistent-return
        homeRoutes.map((prop, key) => {
            console.warn(prop);
            if (prop.layout === '/public') {
                return (
                    <Route
                        path={prop.path}
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
    return (
        <div className="wrapper" ref={mainPanel}>
            <Switch>{getRoutes(homeRoutes)}</Switch>
        </div>
    );
}

export default Home;
