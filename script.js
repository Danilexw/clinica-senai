
const SUPABASE_URL = 'https://fcctdgqaxlllerhysagu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjY3RkZ3FheGxsbGVyaHlzYWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzM5NTIsImV4cCI6MjA5MDU0OTk1Mn0.OOKktZcWCRpwo6aS82qHCYynE9HCn0a0zdIrA6JJF5w'; 

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);




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

// 1. Referenciar os novos elementos
const btnListar = document.getElementById('btn-listar');
const listaPacientes = document.getElementById('lista-pacientes');

// 2. Criar a função de busca (Select)
btnListar.addEventListener('click', async () => {
    // Busca todos os campos da tabela 'pacientes'
    const { data, error } = await supabase
        .from('pacientes')
        .select('*');

    if (error) {
        alert('Erro ao buscar dados: ' + error.message);
        return;
    }

    // 3. Limpar a lista antes de mostrar (para não duplicar se clicar duas vezes)
    listaPacientes.innerHTML = '<h4>Pacientes Cadastrados:</h4>';

    // 4. Criar o visual da lista
    if (data.length === 0) {
        listaPacientes.innerHTML += '<p>Nenhum paciente encontrado.</p>';
    } else {
        const ul = document.createElement('ul');
        data.forEach(paciente => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${paciente.nome}</strong> - ${paciente.celular} (${paciente.email})`;
            ul.appendChild(li);
        });
        listaPacientes.appendChild(ul);
    }
});