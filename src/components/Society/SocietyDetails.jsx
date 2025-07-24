import { useState } from 'react';
import axios from 'axios';
import './SocityDetails.css';

function SocietyDetails({ onSuccess }) {
    const [formData, setFormData] = useState({
        societyName: '',
        address: '',
        pinCode: '',
        personName: '',
        mobileNo: '',
        landlineNo: '',
        emailId: '',
        nof: '',
        flatType: '',
        otherType: ''
    });

    const [selectedBHK, setSelectedBHK] = useState('');
    const [otherBHK, setOtherBHK] = useState('');
    const [errors, setErrors] = useState({});

    const handleCheckboxChange = (value) => {
        setSelectedBHK(value);
        if (value !== 'OTHERS') {
            setOtherBHK('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateFields = () => {
        const newErrors = {};

        const requiredFields = ['societyName', 'address', 'pinCode', 'personName', 'mobileNo', 'landlineNo', 'emailId', 'nof'];
        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = 'This field is required';
            }
        });

        if (!selectedBHK.trim()) {
            newErrors.flatType = 'Please select a BHK type';
        }

        if (selectedBHK === 'OTHERS' && !otherBHK.trim()) {
            newErrors.flatType = 'Please enter other BHK type';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            alert("Please fill all required fields.");
            return;
        }

        try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
            alert('Society submitted!');
            onSuccess();
            handleCancel();
        } catch (err) {
            alert('Failed to submit.');
        }
    };

    const handleCancel = () => {
        setFormData({
            societyName: '',
            address: '',
            pinCode: '',
            personName: '',
            mobileNo: '',
            landlineNo: '',
            emailId: '',
            nof: '',
            flatType: '',
            otherType: ''
        });
        setSelectedBHK('');
        setOtherBHK('');
        setErrors({});
    };

    return (
        <div className="border p-4 mb-4 bg-light rounded">
            <h5 className="text-center mb-4">SOCIETY DETAILS</h5>

            <div className="row">
                {[
                    ['societyName', 'Society Name'],
                    ['personName', 'Person Name'],
                    ['address', 'Address'],
                    ['mobileNo', 'Mobile No.'],
                    ['pinCode', 'Pin Code'],
                    ['landlineNo', 'Landline No.'],
                    ['emailId', 'Email ID'],
                    ['nof', 'Number of Flats/Homes'],
                    ['otherType', 'Other Flat Type']
                ].map(([name, label]) => (
                    <div className="col-md-6 mb-3" key={name}>
                        <label className='size'>{label}</label>
                        {name === 'address' ? (
                            <textarea
                                className="form-control mx-auto w-75 h-50"
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                className="form-control mx-auto w-75 h-50"
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                            />
                        )}
                        {errors[name] && <small className="text-danger size" >{errors[name]}</small>}
                    </div>
                ))}

                <div className="col-md-6 mb-3">
                    <label className='size'>Flat Type (BHK)</label>
                    <div className="d-flex flex-wrap size gap-3 mt-2 text">
                        {['1BHK', '2BHK', '3BHK', 'OTHERS'].map(bhk => (
                            <label key={bhk} className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input mx-auto me-1"
                                    checked={selectedBHK === bhk}
                                    onChange={() => handleCheckboxChange(bhk)}
                                />
                                {bhk}
                            </label>
                        ))}
                    </div>

                    {selectedBHK === 'OTHERS' && (
                        <input
                            type="text"
                            className="form-control mx-auto mt-2 w-75 style"
                            placeholder="Enter BHK type"
                            value={otherBHK}
                            onChange={(e) => {
                                setOtherBHK(e.target.value);
                                setSelectedBHK(e.target.value);
                            }}
                        />
                    )}
                    {errors.flatType && <small className="text-danger size">{errors.flatType}</small>}

                    {selectedBHK !== 'OTHERS' && selectedBHK && (
                        <p className="mt-2"><strong>Selected BHK:</strong> {selectedBHK}</p>
                    )}
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary me-2" onClick={handleSubmit}>SUBMIT</button>
                <button className="btn btn-secondary" onClick={handleCancel}>CANCEL</button>
            </div>
        </div>
    );
}

export default SocietyDetails;
