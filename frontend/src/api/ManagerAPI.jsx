import API from "./JwtAPI";

const BACKEND_URL = "http://localhost:8080";

// 팝업 등록 API
export function registerPopup(formData) {
  return API.post(`${BACKEND_URL}/api/manager/popup-stores`, formData)
    .then((response) => {
      console.log("팝업 등록 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("팝업 등록 에러:", error);
      throw error;
    });
}


// export async function registerPopup(formData) {
//   try {
//     const response = await API.post(
//       `${BACKEND_URL}/managers/popup-stores/register`,
//       formData
//     );
//     console.log("팝업 등록 성공:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("팝업 등록 실패:", error);
//     throw error;
//   }
// }