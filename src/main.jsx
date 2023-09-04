import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import {BrowserRouter as Router} from 'react-router-dom'


//use create root to render
const root = createRoot(document.getElementById('root'))
root.render(
    <ProductsProvider>
      <UserProvider>
        <FilterProvider>
          <Router>
            <App />
          </Router>
        </FilterProvider>
      </UserProvider>
    </ProductsProvider>
)








// const BrowserRouter = createBrowserRouter({
//   history: window.history,
//   routes: [
//     {
//       path: "/",
//       action: () => {
//         return <App />
//       }
//     },
//     {
//       path: "/about",
//       action: () => {
//         return <div>About</div>
//       }
//     },
//   ]
// })


