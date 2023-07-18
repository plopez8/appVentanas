import LoginView from 'views/Login';
import DocumentsView from 'views/documentsView';
import obraHistory from 'views/obraHistory';
import VentanaHistory from 'views/ventanaHistory';
import WorkersList from 'views/workersList';

export const dashboardRoutes = [
    {
        path: '/documents',
        name: 'Documents',
        component: DocumentsView,
        layout: '/private',
        type: 'hide'
    },
    {
        path: '/ventanas',
        name: "Finestres de l'obra",
        component: VentanaHistory,
        layout: '/private',
        type: 'hide'
    },
    {
        path: '/obra',
        name: 'Obres',
        component: obraHistory,
        layout: '/private',
        type: 'user'
    },
    {
        path: '/workers',
        name: 'Treballadors',
        component: WorkersList,
        layout: '/private',
        type: 'admin'
    },   
];

export const homeRoutes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView,
        layout: '/public',
    },
];
