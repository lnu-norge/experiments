
module.exports = {
  client: {
    service: {
      name: "Lokaler.lnu.no",
      url: "https://backend.lokaler.lnu.test/v1/graphql",
      headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_BACKEND_PASSWORD_ADMIN
      }
    }
  }
};