async function testClubAPI() {
    const baseURL = 'http://localhost:3000/api';

    // Test GET all clubs
    async function getAllClubs() {
        try {
            const response = await fetch(`${baseURL}/poster`);
            const data = await response.json();
            console.log('GET /poster:', data);
            return data;
        } catch (error) {
            console.error('Error getting clubs:', error);
        }
    }

    // Test POST - Create a new club
    async function createClub() {
        try {
            const dummyPoster = {
                club_id: 1,
                user_id: 1,
                location: "building on campus",
                position: "(1, 4)",
                img_path: "/images/poster1.png"

            };

            const response = await fetch(`${baseURL}/poster`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dummyPoster)
            });

            const data = await response.json();
            console.log('POST /poster:', data);
            return data;
        } catch (error) {
            console.error('Error creating club:', error);
        }
    }

    // Test GET single club
    async function getClubById(id: number) {
        try {
            const response = await fetch(`${baseURL}/poster/${id}`);
            const data = await response.json();
            console.log(`GET /poster/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error getting club ${id}:`, error);
        }
    }

    // Test PUT - Update club
    async function updateClub(id: number) {
        try {
            const updatedPoster = {
                club_id: 2,
                user_id: 1,
                location: "building on campus",
                position: "(2, 5)",
                img_path: "/images/poster1.png"

            };

            const response = await fetch(`${baseURL}/poster/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPoster)
            });

            const data = await response.json();
            console.log(`PUT /poster/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error updating club ${id}:`, error);
        }
    }

    // Run tests
    console.log('Starting API tests...\n');

    await getAllClubs();
    const newClub = await createClub();

    if (newClub && newClub[0]?.id) {
        await getClubById(newClub[0].id);
        await updateClub(newClub[0].id);
    }
}

// Run the test
testClubAPI();