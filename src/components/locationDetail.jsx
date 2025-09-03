const LocationDetail = ({ location, className = "" }) => {
  return (
    <div className={className}>
      <h3 className="font-poppins text-base font-semibold">{location.title}</h3>
      <p className="text-sm font-poppins">
        <span className="block">{location.address.streetAddress}</span>
        <span className="block">
          {location.address.city}, {location.address.state}{" "}
          {location.address.postalCode}
        </span>
        <span className="block">{location.address.country}</span>
      </p>
    </div>
  );
};

export default LocationDetail;
