// App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nama: '', jumlah: '', toko: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...list];
      updated[editIndex] = formData;
      setList(updated);
    } else {
      setList([...list, formData]);
    }
    setFormData({ nama: '', jumlah: '', toko: '' });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(list[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const filteredList = list.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🛒 Daftar Belanja</h1>
      {!showForm ? (
        <>
          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={handleSearch}
            className="input"
          />
          <button className="button" onClick={() => setShowForm(true)}>Tambah Barang</button>

          {list.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Jumlah</th>
                  <th>Nama Toko</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nama}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.toko}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(index)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <form className="form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="nama"
            placeholder="Nama Barang"
            value={formData.nama}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="jumlah"
            placeholder="Jumlah"
            value={formData.jumlah}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="toko"
            placeholder="Nama Toko"
            value={formData.toko}
            onChange={handleInputChange}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="save">Simpan</button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel">Batal</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;