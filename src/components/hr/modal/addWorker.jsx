'use client'

import { FormControl, InputLabel, MenuItem, Popover, Select, TextField } from "@mui/material"

export const AddWorker = ({open, setOpen}) => {
    
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Popover 
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        style={{ backgroundColor: "#3333" }}
        slotProps={{
            paper: {
                style: {
                    transform: 'translateX(-25px) translateY(0%)',
                },
            },
        }}
        >
            <div className="w-[440px] p-4 flex flex-col gap-3 text-[13px]">
                <h2>Ажилтан нэмэх</h2>
                <p className="border-b"></p>
                <div className="flex flex-col gap-3 py-5 px-8">
                <TextField size="small" variant="outlined" label="Нэр"  sx={{'& .MuiInputLabel-root': {fontSize: 13},'& .MuiInputBase-input': {fontSize: 13},}}/>
                <TextField size="small" variant="outlined" label="Овог" sx={{'& .MuiInputLabel-root': {fontSize: 13,},'& .MuiInputBase-input': {fontSize: 13},}} />
                <FormControl fullWidth size="small">
                <InputLabel id="department-label" sx={{backgroundColor: "white", fontSize: 13}}>Хэлтэс</InputLabel>
                <Select fontSize="13px">
                    <MenuItem sx={{fontSize: 13}}>Мэдээлэл технологийн хэлтэс</MenuItem>
                    <MenuItem sx={{fontSize: 13}}>Захиргааны хэлтэс</MenuItem>
                    <MenuItem sx={{fontSize: 13}}>Төсөл менежментийн хэлтэс</MenuItem>
                </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                <InputLabel id="department-label" sx={{backgroundColor: "white", fontSize: 13}}>Эрхийн төрөл</InputLabel>
                <Select fontSize="13px">
                    <MenuItem sx={{fontSize: 13}}>Үндсэн хэрэглэгч</MenuItem>
                    <MenuItem sx={{fontSize: 13}}>Дэд хэрэглэгч</MenuItem>
                    <MenuItem sx={{fontSize: 13}}>Энгийн</MenuItem>
                </Select>
                </FormControl>
                </div>
                <div className="flex items-center justify-end font-semibold gap-3 p-3">
                    <button className="bg-[#015197] text-white px-2 py-1 flex items-center rounded-md">Хадгалах</button>
                    <button onClick={handleClose} className="text-[#015197]">Гарах</button>
                </div>
            </div>
        </Popover>
    )
}