
const SUPABASE_URL = 'https://fcctdgqaxlllerhysagu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; 

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