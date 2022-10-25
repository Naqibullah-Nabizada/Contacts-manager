import { useLocation } from 'react-router-dom';

import SearchContact from './contacts/SearchContact';

import { PURPLE, BACKGROUND } from '../helpers/colors';

const Navbar = ({query, search}) => {

    const location = useLocation();

    return (
        <nav className="navbar navbar-dark navbar-expand shadow-lg" style={{ backgroundColor: BACKGROUND }}>
            <div className="container">
                <div className="row w-100">

                    <div className="col">
                        <div className='navbar-brand'>
                            <i className="fa fa-id-badge mx-1" style={{ color: PURPLE }} />
                            <span>وب اپلیکشن مدیریت</span>{" "}
                            <span style={{ color: PURPLE }}>مخاطبین</span>
                        </div>
                    </div>
                    {
                        location.pathname === "/contacts" ? (
                            <SearchContact query={query} search={search} />
                        ) : null
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar;