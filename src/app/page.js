'use client'
import React, { useEffect, useState } from 'react';
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaTrash } from "react-icons/fa";

const Page = () => {
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState("");
  const [lista, setLista] = useState([]);
  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [total, setTotal] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function closeModal(e) {
    if (e.target.id === "modal") setModal(false);
  }

  function addProduto(e) {
    e.preventDefault();

    const precoNumber = parseFloat(preco.replace(",", "."));

    const produtoAdd = {
      produto,
      preco: precoNumber,
      quantidade
    };

    if (editIndex !== null) {
      const novaLista = [...lista];
      novaLista[editIndex] = produtoAdd;
      setLista(novaLista);
      setEditIndex(null);
      localStorage.setItem("lista", JSON.stringify(novaLista));
    } else {
      const novaLista = [...lista, produtoAdd];
      setLista(novaLista);
      localStorage.setItem("lista", JSON.stringify(novaLista));
    }

    setModal(false);
    resetForm();
  }

  function openModalDelete(index) {
    setId(index);
    setModalDelete(true);
  }

  function voltar() {
    setProduto("");
    setPreco("");
    setQuantidade("");
    setModal(false);
    setModalDelete(false);
  }

  function deleteItem(index) {
    const novaLista = [...lista];
    novaLista.splice(index, 1);
    setLista(novaLista);
    localStorage.setItem("lista", JSON.stringify(novaLista));
    setModalDelete(false);
    setId("");
  }

  function editItem(index) {
    setEditIndex(index);
    const item = lista[index];
    setProduto(item.produto);
    setPreco(item.preco.toString());
    setQuantidade(item.quantidade.toString());
    setModal(true);
  }

  function resetForm() {
    setProduto("");
    setPreco("");
    setQuantidade("");
  }

  useEffect(() => {
    const dadosExistem = localStorage.getItem("lista");
    if (dadosExistem) {
      const dadosJson = JSON.parse(dadosExistem);
      setLista(dadosJson);
    }
  }, []);

  useEffect(() => {
    const totalItens = lista.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotal(totalItens.toFixed(2));
  }, [lista]);

  return (
    <div>
      <div className='bg-[#9734F7]'>
        <header className='max-w-3xl w-full mx-auto py-2 text-white flex items-center justify-between px-2'>
          <div>
            <h1>Mercado</h1>
            <p>Total: R$ {total}</p>
          </div>
          <button className='flex items-center gap-3 bg-white py-2 px-6 rounded-md text-[#9734F7] font-medium' onClick={() => setModal(true)}>
            <TiPlus className='text-2xl' />Adicionar
          </button>
        </header>
      </div>
      <div className='bg-[#282A2D] h-screen pt-2 relative'>
        {lista && lista.map((item, index) => (
          <div className="bg-gray-100 text-center w-full mx-auto max-w-3xl relative flex items-center justify-between px-2" key={index}>
            <p className="py-2">({item.quantidade}x) - {item.produto}</p>
            <p className="py-2">R$ {item.preco.toFixed(2)}</p>
            <div className='flex gap-2'>
              <FaEdit className='text-xl' onClick={() => editItem(index)} />
              <FaTrash className='text-xl' onClick={() => openModalDelete(index)} />
            </div>
          </div>
        ))}
      </div>

      {modal &&
        <div className='w-full inset-0 fixed bg-black backdrop-blur-sm bg-opacity-20' id='modal' onClick={closeModal}>
          <form className='mx-auto max-w-lg w-full mt-4 bg-white p-4 rounded-md animar'>
            <div className='flex flex-col'>
              <label htmlFor="produto" className='font-medium'>Produto</label>
              <input type="text" className='bg-gray-200 py-2 rounded-md mt-1 outline-none text-gray-700 pl-4' value={produto} onChange={({ target }) => setProduto(target.value)} />
            </div>
            <div className='flex flex-col mt-4'>
              <label htmlFor="quantidade" className='font-medium'>Quantidade</label>
              <input type="number" className='bg-gray-200 py-2 rounded-md mt-1 outline-none text-gray-700 pl-4' value={quantidade} onChange={({ target }) => setQuantidade(target.value)} />
            </div>
            <div className='flex flex-col mt-4'>
              <label htmlFor="quantidade" className='font-medium'>Preço</label>
              <input type="text" className='bg-gray-200 py-2 rounded-md mt-1 outline-none text-gray-700 pl-4' value={preco} onChange={({ target }) => setPreco(target.value)} />
            </div>
            <div className='flex items-center justify-between mt-4'>
              <button className='flex items-center gap-3 text-white py-2 px-6 rounded-md bg-[#9734F7] font-medium' onClick={addProduto}>{editIndex !== null ? "Salvar" : "Adicionar"}</button>
              <button onClick={voltar}>← Voltar</button>
            </div>
          </form>
        </div>
      }

      {modalDelete &&
        <div className='w-full inset-0 fixed bg-black backdrop-blur-sm bg-opacity-20 flex items-center justify-center'>
          <div className='bg-white rounded-md p-2 flex flex-col gap-2 animar'>
          <p>Tem certeza que deseja deletar o  <strong>{lista[id].produto}</strong>?</p>
            <div className='flex justify-between'>
              <button className='bg-red-600 px-6 py-2 rounded-md text-white uppercase' onClick={() => deleteItem(id)}>Deletar</button>
              <button onClick={voltar}>← Voltar</button>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default Page;
