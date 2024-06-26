﻿using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IMedicoRepository
    {
        public List<Medico> ListarTodos();

        public void Cadastrar(Usuario medico);

        public Medico BuscarPorId(Guid Id);

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico);
    }
}
