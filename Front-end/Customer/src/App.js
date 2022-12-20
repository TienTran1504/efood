import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from '~/assets/images';
function App() {
    return (
        <Router>
            <div className="responsive__style">
                <div className="responsive__logo">
                    <img src={Images.logoImage} />
                </div>
                <div className="responsive__content">
                    <p>No Good No Pay</p>
                </div>
            </div>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}
export default App;
