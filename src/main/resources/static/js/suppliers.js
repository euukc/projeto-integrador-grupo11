document.addEventListener('DOMContentLoaded', function() {
    loadSuppliers();
    setupForm();
});

function setupForm() {
    const form = document.getElementById('supplierForm');
    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const supplierId = document.getElementById('supplierId').value;
    
    const data = {
        id: supplierId || null,
        name: formData.get('corporateName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        cnpj: formData.get('cnpj'),
        tradeName: formData.get('tradeName'),
        corporateName: formData.get('corporateName'),
        stateRegistration: formData.get('stateRegistration'),
        category: formData.get('category'),
        productType: formData.get('productType'),
        contractNumber: formData.get('contractNumber'),
        contractDate: formData.get('contractDate'),
        paymentTerms: formData.get('paymentTerms')
    };

    try {
        const response = await fetch(`/api/suppliers${supplierId ? `/${supplierId}` : ''}`, {
            method: supplierId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar fornecedor');
        }

        clearForm();
        loadSuppliers();
        alert('Fornecedor salvo com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar fornecedor');
    }
}

async function loadSuppliers() {
    try {
        const response = await fetch('/api/suppliers');
        const suppliers = await response.json();
        displaySuppliers(suppliers);
    } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
        alert('Erro ao carregar lista de fornecedores');
    }
}

function displaySuppliers(suppliers) {
    const tbody = document.querySelector('#suppliersTable tbody');
    tbody.innerHTML = '';

    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.cnpj}</td>
            <td>${supplier.corporateName}</td>
            <td>${supplier.category}</td>
            <td>${supplier.phone}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editSupplier(${supplier.id})" class="action-button edit-button">Editar</button>
                    <button onclick="deleteSupplier(${supplier.id})" class="action-button delete-button">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editSupplier(id) {
    try {
        const response = await fetch(`/api/suppliers/${id}`);
        const supplier = await response.json();
        
        document.getElementById('supplierId').value = supplier.id;
        document.getElementById('corporateName').value = supplier.corporateName;
        document.getElementById('tradeName').value = supplier.tradeName;
        document.getElementById('cnpj').value = supplier.cnpj;
        document.getElementById('stateRegistration').value = supplier.stateRegistration || '';
        document.getElementById('email').value = supplier.email;
        document.getElementById('phone').value = supplier.phone;
        document.getElementById('address').value = supplier.address || '';
        document.getElementById('city').value = supplier.city || '';
        document.getElementById('state').value = supplier.state || '';
        document.getElementById('zipCode').value = supplier.zipCode || '';
        document.getElementById('category').value = supplier.category;
        document.getElementById('productType').value = supplier.productType;
        document.getElementById('contractNumber').value = supplier.contractNumber || '';
        document.getElementById('contractDate').value = supplier.contractDate || '';
        document.getElementById('paymentTerms').value = supplier.paymentTerms || '';

        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Erro ao carregar fornecedor:', error);
        alert('Erro ao carregar dados do fornecedor');
    }
}

async function deleteSupplier(id) {
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) {
        return;
    }

    try {
        const response = await fetch(`/api/suppliers/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir fornecedor');
        }

        loadSuppliers();
        alert('Fornecedor excluído com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir fornecedor');
    }
}

function clearForm() {
    document.getElementById('supplierForm').reset();
    document.getElementById('supplierId').value = '';
} 