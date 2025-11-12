import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { selectReviewByPopupStore } from "../../api/ReviewAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import RVStyle from "./Review.module.css"

function NoReviewYet(){
    return(
        <>
            <div className={RVStyle.noreviewyet}>아직 리뷰가 없어요</div>
        </>
    )
}

function ReviewView(){


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
    },[review.length])

    return(
        <>
        
        <Swiper
        slidesPerView={3}
        slidesOffsetAfter={30}
        spaceBetween={10}
        >
            {review.length==0? <NoReviewYet/> : review.map(
                reviews => 
                        <SwiperSlide className={RVStyle.reviews}>
                            <div className={RVStyle.reviewsdetail}>
                                <div>{reviews.memberId}</div>
                                <div>{reviews.content}</div>
                                <div>{reviews.reviewDate}</div>
                            </div>
                        </SwiperSlide>
                            )}
        </Swiper>
        </>
    )
}

export default ReviewView;