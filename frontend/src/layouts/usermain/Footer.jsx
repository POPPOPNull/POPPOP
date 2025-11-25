import footer from "./Footer.module.css"

function Footer() {
    return(
        <>
        <div className={footer.back}>
            <div className={footer.menus}>
                <div className={footer.menu}>서비스 이용약관</div>
                <div className={footer.menu}>개인정보 처리방침</div>
                <div className={footer.menu}>마케팅 수신 동의</div>
                <div className={footer.menu}>고객 센터</div>
                <div className={footer.menu}>비즈니스</div>
            </div>
            <div className={footer.info}>
                <div>주소 : 경기도 하남시 미사강변동로 85 힐스테이트 에코 3층</div>
                <div>문의전화 : (031)123-4567 </div>
                <br />
                <div>Copyright 2025. poppopnull. All rights reserved</div>
            </div>
            <div className={footer.others}>
                    <div className={footer.other}>
                        <div className={footer.icon}>
                            <img src="\public\icons\mail.png" alt="" style={{width:35}}/>
                        </div>
                        문의메일
                    </div>
                    <div className={footer.other}>
                        <div className={footer.icon}>
                            <img src="\public\icons\kakaotalk.png" alt="" style={{width:35}}/>
                        </div>
                        카카오톡
                    </div>
                    <div className={footer.other}>
                        <div className={footer.icon}>
                            <img src="\public\icons\instagram.png" alt="" style={{width:35}}/>
                        </div>
                        인스타그램
                    </div>
                    
                    <div className={footer.other}><img src="\public\icons\blog.png" alt="" style={{width:35}}/>블로그</div>
            </div>
        </div>
        </>
    )
}
export default Footer;