import { Link } from "react-router-dom";

import Spinner from '../Spinner';
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

const AddContact = ({ loading, groups, contact, setContactInfo, createContactForm }) => {
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <img src={require("../../assets/man-taking-note.png")} alt="background" height="400px"
                            style={{ position: "absolute", zIndex: '-1', top: '130px', left: '100px', opacity: '50%' }} />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 fw-bold text-center" style={{ color: GREEN }}>ساخت مخاطب جدید</p>
                                </div>
                            </div>
                            <hr style={{ background: GREEN }} />
                            <div className="row">
                                <div className="col-md-4">
                                    <form onSubmit={createContactForm}>
                                        <div className="mb-2">
                                            <input type="text" name="fullname" value={contact.fullname} onChange={setContactInfo} className="form-control" placeholder="نام و نام خانوادگی" required />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="photo" value={contact.photo} onChange={setContactInfo} className="form-control" placeholder="آدرس تصویر" required />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="mobile" value={contact.mobile} onChange={setContactInfo} className="form-control" placeholder="شماره موبایل" required />
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" name="email" value={contact.email} onChange={setContactInfo} className="form-control" placeholder="ایمیل" required />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="job" value={contact.job} onChange={setContactInfo} className="form-control" placeholder="شغل" required />
                                        </div>
                                        <div className="mb-2">
                                            <select name="group" value={contact.group} onChange={setContactInfo} className="form-control" required>
                                                <option>انتخاب گروه</option>
                                                {
                                                    groups.length > 0 && groups.map((group) => (
                                                        <option key={group.id} value={group.id}>{group.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input type="submit" value="ساخت مخاطب" className="btn" style={{ background: PURPLE }} />
                                            <Link to={'/contacts'} className="btn mx-2" style={{ background: COMMENT }} >انصراف</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default AddContact;