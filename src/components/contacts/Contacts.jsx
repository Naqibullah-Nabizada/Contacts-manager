import { Link } from "react-router-dom";

import { PINK } from "../../helpers/colors";

import Contact from "./Contact";
import Spinner from "../Spinner";

const Contacts = ({ contacts, loading, confirmDelete }) => {
    return (
        <>

            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <Link to='/contacts/add' className="btn m-2" style={{ backgroundColor: PINK }}>ساخت مخاطب جدید <i className="fa fa-plus-circle" /> </Link>
                        </div>
                    </div>
                </div>
            </section>


            {
                loading ? <Spinner /> : (
                    <section className="container">
                        <div className="row">
                            {
                                contacts.length > 0 ? contacts.map((c) => (
                                    <Contact key={c.id} contact={c} confirmDelete={() => confirmDelete(c.id, c.fullname)} />
                                )) :
                                    <div>
                                        <p className="h3 my-4 text-warning">مخاطب یافت نشد...</p>
                                        <img src={require('../../assets/no-found.gif')} alt="Not Found" className="w-25" />
                                    </div>
                            }
                        </div>
                    </section>

                )
            }



        </>
    )
}

export default Contacts;