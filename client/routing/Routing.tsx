import { Route, Routes } from "react-router"
import {WelcomePage} from '../pages';
import {FormPage} from '../pages';
import {NotFoundPage} from '../pages';

export const Path = {
    Welcome: '/',
    Form: '/form',
    NotFound: '*',
} as const

export const Routing = () => (
    <Routes>
        <Route path={Path.Welcome} element={<WelcomePage />} />
        <Route path={Path.Form} element={<FormPage />} />
        <Route path={Path.NotFound} element={<NotFoundPage/>} />
    </Routes>
)