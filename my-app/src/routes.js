import Admin from "./pages/admin"
import Auth from "./pages/Auth"
import Cart from "./pages/cart"
import Shop from "./pages/shop"
import SingleProduct from "./pages/Singleproduct"
import { ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,  SINGLEPRODUCT_ROUTE } from "./utils/consts"


export const authRoutes = [
{
    path: ADMIN_ROUTE,
    Component: Admin
},
{
    path: CART_ROUTE,
    Component: Cart,
},
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SINGLEPRODUCT_ROUTE + '/:id',
        Component: SingleProduct
    },
]