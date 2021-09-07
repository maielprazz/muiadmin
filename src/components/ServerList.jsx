import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'; //{ CSVExport }
import overlayFactory from 'react-bootstrap-table2-overlay';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  headerTable: {
    background: '#a6a6a6',
    color: '#ffffff',
  },
  tableOr: {
    tableLayout: 'auto !important',
    background: 'red',
  },
}));

const { SearchBar } = Search;

function ListServer() {
  const [serverlist, setServerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const UserExportCSV = (props) => {
    const handleExport = () => {
      props.onExport();
    };
    return (
      <Button variant="contained" color="primary" onClick={handleExport}>
        Export to CSV
      </Button>
    );
  };

  const columns = [
    { dataField: 'Server_Status', text: 'Server Status', sort: true },
    { dataField: 'Name', text: 'Name', sort: true },
    { dataField: 'Hostname', text: 'Host', sort: true },
    { dataField: 'IP', text: 'IP', sort: true },
    { dataField: 'Windows_Server', text: 'Windows', sort: true },
    { dataField: 'CPU', text: 'CPU', sort: true },
    { dataField: 'Memory', text: 'Memory', sort: true },
    { dataField: 'SQL_Version', text: 'SQl Version', sort: true },
    { dataField: 'Disc_Size', text: 'Disc Size', sort: true },
    { dataField: 'Location', text: 'Location', sort: true },
  ];

  // [

  //   {
  //     dataField: 'id',
  //     text: 'id',
  //     headerStyle: { width: '40px' },
  //   },
  //   { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
  //   { dataField: 'username', text: 'Username', sort: true },
  //   { dataField: 'email', text: 'Email', sort: true },
  // ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 30,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    // onPageChange: function (page, sizePerPage) {
    //   // console.log('page', page);
    //   // console.log('sizePerPage', sizePerPage);
    // },
  });

  useEffect(() => {
    axios
      //  .get('http://localhost:8000/api/listserver/') test
      .get('api/listserver/')
      .then((res) => {
        setServerList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <ToolkitProvider
        bootstrap4
        keyField="Name"
        data={serverlist}
        columns={columns}
        exportCSV
        search
      >
        {(props) => (
          <React.Fragment>
            <UserExportCSV {...props.csvProps} />
            <br />
            <br />
            <SearchBar {...props.searchProps} style={{ width: '200%' }} />
            <BootstrapTable
              wrapperClasses="table-responsive"
              rowClasses="text-nowrap"
              striped
              hover
              condensed
              headerWrapperClasses={classes.headerTable}
              loading={loading}
              noDataIndication={
                loading ? (
                  <strong>Loading...</strong>
                ) : (
                  <strong>Data is empty alias kosooong gan...</strong>
                )
              }
              overlay={overlayFactory({
                spinner: true,
                styles: {
                  overlay: (base) => ({
                    ...base,
                    background: 'rgba(148,216, 246, 0.5)',
                  }),
                },
              })}
              // bootstrap4
              keyField="Name"
              // columns={columns}
              // data={userlist}
              pagination={pagination}
              filter={filterFactory()}
              {...props.baseProps}
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
}

export default ListServer;
