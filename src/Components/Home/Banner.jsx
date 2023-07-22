import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide className="bg-[url('https://img.freepik.com/premium-photo/students-work-green-lawn-before-library_8353-2154.jpg?w=740')] bg-cover  min-h-screen">
            Slide 1</SwiperSlide>

            <SwiperSlide className="bg-[url('https://img.freepik.com/premium-photo/group-young-students-using-laptop-lawn-against-college-building_1134-41520.jpg?w=1060')] bg-cover min-h-screen">
            Slide 1</SwiperSlide>

            <SwiperSlide className="bg-[url('https://img.freepik.com/premium-photo/smiling-positive-university-student-boy-near-campus-with-books_245974-4728.jpg?w=900')] bg-cover min-h-screen">
            Slide 1</SwiperSlide>
        </Swiper>
    );
};

export default Banner;