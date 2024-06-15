import { Form } from "react-router-dom";
import Spin from "../common/Spin";

function CountryForm({ action, isLoading, country = null }) {
  function handleSubmitForm(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const data = { formData };

    if (country !== null) {
      data.idCountry = country._id;
    }

    action(data);
  }

  return (
    <Form onSubmit={handleSubmitForm} className="mb-5">
      <div className="form-item-container">
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Tên quốc gia (<span className="text-red">*</span>):
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Tên quốc gia"
            defaultValue={country != null ? country.name : ""}
            required
          />
        </div>
        <div className="my-5 w-100 d-flex justify-content-center align-items-center flex-wrap gap-3">
          <button type="reset" className="button btn-submit btn-red">
            Khôi phục
          </button>
          <button
            type="submit"
            className="button btn-submit"
            disabled={isLoading}
          >
            {isLoading ? <Spin text={"Loading..."} /> : "Xác nhận"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default CountryForm;
