import { PURPLE } from "../../helpers/colors";

const SearchContact = ({ query, search }) => {
    return (
        <div className="col">
            <div className="input-group w-75 mx-2" dir="ltr">
                <i className="input-group-text fa fa-search" style={{ backgroundColor: PURPLE, cursor: 'pointer' }} />
                <input type="text" value={query.text} onChange={search} placeholder="جستجوی مخاطب" className="form-control" dir="rtl" />
            </div>
        </div>
    )
}

export default SearchContact;