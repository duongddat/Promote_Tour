function Subtitle({ subtitle, classes = null }) {
  return (
    <h3 className={`section__subtitle ${classes !== null && classes}`}>
      {subtitle}
    </h3>
  );
}

export default Subtitle;
