import { useEffect, useState } from 'react';
import axios from 'axios';

function SocietyList() {
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const[Entries , setEntries] = useState(10);

  const fetchData = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // Add demo startDate
    const demoData = res.data.slice(0, 30).map((item, idx) => ({
      ...item,
      startDate: idx % 2 === 0 ? '01/09/2021' : '01/08/2021'
    }));
    setSocieties(demoData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    alert(`Delete item with ID ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit item with ID ${id}`);
  };

  return (
    <div>
      <h5 className="text-center">LIST OF SOCIETY</h5>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <button className="btn btn-outline-dark btn-sm me-2">Excel</button>
          <button className="btn btn-outline-dark btn-sm">PDF</button>
        </div>
        <div>
          <span>Show </span>
          <select
            className="form-select form-select-sm d-inline-block w-auto"
            style={{ width: 60 }}
            value={Entries}
            onChange={e => { setEntries(Number(e.target.value)); setPage(1); }}
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <span> Entries</span>
        </div>
        <div>
          <span>Search : </span>
          <input
            type="text"
            className="form-control form-control-sm d-inline-block w-auto"
            style={{ width: 120 }}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>
      <table className="table table-bordered table-striped client table-sm">
        <thead className='table-dark'>
          <tr >
            <th>#</th>
            <th>Society Name</th>
            <th>Start Date</th>
            <th>Person Name</th>
            <th>Mobile No.</th>
            <th>Landline No.</th>
            <th>Email ID</th>
            <th>No. of Flats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {societies
            .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
            .slice((page - 1) * Entries, page * Entries)
            .map((item, index) => (
              <tr key={item.id}>
                <td>{(page - 1) * Entries + index + 1}</td>
                <td>{item.title}</td>
                <td>{item.startDate}</td>
                <td>Mr. Demo</td>
                <td>+91XXXX</td>
                <td>020XXXX</td>
                <td>email@example.com</td>
                <td>100</td>
                <td className='d-flex flex-row'>
                  <button className="btn btn-sm btn-warning me-1" style={{fontSize:'13px'}} onClick={() => handleEdit(item.id)}>EDIT</button>
                  <button className="btn btn-sm btn-danger" style={{fontSize:'13px'}} onClick={() => handleDelete(item.id)}>DELETE</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          Showing {(societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length === 0 ? 0 : ((page - 1) * Entries + 1))}
          to {Math.min(page * Entries, societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length)} of {societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length} entries
        </span>
        <div>
          <button className="btn btn-sm btn-outline-dark me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <button className="btn btn-sm btn-outline-dark" disabled={page * Entries >= societies.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default SocietyList;
