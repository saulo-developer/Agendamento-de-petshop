document.addEventListener('DOMContentLoaded', () => {
    const q = s => document.querySelector(s);
    const qa = s => document.querySelectorAll(s);
    const el = (t, c = '', h = '') => Object.assign(document.createElement(t), { className: c, innerHTML: h });
    const cont = q('.container');
  
    q('.date-selector')?.addEventListener('click', () => console.log('Data'));
    qa('.appointment-action').forEach(b => b.addEventListener('click', e => e.target.closest('.appointment-item')?.remove()));
  
    q('.new-appointment-button')?.addEventListener('click', criarNovoAgendamento);
  
    function criarNovoAgendamento() {
      const novoItem = el('div', 'appointment-item', `
        <div class="appointment-time">
          <input type="time">
        </div>
        <div class="appointment-details"><input placeholder="Pet/Cliente"><input placeholder="Serviço"></div>
        <div></div>
        <button class="appointment-action save">Salvar</button>
        <button class="appointment-action cancel">Cancelar</button>
      `);
      cont?.appendChild(novoItem);
      const [petInput, servicoInput] = novoItem.querySelectorAll('input');
      const horaInput = novoItem.querySelector('.appointment-time input[type="time"]');
  
      const salvarAgendamento = () => {
        const pet = petInput?.value.trim();
        const servico = servicoInput?.value.trim();
        const hora = horaInput?.value;
  
        if (pet && servico && hora) {
          cont?.insertBefore(el('div', 'appointment-item', `
            <div class="appointment-time">${hora}</div>
            <div class="appointment-details">${pet}<br>${servico}</div>
            <div></div>
            <div class="appointment-action">Remover agendamento</div>
          `), novoItem);
          novoItem.remove();
          // Chamar API criar com a hora
          console.log('Novo agendamento:', { pet, servico, hora });
        } else alert('Preencha todos os campos e a hora.');
      };
  
      novoItem.querySelector('.save')?.addEventListener('click', salvarAgendamento);
      novoItem.querySelector('.cancel')?.addEventListener('click', () => novoItem.remove());
    }
  });