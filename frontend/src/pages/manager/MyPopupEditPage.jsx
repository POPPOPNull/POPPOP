import MyPopupEdit from "../../componenets/manager/mypopup/mypopup-edit";
import "./manager-page.css";

function MyPopupEditPage() {
  return (
    <div className="manager-main-content">
      {/* <h2 style={{ margin: "8px 0 14px", fontWeight: 800 }}>
        나의 팝업스토어 &gt; 수정
      </h2> */}
      <MyPopupEdit />
    </div>
  );
}

export default MyPopupEditPage;
