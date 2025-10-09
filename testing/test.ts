async function testClubAPI() {
    const baseURL = 'http://localhost:3000/api';

    // Test GET all clubs
    async function getAllClubs() {
        try {
            const response = await fetch(`${baseURL}/club`);
            const data = await response.json();
            console.log('GET /club:', data);
            return data;
        } catch (error) {
            console.error('Error getting clubs:', error);
        }
    }

    // Test POST - Create a new club
    async function createClub() {
        try {
            const dummyClub = {
                member_post_permissions: true,
            };

            const response = await fetch(`${baseURL}/club`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dummyClub)
            });

            const data = await response.json();
            console.log('POST /club:', data);
            return data;
        } catch (error) {
            console.error('Error creating club:', error);
        }
    }

    // Test GET single club
    async function getClubById(id: number) {
        try {
            const response = await fetch(`${baseURL}/club/${id}`);
            const data = await response.json();
            console.log(`GET /clubs/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error getting club ${id}:`, error);
        }
    }

    // Test PUT - Update club
    async function updateClub(id: number) {
        try {
            const updatedClub = {
               member_post_permissions: false,
            };

            const response = await fetch(`${baseURL}/club/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedClub)
            });

            const data = await response.json();
            console.log(`PUT /clubs/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error updating club ${id}:`, error);
        }
    }

    async function deleteClub(id: number) {
        try {
            const response = await fetch(`${baseURL}/club/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(`DELETE /club/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error deleting club ${id}:`, error);
        }
    }

    // Run tests
    console.log('Starting API tests...\n');

    await getAllClubs();
    const newClub = await createClub();

    if (newClub && newClub[0]?.id) {
        await getClubById(newClub[0].id);
        await updateClub(newClub[0].id);
        // await deleteClub(newClub[0].id);
    }
}

// Run the test
testClubAPI();