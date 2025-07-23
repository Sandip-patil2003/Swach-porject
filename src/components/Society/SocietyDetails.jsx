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

    const handleCheckboxChange = (value) => {
        setSelectedBHK(value);
        if (value !== 'OTHERS') {
            setOtherBHK('');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
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
    };

    return (
        <div className="border p-4 mb-4 bg-light rounded">
            <h5 className="text-center mb-4">SOCIETY DETAILS</h5>

            <div className="row  ">
                <div className="col-md-6 mb-3">
                    <label className='size'>Society Name</label>
                    <input className="form-control mx-auto w-75 h-50" name="societyName" value={formData.societyName} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3 ">
                    <label className='size'>Person Name</label>
                    <input className="form-control mx-auto w-75 h-50" name="personName" value={formData.personName} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Address</label>
                    <textarea className="form-control mx-auto w-75 h-50" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Mobile No.</label>
                    <input className="form-control mx-auto w-75 style" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Pin Code</label>
                    <input className="form-control mx-auto w-75 h-50" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Landline No.</label>
                    <input className="form-control mx-auto w-75 h-50" name="landlineNo" value={formData.landlineNo} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Email ID</label>
                    <input className="form-control mx-auto w-75 h-50" name="emailId" value={formData.emailId} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Number of Flats/Homes</label>
                    <input type="number" className="form-control mx-auto w-75 h-50" name="nof" value={formData.nof} onChange={handleChange} />
                </div>

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

                    {selectedBHK !== 'OTHERS' && selectedBHK && (
                        <p className="mt-2"><strong>Selected BHK:</strong> {selectedBHK}</p>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label className='size'>Other Flat Type</label>
                    <input className="form-control mx-auto style w-75" name="otherType" value={formData.otherType} onChange={handleChange} />
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
