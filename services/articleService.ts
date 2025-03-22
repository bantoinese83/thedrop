import axios from "axios"

// Determine if we're running on the server or client
const isServer = typeof window === "undefined"

// Use different base URLs depending on environment
const getBaseUrl = () => {
    if (isServer) {
        // On the server, use the absolute URL to the API
        return "http://localhost:8000"
    }
    // On the client, use the relative URL that will be proxied
    return "/api"
}

export const getArticles = async () => {
    try {
        const baseUrl = getBaseUrl()
        const response = await axios.get(`${baseUrl}/articles`)
        return response.data
    } catch (error) {
        console.error("Error fetching articles:", error)
        throw error
    }
}

export const getArticle = async (articleId: number) => {
    try {
        const baseUrl = getBaseUrl()
        const response = await axios.get(`${baseUrl}/articles/${articleId}/generated_content`)
        return response.data
    } catch (error) {
        console.error(`Error fetching article ${articleId}:`, error)
        throw error
    }
}

export const searchArticles = async (query: string) => {
    try {
        const baseUrl = getBaseUrl()
        const response = await axios.get(`${baseUrl}/articles/search`, {
            params: { q: query }
        })
        return response.data
    } catch (error) {
        console.error("Error searching articles:", error)
        throw error
    }
}
