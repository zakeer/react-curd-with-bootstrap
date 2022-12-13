import React, { useState, useMemo } from 'react';
import statesAndCities from '../states-and-cities.json';
import { object, string, array} from 'yup';

export default function UserForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    state: '',
    city: '',
    address: '',
    hobbies: [],
    agreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hobbies') {
      if (form.hobbies.includes(value)) {
        form.hobbies = form.hobbies.filter((hobby) => hobby !== value);
      } else {
        form.hobbies.push(value);
      }
      setForm({
        ...form,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const states = useMemo(() => {
    return Object.keys(statesAndCities).sort((a, b) => (a > b ? 1 : -1));
  }, [statesAndCities]);

  const cities = useMemo(() => {
    return (statesAndCities[form.state] || []).sort((a, b) => (a > b ? 1 : -1));
  }, [form.state]);

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const userFormValidation = object({
      firstName: string().min(3).required('First Name is required'),
      contactNo: string().min(10).max(10),
      email: string().email().required(),
      gender: string().required(),
      state: string().required(),
      hobbies: array().min(1),
    });

    userFormValidation
      .validate(form, { stripUnknown: true, abortEarly: false })
      .then((validationSuccess) => {
        console.log(':: validationSuccess ::', validationSuccess);
      })
      .catch((validationErrors) => {
        const allErrors = validationErrors.inner.reduce(
          (errors, currentValidation) =>
            Object.assign(errors, {
              [currentValidation.path]: currentValidation.errors[0], //first error is enough for this demo
            }),
          {}
        );
        console.log(':: allErrors ::', allErrors);
        setErrors(allErrors);
      });
  };

  return (
    <div className="container-fluid py-5">
      <div className= "row">
        <div className="col-md-8"></div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">User Form</h3>
            </div>
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    onChange={handleFieldChange}
                    name="firstName"
                    value={form.firstName}
                    className={`form-control ${
                      errors.firstName ? 'is-invalid' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <div class="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    onChange={handleFieldChange}
                    name="lastName"
                    value={form.lastName}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    onChange={handleFieldChange}
                    type="email"
                    name="email"
                    value={form.email}
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  {errors.email && (
                    <div class="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Contact No</label>
                  <input
                    onChange={handleFieldChange}
                    type="number"
                    name="contactNo"
                    value={form.contactNo}
                    className={`form-control ${
                      errors.contactNo ? 'is-invalid' : ''
                    }`}
                  />
                  {errors.contactNo && (
                    <div class="invalid-feedback">{errors.contactNo}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date of Birth</label>
                  <input
                    onChange={handleFieldChange}
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <div className="d-flex gap-4 py-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        onChange={handleFieldChange}
                        id="Male"
                        value="Male"
                      />
                      <label className="form-check-label" htmlFor="Male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={handleFieldChange}
                        name="gender"
                        id="Female"
                        value="Female"
                      />
                      <label className="form-check-label" htmlFor="Female">
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.gender && (
                    <div class="text-danger">{errors.gender}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select"
                    name="country"
                    onChange={handleFieldChange}
                    value={form.country}
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option>India</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select
                    disabled={!form.country}
                    className={`form-select ${
                      errors.state ? 'is-invalid' : ''
                    }`}
                    name="state"
                    onChange={handleFieldChange}
                    value={form.state}
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <div class="invalid-feedback">{errors.state}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <select
                    disabled={!form.state}
                    className="form-select"
                    name="city"
                    onChange={handleFieldChange}
                    value={form.city}
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    name="address"
                    onChange={handleFieldChange}
                    value={form.address}
                    className="form-control"
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Hobbies</label>
                  <div className="d-flex gap-4 py-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="hobbies"
                        onChange={handleFieldChange}
                        id="music"
                        value="Music"
                      />
                      <label className="form-check-label" htmlFor="music">
                        Music
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="hobbies"
                        onChange={handleFieldChange}
                        id="tv"
                        value="Tv"
                      />
                      <label className="form-check-label" htmlFor="tv">
                        Tv
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="hobbies"
                        onChange={handleFieldChange}
                        id="PlayingShuttle"
                        value="Playing Shuttle"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="PlayingShuttle"
                      >
                        Playing Shuttle
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="hobbies"
                        onChange={handleFieldChange}
                        id="ReadingBooks"
                        value="Reading Books"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="ReadingBooks"
                      >
                        Reading Books
                      </label>
                    </div>
                  </div>
                  {errors.hobbies && (
                    <div class="text-danger">{errors.hobbies}</div>
                  )}
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agreed"
                      id="agreed"
                    />
                    <label className="form-check-label" htmlFor="agreed">
                      I Agree
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

