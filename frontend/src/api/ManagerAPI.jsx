import API from "./JwtAPI";

const BACKEND_URL = "http://localhost:8080";

// 팝업 등록 API
export function registerPopup(formData) {
  return API.post(`${BACKEND_URL}/manager/popup-stores`, formData)
    .then((response) => {
      console.log("팝업 등록 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("팝업 등록 에러:", error);
      throw error;
    });
}

//팝업 조회
export function getMyPopupList() {
  return API.get(`${BACKEND_URL}/manager/mypopup`)
    .then((response) => {
      console.log("나의 팝업스토어 목록 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("나의 팝업스토어 목록 조회 오류:", error);
      throw error;
    });
}

//팝업 상세 조회
export function fetchMyPopupDetail(popupNo) {
  return API.get(`${BACKEND_URL}/manager/mypopup/${popupNo}`)
    .then((response) => {
      console.log("나의 팝업 상세 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("나의 팝업 상세 조회 오류:", error);
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