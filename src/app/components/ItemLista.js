import React, { useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const ItemLista = ({item,index}) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [id, setId] = useState("");

    function openModalDelete(index) {
        setId(index);
        setModalDelete(true);
      }


  return (
    <div className="bg-gray-100 text-center w-full mx-auto max-w-3xl relative flex items-center justify-between px-2" key={index}>
            <p className="py-2">({item.quantidade}x) - {item.produto}</p>
            <p className="py-2">R$ {item.preco.toFixed(2)}</p>
            <div className='flex gap-2'>
              <FaEdit className='text-xl' onClick={() => editItem(index)} />
              <FaTrash className='text-xl' onClick={() => openModalDelete(index)} />
            </div>
          </div>
  );
};

export default ItemLista;