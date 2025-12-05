import API from './JwtAPI';

export function findId(email) {
  return API.post("/auth/find-id", { email }).then((res) => res.data);
}

export function verifyUser(id, email) {
  return API.post("/auth/verify-user", { id, email }).then((res) => res.data);
}

export function resetPassword(id, email, newPassword) {
  return API.put("/auth/reset-password", { id, email, newPassword })
    .then((res) => res.data);
}
