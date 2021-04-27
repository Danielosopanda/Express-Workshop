module.exports = (request, response, next) => {
    return response.status(200).json({ code: 1, messsage: "Bienvenido al pokédex" });
}