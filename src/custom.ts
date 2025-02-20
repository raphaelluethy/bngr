import { db, type CustomBang } from './db';

// DOM Elements
const bangForm = document.getElementById('bangForm') as HTMLFormElement;
const editIdInput = document.getElementById('editId') as HTMLInputElement;
const bangInput = document.getElementById('bang') as HTMLInputElement;
const urlInput = document.getElementById('url') as HTMLInputElement;
const descriptionInput = document.getElementById('description') as HTMLInputElement;
const cancelButton = document.getElementById('cancelButton') as HTMLButtonElement;
const bangsTableBody = document.getElementById('bangsTableBody') as HTMLTableSectionElement;
const notification = document.getElementById('notification') as HTMLDivElement;

// Load bangs
async function loadBangs() {
    const bangs = await db.customBangs.toArray();
    bangsTableBody.innerHTML = '';
    
    bangs.forEach(bang => {
        const row = document.createElement('tr');
        row.className = 'border-b border-zinc-700 hover:bg-zinc-700/50';
        row.innerHTML = `
            <td class="px-6 py-4">${bang.bang}</td>
            <td class="px-6 py-4">${bang.url}</td>
            <td class="px-6 py-4">${bang.description}</td>
            <td class="px-6 py-4 text-right">
                <button onclick="editBang(${bang.id})" class="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                <button onclick="deleteBang(${bang.id})" class="text-red-400 hover:text-red-300">Delete</button>
            </td>
        `;
        bangsTableBody.appendChild(row);
    });
}

// Show notification
function showNotification(message: string, isError = false) {
    notification.textContent = message;
    notification.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg transform transition-all duration-300 ${
        isError ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.transform = 'translateY(16px)';
        notification.style.opacity = '0';
    }, 3000);
}

// Form submission
bangForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bang: CustomBang = {
        bang: bangInput.value,
        url: urlInput.value,
        description: descriptionInput.value
    };
    
    try {
        if (editIdInput.value) {
            await db.customBangs.update(parseInt(editIdInput.value), bang);
            showNotification('Bang updated successfully!');
        } else {
            await db.customBangs.add(bang);
            showNotification('Bang added successfully!');
        }
        
        bangForm.reset();
        editIdInput.value = '';
        cancelButton.classList.add('hidden');
        await loadBangs();
    } catch (error) {
        showNotification('Error saving bang!', true);
        console.error('Error saving bang:', error);
    }
});

// Edit bang
window.editBang = async (id: number) => {
    const bang = await db.customBangs.get(id);
    if (bang) {
        editIdInput.value = id.toString();
        bangInput.value = bang.bang;
        urlInput.value = bang.url;
        descriptionInput.value = bang.description;
        cancelButton.classList.remove('hidden');
    }
};

// Delete bang
window.deleteBang = async (id: number) => {
    if (confirm('Are you sure you want to delete this bang?')) {
        try {
            await db.customBangs.delete(id);
            showNotification('Bang deleted successfully!');
            await loadBangs();
        } catch (error) {
            showNotification('Error deleting bang!', true);
            console.error('Error deleting bang:', error);
        }
    }
};

// Cancel editing
cancelButton.addEventListener('click', () => {
    bangForm.reset();
    editIdInput.value = '';
    cancelButton.classList.add('hidden');
});

// Initialize
loadBangs();

// Add to window object for onclick handlers
declare global {
    interface Window {
        editBang: (id: number) => Promise<void>;
        deleteBang: (id: number) => Promise<void>;
    }
}
