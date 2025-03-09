document.addEventListener('DOMContentLoaded', function() {
    loadTeachers();
    setupForm();
});

function setupForm() {
    const form = document.getElementById('teacherForm');
    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const teacherId = document.getElementById('teacherId').value;
    
    const data = {
        id: teacherId || null,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        cpf: formData.get('cpf'),
        rg: formData.get('rg'),
        birthDate: formData.get('birthDate'),
        gender: formData.get('gender'),
        specialization: formData.get('specialization'),
        department: formData.get('department'),
        employeeId: formData.get('employeeId'),
        qualification: formData.get('qualification')
    };

    try {
        const response = await fetch(`/api/teachers${teacherId ? `/${teacherId}` : ''}`, {
            method: teacherId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar professor');
        }

        clearForm();
        loadTeachers();
        alert('Professor salvo com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar professor');
    }
}

async function loadTeachers() {
    try {
        const response = await fetch('/api/teachers');
        const teachers = await response.json();
        displayTeachers(teachers);
    } catch (error) {
        console.error('Erro ao carregar professores:', error);
        alert('Erro ao carregar lista de professores');
    }
}

function displayTeachers(teachers) {
    const tbody = document.querySelector('#teachersTable tbody');
    tbody.innerHTML = '';

    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.employeeId}</td>
            <td>${teacher.name}</td>
            <td>${teacher.department}</td>
            <td>${teacher.email}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editTeacher(${teacher.id})" class="action-button edit-button">Editar</button>
                    <button onclick="deleteTeacher(${teacher.id})" class="action-button delete-button">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editTeacher(id) {
    try {
        const response = await fetch(`/api/teachers/${id}`);
        const teacher = await response.json();
        
        document.getElementById('teacherId').value = teacher.id;
        document.getElementById('name').value = teacher.name;
        document.getElementById('email').value = teacher.email;
        document.getElementById('phone').value = teacher.phone;
        document.getElementById('address').value = teacher.address || '';
        document.getElementById('city').value = teacher.city || '';
        document.getElementById('state').value = teacher.state || '';
        document.getElementById('zipCode').value = teacher.zipCode || '';
        document.getElementById('cpf').value = teacher.cpf;
        document.getElementById('rg').value = teacher.rg || '';
        document.getElementById('birthDate').value = teacher.birthDate || '';
        document.getElementById('gender').value = teacher.gender || '';
        document.getElementById('specialization').value = teacher.specialization || '';
        document.getElementById('department').value = teacher.department;
        document.getElementById('employeeId').value = teacher.employeeId;
        document.getElementById('qualification').value = teacher.qualification || '';

        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Erro ao carregar professor:', error);
        alert('Erro ao carregar dados do professor');
    }
}

async function deleteTeacher(id) {
    if (!confirm('Tem certeza que deseja excluir este professor?')) {
        return;
    }

    try {
        const response = await fetch(`/api/teachers/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir professor');
        }

        loadTeachers();
        alert('Professor excluído com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir professor');
    }
}

function clearForm() {
    document.getElementById('teacherForm').reset();
    document.getElementById('teacherId').value = '';
} 