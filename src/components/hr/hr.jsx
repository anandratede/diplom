'use client'

import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline, PrintTwoTone } from "@mui/icons-material";
import { AddWorker } from "./modal/addWorker";

const employees = [
    { name: "Анар", surname: "Бат", department: "Хэлтэс 1", role: "Оролцогч", email: "a@gmail.com", phone: "99999999" },
    { name: "Бадрал", surname: "Болд", department: "Хэлтэс 1", role: "Зохион байгуулагч", email: "b@gmail.com", phone: "99999999" },
    { name: "Эрдэнэ", surname: "Хангай", department: "Хэлтэс 1", role: "Зохион байгуулагч", email: "e@gmail.com", phone: "99999999" },
  ];

const HR = () => {
  const [year, setYear] = useState("2024");
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false)

  return (
    <>
    <div className="p-4 px-8 bg-white rounded-lg h-[93%]">     
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <h2 className="font-semibold text-[13px]">Ажилчид</h2>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="h-7">
            <MenuItem fontSize="13px" value="2025">2025</MenuItem>
            <MenuItem fontSize="13px" value="2024">2024</MenuItem>
            <MenuItem fontSize="13px" value="2023">2023</MenuItem>
          </Select>
        </div>
        <div className="flex items-center gap-3">
        <div className="flex items-center px-2 relative">
          <TextField
            placeholder="Хайлт"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            size="small"
            sx={{fontSize: 13}}
          />
          <SearchIcon sx={{position: "absolute", top: 8, right: 10}} />
        </div>
        <Add onClick={()=>setOpenAddModal(true)} className="cursor-pointer" sx={{color:"gray"}} />
        <PrintTwoTone sx={{color:"gray"}}/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-b py-3 border-gray-300 text-[13px]">
          <thead className="text-[#015197] ">
            <tr>
              <th className="p-2">Нэр</th>
              <th className="p-2">Овог</th>
              <th className="p-2">Хэлтэс</th>
              <th className="p-2">Эрхийн төрөл</th>
              <th className="p-2">Имэйл</th>
              <th className="p-2">Утас</th>
              <th className="p-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {/* <td className="border-b p-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        row.status === "green" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {row.id}
                  </td> */}
                  <td className="border-t p-2">{row.name}</td>
                  <td className="border-t p-2">{row.surname}</td>
                  <td className="border-t p-2">{row.department}</td>
                  <td className="border-t p-2">{row.role}</td>
                  <td className="border-t p-2">{row.email}</td>
                  <td className="border-t p-2">{row.phone}</td>
                  <td className="border-t p-2 flex gap-2">
                    <EditOutlinedIcon sx={{color: "gray"}}/>
                    <DeleteOutline sx={{color: "gray"}}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
    </div>
    <AddWorker open={openAddModal} setOpen={setOpenAddModal} />
    </>
  );
};

export default HR;
