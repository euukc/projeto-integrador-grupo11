document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    setupForm();
});

function setupForm() {
    const form = document.getElementById('studentForm');
    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentId = document.getElementById('studentId').value;
    
    const data = {
        id: studentId || null,
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
        studentId: formData.get('studentId'),
        course: formData.get('course'),
        semester: formData.get('semester'),
        enrollmentDate: formData.get('enrollmentDate'),
        status: formData.get('status')
    };

    try {
        const response = await fetch(`/api/students${studentId ? `/${studentId}` : ''}`, {
            method: studentId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar aluno');
        }

        clearForm();
        loadStudents();
        alert('Aluno salvo com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar aluno');
    }
}

async function loadStudents() {
    try {
        const response = await fetch('/api/students');
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        alert('Erro ao carregar lista de alunos');
    }
}

function displayStudents(students) {
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.status}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editStudent(${student.id})" class="action-button edit-button">Editar</button>
                    <button onclick="deleteStudent(${student.id})" class="action-button delete-button">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editStudent(id) {
    try {
        const response = await fetch(`/api/students/${id}`);
        const student = await response.json();
        
        document.getElementById('studentId').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('address').value = student.address || '';
        document.getElementById('city').value = student.city || '';
        document.getElementById('state').value = student.state || '';
        document.getElementById('zipCode').value = student.zipCode || '';
        document.getElementById('cpf').value = student.cpf;
        document.getElementById('rg').value = student.rg || '';
        document.getElementById('birthDate').value = student.birthDate || '';
        document.getElementById('gender').value = student.gender || '';
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('course').value = student.course;
        document.getElementById('semester').value = student.semester;
        document.getElementById('enrollmentDate').value = student.enrollmentDate || '';
        document.getElementById('status').value = student.status || 'ACTIVE';

        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Erro ao carregar aluno:', error);
        alert('Erro ao carregar dados do aluno');
    }
}

async function deleteStudent(id) {
    if (!confirm('Tem certeza que deseja excluir este aluno?')) {
        return;
    }

    try {
        const response = await fetch(`/api/students/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir aluno');
        }

        loadStudents();
        alert('Aluno excluído com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir aluno');
    }
}

function clearForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
} 