import { Link } from "react-router-dom";
import { CURRENTLINE, PURPLE, ORANGE, RED, CYAN } from "../../helpers/colors";


const Contact = ({ contact, confirmDelete }) => {
    return (

        <div className="col-md-6">
            <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-sm-4">
                            <img src={contact.photo} alt={contact.fullname} style={{ border: `1px solid ${PURPLE}` }} className="img-fluid rounded" />
                        </div>
                        <div className="col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و تخلص: <span className="mx-1">{contact.fullname}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل: <span className="mx-1">{contact.mobile}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    ایمیل: <span className="mx-1">{contact.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-1 d-flex flex-column align-items-center">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{ backgroundColor: ORANGE }}> <i className="fa fa-eye" /> </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1" style={{ backgroundColor: CYAN }}> <i className="fa fa-pencil" /> </Link>
                            <button onClick={confirmDelete} className="btn my-1" style={{ backgroundColor: RED }}> <i className="fa fa-trash" /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;