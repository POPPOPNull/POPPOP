import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
        }
        
    )
    },[])

    return(
        <>
        <br />
        <div>후기</div>
        <div>후기작성하기</div>
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