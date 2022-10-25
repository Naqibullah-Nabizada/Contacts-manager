import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getAllGroups, getContact, updateContact } from "../../services/contactService";
import Spinner from "../Spinner";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";

const EditContact = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: false,
        contact: {},
        groups: []
    });

    useEffect(() => {
        const fetchDate = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(contactId);
                const { data: groupData } = await getAllGroups();
                setState({
                    ...state,
                    loading: false,
                    contact: contactData,
                    groups: groupData
                })
            } catch (err) {
                console.log(err.message);
                setState({ ...state, loading: false })
            }
        };
        fetchDate();
    }, []);

    const setContactInfo = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: [event.target.value]
            }
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setState({ ...state, loading: true });
            const { data } = await updateContact(state.contact, contactId);
            setState({ ...state, loading: false });
            if (data) {
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setState({ ...state, loading: false });
        }
    };

    const { loading, contact, groups } = state;

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <>
                        <section className="p-3">
                            <div className="container">
                                <div className="row my-2">
                                    <div className="col text-center">
                                        <p className="h4 fw-bold" style={{ color: ORANGE }}>ویرایش مخاطب</p>
                                    </div>
                                </div>
                                <hr style={{ background: ORANGE }} />
                                <div className="row p-2 w-75 mt-5 mx-auto align-items-center" style={{ background: "#44475a", borderRadius: '1rem' }}>
                                    <div className="col-md-8">
                                        <form onSubmit={submitForm}>
                                            <div className="mb-2">
                                                <input type="text" name="fullname" value={contact.fullname} onChange={setContactInfo} className="form-control" placeholder="نام و نام خانوادگی" required />
                                            </div>
                                            <div className="mb-2">
                                                <input type="text" name="photo" value={contact.photo} onChange={setContactInfo} className="form-control" placeholder="نام و نام خانوادگی" required />
                                            </div>
                                            <div className="mb-2">
                                                <input type="text" name="mobile" value={contact.mobile} onChange={setContactInfo} className="form-control" placeholder="نام و نام خانوادگی" required />
                                            </div>
                                            <div className="mb-2">
                                                <input type="text" name="email" value={contact.email} onChange={setContactInfo} className="form-control" placeholder="نام و نام خانوادگی" required />
                                            </div>
                                            <div className="mb-2">
                                                <input type="text" name="job" value={contact.job} onChange={setContactInfo} className="form-control" placeholder="نام و نام خانوادگی" required />
                                            </div>
                                            <div className="mb-2">
                                                <select name="group" value={contact.group} onChange={setContactInfo} className="form-control" required>
                                                    <option>انتخاب گروه</option>
                                                    {
                                                        groups.length > 0 && groups.map((group) => (
                                                            <option value={group.id} key={group.id}>{group.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <input type="submit" className="btn" value="ویرایش مخاطب" style={{ background: PURPLE }} />
                                                <Link to={"/contacts"} className="btn mx-2" style={{ background: COMMENT }}>انصراف</Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-4">
                                        <img src={`/${contact.photo}`} alt={contact.fullname} className="img-fluid rounded" style={{ border: `1px solid ${PURPLE}` }} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default EditContact;