import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import OrderModal from "./orderModal";

const FoodTable = (props) => {
  const { filteredData, setShowToast } = props;
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [clickedRowData, setClickedRowData] = useState();

  // React-Table configs
  const columns = [
    {
      dataField: "foodname",
      text: "Food Name",
      headerStyle: { backgroundColor: "#353247", color: "white" },
    },
    {
      dataField: "price",
      text: "Price($)",
      headerStyle: { backgroundColor: "#353247", color: "white" },
    },
    {
      dataField: "rname",
      text: "Restaurant Name",
      headerStyle: { backgroundColor: "#353247", color: "white" },
    },
    {
      dataField: "availability",
      text: "Available?",
      headerStyle: { backgroundColor: "#353247", color: "white" },
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "availability",
      order: "desc",
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setClickedRowData(row);
      setShowOrderModal(true);
    },
  };

  const options = {
    custom: true,
    totalSize: filteredData ? filteredData.length : 0,
    sizePerPage: 8,
  };

  return (
    <div>
      {showOrderModal ? (
        <OrderModal
          setShowToast={setShowToast}
          rowData={clickedRowData}
          setShowOrderModal={setShowOrderModal}
        />
      ) : null}
      <PaginationProvider pagination={paginationFactory(options)}>
        {({ paginationProps, paginationTableProps }) => (
          <Container>
            <div style={{ marginBottom: "-2.5rem" }}>
              {filteredData && filteredData.length !== 0 ? (
                <div>
                  <PaginationTotalStandalone {...paginationProps} />
                </div>
              ) : (
                <Container style={{ height: "50px" }} />
              )}
            </div>
            <div style={{ float: "right" }}>
              <PaginationListStandalone {...paginationProps} />
            </div>

            <BootstrapTable
              keyField="foodname"
              data={
                filteredData
                  ? filteredData.map((x) => ({ ...x, availability: x.availability ? "Yes" : "No" }))
                  : []
              }
              columns={columns}
              defaultSorted={defaultSorted}
              {...paginationTableProps}
              rowStyle={(row, rowIndex) =>
                row.availability === "Yes"
                  ? {
                      backgroundColor: rowIndex % 2 === 0 ? "#FFFFFF" : "#F6F6F6",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: rowIndex % 2 === 0 ? "#FFFFFF" : "#F6F6F6",
                      opacity: "0.4",
                      pointerEvents: "none",
                    }
              }
              striped
              condensed
              noDataIndication={() => <div style={{ textAlign: "center" }}>Table is Empty</div>}
              rowEvents={rowEvents}
            />
          </Container>
        )}
      </PaginationProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filteredData: state.food.filteredData,
});

export default connect(mapStateToProps)(FoodTable);
