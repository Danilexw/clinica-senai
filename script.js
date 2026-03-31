const SUPABASE_URL = 'https://fcctdgqaxlllerhysagu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjY3RkZ3FheGxsbGVyaHlzYWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzM5NTIsImV4cCI6MjA5MDU0OTk1Mn0.OOKktZcWCRpwo6aS82qHCYynE9HCn0a0zdIrA6JJF5w'; 

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- LÓGICA DE CADASTRO ---
const formPaciente = document.getElementById('form-paciente');

formPaciente.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const celular = document.getElementById('celular').value;
    const email = document.getElementById('email').value;

    const { data, error } = await supabase
        .from('pacientes')
        .insert([{ 
            nome: nome, 
            celular: celular, 
            email: email 
        }]);

    if (error) {
        console.error('Erro ao cadastrar:', error.message);
        alert('Erro ao salvar paciente: ' + error.message);
    } else {
        alert('Paciente cadastrado com sucesso!');
        formPaciente.reset(); 
    }
});

// --- LÓGICA DE LISTAGEM (VISUAL NOVO) ---
const btnListar = document.getElementById('btn-listar');
const listaPacientes = document.getElementById('lista-pacientes');

btnListar.addEventListener('click', async () => {
    // Busca todos os campos da tabela 'pacientes'
    const { data, error } = await supabase
        .from('pacientes')
        .select('*');

    if (error) {
        alert('Erro ao buscar dados: ' + error.message);
        return;
    }

    // Limpa a área antes de mostrar os novos dados
    listaPacientes.innerHTML = ''; 

    if (data.length === 0) {
        listaPacientes.innerHTML = '<p style="text-align:center;">Nenhum paciente encontrado.</p>';
    } else {
        // Mapeia os dados e cria os cards bonitões
        data.forEach(paciente => {
            const card = document.createElement('div');
            card.className = 'paciente-card'; // Essa classe deve estar no seu style.css
            
            card.innerHTML = `
                <strong>👤 ${paciente.nome}</strong>
                <span>📞 ${paciente.celular}</span>
                <span>✉️ ${paciente.email}</span>
            `;
            
            listaPacientes.appendChild(card);
        });
    }
});