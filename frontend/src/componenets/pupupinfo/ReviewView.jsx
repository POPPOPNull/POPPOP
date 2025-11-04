import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { selectReviewByPopupStore } from "../../api/ReviewAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import RVStyle from "./Review.module.css"


function ReviewView(){


    const {popupNo} = useParams();

    const [review, setReview] = useState([])

    useEffect(()=>{
        selectReviewByPopupStore(popupNo)
        .then(data=>{
            console.log("data:",data)
            
                if(data.length!=0){
                    setReview(data)
                } else{
                    setReview([{content:"아직리뷰가없어요"}])
                }
            
            console.log(review)
            console.log(review.length)
        }
        
    )
    },[review.length])

    return(
        <>
        
        <Swiper
        slidesPerView={2}
        slidesOffsetAfter={30}
        spaceBetween={10}
        >
            {review.map(
                reviews => 
                        <SwiperSlide className={RVStyle.reviews}>
                            <div className={RVStyle.reviewsdetail}>
                                <div>{reviews.content}</div>
                                <div>{reviews.memberId}</div>
                            </div>
                        </SwiperSlide>
                            )}
        </Swiper>
        </>
    )
}

export default ReviewView;