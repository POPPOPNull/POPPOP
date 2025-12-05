import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { selectReviewByPopupStore } from "../../api/ReviewAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import RVStyle from "./Review.module.css"

function NoReviewYet(){
    return(
        <>
            <div className={RVStyle.noreviewyet}>
                <div style={{color:"gray"}}>등록된 후기가 없습니다.</div>
                <div style={{height:10}}></div>
                <div style={{fontSize:18}}>첫 번째 후기를 작성해보세요!</div>
            </div>
        </>
    )
}

function ReviewView({refresh}){


    const {popupNo} = useParams();

    const [review, setReview] = useState([])

    useEffect(()=>{
        selectReviewByPopupStore(popupNo)
        .then(data=>{
            console.log("data:",data)
            setReview(data)           
            console.log(review)
            console.log(review.length)
        }
        
    )
    },[refresh])

    return(
        <>
        <div className={RVStyle.back}>
            <div className={RVStyle.title}>후기</div>
        <Swiper
        slidesPerView={3}
        slidesOffsetAfter={30}
        spaceBetween={10}
        >
            {review.length==0? <NoReviewYet/> : review.map(
                reviews => 
                        <SwiperSlide className={RVStyle.reviews}>
                                <div style={{padding:5}}>{reviews.memberId}</div>
                            <div className={RVStyle.reviewsdetail}>
                                <div>{reviews.content}</div>
                            </div>
                                <div style={{padding:5,textAlign:"end",fontSize:12}}>{reviews.reviewDate}</div>
                        </SwiperSlide>
                            )}
        </Swiper>
        </div>
        </>
    )
}

export default ReviewView;