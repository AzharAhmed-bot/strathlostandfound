/* eslint-disable react/prop-types */


const FeatureCard = ({ image,title, description }) => {
    return (
        <div className="card justify-center align-middle ">
        <img
          src={image}
          alt="Feature Image"
          className="card__image"
        />
        <div className="card__content">
          <p className="card__title">{title}</p>
          <p className="card__description">{description}</p>
        </div>
      </div>
    );
  };

export default FeatureCard
