import ServiceCard from "./ServiceCard";
import weatherImg from "../../assets/img/weather.png";
import guideImg from "../../assets/img/guide.png";
import customizationImg from "../../assets/img/customization.png";

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Khi bạn chọn chúng tôi làm đối tác du lịch, trải nghiệm của bạn sẽ được nâng lên một tầm cao mới nhờ vào việc chúng tôi chú trọng và tạo điều kiện cho một trải nghiệm thời tiết tốt nhất.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Chúng tôi tự hào giới thiệu đội ngũ người hướng dẫn với sự đa dạng về kỹ năng, kiến thức và tâm huyết, đặc biệt được chọn lọc để đảm bảo mang đến trải nghiệm du lịch không thể quên.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Chào mừng bạn đến với thế giới của chúng tôi, nơi mà trải nghiệm du lịch không chỉ là một chuyến đi, mà còn là sự tương tác cá nhân hóa với những hành trình được thiết kế đặc biệt.",
  },
];

const ServiceList = () => {
  return (
    <div className="row row-gap-5">
      {serviceData.map((item, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-12">
          <ServiceCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
