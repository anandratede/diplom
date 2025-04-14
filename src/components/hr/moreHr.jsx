'use client'

import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Avatar, Divider } from '@mui/material';
import { useState } from 'react';
import { MoreMainModal } from './modal/moreMainModal';

export const MoreHr = () => {
    const [openMoreModal, setOpenMoreModal] = useState(false)


    return(
        <div className="p-4 px-8 bg-white rounded-lg text-[13px] h-[93%]">
            <KeyboardBackspaceOutlinedIcon/>
            <p className='border-b py-1'></p>
            <div className='flex w-full items-center justify-between'>
                <h2 className='text-[15px] p-4 font-semibold '>Дэлгэрэнгүй мэдээлэл</h2>
                <button onClick={()=>setOpenMoreModal(true)} className='text-[#015197]'>Засах</button>
            </div>
        <div className='flex px-8 gap-4'>
            <div className='flex flex-col gap-5 items-center'>
                <Avatar sx={{ width: 100, height: 100, boxShadow: 2 }}/>
                <button className='w-fit border px-3 py-1 rounded-md border-[#b2b2b2]'>Зураг солих</button>
            </div>
            <Divider orientation="vertical" flexItem sx={{ height: 'fit', bgcolor: 'grey.100',marginX: 5 }} />
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold'>Үндсэн мэдээлэл</h2>
                <div>
                    <p className='text-[#B5B5B5]'>Ургийн овог</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Эцэг эхийн нэр</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Өөрийн нэр</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Төрсөн өдөр</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Төрсөн аймаг/хот</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Төрсөн сум/дүүрэг</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Хүйс</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
            </div>
            <Divider orientation="vertical" flexItem sx={{ height: 'fit', bgcolor: 'grey.100',marginX: 5 }} />
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold'>Системийн мэдээлэл</h2>
                <div>
                    <p className='text-[#B5B5B5]'>Код</p>
                    <p className='text-[#015197]'>09987654</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Нэвтрэх нэр</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Мэргэжил</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Хэлтсийн нэр</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Хэрэглэгчийн төрөл</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
            </div>
            <Divider orientation="vertical" flexItem sx={{ height: 'fit', bgcolor: 'grey.100',marginX: 5 }} />
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold'>Холбоо барих мэдээлэл</h2>
                <div>
                    <p className='text-[#B5B5B5]'>Гар утас</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Ажлын утас</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>И-мэйл</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
                <div>
                    <p className='text-[#B5B5B5]'>Хаяг</p>
                    <p className='text-[#015197]'>asd</p>
                </div>
            </div>
            </div>
            <MoreMainModal open={openMoreModal} setOpen={setOpenMoreModal}/>
        </div>
    )
}