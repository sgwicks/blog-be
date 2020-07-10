exports.fetchApi = () => {
    return {
        '/articles': 'A list of all articles',
        '/articles/:article_id': 'A single article by id'
    }
}