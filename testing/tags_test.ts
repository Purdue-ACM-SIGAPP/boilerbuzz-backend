async function testTagAPI() {
    const baseURL = 'http://localhost:3000/api';

    // Test GET all Tags
    async function getAllTags() {
        try {
            const response = await fetch(`${baseURL}/tags`);
            const data = await response.json();
            console.log('GET /Tag:', data);
            return data;
        } catch (error) {
            console.error('Error getting Tags:', error);
        }
    }

    // Test POST - Create a new Tag
    async function createTag() {
        try {
            const dummyTag = {
                tag_name: "Test Tag"
            };

            const response = await fetch(`${baseURL}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dummyTag)
            });

            const data = await response.json();
            console.log('POST /Tag:', data);
            return data;
        } catch (error) {
            console.error('Error creating Tag:', error);
        }
    }

    // Test GET single Tag
    async function getTagById(id: number) {
        try {
            const response = await fetch(`${baseURL}/tags/${id}`);
            const data = await response.json();
            console.log(`GET /Tags/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error getting Tag ${id}:`, error);
        }
    }

    // Test PUT - Update Tag
    async function updateTag(id: number) {
        try {
            const updatedTag = {
                tag_name: "Updated Test Tag"
            };

            const response = await fetch(`${baseURL}/tags/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTag)
            });

            const data = await response.json();
            console.log(`Update /tags/${id}:`, data);
            return data;






        } catch (error) {
            console.error(`Error updating Tag ${id}:`, error);
        }
    }

    async function deleteTag(id: number) {
        try {
            const response = await fetch(`${baseURL}/tags/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(`DELETE /Tag/${id}:`, data);
            return data;
        } catch (error) {
            console.error(`Error deleting Tag ${id}:`, error);
        }
    }

    async function tagPoster(tagId: number, posterId: number) {
        try {

            const response = await fetch(`${baseURL}/tagPoster/${tagId}/${posterId}`, {
                method: 'POST',
            });
            const data = await response.json();
            console.log(`POST /tagPoster/${tagId}/${posterId}:`, data);
            return data;
        } catch (error) {
            console.error(`Error tagging Poster ${posterId} with Tag ${tagId}:`, error);
        }
    }

    async function unTagPoster(tagId: number, posterId: number) {
        try {

            const response = await fetch(`${baseURL}/tagPoster/${tagId}/${posterId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(`DELETE /tagPoster/${tagId}/${posterId}:`, data);
            return data;
        } catch (error) {
            console.error(`Error untagging Poster ${posterId} with Tag ${tagId}:`, error);
        }
    }



    // Run tests
    console.log('Starting API tests...\n');

    await getAllTags();
    const newTag = await createTag();

    if (newTag && newTag[0]?.id) {
        await getTagById(newTag[0].id);
        await updateTag(newTag[0].id);
        // await tagPoster(newTag[0].id, 3); // Assuming poster with ID 1 exists
        await unTagPoster(10, 3); // Assuming poster with ID 1 exists
        // await deleteTag(newTag[0].id);
    }
}

// Run the test
testTagAPI();