import DataTable from "react-data-table-component";

import NoData from "../../assets/img/NoData.png";
import "./TableData.css";

function TableData({
  columns,
  data,
  paginationTotalRows = 999,
  onChangeRowsPerPage,
  onChangePage,
  loading = false,
}) {
  return (
    <>
      {data.length > 0 && (
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={paginationTotalRows}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
          fixedHeader
          fixedHeaderScrollHeight="800px"
          progressPending={loading}
          //   selectableRows
        ></DataTable>
      )}
      {data.length === 0 && (
        <div className="m-4">
          <div className="message-img m-auto mb-4">
            <img src={NoData} alt="Message image" />
          </div>
          <div className="d-flex flex-column text-center gap-2">
            <h4>Chưa có dữ liệu nào!!!</h4>
            <p className="md" style={{ color: "#475467" }}>
              Vui lòng thêm mới dữ liệu!!!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default TableData;
