'use client'

import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
} from '@mui/material'
import { useState } from 'react'

const labelStyle = {
  backgroundColor: 'white',
  fontSize: 13,
}
const inputStyle = {
  '& .MuiInputLabel-root': { fontSize: 13, width:220 },
  '& .MuiInputBase-input': { fontSize: 13, width:220 },
}

const locations = {
    "Улаанбаатар": ["Баянзүрх", "Сонгинохайрхан", "Хан-Уул", "Баянгол", "Сүхбаатар", "Чингэлтэй", "Налайх", "Багануур", "Багахангай"],
    "Архангай": ["Цэцэрлэг", "Жаргалант", "Ихтамир", "Төвшрүүлэх", "Хашаат", "Хотонт"],
    "Баян-Өлгий": ["Өлгий", "Алтанцөгц", "Булган", "Цэнгэл"],
    "Баянхонгор": ["Баянхонгор", "Галуут", "Баян-Овоо", "Жинст"],
    "Булган": ["Булган", "Сэлэнгэ", "Орхон", "Хутаг-Өндөр"],
    "Говь-Алтай": ["Есөнбулаг", "Тонхил", "Дарви", "Төгрөг"],
    "Говьсүмбэр": ["Сүмбэр", "Баяндэлгэр", "Шивээговь"],
    "Дархан-Уул": ["Дархан", "Хонгор", "Орхон", "Шарынгол"],
    "Дорноговь": ["Сайншанд", "Айраг", "Дэлгэрэх", "Замын-Үүд"],
    "Дорнод": ["Чойбалсан", "Баянтүмэн", "Хөлөнбуйр"],
    "Дундговь": ["Мандалговь", "Гурвансайхан", "Дэлгэрцогт"],
    "Завхан": ["Улиастай", "Идэр", "Яруу", "Тосонцэнгэл"],
    "Орхон": ["Баян-Өндөр", "Жаргалант"],
    "Өвөрхангай": ["Арвайхээр", "Баянгол", "Богд", "Тарагт"],
    "Өмнөговь": ["Даланзадгад", "Булган", "Цогтцэций"],
    "Сүхбаатар": ["Баруун-Урт", "Асгат", "Түмэнцогт"],
    "Сэлэнгэ": ["Сүхбаатар", "Зүүнбүрэн", "Мандал"],
    "Төв": ["Зуунмод", "Баян", "Баяндэлгэр"],
    "Увс": ["Улаангом", "Тариалан", "Өндөрхангай"],
    "Ховд": ["Ховд", "Булган", "Мянгад"],
    "Хэнтий": ["Өндөрхаан", "Батширээт", "Баянхутаг"],
    "Хөвсгөл": ["Мөрөн", "Тариалан", "Цэцэрлэг"],
  };
export const MoreMainModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false)

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value)
    setSelectedDistrict('') // Reset district when province changes
  }

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      style={{ backgroundColor: '#3333' }}
      slotProps={{
        paper: {
          style: {
            transform: 'translateX(-25px) translateY(0%)',
          },
        },
      }}
    >
      <div className="w-[900px] p-4 flex flex-col gap-3 text-[13px]">
        <h2>Ажилтны дэлгэрэнгүй мэдээлэл нэмэх</h2>
        <p className="border-b" />

        <div className="flex gap-6 py-5 w-full px-8">
          <div className="flex flex-col gap-3 w-1/2">
            <h2 className="text-[15px] font-semibold">Үндсэн мэдээлэл</h2>

              <div className="flex items-center gap-6">
                <Avatar sx={{ width: 110, height: 110, boxShadow: 2 }} />
                <button className="border px-2 py-1 h-8 rounded-sm border-[#b5b5b5]">Зураг оруулах</button>
              </div>

                <TextField size="small" variant="outlined" label="Ургийн овог" sx={inputStyle} />
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 text-sm mb-1">Төрсөн өдөр</label>
                  <input type="date" className="border p-2 border-[#b5b5b5] rounded-sm" />
                </div>

                <FormControl width={"220px"} size="small">
                  <InputLabel sx={labelStyle}>Хүйс</InputLabel>
                  <Select value="" fontSize="13px">
                    <MenuItem value="Эр" sx={{ fontSize: 13 }}>Эр</MenuItem>
                    <MenuItem value="Эм" sx={{ fontSize: 13 }}>Эм</MenuItem>
                  </Select>
                </FormControl>

            <FormControl width={"220px"} size="small">
              <InputLabel sx={labelStyle}>Төрсөн аймаг, хот</InputLabel>
              <Select
                value={selectedProvince}
                onChange={handleProvinceChange}
                fontSize="13px"
              >
                {Object.keys(locations).map((province) => (
                  <MenuItem key={province} value={province} sx={{ fontSize: 13 }}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" disabled={!selectedProvince}>
              <InputLabel sx={labelStyle}>Төрсөн сум дүүрэг</InputLabel>
              <Select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                fontSize="13px"
              >
                {(locations[selectedProvince] || []).map((district) => (
                  <MenuItem key={district} value={district} sx={{ fontSize: 13 }}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        

        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-[15px] font-semibold">Системийн мэдээлэл</h2>
          <TextField size="small" variant="outlined" label="Нэвтрэх нэр" sx={inputStyle} />
          <TextField size="small" variant="outlined" label="Мэргэжил" sx={inputStyle} />
          <FormControl fullWidth size="small">
            <InputLabel sx={labelStyle}>Эрхийн төрөл</InputLabel>
            <Select fontSize="13px">
              <MenuItem value="organizer" sx={{ fontSize: 13 }}>Зохион байгуулагч</MenuItem>
              <MenuItem value="participant" sx={{ fontSize: 13 }}>Оролцогч</MenuItem>
            </Select>
          </FormControl>

          <h2 className="text-[15px] font-semibold">Холбоо барих мэдээлэл</h2>
          <TextField size="small" variant="outlined" label="Гар утас" sx={inputStyle} />
          <TextField size="small" variant="outlined" label="Ажлын утас" sx={inputStyle} />
          <TextField size="small" variant="outlined" label="И-мэйл" sx={inputStyle} />
          <TextField size="small" variant="outlined" label="Хаяг" sx={inputStyle} />
        </div>
        </div>
        <div className="flex items-center justify-end font-semibold gap-3 p-3">
          <button className="bg-[#015197] text-white px-2 py-1 flex items-center rounded-md">Хадгалах</button>
          <button onClick={handleClose} className="text-[#015197]">Гарах</button>
        </div>
      </div>
    </Popover>
  )
}
