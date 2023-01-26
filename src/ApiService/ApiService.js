export class ApiService {    
    async getAll(resource, username = null) {
        try {
            const result = await fetch(`http://localhost:5800/${resource}?${username ? new URLSearchParams({ username }) : ''}`);
            return await result.json();
        } catch(e) {
            console.log(e.message);
        }
    }

    async postData(resource, data) {
        try {
            const result = await fetch(`http://localhost:5800/${resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            return await result.json();
        } catch(e) {
            console.log(e);
        }
    }

    async deleteResource(resource, id) {
        try {
            await fetch(`http://localhost:5800/${resource}/${id}`, {
                method: 'DELETE'
            });
        } catch(e) {
            console.log(e);
        }
    }
}