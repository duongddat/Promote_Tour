import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { currencyFormatter } from "../../helper/formattingPrice";
import Subtitle from "../../shared/Subtitle";

function RevenueSelect({ statistics }) {
  const navigate = useNavigate();
  const options = statistics.map((stat) => ({
    value: stat._id,
    label: stat._id.toString(),
  }));

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const selectedStat = statistics.find(
    (stat) => stat._id === selectedOption.value
  );

  function handleChangeOption(option) {
    navigate("/admin/revenue?year=" + option.value);
    setSelectedOption(option);
  }

  return (
    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3 px-3">
      {selectedStat && (
        <div className="d-flex align-items-center gap-2">
          <Subtitle subtitle="Tổng tiền" classes="mb-0" />
          <span className="mb-0 fw-bold text-red">
            {currencyFormatter.format(selectedStat.totalRevenue)}
          </span>
        </div>
      )}
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => handleChangeOption(option)}
        styles={{
          control: (provided) => ({
            ...provided,
            padding: "2px 12px",
            borderRadius: "50px",
          }),
        }}
      />
    </div>
  );
}

export default RevenueSelect;
